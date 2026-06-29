import type { AuthResponse, LoginCredentials, RegisterCredentials } from "@/types/auth";
import { axiosInstance } from "@/lib/axios";

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const { data } = await axiosInstance.post<AuthResponse>("/auth/login", credentials);
  return data;
}

export async function register(credentials: RegisterCredentials): Promise<AuthResponse> {
  const { data } = await axiosInstance.post<AuthResponse>("/auth/register", credentials);
  return data;
}
