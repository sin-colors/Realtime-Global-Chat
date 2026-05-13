import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AuthGate from "./components/AuthGate";
import MainLayout from "./components/MainLayout";
import Settings from "./pages/settings/Settings";
import ChangeUserNameForm from "./pages/settings/ChangeUserNameForm";

function App() {
  return (
    // 認証情報取得中ならスピナー、認証情報取得完了なら子要素を表示
    <AuthGate>
      <Routes>
        {/* すべてのルートで共通のレイアウト(MainLayout)を適用 */}
        <Route element={<MainLayout />}>
          {/* --- 認証済み専用エリア --- */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />}>
              <Route path="username" element={<ChangeUserNameForm />} />
            </Route>
          </Route>

          {/* --- 未ログイン専用エリア --- */}
          <Route element={<PublicRoute />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </AuthGate>
  );
}

export default App;
