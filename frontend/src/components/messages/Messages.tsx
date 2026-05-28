import useGetMessages from "@/hooks/useGetMessages";
import Message from "./Message";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useMarkAsRead from "@/hooks/useMarkAsRead";
import useListenMessage from "@/hooks/useListenMessage";
import useListenReadStatus from "@/hooks/useListenReadStatus";
import DateLabel from "./DateLabel";
import { useAuthContext } from "@/context/AuthContext";
import UnreadLabel from "./UnreadLabel";
import type { MessageType } from "@/lib/types";

function Messages() {
  const { data: messages, isLoading, isError } = useGetMessages();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { mutate: markAsRead } = useMarkAsRead();
  useListenMessage();
  useListenReadStatus();
  // 自分のIDを取得するため
  const { authUser } = useAuthContext();
  const messagesRef = useRef<MessageType[]>(messages);
  // --- ポイント1: messages の最新状態を常に Ref に同期する ---
  // これにより、Effect内で messages の中身を参照しても、
  // 依存配列に messages を入れる必要がなくなります（Refは依存配列に不要なため）
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);
  // 「ここから未読」を表示するメッセージのIDを保持する
  const [firstUnreadId, setFirstUnreadId] = useState<string | null>(null);
  // 初回ロード済み（コンポーネントがマウント済み）かどうかを判定するフラグ
  const [hasInitializedUnread, setHasInitializedUnread] =
    useState<boolean>(false);

  // --- ポイント2: 「ロード完了」というイベントをきっかけにする ---
  useEffect(() => {
    // 依存配列にある isLoading が false になった瞬間、かつ未初期化の時だけ実行
    if (
      !isLoading &&
      messagesRef.current &&
      messagesRef.current.length > 0 &&
      !hasInitializedUnread &&
      authUser
    ) {
      const firstUnread = messagesRef.current.find(
        (message) => !message.readBy.includes(authUser._id),
      );
      if (firstUnread) {
        setFirstUnreadId(firstUnread._id);
      }
      setHasInitializedUnread(true);
    }
  }, [isLoading, hasInitializedUnread, authUser]);
  // ↑ messages を入れていないので、リンターの警告は出ない！
  // なぜなら、messagesRef.current を使っているから。

  // --- ポイント3: 既読処理とスクロール ---
  useEffect(() => {
    if (!isLoading && messagesRef.current && messagesRef.current.length > 0) {
      markAsRead();
    }
    const timeoutId = setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [isLoading, messages?.length, markAsRead]);
  // ↑messages.lengthを依存配列に含めないとアプリケーションを開いている状態で
  // 新たにメッセージを受信したときに既読処理やスクロールが発生しない
  // メッセージが追加されたときに実行したい処理なので依存配列にmessages.length（メッセージの数）を含める

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
        messages?.map((message, idx) => (
          <div key={message._id}>
            <DateLabel messages={messages} message={message} index={idx} />
            {firstUnreadId !== null && (
              <UnreadLabel
                messageId={message._id}
                firstUnreadId={firstUnreadId}
              />
            )}
            <Message message={message} />
          </div>
        ))}
      <div ref={scrollRef} />
    </div>
  );
}

export default Messages;
