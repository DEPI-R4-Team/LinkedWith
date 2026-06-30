import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <main>
        <Outlet />
      </main>
    </div>
  );
}
