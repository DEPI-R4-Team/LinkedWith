import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { MainLayout } from "@/components/layouts/MainLayout";
import { StudentDashboardLayout } from "@/components/layout/StudentDashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { CreateRequestPage } from "@/pages/student/CreateRequestPage";
import { BrowseInstructorsPage } from "@/pages/student/BrowseInstructorsPage";
import { ChatPage } from "@/pages/student/ChatPage";
import { PaymentConfirmationPage } from "@/pages/student/PaymentConfirmationPage";
import { PaymentsPage } from "@/pages/student/PaymentsPage";
import { ProfilePage } from "@/pages/student/ProfilePage";
import { InstructorProfilePage } from "@/pages/student/InstructorProfilePage";
import { RequestDetailsPage } from "@/pages/student/RequestDetailsPage";
import { SessionDetailsPage } from "@/pages/student/SessionDetailsPage";
import { SessionsPage } from "@/pages/student/SessionsPage";
import { StudentSettingsPage } from "@/pages/student/StudentSettingsPage";
import { StudentDashboardPage } from "@/pages/student/StudentDashboardPage";
import { StudentRequestsPage } from "@/pages/student/StudentRequestsPage";
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
        element: <StudentDashboardLayout />,
        children: [
          { path: ROUTES.STUDENT.DASHBOARD, element: <StudentDashboardPage /> },
          { path: ROUTES.STUDENT.REQUESTS, element: <StudentRequestsPage /> },
          { path: ROUTES.STUDENT.REQUEST_DETAILS, element: <RequestDetailsPage /> },
          { path: ROUTES.STUDENT.REQUEST_CREATE, element: <CreateRequestPage /> },
          { path: ROUTES.STUDENT.INSTRUCTORS, element: <BrowseInstructorsPage /> },
          { path: ROUTES.STUDENT.INSTRUCTOR_DETAILS, element: <InstructorProfilePage /> },
          { path: ROUTES.STUDENT.CHAT, element: <ChatPage /> },
          { path: ROUTES.STUDENT.SESSIONS, element: <SessionsPage /> },
          { path: ROUTES.STUDENT.SESSION_DETAILS, element: <SessionDetailsPage /> },
          { path: ROUTES.STUDENT.PAYMENTS, element: <PaymentsPage /> },
          { path: ROUTES.STUDENT.PAYMENT_CONFIRMATION, element: <PaymentConfirmationPage /> },
          { path: ROUTES.STUDENT.PROFILE, element: <ProfilePage /> },
          { path: ROUTES.STUDENT.SETTINGS, element: <StudentSettingsPage /> },
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
