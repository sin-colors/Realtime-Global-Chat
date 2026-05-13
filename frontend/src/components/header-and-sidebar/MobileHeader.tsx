import {
  ChevronDown,
  ChevronUp,
  Loader2,
  Settings as SettingsIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import LogoutButton from "./LogoutButton";
import useGetMembers from "@/hooks/useGetMembers";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function MobileHeader({
  showMessageMenu = false,
}: {
  showMessageMenu?: boolean;
}) {
  const { data: members, isLoading, isError } = useGetMembers();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();
  const isSettingsPage =
    location.pathname === "/settings" ||
    location.pathname === "/settings/username";
  return (
    <header className="mb-2 flex items-center justify-between px-4 py-2">
      {showMessageMenu && (
        <div className="flex items-center gap-6">
          <h1 className="text-xl text-white">というわけで♪</h1>
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} className="text-white">
                メンバー
                {isOpen ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>メンバー一覧</DropdownMenuLabel>
              {isLoading && <Loader2 className="animate-spi h-6 w-6" />}
              {isError && <p>メンバーの読み込みに失敗しました</p>}
              {!isLoading &&
                !isError &&
                members?.map((member) => (
                  <DropdownMenuItem key={member._id}>
                    {member.username}
                  </DropdownMenuItem>
                ))}
              {!isLoading && isError && members?.length === 0 && (
                <p className="text-center">他のユーザーはいません</p>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <div className="flex items-center gap-2">
        {isSettingsPage && (
          <Link to="/">
            <div className="p-2 text-white">チャットに戻る</div>
          </Link>
        )}
        <LogoutButton />
        {!isSettingsPage && (
          <Link to={"/settings"}>
            <SettingsIcon className="h-6 w-6 cursor-pointer text-white" />
          </Link>
        )}
      </div>
    </header>
  );
}

export default MobileHeader;
