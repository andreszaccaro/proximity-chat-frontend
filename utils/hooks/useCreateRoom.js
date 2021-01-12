import React from "react";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";

const CreateRoomMutation = gql`
  mutation CreateRoomMutation {
    createRoom {
      __typename
      id
      name
    }
  }
`;

const useCreateRoom = () => {
  const router = useRouter();

  const [createRoomMutation, { loading, error }] = useMutation(
    CreateRoomMutation
  );

  const createRoom = async () => {
    const { data } = await createRoomMutation();
    router.push(`/rooms/${data.createRoom.id}`);
  };

  return [
    createRoom,
    {
      loading,
      error,
    },
  ];
};

export default useCreateRoom;
