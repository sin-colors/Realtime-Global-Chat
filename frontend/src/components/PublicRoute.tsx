import { useAuthContext } from "@/context/AuthContext";
import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

// 未認証のユーザーのみアクセスできるルートを提供するコンポーネント
// このコンポーネントでラップされているルートは未認証のユーザーのみアクセルできる
function PublicRoute({ children }: { children?: ReactNode }) {
  const { authUser } = useAuthContext();
  if (authUser) return <Navigate to={"/"} replace />;
  return (
    <div className="flex h-full w-full items-center justify-center min-[375px]:p-4">
      {children ? children : <Outlet />}
    </div>
  );
}

export default PublicRoute;
