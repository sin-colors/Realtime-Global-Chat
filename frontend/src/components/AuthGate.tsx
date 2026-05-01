import { useAuthContext } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

function AuthGate({ children }: { children: ReactNode }) {
  const { isPending } = useAuthContext();
  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="text-primary h-10 w-10 animate-spin" />
        <span className="ml-2 text-lg font-medium">読み込み中...</span>
      </div>
    );
  }
  return <>{children}</>;
}

export default AuthGate;
