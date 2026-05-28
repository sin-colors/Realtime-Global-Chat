import MobileHeader from "@/components/header-and-sidebar/MobileHeader";
import Sidebar from "@/components/header-and-sidebar/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import { Link, Outlet, useLocation } from "react-router-dom";

const settingsPageContent = [{ title: "ユーザー名の変更", path: "username" }];
// const settingsPageContent = ["ユーザー名の変更"];
function Settings() {
  const location = useLocation();
  const { authUser } = useAuthContext();
  const isRootSettings = location.pathname === "/settings";
  return (
    <div className="flex h-screen w-full max-w-4xl flex-col overflow-hidden bg-gray-400/60 bg-clip-padding backdrop-blur-lg backdrop-filter sm:h-112.5 sm:flex-row sm:rounded-lg md:h-137.5">
      <div className="hidden sm:block sm:min-w-48">
        <Sidebar />
      </div>
      <div className="block sm:hidden">
        <MobileHeader />
      </div>
      <div className="flex min-h-full flex-1 items-center justify-center">
        {isRootSettings ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-center gap-4">
              <p className="text-white">
                現在の{authUser?.username}さんのアバター
              </p>
              <Avatar>
                <AvatarImage
                  src={authUser?.profilePic}
                  alt={`${authUser?.username}のアバター`}
                />
                <AvatarFallback>未</AvatarFallback>
              </Avatar>
            </div>
            {settingsPageContent.map((content) => (
              <div key={content.path}>
                <Link to={content.path}>
                  <Button className="relative h-12 rounded-xl border-b-6 border-slate-300 bg-white px-6 font-mono font-bold text-slate-700 shadow-sm transition-all duration-75 hover:bg-slate-50 active:translate-y-1 active:border-b-2">
                    {content.title}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

export default Settings;

// function Settings() {
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center gap-4">
//       {settingsPageContent.map((content) => (
//         <div key={content}>
//           <Button className="relative h-12 rounded-xl border-b-[6px] border-slate-300 bg-white px-6 font-mono font-bold text-slate-700 shadow-sm transition-all duration-75 hover:bg-slate-50 active:translate-y-[4px] active:border-b-[2px]">
//             {content}
//           </Button>
//         </div>
//       ))}
//     </div>
//   );
// }
