import { Separator } from "../ui/separator";

interface UnreadLabelProps {
  messageId: string;
  firstUnreadId: string;
}
function UnreadLabel({ messageId, firstUnreadId }: UnreadLabelProps) {
  // console.log("messageId: ", messageId);
  // console.log("firstUnreadId: ", firstUnreadId);
  // if (firstUnreadId === null) return null;
  if (messageId !== firstUnreadId) return null;
  return (
    // <div className="my-2 ml-6 flex items-center justify-start">
    //   <span className="rounded-full bg-blue-300/70 px-10 py-1 text-xs tracking-wider text-white">
    //     ここから未読
    //   </span>
    // </div>
    <div className="relative my-6 ml-6 flex items-center justify-center">
      <Separator className="bg-blue-300/70" />
      <span className="absolute rounded-full bg-blue-300 px-10 py-1 text-xs tracking-wider text-white">
        ここから未読
      </span>
    </div>
  );
}

export default UnreadLabel;
