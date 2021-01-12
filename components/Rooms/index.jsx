import React, { useEffect } from "react";
import Link from "next/link";
import { gql, useQuery, useMutation } from "@apollo/client";

import { withApollo } from "../../apollo/client";
import useCreateRoom from "../../utils/hooks/useCreateRoom";

const Rooms = () => {
  const { subscribeToMore, data, loading, error } = useQuery(RoomsQuery);
  const [
    createRoom,
    { loading: createRoomLoading, error: createRoomError },
  ] = useCreateRoom();

  useEffect(() => {
    subscribeToMore({
      document: NewRoomSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newRoom = subscriptionData.data.newRoom;
        return Object.assign({}, prev, {
          rooms: [...prev.rooms, newRoom],
        });
      },
    });
  }, []);

  return (
    <div className="mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="sm:text-center">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-blue-700 sm:text-4xl">
            Rooms
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 sm:mx-auto">
            Create a room or choose one of the options below to join one
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
            <div className="rounded-md shadow">
              <a
                onClick={() => createRoom()}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 cursor-pointer hover:bg-blue-700 md:py-4 md:px-10"
              >
                {createRoomLoading ? "Loading..." : "Create room"}
              </a>
            </div>
          </div>
        </div>
        <div className="my-8 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data &&
            data.rooms.map((room, key) => (
              <Link key={key} href={`/rooms/${room.id}`}>
                <a className="flex justify-center px-8 py-3 border border-transparent text-base text-center font-bold capitalize rounded-md text-blue-700 bg-gray-100 cursor-pointer hover:bg-gray-200 md:py-4 md:px-10">
                  {room.name.replace("_", " ")}
                </a>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

const RoomsQuery = gql`
  query RoomsQuery {
    rooms {
      __typename
      id
      name
      users {
        __typename
        id
        name
      }
    }
  }
`;

const NewRoomSubscription = gql`
  subscription newRoom {
    newRoom {
      __typename
      id
      name
      users {
        __typename
        id
        name
      }
    }
  }
`;

export default withApollo(Rooms);
