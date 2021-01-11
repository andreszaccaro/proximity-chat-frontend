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
    <div className="name-selector">
      <p>{`Please type a name to join the room:`}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUser();
        }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" value="submit">
          {loading ? "Loading..." : "Join Room"}
        </button>
      </form>
      <style jsx>{``}</style>
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
    }
  }
`;

export default withApollo(NameSelector);
