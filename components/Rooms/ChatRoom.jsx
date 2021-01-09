import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";

import { withApollo } from "../../apollo/client";

const ChatRoom = ({ userId }) => {
  const router = useRouter();
  const roomId = router.query.id;

  const [message, setMessage] = useState("");
  const { subscribeToMore, data } = useQuery(RoomQuery, {
    variables: { roomId },
  });
  const [sendMessageMutation, { loading }] = useMutation(SendMessageMutation);

  const sendMessage = async () => {
    message &&
      (await sendMessageMutation({
        variables: {
          userId,
          message,
        },
      }));
  };

  useEffect(() => {
    roomId &&
      subscribeToMore({
        document: RoomSubscription,
        variables: { roomId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const roomUsers = subscriptionData.data.roomUsers;
          const prevUsers = prev.room.filter(
            (user) => user.id !== roomUsers.id
          );
          return Object.assign({}, prev, {
            room: [...prevUsers, roomUsers],
          });
        },
      });
  }, [roomId]);

  return (
    <div className="chat-room">
      <p>{`This page will contain the chatbox for the room ID ${roomId}`}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" value="submit">
          {loading ? "Loading..." : "Send Message"}
        </button>
      </form>
      {data &&
        data.room.map((user, key) => (
          <p key={key}>{`${user.name}: ${user.lastMessage}`}</p>
        ))}
      <style jsx>{``}</style>
    </div>
  );
};

const RoomQuery = gql`
  query RoomsQuery($roomId: String!) {
    room(roomId: $roomId) {
      __typename
      id
      name
      lastMessage
    }
  }
`;

const RoomSubscription = gql`
  subscription roomUsers($roomId: String!) {
    roomUsers(roomId: $roomId) {
      __typename
      id
      name
      lastMessage
    }
  }
`;

const SendMessageMutation = gql`
  mutation SendMessageMutation($userId: String!, $message: String!) {
    sendMessage(userId: $userId, message: $message) {
      response
    }
  }
`;

export default withApollo(ChatRoom);
