import { useSocketContext } from "@/context/SocketContext";
import type { MessageType } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

function useListenReadStatus() {
  const { socket } = useSocketContext();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;
    socket.on(
      "messagesRead",
      ({ userId, messageIds }: { userId: string; messageIds: string[] }) => {
        queryClient.setQueryData<MessageType[]>(["messages"], (oldMessages) => {
          if (!oldMessages) return oldMessages;
          return oldMessages.map((message) => {
            if (messageIds.includes(message._id)) {
              if (!message.readBy.includes(userId)) {
                // readBy に含まれていなければ追加
                return { ...message, readBy: [...message.readBy, userId] };
              }
            }
            return message; // 既読が更新されないメッセージはそのまま返却
          });
        });
      },
    );
    return () => {
      socket.off("messagesRead");
    };
  }, [socket, queryClient]);
}
export default useListenReadStatus;
