import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { InstructorSidebar } from "@/components/layout/InstructorSidebar";

type InstructorDashboardLayoutProps = {
  children?: ReactNode;
};

export function InstructorDashboardLayout({ children }: InstructorDashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <div className="flex min-h-screen">
        <InstructorSidebar />
        <main className="min-w-0 flex-1 bg-[#0f172a]">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
}
