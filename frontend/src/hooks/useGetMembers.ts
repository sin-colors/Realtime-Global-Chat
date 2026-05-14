import { useAuthContext } from "@/context/AuthContext";
import type { UserTypeAtFrontend } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

function useGetMembers() {
  const { authUser } = useAuthContext();
  return useQuery<UserTypeAtFrontend[]>({
    queryKey: ["members"],
    queryFn: async () => {
      const token = localStorage.getItem("chat-jwt");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
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
