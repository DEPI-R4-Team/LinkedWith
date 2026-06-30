import { Link } from "react-router-dom";
import {
  CalendarCheck,
  ClipboardList,
  FileText,
  Star,
} from "lucide-react";
import { NotificationsDropdown } from "@/components/layout/NotificationsDropdown";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";

type Metric = {
  label: string;
  value: string;
  helper: string;
  icon: typeof FileText;
  to: string;
};

const metrics: Metric[] = [
  {
    label: "Available Requests",
    value: "45",
    helper: "+12 this week",
    icon: ClipboardList,
    to: ROUTES.INSTRUCTOR.PROJECTS,
  },
  {
    label: "Pending Applications",
    value: "5",
    helper: "Action required",
    icon: FileText,
    to: ROUTES.INSTRUCTOR.REQUESTS,
  },
  {
    label: "Accepted Sessions",
    value: "3",
    helper: "Upcoming",
    icon: CalendarCheck,
    to: ROUTES.INSTRUCTOR.SESSIONS,
  },
  {
    label: "Average Rating",
    value: "4.9",
    helper: "/ 5.0",
    icon: Star,
    to: ROUTES.INSTRUCTOR.REVIEWS,
  },
];

export function InstructorDashboardPage() {
  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <div className="flex flex-col gap-md lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-headline-lg text-on-surface">
              Welcome, Dr. Smith!
            </h1>
            <p className="mt-xs text-body-sm text-on-surface-variant">
              Here's your academic advisory overview for today.
            </p>
          </div>

          <div className="flex items-center gap-sm">
            <NotificationsDropdown />
            <Link
              to={ROUTES.INSTRUCTOR.PROFILE}
              className="flex size-10 items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant transition hover:bg-surface-container-highest"
              aria-label="View profile"
            >
              <span className="text-body-sm font-medium">DS</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="space-y-lg px-margin-mobile py-lg md:px-margin-desktop">
        <section className="grid gap-md sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <Link
                className={cn(
                  "group rounded-lg border border-outline-variant bg-surface-container p-lg transition",
                  "hover:border-primary/50 hover:bg-surface-container-high",
                )}
                key={metric.label}
                to={metric.to}
              >
                <div className="mb-lg flex items-center justify-between gap-md">
                  <p className="text-label-md uppercase text-on-surface-variant">
                    {metric.label}
                  </p>
                  <div className="rounded-md bg-surface-container-high p-sm text-on-surface-variant">
                    <Icon className="size-5" />
                  </div>
                </div>
                <p className="text-headline-lg text-on-surface">{metric.value}</p>
                <p className="mt-xs text-body-sm text-on-surface-variant">
                  {metric.helper}
                </p>
              </Link>
            );
          })}
        </section>
      </div>
    </>
  );
}
