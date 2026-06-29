import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { Location } from "react-router-dom";
import type { LoginCredentials } from "@/types/auth";
import type { UserRole } from "@/types/user";
import { login } from "@/services/authService";
import { ROUTES } from "@/lib/routes";

export function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: Location } | null)?.from?.pathname ?? ROUTES.HOME;

  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { token, user } = await login(credentials);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      const roleDestination: Record<UserRole, string> = {
        student: ROUTES.STUDENT.DASHBOARD,
        instructor: ROUTES.INSTRUCTOR.DASHBOARD,
        admin: ROUTES.ADMIN.DASHBOARD,
      };
      navigate(from !== ROUTES.LOGIN && from !== ROUTES.HOME ? from : roleDestination[user.role], {
        replace: true,
      });
    } catch (err: unknown) {
      setError(parseApiError(err));
    } finally {
      setLoading(false);
    }
  }

  return { credentials, loading, error, handleChange, handleSubmit };
}

function parseApiError(err: unknown): string {
  if (err && typeof err === "object") {
    const e = err as { response?: { data?: { message?: unknown } } };
    if (typeof e.response?.data?.message === "string") {
      return e.response.data.message;
    }
  }
  return "Invalid credentials. Please try again.";
}
