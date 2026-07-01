import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { Location } from "react-router-dom";
import axios from "axios";
import type { LoginCredentials } from "@/types/auth";
import { getDashboardPath, useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/lib/routes";

export function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from =
    (location.state as { from?: Location } | null)?.from?.pathname ?? ROUTES.HOME;
  const successMessage =
    (location.state as { message?: string } | null)?.message ?? null;

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
      const { user } = await login(credentials);
      navigate(from !== ROUTES.LOGIN && from !== ROUTES.HOME ? from : getDashboardPath(user.role), {
        replace: true,
      });
    } catch (err: unknown) {
      setError(parseApiError(err));
    } finally {
      setLoading(false);
    }
  }

  return { credentials, loading, error, successMessage, handleChange, handleSubmit };
}

function parseApiError(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (!err.response) {
      return "Cannot connect to server. Check VITE_API_BASE_URL and make sure the backend is running.";
    }

    const detail = (err.response.data as { detail?: unknown })?.detail;
    if (typeof detail === "string") {
      return detail;
    }
  }

  return "Invalid credentials. Please try again.";
}
