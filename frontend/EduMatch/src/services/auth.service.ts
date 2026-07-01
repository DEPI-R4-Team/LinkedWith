import { api, AUTH_TOKEN_KEY, AUTH_USER_KEY } from "@/services/api";
import type { AuthResponse, LoginPayload, RegisterPayload, User, UserProfileUpdatePayload } from "@/types/user";

export async function registerUser(data: RegisterPayload): Promise<User> {
  const response = await api.post<User>("/auth/register", data);
  return response.data;
}

export async function loginUser(data: LoginPayload): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/login", data);
  localStorage.setItem(AUTH_TOKEN_KEY, response.data.access_token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.data.user));
  return response.data;
}

export async function getCurrentUser(): Promise<User> {
  const response = await api.get<User>("/auth/me");
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.data));
  return response.data;
}

export async function updateMyProfile(data: UserProfileUpdatePayload): Promise<User> {
  const response = await api.put<User>("/users/me", data);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.data));
  return response.data;
}

export function logoutUser(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}
