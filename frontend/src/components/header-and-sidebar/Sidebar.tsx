import { Settings } from "lucide-react";
import LogoutButton from "./LogoutButton";
import Members from "./Members";

function Sidebar() {
  return (
    <div className="flex flex-col gap-4 border-r border-slate-500 p-4">
      <h1 className="text-xl text-white">というわけで♪</h1>
      <Members />
      <div className="ml-4 flex items-center gap-6">
        <LogoutButton />
        <Settings className="h-6 w-6 cursor-pointer text-white" />
      </div>
    </div>
  );
}

export default Sidebar;
