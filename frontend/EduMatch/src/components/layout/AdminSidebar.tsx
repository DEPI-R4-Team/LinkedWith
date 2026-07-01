import { Link, useLocation, useNavigate } from "react-router-dom";
import { ClipboardList, GraduationCap, LayoutDashboard, LogOut, MessageSquareQuote, ReceiptText, Users, Video } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";

const items = [
  { label: "Dashboard", icon: LayoutDashboard, to: ROUTES.ADMIN.DASHBOARD },
  { label: "Users", icon: Users, to: ROUTES.ADMIN.USERS },
  { label: "Requests", icon: ClipboardList, to: ROUTES.ADMIN.REQUESTS },
  { label: "Sessions", icon: Video, to: ROUTES.ADMIN.SESSIONS },
  { label: "Payments", icon: ReceiptText, to: ROUTES.ADMIN.PAYMENTS },
  { label: "Reviews", icon: MessageSquareQuote, to: ROUTES.ADMIN.REVIEWS },
];

export function AdminSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  function handleLogout() {
    logout();
    navigate(ROUTES.LOGIN);
  }

  return (
    <aside className="sticky top-0 hidden h-screen w-[280px] shrink-0 flex-col border-r border-outline-variant bg-surface-container-low px-lg py-lg lg:flex">
      <div className="mb-xl flex items-center gap-sm">
        <div className="flex size-10 items-center justify-center rounded-md bg-primary text-on-primary">
          <GraduationCap className="size-5" />
        </div>
        <div>
          <p className="text-headline-md text-on-surface">EduMatch</p>
          <p className="max-w-[180px] truncate text-body-sm text-on-surface-variant">{user?.full_name ?? "Admin Console"}</p>
        </div>
      </div>

      <nav className="flex min-h-0 flex-1 flex-col">
        <div className="space-y-xs">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                className={cn("flex h-11 w-full items-center gap-sm rounded-md px-md text-body-sm transition", active ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface")}
                key={item.label}
                to={item.to}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <button className="mt-auto flex h-11 w-full items-center gap-sm rounded-md px-md text-body-sm text-error/85 transition hover:bg-error/10 hover:text-error" onClick={handleLogout} type="button">
          <LogOut className="size-4" />
          Logout
        </button>
      </nav>
    </aside>
  );
}
