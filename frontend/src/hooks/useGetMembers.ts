import { useAuthContext } from "@/context/AuthContext";
import type { MemberType } from "@/lib/types/user";
import { useQuery } from "@tanstack/react-query";

function useGetMembers() {
  const { authUser } = useAuthContext();
  return useQuery<MemberType[]>({
    queryKey: ["members"],
    queryFn: async () => {
      const response = await fetch("/api/users");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "ユーザーの取得に失敗しました");
      }
      return response.json();
    },
    enabled: !!authUser,
  });
}
export default useGetMembers;
