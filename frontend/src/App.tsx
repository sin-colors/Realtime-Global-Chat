import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/Login";
import { useAuthContext } from "./context/AuthContext";
import { Loader2 } from "lucide-react";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  const { isPending } = useAuthContext();

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="text-primary h-10 w-10 animate-spin" />
        <span className="ml-2 text-lg font-medium">読み込み中...</span>
      </div>
    );
  }
  return (
    <div className="flex h-screen w-full items-center justify-center md:p-4">
      <Toaster position="top-center" richColors closeButton />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
