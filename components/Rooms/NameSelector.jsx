import React, { useState } from "react";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";

import { withApollo } from "../../apollo/client";

const NameSelector = ({ setUser }) => {
  const router = useRouter();
  const roomId = router.query.id;

  const [name, setName] = useState("");
  const [createUserMutation, { loading }] = useMutation(CreateUserMutation);

  const createUser = async () => {
    const { data } = await createUserMutation({
      variables: {
        roomId,
        name,
      },
    });
    setUser(data.createUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Please choose a nickname
        </h2>
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            createUser();
          }}
        >
          <div className="rounded-md shadow-sm">
            <input
              id="nickname"
              name="nickname"
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Nickname"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? "Loading..." : "Join Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CreateUserMutation = gql`
  mutation CreateUserMutation($roomId: String!, $name: String!) {
    createUser(roomId: $roomId, name: $name) {
      __typename
      id
      name
      positionX
      positionY
      lastMessage
      room {
        __typename
        id
        name
      }
    }
  }
`;

export default withApollo(NameSelector);
