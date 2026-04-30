import { useQuery } from "@tanstack/react-query";

export function useGetAuthUser() {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/users/me");
        if (response.status === 401) return null;
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "ユーザー情報の取得に失敗しました",
          );
        }
        return await response.json();
      } catch (err) {
        const errorData = err instanceof Error ? err.message : String(err);
        console.log("useGetAuthUser関数内でエラーが発生しました", errorData);
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
  });
}
