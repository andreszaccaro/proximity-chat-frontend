import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";

import { withApollo } from "../../apollo/client";
import Bubble from "../shared/Bubble";

const ChatRoom = ({ user: { id: userId, positionX, positionY, room } }) => {
  const router = useRouter();
  const roomId = router.query.id;
  const roomName = useMemo(() => room.name.replace("_", " "), [room]);

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
        message && setMessage("");
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
    updateUser({ positionX: Math.round(x), positionY: Math.round(y) });
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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div>
        <h2 className="mb-4 text-3xl leading-8 text-center font-extrabold capitalize tracking-tight text-blue-700 sm:text-4xl">
          {roomName}
        </h2>
        <svg
          className="background-pattern cursor-pointer rounded-lg shadow-md ring-1 ring-black ring-opacity-5 overflow-hidden"
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
          className="flex flex-row p-2 mt-2 rounded-lg shadow-md ring-1 ring-black ring-opacity-5"
          onSubmit={(e) => {
            e.preventDefault();
            updateUser({ message });
          }}
        >
          <input
            id="message"
            name="message"
            type="text"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Type here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="flex-1 w-full flex justify-center py-2 px-8 ml-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </div>
      <style jsx>{`
        .background-pattern {
          background-color: #f3f4f6;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%233b82f6' fill-opacity='0.22' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
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
