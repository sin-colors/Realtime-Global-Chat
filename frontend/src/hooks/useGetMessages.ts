import { useAuthContext } from "@/context/AuthContext";
import type { MessageType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

function useGetMessages() {
  const { authUser } = useAuthContext();
  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const token = localStorage.getItem("chat-jwt");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/messages`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const data = await response.json();
      return data as MessageType[];
    },
    enabled: !!authUser,
    refetchOnWindowFocus: false, // 画面を切り替えた時の自動更新を抑止
  });
}
export default useGetMessages;
