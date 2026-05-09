import type { MemberType } from "@/lib/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface MemberProps {
  user: MemberType;
}

function Member({ user }: MemberProps) {
  return (
    <>
      <div className="flex items-center gap-3 rounded p-2 py-1">
        <Avatar>
          <AvatarImage src={user.profilePic} alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-bold text-gray-200">{user.username}</p>
        </div>
      </div>
      {/* {!lastIdx && <div className="divider my-0 h-1 py-0"></div>} */}
    </>
  );
}

export default Member;
