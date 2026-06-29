import type { UserRole } from "./user";

export interface LoginCredentials {
  email: string;
  password: string;
}

export type RegisterRole = "student" | "instructor";

export interface RegisterCredentials {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: RegisterRole;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}
