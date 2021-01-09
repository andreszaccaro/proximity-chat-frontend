import React, { useState } from "react";

import NameSelectorView from "../../components/Rooms/NameSelector";
import ChatRoomView from "../../components/Rooms/ChatRoom";

const ChatRoom = () => {
  const [userId, setUserId] = useState(false);

  return userId ? (
    <ChatRoomView userId={userId} />
  ) : (
    <NameSelectorView setUserId={setUserId} />
  );
};

export default ChatRoom;
