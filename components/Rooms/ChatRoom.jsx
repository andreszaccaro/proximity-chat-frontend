import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";

import { withApollo } from "../../apollo/client";
import Bubble from "../shared/Bubble";

const ChatRoom = ({ userId }) => {
  const router = useRouter();
  const roomId = router.query.id;

  const [message, setMessage] = useState("");
  const [positionX, setPositionX] = useState("");
  const [positionY, setPositionY] = useState("");
  const { subscribeToMore, data } = useQuery(RoomQuery, {
    variables: { roomId },
  });
  const [updateUserMutation, { loading }] = useMutation(UpdateUserMutation);

  const updateUser = async ({ message, positionX, positionY }) => {
    (message || positionX || positionY) &&
      (await updateUserMutation({
        variables: {
          userId,
          message,
          positionX,
          positionY,
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

  const updateCoordinates = (event) => {
    console.log("event", event);
    var target = event.target;
    var domRect = target.getBoundingClientRect();
    var x = event.clientX - domRect.left;
    var y = event.clientY - domRect.top;
    updateUser({ positionX: x, positionY: y });
  };

  return (
    <div className="chat-room">
      <p>{`This page will contain the chatbox for the room ID ${roomId}`}</p>
      <div>
        <svg
          className="chatbox"
          width={600}
          height={300}
          onClick={(e) => updateCoordinates(e)}
        >
          {data &&
            data.room.map((user, key) => (
              <Bubble
                key={key}
                x={user.positionX}
                y={user.positionY}
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
