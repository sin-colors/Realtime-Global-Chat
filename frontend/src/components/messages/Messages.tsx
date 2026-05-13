import useGetMessages from "@/hooks/useGetMessages";
import Message from "./Message";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import useMarkAsRead from "@/hooks/useMarkAsRead";
import useListenMessage from "@/hooks/useListenMessage";
import useListenReadStatus from "@/hooks/useListenReadStatus";

function Messages() {
  const { data: messages, isLoading, isError } = useGetMessages();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { mutate: markAsRead } = useMarkAsRead();
  useListenMessage();
  useListenReadStatus();
  useEffect(() => {
    if (messages && messages.length > 0) {
      markAsRead();
    }
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages?.length, markAsRead]);
  if (isLoading)
    return (
      <div className="flex h-full w-full flex-1 items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-white" />
      </div>
    );
  if (isError || messages === undefined)
    return (
      <div className="flex h-full w-full flex-1 items-center justify-center px-4">
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
          <Message key={message._id} message={message} />
        ))}
      <div ref={scrollRef} />
    </div>
  );
}

export default Messages;
