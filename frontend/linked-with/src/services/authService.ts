import type { AuthResponse, LoginCredentials, RegisterCredentials } from "@/types/auth";

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  // TODO: Replace with real backend call in a later phase
  // const { data } = await axiosInstance.post<AuthResponse>("/auth/login", credentials);
  // return data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: "mock-jwt-token",
        user: {
          id: "1",
          email: credentials.email,
          // Infer role based on email for testing, or default to student
          role: credentials.email.includes("instructor") ? "instructor" : "student",
        },
      });
    }, 500);
  });
}

export async function register(credentials: RegisterCredentials): Promise<AuthResponse> {
  // TODO: Replace with real backend call in a later phase
  // const { data } = await axiosInstance.post<AuthResponse>("/auth/register", credentials);
  // return data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: "mock-jwt-token",
        user: {
          id: "1",
          email: credentials.email,
          role: credentials.role,
        },
      });
    }, 500);
  });
}
