import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";

import { UserList } from "./";
import { CloseCreateChannel } from "../assets/CloseCreateChannel";

const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  const handleChange = (e) => {
    e.preventDefault();

    setChannelName(e.target.value);
  };
  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input
        type="text"
        value={channelName}
        onChange={handleChange}
        placeholder="channel-name"
      />
      <p>Add Members</p>
    </div>
  );
};

function CreateChannel({ createType, setIsCreating, filters }) {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setselectedUsers] = useState([client.userID || ""]);
  const [channelName, setChannelName] = useState("");

  console.log(selectedUsers);

  const createChannel = async (e) => {
    e.preventDefault();

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers,
      });
      await newChannel.create();

      setChannelName("");
      setIsCreating(false);
      setselectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-channel__container">
      <div className="create-channel__header">
        <p>
          {createType === "team"
            ? "Create a New Channel"
            : "Send a Direct Message"}
        </p>
        <CloseCreateChannel {...{ setIsCreating }} />
      </div>
      {createType === "team" && (
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
        />
      )}
      <UserList {...{ filters, setselectedUsers }} />
      <div className="create-channel__button-wrapper" onClick={createChannel}>
        <p>
          {createType === "team" ? "Create Channel" : "Create Message Group"}
        </p>
      </div>
    </div>
  );
}

export default CreateChannel;
