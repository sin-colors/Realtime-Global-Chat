import type { RegisterType } from "@/lib/schema/authSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function useSignup() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: RegisterType) => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem("chat-jwt", data.token);
      queryClient.setQueryData(["authUser"], data);
    },
  });

  async function signup(values: RegisterType) {
    const registerPromise = mutation.mutateAsync(values);
    toast.promise(registerPromise, {
      loading: "登録しています。。。",
      success: (data) => `${data.username}さんの登録が完了しました`,
      error: (err) =>
        err.message || "ユーザー登録中に予期せぬエラーが発生しました",
    });
    await registerPromise;
  }
  return { signup, isLoading: mutation.isPending };
}
export default useSignup;
