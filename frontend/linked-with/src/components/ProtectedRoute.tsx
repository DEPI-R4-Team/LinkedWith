import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { UserRole } from "@/types/user";
import { ROUTES } from "@/lib/routes";

type Props = {
  allowedRoles?: UserRole[];
};

function getStoredUser(): { role: UserRole } | null {
  try {
    const raw = localStorage.getItem("user");
    return raw ? (JSON.parse(raw) as { role: UserRole }) : null;
  } catch {
    return null;
  }
}

export function ProtectedRoute({ allowedRoles }: Props) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const user = getStoredUser();

  if (!token || !user) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
}
