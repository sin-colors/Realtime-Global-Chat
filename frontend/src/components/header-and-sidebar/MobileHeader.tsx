import { ChevronDown, Settings } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import LogoutButton from "./LogoutButton";

function MobileHeader() {
  return (
    <header className="mb-2 flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-6">
        <h1 className="text-xl text-white">というわけで</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="text-white">
              メンバー
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>メンバー一覧</DropdownMenuLabel>
            <DropdownMenuItem>Shingo Inagaki</DropdownMenuItem>
            <DropdownMenuItem>Shingo Inagaki</DropdownMenuItem>
            <DropdownMenuItem>Shingo Inagaki</DropdownMenuItem>
            <DropdownMenuItem>Shingo Inagaki</DropdownMenuItem>
            <DropdownMenuItem>Shingo Inagaki</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-2">
        <LogoutButton />
        <Settings className="h-6 w-6 cursor-pointer text-white" />
      </div>
    </header>
  );
}

export default MobileHeader;
