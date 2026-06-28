export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  STUDENT: {
    ROOT: "/student",
    DASHBOARD: "/student/dashboard",
  },
  INSTRUCTOR: {
    ROOT: "/instructor",
    DASHBOARD: "/instructor/dashboard",
  },
  ADMIN: {
    ROOT: "/admin",
    DASHBOARD: "/admin/dashboard",
  },
} as const;
