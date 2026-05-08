import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function Member() {
  return (
    <>
      <div className="flex items-center gap-3 rounded p-2 py-1 hover:bg-sky-500">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-bold text-gray-200">山田太郎</p>
        </div>
      </div>
      {/* {!lastIdx && <div className="divider my-0 h-1 py-0"></div>} */}
    </>
  );
}

export default Member;
