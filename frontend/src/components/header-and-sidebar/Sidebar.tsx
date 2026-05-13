import { Settings as SettingsIcon } from "lucide-react";
import LogoutButton from "./LogoutButton";
import Members from "./Members";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ showMessageMenu = false }: { showMessageMenu?: boolean }) {
  const location = useLocation();
  const isSettingsPage = location.pathname === "/settings";
  return (
    <div className="flex flex-col gap-4 border-r border-slate-500 p-4">
      <h1 className="text-xl text-white">というわけで♪</h1>
      {showMessageMenu && <Members />}
      {!showMessageMenu && (
        <Link to="/">
          <div className="p-2 text-white">チャットに戻る</div>
        </Link>
      )}
      <div className="ml-4 flex items-center gap-6">
        <LogoutButton />
        {!isSettingsPage && (
          <Link to={"/settings"}>
            <SettingsIcon className="h-6 w-6 cursor-pointer text-white" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
