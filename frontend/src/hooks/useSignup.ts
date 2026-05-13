import type { RegisterType } from "@/lib/schema/authSchema";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function useSignup() {
  const queryClient = useQueryClient();
  async function signup(values: RegisterType) {
    const registerPromise = (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(values),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const signupData = await response.json();
      // UIにログイン状態を反映するためコンテキストの値を更新する
      // プロジェクトの設定として、コンテキストのauthUserが
      // null → 未ログイン、userオブジェクト → ログイン済み
      queryClient.setQueryData(["authUser"], signupData);
      return signupData;
    })();
    toast.promise(registerPromise, {
      loading: "登録しています。。。",
      success: (data) => `${data.username}さんの登録が完了しました`,
      error: (err) =>
        err.message || "ユーザー登録中に予期せぬエラーが発生しました",
    });
    await registerPromise;
  }
  return { signup };
}
export default useSignup;
