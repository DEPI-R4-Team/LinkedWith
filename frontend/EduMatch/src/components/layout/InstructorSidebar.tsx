import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CalendarClock,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Settings,
  Star,
  User,
  Wallet,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/routes";
import { useAuth } from "@/hooks/useAuth";

const primaryItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: ROUTES.INSTRUCTOR.DASHBOARD },
  { label: "Requests", icon: FileText, to: ROUTES.INSTRUCTOR.REQUESTS },
  { label: "Instant Requests", icon: Zap, to: ROUTES.INSTRUCTOR.INSTANT_REQUESTS },
  { label: "Sessions", icon: CalendarClock, to: ROUTES.INSTRUCTOR.SESSIONS },
  { label: "Chat", icon: MessageSquareText, to: ROUTES.INSTRUCTOR.CHAT },
  { label: "Wallet", icon: Wallet, to: ROUTES.INSTRUCTOR.WALLET },
  { label: "Reviews", icon: Star, to: ROUTES.INSTRUCTOR.REVIEWS },
];

const accountItems = [
  { label: "Profile", icon: User, to: ROUTES.INSTRUCTOR.PROFILE },
  { label: "Settings", icon: Settings, to: ROUTES.INSTRUCTOR.SETTINGS },
];

function isActivePath(pathname: string, to: string) {
  if (to === ROUTES.INSTRUCTOR.DASHBOARD) {
    return pathname === to;
  }

  return pathname === to || pathname.startsWith(`${to}/`);
}

export function InstructorSidebar() {
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
          <p className="max-w-[180px] truncate text-body-sm text-on-surface-variant">
            {user?.full_name ?? "Academic Portal"}
          </p>
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
