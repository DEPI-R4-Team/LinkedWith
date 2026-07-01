import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { RegisterRole } from "@/types/auth";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/lib/routes";

export function useRegister() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    educationLevel: "",
    specialization: "",
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

    if (!form.fullName.trim() || !form.email.trim() || !form.password || !form.confirmPassword) {
      setError("Full name, email, password, and confirm password are required.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await register({
        full_name: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
        role,
        phone: form.phone.trim() || undefined,
        education_level: role === "student" ? form.educationLevel.trim() || undefined : undefined,
        specialization: role === "instructor" ? form.specialization.trim() || undefined : undefined,
      });
      navigate(ROUTES.LOGIN, {
        replace: true,
        state: { message: "Account created. You can now log in." },
      });
    } catch (err: unknown) {
      setError(parseApiError(err));
    } finally {
      setLoading(false);
    }
  }

  return { form, role, setRole, loading, error, handleChange, handleSubmit };
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

  return "Registration failed. Please try again.";
}
