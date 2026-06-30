import { Outlet } from "react-router-dom";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export function AdminDashboardLayout() {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="min-w-0 flex-1 bg-[#0f172a]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
