import useGetMembers from "@/hooks/useGetMembers";
import Member from "./Member";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

function Members() {
  const { data: members, isLoading, isError } = useGetMembers();
  if (isLoading) return <Loader2 className="h-6 w-6 animate-spin text-white" />;
  if (isError) return toast.error("メンバーの読み込みに失敗しました");
  return (
    <div className="flex flex-col overflow-auto py-2">
      {members?.map((member) => (
        <Member key={member._id} user={member} />
      ))}
      {members?.length === 0 && (
        <p className="text-center text-white">他のユーザーはいません</p>
      )}
    </div>
  );
}

export default Members;
