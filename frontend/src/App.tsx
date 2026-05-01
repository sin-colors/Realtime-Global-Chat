import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/Login";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AuthGate from "./components/AuthGate";

function App() {
  return (
    <AuthGate>
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
    </AuthGate>
  );
}

export default App;
