import React from "react";
import Link from "next/link";

import { withApollo } from "../../apollo/client";
import useCreateRoom from "../../utils/hooks/useCreateRoom";

const Home = () => {
  const [
    createRoom,
    { loading: createRoomLoading, error: createRoomError },
  ] = useCreateRoom();

  return (
    <div className="absolute min-w-full min-h-screen flex justify-center items-center">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Welcome to</span>
            <span className="block text-blue-700">Proximity Chats!</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
            A website to join chat rooms and only talk with people close to you!
            Move around and get to know everyone!
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
            <div className="rounded-md shadow">
              <a
                onClick={() => createRoom()}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md cursor-pointer text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                {createRoomLoading ? "Loading..." : "Create room"}
              </a>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Link href="/rooms">
                <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md cursor-pointer text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10">
                  Find rooms
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default withApollo(Home);
