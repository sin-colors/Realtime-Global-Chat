import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function useLogout() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      // return response.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
    },
  });
  async function logout() {
    const logoutPromise = mutation.mutateAsync();
    toast.promise(logoutPromise, {
      loading: "ログアウトしています。。。",
      success: "ログアウトしました",
      error: (err) => err.message || "予期せぬエラーが発生しました",
    });
    await logoutPromise;
  }
  return { logout, isLoading: mutation.isPending };
}
export default useLogout;

//--------------------React QueryのuseMutationを使ってリファクタリングする前のコード----------------------
// import { useState } from "react";

// function useLogout() {
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const queryClient = useQueryClient();
//   async function logout() {
//     setIsLoading(true);
//     const logoutPromise = (async () => {
//       try {
//         const response = await fetch("/api/auth/logout", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//         });
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.error);
//         }
//         queryClient.setQueryData(["authUser"], null);
//       } finally {
//         setIsLoading(false);
//       }
//     })();
//     toast.promise(logoutPromise, {
//       loading: "ログアウトしています。。。",
//       success: "ログアウトしました",
//       error: (err) => err.message || "予期せぬエラーが発生しました",
//     });
//     await logoutPromise;
//   }
//   return { logout, isLoading };
// }
// export default useLogout;
