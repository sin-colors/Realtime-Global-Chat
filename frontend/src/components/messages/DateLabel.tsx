import type { MessageType } from "@/lib/types";
import formatDate from "@/utils/formatDate";
import isSameDay from "@/utils/isSameDay";

interface DateLabelProps {
  messages: MessageType[];
  message: MessageType;
  index: number;
}

function DateLabel({ messages, message, index }: DateLabelProps) {
  // 1つ前のメッセージを取得
  const prevMessage = messages[index - 1];
  const showDate =
    !prevMessage || !isSameDay(prevMessage.createdAt, message.createdAt);
  if (!showDate) return null;
  return (
    <div className="my-4 flex justify-center">
      <span className="rounded-full bg-black/20 px-3 py-1 text-xs text-white">
        {formatDate(message.createdAt)}
      </span>
    </div>
  );
}

export default DateLabel;
