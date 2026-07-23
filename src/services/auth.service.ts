import apiFetch from "./api";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthResponse {
  success: boolean;
  data: AdminUser;
}

export const login = (email: string, password: string) =>
  apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const logout = () =>
  apiFetch<{ success: boolean }>("/auth/logout", { method: "POST" });

export const getMe = () => apiFetch<AuthResponse>("/auth/me");
