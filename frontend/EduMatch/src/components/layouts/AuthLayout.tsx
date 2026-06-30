import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="animate-fade-in">
      <Outlet />
    </div>
  );
}
