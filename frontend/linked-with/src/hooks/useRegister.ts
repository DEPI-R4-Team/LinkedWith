import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { RegisterRole } from "@/types/auth";
import { register } from "@/services/authService";
import { ROUTES } from "@/lib/routes";

export function useRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [role, setRole] = useState<RegisterRole>("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await register({ ...form, role });
      navigate(ROUTES.LOGIN, { replace: true });
    } catch (err: unknown) {
      setError(parseApiError(err));
    } finally {
      setLoading(false);
    }
  }

  return { form, role, setRole, loading, error, handleChange, handleSubmit };
}

function parseApiError(err: unknown): string {
  if (err && typeof err === "object") {
    const e = err as { response?: { data?: { message?: unknown } } };
    if (typeof e.response?.data?.message === "string") {
      return e.response.data.message;
    }
  }
  return "Registration failed. Please try again.";
}
