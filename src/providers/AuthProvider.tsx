import { AuthContext } from "@/contexts/AuthContext";
import { AuthState, AuthUser } from "@/types/auth";
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "auth"; // prototype only

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Prototype persistence (DON'T store real tokens like this in production)
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as AuthState;
      setUser(parsed.user ?? null);
      setToken(parsed.token ?? null);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const login = (next: AuthState) => {
    setUser(next.user ?? null);
    setToken(next.token ?? null);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(() => ({ user, token, login, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
