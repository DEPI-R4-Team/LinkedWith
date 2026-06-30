import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { StudentSidebar } from "@/components/layout/StudentSidebar";

type StudentDashboardLayoutProps = {
  children?: ReactNode;
};

export function StudentDashboardLayout({ children }: StudentDashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <div className="flex min-h-screen">
        <StudentSidebar />
        <main className="min-w-0 flex-1 bg-[#0f172a]">{children ?? <Outlet />}</main>
      </div>
    </div>
  );
}
