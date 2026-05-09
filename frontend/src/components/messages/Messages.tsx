import useGetMessages from "@/hooks/useGetMessages";
import Message from "./Message";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

function Messages() {
  const { data: messages, isLoading, isError } = useGetMessages();
  const messageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      messageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  if (isLoading)
    return (
      <div className="flex-1 overflow-auto px-4">
        <Loader2 className="h-12 w-12 animate-spin text-white" />
      </div>
    );
  if (isError || messages === undefined)
    return (
      <div className="flex h-full flex-1 items-center justify-center overflow-auto px-4">
        <p className="text-red-500">データの読み込みに失敗しました</p>
      </div>
    );
  return (
    <div className="flex-1 overflow-auto px-4">
      {messages.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <p className="text-lg text-white">メッセージはまだありません</p>
        </div>
      )}
      {messages.length > 0 &&
        messages?.map((message) => (
          <div key={message._id} ref={messageRef}>
            <Message message={message} />
          </div>
        ))}
    </div>
  );
}

export default Messages;
