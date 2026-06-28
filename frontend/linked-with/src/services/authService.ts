import type { AuthResponse, LoginCredentials } from "@/types/auth";
import { axiosInstance } from "@/lib/axios";

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const { data } = await axiosInstance.post<AuthResponse>("/auth/login", credentials);
  return data;
}
