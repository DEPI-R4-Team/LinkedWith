import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { MainLayout } from "@/components/layouts/MainLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { NotFoundPage } from "@/pages/shared/NotFoundPage";
import { ROUTES } from "@/lib/routes";

export const router = createBrowserRouter([
  // Root → temporary redirect until dashboard pages are ready
  {
    path: ROUTES.HOME,
    element: <Navigate to={ROUTES.LOGIN} replace />,
  },

  // ── Public (guest) ──────────────────────────────────────────────────────
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.REGISTER, element: <RegisterPage /> },
      // { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
    ],
  },

  // ── Protected: Student ──────────────────────────────────────────────────
  {
    element: <ProtectedRoute allowedRoles={["student"]} />,
    children: [
      {
        element: <MainLayout />,
        children: [
          // { path: ROUTES.STUDENT.DASHBOARD, element: <StudentDashboardPage /> },
        ],
      },
    ],
  },

  // ── Protected: Instructor ───────────────────────────────────────────────
  {
    element: <ProtectedRoute allowedRoles={["instructor"]} />,
    children: [
      {
        element: <MainLayout />,
        children: [
          // { path: ROUTES.INSTRUCTOR.DASHBOARD, element: <InstructorDashboardPage /> },
        ],
      },
    ],
  },

  // ── Protected: Admin ────────────────────────────────────────────────────
  {
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        element: <MainLayout />,
        children: [
          // { path: ROUTES.ADMIN.DASHBOARD, element: <AdminDashboardPage /> },
        ],
      },
    ],
  },

  // 404
  { path: "*", element: <NotFoundPage /> },
]);
