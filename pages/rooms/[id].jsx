import React, { useState } from "react";

import NameSelectorView from "../../components/Rooms/NameSelector";
import ChatRoomView from "../../components/Rooms/ChatRoom";

const ChatRoom = () => {
  const [user, setUser] = useState(false);
  return user ? (
    <ChatRoomView user={user} />
  ) : (
    <NameSelectorView setUser={setUser} />
  );
};

export default ChatRoom;
