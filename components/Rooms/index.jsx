import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";

import { withApollo } from "../../apollo/client";

const Rooms = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(RoomsQuery);
  const [createRoomMutation, { loading: mutationLoading }] = useMutation(
    CreateRoomMutation
  );

  const createRoom = async () => {
    const { data } = await createRoomMutation();
    router.push(`/rooms/${data.createRoom.id}`);
  };

  return (
    <div className="rooms">
      <button onClick={() => createRoom()}>
        {mutationLoading ? "Loading..." : "Create Room"}
      </button>
      <p>This page will contain a list with all existing rooms.</p>
      {data &&
        data.rooms.map((room, key) => (
          <React.Fragment key={key}>
            <Link href={`/rooms/${room.id}`}>
              <a>{`Room ${key}: ${room.id}`}</a>
            </Link>
            <br />
          </React.Fragment>
        ))}
      <style jsx>{``}</style>
    </div>
  );
};

const RoomsQuery = gql`
  query RoomsQuery {
    rooms {
      __typename
      id
      users {
        name
      }
    }
  }
`;

const CreateRoomMutation = gql`
  mutation CreateRoomMutation {
    createRoom {
      __typename
      id
    }
  }
`;

export default withApollo(Rooms);
