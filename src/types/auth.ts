export type AuthUser = { id: string; name?: string; subscription: number };
export type AuthState = { user: AuthUser | null; token?: string | null };
