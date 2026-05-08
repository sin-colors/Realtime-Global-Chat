import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function Message() {
  // const fromMe = true;
  // const bubbleBgColor = fromMe ? "bg-lime-200" : "bg-rose-200";
  return (
    <>
      <div className="mb-4 flex w-full items-start gap-2 text-zinc-900">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {/* <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <img src="#" alt="avatar" />
        </div> */}
        <div className="flex flex-1 items-end gap-2">
          <div className="flex max-w-[80%] flex-col gap-1 md:max-w-[75%]">
            <p className="text-xs text-white/70">Shingo Inagaki</p>
            <div className={`rounded-2xl bg-rose-200 px-4 py-2 text-zinc-900`}>
              <p className="wrap-break-word">
                メッセージが長くなっても、左上だけ角を鋭角にすることで、
              </p>
              <p className="wrap-break-word">
                アバターから発信されていることが直感的にわかります。アバターから発信されていることが直感的にわかります。アバターから発信されていることが直感的にわかります。アバターから発信されていることが直感的にわかります。アバターから発信されていることが直感的にわかります。アバターから発信されていることが直感的にわかります。
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-1 text-xs text-white/70">
            <span>既読</span>
            <span>12:33</span>
          </div>
          {/* <span className="px-1 text-[10px] opacity-50">12:33</span> */}
        </div>
      </div>
      <div className="mb-4 flex w-full items-end justify-end gap-2">
        <div className="flex shrink-0 flex-col items-end gap-1 text-xs text-white/70">
          <span>既読</span>
          <span>12:33</span>
        </div>
        <div
          className={`max-w-[70%] rounded-2xl bg-lime-200 px-4 py-2 text-zinc-900`}
        >
          <p className="wrap-break-word">
            メッセージが長くなっても、左上だけ角を鋭角にすることで、
          </p>
          <p>
            アバターから発信されていることが直感的にわかります。アバターから発信されていることが直感的にわかります。アバターから発信されていることが直感的にわかります。アバターから発信されていることが直感的にわかります。アバターから発信されていることが直感的にわかります。アバターから発信されていることが直感的にわかります。
          </p>
        </div>
      </div>
    </>
  );
}

export default Message;
