import React from "react";
import { useRouter } from "next/router";

import { withApollo } from "../../apollo/client";

const ChatRoom = () => {
  const router = useRouter();
  const roomId = router.query.id;

  return (
    <div className="chat-room">
      <p>{`This page will contain the chatbox for the room ID ${roomId}`}</p>
      <style jsx>{``}</style>
    </div>
  );
};

export default withApollo(ChatRoom);
