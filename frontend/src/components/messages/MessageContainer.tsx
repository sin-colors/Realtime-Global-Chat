import MessageInput from "./MessageInput";
import Messages from "./Messages";

function MessageContainer() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1">
        <Messages />
      </div>
      <div className="sticky bottom-0 z-10">
        <MessageInput />
      </div>
    </div>
  );
}

export default MessageContainer;
