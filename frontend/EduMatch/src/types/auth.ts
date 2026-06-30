import type { AuthResponse, LoginPayload, RegisterPayload, RegisterRole, User } from "./user";

export type LoginCredentials = LoginPayload;

export type { AuthResponse, RegisterRole };

export interface RegisterCredentials {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: RegisterRole;
  phone: string;
  educationLevel: string;
  specialization: string;
}

export type AuthUser = User;

export type BackendRegisterPayload = RegisterPayload;
