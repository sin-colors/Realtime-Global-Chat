import { useMutation, useQueryClient } from "@tanstack/react-query";

function useMarkAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("chat-jwt");
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages/read`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
}
export default useMarkAsRead;
