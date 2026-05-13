// import type { MessageInputType } from "@/lib/schema/massageSchema";
import type { MessageType, SendMessageProps } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function useSendMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: SendMessageProps) => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/messages/send`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const data = await response.json();
      return data as MessageType;
    },
    // newMessageには送信者の情報がidしかないため、
    // アバターや送信者の名前などがMessageコンポーネントで表示できない
    // oldMessagesには送信者の情報がある。
    // invalidateQueriesを使ってメッセージの再取得を行うのがバグがなくて良いと思われる

    // onSuccess: (newMessage) => {
    //   console.log(newMessage);
    //   queryClient.setQueryData<MessageType[]>(["messages"], (oldMessages) => [
    //     ...(oldMessages || []),
    //     newMessage,
    //   ]);
    // },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (err) => {
      const errorData =
        err instanceof Error ? err.message : "メッセージの送信に失敗しました！";
      toast.error(errorData);
    },
  });
}
export default useSendMessage;
