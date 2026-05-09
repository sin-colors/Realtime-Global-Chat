import type { MessageType } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuthContext } from "@/context/AuthContext";

interface MessageComponentProps {
  message: MessageType;
}

function Message({ message }: MessageComponentProps) {
  const { authUser } = useAuthContext();
  const fromMe = message.senderId._id === authUser?._id;
  const bubbleBgColor = fromMe ? "bg-lime-200" : "bg-rose-200";
  return (
    <>
      {fromMe ? (
        <div className="mb-4 flex w-full items-end justify-end gap-2">
          <div className="flex shrink-0 flex-col items-end gap-1 text-xs text-white/70">
            <span>既読</span>
            <span>{message.createdAt}</span>
          </div>
          <div
            className={`max-w-[70%] rounded-2xl ${bubbleBgColor} px-4 py-2 text-zinc-900`}
          >
            <p className="wrap-break-word">{message.text}</p>
          </div>
        </div>
      ) : (
        <div className="mb-4 flex w-full items-start gap-2 text-zinc-900">
          <Avatar>
            <AvatarImage
              src={message.senderId.profilePic}
              alt={`${message.senderId.username}のアバター`}
            />
            <AvatarFallback>未</AvatarFallback>
          </Avatar>
          {/* <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <img src="#" alt="avatar" />
        </div> */}
          <div className="flex flex-1 items-end gap-2">
            <div className="flex max-w-[80%] flex-col gap-1 md:max-w-[75%]">
              <p className="text-xs text-white/70">
                {message.senderId.username}
              </p>
              <div
                className={`rounded-2xl ${bubbleBgColor} px-4 py-2 text-zinc-900`}
              >
                <p className="wrap-break-word">{message.text}</p>
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-1 text-xs text-white/70">
              <span>既読</span>
              <span>{message.createdAt}</span>
            </div>
            {/* <span className="px-1 text-[10px] opacity-50">12:33</span> */}
          </div>
        </div>
      )}
    </>
  );
}

export default Message;
