import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { MainLayout } from "@/components/layouts/MainLayout";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ROUTES } from "@/lib/routes";

// Lazy-loaded pages — each becomes its own JS chunk.
// Suspense in main.tsx catches these and shows LoadingScreen.
const HomePage     = lazy(() => import("@/pages/public/HomePage").then((m) => ({ default: m.HomePage })));
const LoginPage    = lazy(() => import("@/pages/auth/LoginPage").then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage").then((m) => ({ default: m.RegisterPage })));
const NotFoundPage = lazy(() => import("@/pages/shared/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));

export const router = createBrowserRouter([
  // ── Public (landing + marketing) ────────────────────────────────────────
  {
    element: <PublicLayout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
    ],
  },

  // ── Auth (no navbar/footer) ──────────────────────────────────────────────
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.LOGIN,    element: <LoginPage /> },
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
