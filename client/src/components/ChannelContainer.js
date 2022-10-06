import React from "react";
import { Channel, useChatContext, MessageSimple } from "stream-chat-react";

import { ChannelInner, CreateChannel, EditChannel } from "./";

function ChannelContainer({
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  createType,
}) {
  const { channel } = useChatContext();

  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel
          createType={createType}
          setIsCreating={setIsCreating}
          isCreating={isCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  const EmptyState = () => (
    <div className="channel-empty__container">
      <p className="channel-empty__first">
        This is the beginning of your chat history.
      </p>
      <p className="channel-empty__second">
        Send messages, attachments, links, emojis, and more!
      </p>
    </div>
  );

  return (
    <div className="channel__container">
      <Channel
        style={{ padding: "2rem" }}
        EmptyStateIndicator={EmptyState}
        Message={(messagesProps, i) => (
          <MessageSimple key={i} {...messagesProps} />
        )}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
}

export default ChannelContainer;
