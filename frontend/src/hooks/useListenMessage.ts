import { useSocketContext } from "@/context/SocketContext";
import type { MessageType } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

function useListenMessage() {
  const { socket } = useSocketContext();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!socket) return;
    socket.on("newMessage", (newMessage: MessageType) => {
      queryClient.setQueryData<MessageType[]>(["messages"], (oldMessages) => {
        const isExisted = oldMessages?.find(
          (message) => message._id === newMessage._id,
        );
        if (isExisted) return oldMessages;
        return [...(oldMessages || []), newMessage];
      });
    });
    return () => {
      socket.off("newMessage");
    };
  }, [queryClient, socket]);
}
export default useListenMessage;
