import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

function MainLayout() {
  return (
    <div className="flex h-screen w-full items-center justify-center md:p-4">
      <Toaster position="top-center" richColors closeButton />
      <Outlet />
    </div>
  );
}

export default MainLayout;
