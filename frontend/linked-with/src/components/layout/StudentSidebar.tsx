import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CalendarClock,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Plus,
  Search,
  Settings,
  User,
  WalletCards,
} from "lucide-react";
import { cn } from "@/lib/utils";

const primaryItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/student/dashboard" },
  { label: "Create Request", icon: Plus, to: "/student/requests/create" },
  { label: "My Requests", icon: FileText, to: "/student/requests" },
  { label: "Browse Instructors", icon: Search, to: "/student/instructors" },
  { label: "Chat", icon: MessageSquareText, to: "/student/chat" },
  { label: "Sessions", icon: CalendarClock, to: "/student/sessions" },
  { label: "Payments", icon: WalletCards, to: "/student/payments" },
];

const accountItems = [
  { label: "Profile", icon: User, to: "/student/profile" },
  { label: "Settings", icon: Settings, to: "/student/settings" },
];

function isActivePath(pathname: string, to: string) {
  if (to === "/student/requests/create") {
    return pathname === to;
  }

  if (to === "/student/requests") {
    return pathname === to || (pathname.startsWith("/student/requests/") && pathname !== "/student/requests/create");
  }

  return pathname === to || pathname.startsWith(`${to}/`);
}

export function StudentSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <aside className="sticky top-0 hidden h-screen w-[280px] shrink-0 flex-col border-r border-outline-variant bg-surface-container-low px-lg py-lg lg:flex">
      <div className="mb-xl flex items-center gap-sm">
        <div className="flex size-10 items-center justify-center rounded-md bg-primary text-on-primary">
          <GraduationCap className="size-5" />
        </div>
        <div>
          <p className="text-headline-md text-on-surface">EduMatch</p>
          <p className="text-body-sm text-on-surface-variant">Academic Portal</p>
        </div>
      </div>

      <nav className="flex min-h-0 flex-1 flex-col">
        <div className="space-y-xs">
          {primaryItems.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(pathname, item.to);

            return (
              <Link
                className={cn(
                  "flex h-11 w-full items-center gap-sm rounded-md px-md text-body-sm transition",
                  active
                    ? "bg-primary text-on-primary"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
                )}
                key={item.label}
                to={item.to}
              >
                <Icon className="size-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-auto rounded-lg border border-outline-variant bg-surface-container p-sm">
          {accountItems.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(pathname, item.to);

            return (
              <Link
                className={cn(
                  "flex h-11 w-full items-center gap-sm rounded-md px-md text-body-sm transition",
                  active
                    ? "bg-primary text-on-primary"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
                )}
                key={item.label}
                to={item.to}
              >
                <Icon className="size-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <button
            className="mt-xs flex h-11 w-full items-center gap-sm rounded-md px-md text-body-sm text-error/85 transition hover:bg-error/10 hover:text-error"
            onClick={handleLogout}
            type="button"
          >
            <LogOut className="size-4" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
