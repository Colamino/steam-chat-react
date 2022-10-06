import "stream-chat-react/dist/css/index.css";
import "./App.css";
import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChanellListContainer, ChannelContainer, Auth } from "./components";

const cookies = new Cookies();

const apiKey = "zk4gnt6jhnkf";

const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser(
    {
      id: cookies.get("userId"),
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      image: cookies.get("avatarURL"),
      phoneNumber: cookies.get("phoneNumber"),
      hashedPassword: cookies.get("hashedPassword"),
    },
    authToken
  );
}

function App() {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!authToken) return <Auth />;
  return (
    <>
      <div className="app__wrapper">
        <Chat client={client} theme="team light">
          <ChanellListContainer
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
          />
          <ChannelContainer
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            createType={createType}
          />
        </Chat>
      </div>
    </>
  );
}

export default App;
