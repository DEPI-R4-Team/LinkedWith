import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { StudentDashboardLayout } from "@/components/layout/StudentDashboardLayout";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { MainLayout } from "@/components/layouts/MainLayout";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { ROUTES } from "@/lib/routes";

// Suspense in main.tsx shows LoadingScreen while lazy chunks load.
const HomePage = lazy(() => import("@/pages/public/HomePage").then((m) => ({ default: m.HomePage })));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage").then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage").then((m) => ({ default: m.RegisterPage })));
const NotFoundPage = lazy(() => import("@/pages/shared/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));
const StudentDashboardPage = lazy(() => import("@/pages/student/StudentDashboardPage").then((m) => ({ default: m.StudentDashboardPage })));
const StudentRequestsPage = lazy(() => import("@/pages/student/StudentRequestsPage").then((m) => ({ default: m.StudentRequestsPage })));
const RequestDetailsPage = lazy(() => import("@/pages/student/RequestDetailsPage").then((m) => ({ default: m.RequestDetailsPage })));
const CreateRequestPage = lazy(() => import("@/pages/student/CreateRequestPage").then((m) => ({ default: m.CreateRequestPage })));
const BrowseInstructorsPage = lazy(() => import("@/pages/student/BrowseInstructorsPage").then((m) => ({ default: m.BrowseInstructorsPage })));
const InstructorProfilePage = lazy(() => import("@/pages/student/InstructorProfilePage").then((m) => ({ default: m.InstructorProfilePage })));
const ChatPage = lazy(() => import("@/pages/student/ChatPage").then((m) => ({ default: m.ChatPage })));
const SessionsPage = lazy(() => import("@/pages/student/SessionsPage").then((m) => ({ default: m.SessionsPage })));
const SessionDetailsPage = lazy(() => import("@/pages/student/SessionDetailsPage").then((m) => ({ default: m.SessionDetailsPage })));
const PaymentsPage = lazy(() => import("@/pages/student/PaymentsPage").then((m) => ({ default: m.PaymentsPage })));
const PaymentConfirmationPage = lazy(() => import("@/pages/student/PaymentConfirmationPage").then((m) => ({ default: m.PaymentConfirmationPage })));
const ProfilePage = lazy(() => import("@/pages/student/ProfilePage").then((m) => ({ default: m.ProfilePage })));
const StudentSettingsPage = lazy(() => import("@/pages/student/StudentSettingsPage").then((m) => ({ default: m.StudentSettingsPage })));

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [{ path: ROUTES.HOME, element: <HomePage /> }],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.REGISTER, element: <RegisterPage /> },
    ],
  },
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
  { path: "*", element: <NotFoundPage /> },
]);
