import { useGetAuthUser } from "@/hooks/useGetAuthUser";
import { createContext, useContext, type ReactNode } from "react";

interface AuthUserType {
  _id: string;
  username: string;
  gender: "male" | "female";
  profilePic: string;
}

interface AuthContextType {
  authUser: AuthUserType | null | undefined;
  isPending: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const { data: authUser, isPending } = useGetAuthUser();
  return (
    <AuthContext.Provider value={{ authUser, isPending }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error(
      "useAuthContext は AuthContextProvider 内で使用する必要があります",
    );
  return context;
}
