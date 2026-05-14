import type { LoginType } from "@/lib/schema/authSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function useLogin() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: LoginType) => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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

  async function login(values: LoginType) {
    const loginPromise = mutation.mutateAsync(values);
    toast.promise(loginPromise, {
      loading: "ログインしています。。。",
      success: "ログインしました",
      error: (err) => err.message || "予期せぬエラーが発生しました",
    });
    await loginPromise;
  }
  return { login, isLoading: mutation.isPending };
}
export default useLogin;

//-----------React QueryのuseMutationを使ってリファクタリングする前のコード------------------

// import type { LoginType } from "@/lib/schema/authSchema";
// import { useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";

// function useLogin() {
//   const queryClient = useQueryClient();
//   async function login(values: LoginType) {
//     const loginPromise = (async () => {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error);
//       }
//       const loginData = await response.json();
//       queryClient.setQueryData(["authUser"], loginData);
//     })();
//     toast.promise(loginPromise, {
//       loading: "ログインしています。。。",
//       success: "ログインしました",
//       error: (err) => err.message || "予期せぬエラーが発生しました",
//     });
//     await loginPromise;
//   }
//   return { login };
// }
// export default useLogin;
