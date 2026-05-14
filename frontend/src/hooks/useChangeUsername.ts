import type { ChangeUsernameType } from "@/lib/schema/userSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function useChangeUsername() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: ChangeUsernameType) => {
      const token = localStorage.getItem("chat-jwt");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/change-username`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error ||
            `ユーザー名の変更に失敗しました(Status: ${response.status})`,
        );
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("ユーザー名を変更しました");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err) => {
      const errorData = err instanceof Error ? err.message : String(err);
      toast.error(errorData);
    },
  });
}
export default useChangeUsername;
