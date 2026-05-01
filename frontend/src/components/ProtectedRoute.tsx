import { useAuthContext } from "@/context/AuthContext";
import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ children }: { children?: ReactNode }) {
  const { authUser } = useAuthContext();
  if (!authUser) return <Navigate to={"/login"} replace />;
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
