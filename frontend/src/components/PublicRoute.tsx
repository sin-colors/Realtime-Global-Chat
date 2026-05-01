import { useAuthContext } from "@/context/AuthContext";
import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoute({ children }: { children?: ReactNode }) {
  const { authUser } = useAuthContext();
  if (authUser) return <Navigate to={"/"} replace />;
  return children ? children : <Outlet />;
}

export default PublicRoute;
