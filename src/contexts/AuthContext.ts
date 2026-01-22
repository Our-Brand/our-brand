import { AuthState, AuthUser } from "@/types/auth";
import { createContext } from "react";

export const AuthContext = createContext<{
  user: AuthUser | null;
  token: string | null;
  login: (next: AuthState) => void;
  logout: () => void;
}>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});
