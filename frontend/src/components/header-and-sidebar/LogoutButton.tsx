import useLogout from "@/hooks/useLogout";
import { Loader2, LogOut } from "lucide-react";

function LogoutButton() {
  const { logout, isLoading } = useLogout();
  return (
    <div className="mt-auto">
      {isLoading ? (
        <Loader2 className="h-6 w-6 animate-spin text-white" />
      ) : (
        <LogOut
          onClick={logout}
          className="h-6 w-6 cursor-pointer text-white"
        />
      )}
    </div>
  );
}

export default LogoutButton;
