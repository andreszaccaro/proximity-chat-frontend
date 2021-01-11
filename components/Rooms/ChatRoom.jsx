import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";

import { withApollo } from "../../apollo/client";
import Bubble from "../shared/Bubble";

const ChatRoom = ({ user: { id: userId, positionX, positionY } }) => {
  const router = useRouter();
  const roomId = router.query.id;

  const [message, setMessage] = useState("");
  const [mainUserCoord, setMainUserCoord] = useState({ positionX, positionY });
  const { subscribeToMore, data } = useQuery(RoomQuery, {
    variables: { roomId },
  });
  const [updateUserMutation, { loading }] = useMutation(UpdateUserMutation);

  const updateUser = async ({ message, positionX, positionY }) => {
    if (message || positionX || positionY) {
      try {
        await updateUserMutation({
          variables: {
            userId,
            message,
            positionX,
            positionY,
          },
        });
        (positionX || positionY) &&
          setMainUserCoord({
            positionX: positionX || mainUserCoord.positionX,
            positionY: positionY || mainUserCoord.positionY,
          });
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const updateCoordinates = (event) => {
    var target = event.target;
    var domRect = target.getBoundingClientRect();
    var x = event.clientX - domRect.left;
    var y = event.clientY - domRect.top;
    updateUser({ positionX: x, positionY: y });
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
      <div>
        <svg
          className="chatbox"
          width={600}
          height={400}
          onClick={(e) => updateCoordinates(e)}
        >
          {data &&
            data.room.map((user, key) => (
              <Bubble
                key={key}
                mainUserX={mainUserCoord.positionX}
                mainUserY={mainUserCoord.positionY}
                currentUserX={user.positionX}
                currentUserY={user.positionY}
                data={user}
              />
            ))}
        </svg>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateUser({ message });
          }}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="message"
          />
          <button type="submit" value="submit">
            {loading ? "Loading..." : "Send Message"}
          </button>
        </form>
      </div>
      <style jsx>{`
        .chatbox {
          border: solid black;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

const RoomQuery = gql`
  query RoomsQuery($roomId: String!) {
    room(roomId: $roomId) {
      __typename
      id
      name
      positionX
      positionY
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
      positionX
      positionY
      lastMessage
    }
  }
`;

const UpdateUserMutation = gql`
  mutation UpdateUserMutation(
    $userId: String!
    $message: String
    $positionX: Int
    $positionY: Int
  ) {
    updateUser(
      userId: $userId
      message: $message
      positionX: $positionX
      positionY: $positionY
    ) {
      __typename
      id
      name
      positionX
      positionY
      lastMessage
    }
  }
`;

export default withApollo(ChatRoom);
