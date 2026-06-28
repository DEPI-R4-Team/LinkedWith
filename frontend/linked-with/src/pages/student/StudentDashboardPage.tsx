import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  BookOpenCheck,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileText,
  Home,
  Plus,
  Search,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Metric = {
  label: string;
  value: string;
  helper: string;
  icon: typeof FileText;
  tone: "primary" | "cyan" | "amber" | "green";
};

type RequestItem = {
  title: string;
  subject: string;
  status: "open" | "waiting_payment" | "in_session";
  applications: number;
  price: string;
};

type SessionItem = {
  title: string;
  instructor: string;
  time: string;
  status: "ready" | "active";
};

const metrics: Metric[] = [
  {
    label: "Open Requests",
    value: "4",
    helper: "2 new instructor applications",
    icon: FileText,
    tone: "primary",
  },
  {
    label: "Upcoming Sessions",
    value: "3",
    helper: "Next session at 6:30 PM",
    icon: CalendarClock,
    tone: "cyan",
  },
  {
    label: "Held Payments",
    value: "1,250 EGP",
    helper: "Protected until completion",
    icon: CircleDollarSign,
    tone: "amber",
  },
  {
    label: "Completed Lessons",
    value: "18",
    helper: "Average rating given 4.8",
    icon: CheckCircle2,
    tone: "green",
  },
];

const requests: RequestItem[] = [
  {
    title: "Need help with database normalization",
    subject: "Database Systems",
    status: "open",
    applications: 5,
    price: "350 EGP",
  },
  {
    title: "Calculus revision before midterm",
    subject: "Mathematics",
    status: "waiting_payment",
    applications: 3,
    price: "280 EGP",
  },
  {
    title: "React project structure review",
    subject: "Frontend Development",
    status: "in_session",
    applications: 1,
    price: "420 EGP",
  },
];

const sessions: SessionItem[] = [
  {
    title: "Data Modeling Deep Dive",
    instructor: "Dr. Nada Hassan",
    time: "Today, 6:30 PM",
    status: "ready",
  },
  {
    title: "Algorithms Practice",
    instructor: "Omar Khaled",
    time: "Tomorrow, 8:00 PM",
    status: "active",
  },
];

const instructors = [
  { name: "Mariam Adel", field: "Software Engineering", rating: "4.9", price: "300 EGP" },
  { name: "Youssef Samir", field: "Discrete Math", rating: "4.8", price: "240 EGP" },
  { name: "Hana Nabil", field: "UI/UX Foundations", rating: "4.7", price: "260 EGP" },
];

const toneClasses: Record<Metric["tone"], string> = {
  primary: "bg-primary/15 text-primary ring-primary/20",
  cyan: "bg-secondary/15 text-secondary ring-secondary/20",
  amber: "bg-tertiary/15 text-tertiary ring-tertiary/20",
  green: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/20",
};

const statusLabels: Record<RequestItem["status"], string> = {
  open: "Open",
  waiting_payment: "Waiting payment",
  in_session: "In session",
};

const statusClasses: Record<RequestItem["status"], string> = {
  open: "bg-secondary/15 text-secondary",
  waiting_payment: "bg-tertiary/15 text-tertiary",
  in_session: "bg-primary/15 text-primary",
};

export function StudentDashboardPage() {
  const [message, setMessage] = useState("");

  return (
    <>
          <header className="sticky top-0 z-10 border-b border-outline-variant bg-background/90 px-margin-mobile py-md backdrop-blur md:px-margin-desktop">
            <div className="flex flex-col gap-md lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-xs flex items-center gap-sm text-body-sm text-on-surface-variant">
                  <Home className="size-4" />
                  <span>Student</span>
                  <ChevronRight className="size-4" />
                  <span className="text-on-surface">Dashboard</span>
                </div>
                <h1 className="text-headline-lg text-on-surface">Welcome back, Ziad</h1>
                <p className="text-body-sm text-on-surface-variant">
                  Track your learning requests, upcoming sessions, applications, and protected payments.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-sm">
                <Link
                  className="flex h-10 min-w-0 items-center gap-sm rounded-md border border-outline-variant bg-surface-container px-md text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface md:w-72"
                  to="/student/requests"
                >
                  <Search className="size-4 shrink-0" />
                  <span className="truncate text-body-sm">Search requests, instructors...</span>
                </Link>
                <Button className="h-10 bg-primary px-md text-on-primary hover:bg-primary/90" render={<Link to="/student/requests/create" />}>
                  <Plus className="size-4" />
                  New Request
                </Button>
                <Button
                  aria-label="Notifications"
                  className="h-10 border-outline-variant bg-surface-container text-on-surface hover:bg-surface-container-high"
                  onClick={() => setMessage("Notifications are a placeholder for the academic version.")}
                  size="icon"
                  variant="outline"
                >
                  <Bell className="size-4" />
                </Button>
              </div>
            </div>
          </header>

          <div className="space-y-lg px-margin-mobile py-lg md:px-margin-desktop">
            {message ? (
              <p className="rounded-md border border-secondary/25 bg-secondary/10 px-md py-sm text-body-sm text-secondary">
                {message}
              </p>
            ) : null}
            <section className="grid gap-md sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => {
                const Icon = metric.icon;

                return (
                  <article
                    className="rounded-lg border border-outline-variant bg-surface-container p-lg"
                    key={metric.label}
                  >
                    <div className="mb-lg flex items-center justify-between gap-md">
                      <div className={cn("rounded-md p-sm ring-1", toneClasses[metric.tone])}>
                        <Icon className="size-5" />
                      </div>
                      <span className="text-label-md uppercase text-on-surface-variant">
                        This week
                      </span>
                    </div>
                    <p className="text-body-sm text-on-surface-variant">{metric.label}</p>
                    <p className="mt-xs text-headline-lg text-on-surface">{metric.value}</p>
                    <p className="mt-sm text-body-sm text-on-surface-variant">{metric.helper}</p>
                  </article>
                );
              })}
            </section>

            <section className="grid gap-lg xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]">
              <div className="space-y-lg">
                <article className="rounded-lg border border-outline-variant bg-surface-container p-lg">
                  <div className="mb-lg flex flex-col gap-sm sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-headline-md text-on-surface">Active Learning Requests</h2>
                      <p className="text-body-sm text-on-surface-variant">
                        Compare applications and move accepted requests into payment.
                      </p>
                    </div>
                    <Button
                      className="w-fit border-outline-variant bg-transparent text-primary hover:bg-primary/10"
                      render={<Link to="/student/requests" />}
                      variant="outline"
                    >
                      View all
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>

                  <div className="overflow-hidden rounded-md border border-outline-variant">
                    {requests.map((request, index) => (
                      <div
                        className={cn(
                          "grid gap-md bg-surface-container-low p-md md:grid-cols-[minmax(0,1fr)_120px_120px_120px]",
                          index !== requests.length - 1 && "border-b border-outline-variant",
                        )}
                        key={request.title}
                      >
                        <div className="min-w-0">
                          <p className="truncate text-body-md font-medium text-on-surface">
                            {request.title}
                          </p>
                          <p className="text-body-sm text-on-surface-variant">{request.subject}</p>
                        </div>
                        <div>
                          <p className="text-label-md uppercase text-on-surface-variant">
                            Applications
                          </p>
                          <p className="text-body-sm text-on-surface">{request.applications}</p>
                        </div>
                        <div>
                          <p className="text-label-md uppercase text-on-surface-variant">Budget</p>
                          <p className="text-body-sm text-on-surface">{request.price}</p>
                        </div>
                        <div className="flex items-center md:justify-end">
                          <span
                            className={cn(
                              "rounded-full px-sm py-xs text-label-md",
                              statusClasses[request.status],
                            )}
                          >
                            {statusLabels[request.status]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-lg border border-outline-variant bg-surface-container p-lg">
                  <div className="mb-lg flex items-center justify-between gap-md">
                    <div>
                      <h2 className="text-headline-md text-on-surface">Recommended Instructors</h2>
                      <p className="text-body-sm text-on-surface-variant">
                        Verified instructors matched to your recent subjects.
                      </p>
                    </div>
                    <Users className="hidden size-5 text-secondary sm:block" />
                  </div>

                  <div className="grid gap-md md:grid-cols-3">
                    {instructors.map((instructor) => (
                      <div
                        className="rounded-md border border-outline-variant bg-surface-container-low p-md"
                        key={instructor.name}
                      >
                        <div className="mb-md flex items-center gap-sm">
                          <div className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                            {instructor.name
                              .split(" ")
                              .map((part) => part[0])
                              .join("")}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-body-md font-medium text-on-surface">
                              {instructor.name}
                            </p>
                            <p className="truncate text-body-sm text-on-surface-variant">
                              {instructor.field}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-body-sm">
                          <span className="flex items-center gap-xs text-tertiary">
                            <Star className="size-4 fill-current" />
                            {instructor.rating}
                          </span>
                          <span className="text-on-surface-variant">{instructor.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </div>

              <div className="space-y-lg">
                <article className="rounded-lg border border-outline-variant bg-surface-container p-lg">
                  <div className="mb-lg flex items-center justify-between">
                    <div>
                      <h2 className="text-headline-md text-on-surface">Next Sessions</h2>
                      <p className="text-body-sm text-on-surface-variant">Ready to start soon.</p>
                    </div>
                    <BookOpenCheck className="size-5 text-primary" />
                  </div>

                  <div className="space-y-md">
                    {sessions.map((session) => (
                      <div
                        className="rounded-md border border-outline-variant bg-surface-container-low p-md"
                        key={session.title}
                      >
                        <div className="mb-md flex items-start justify-between gap-md">
                          <div>
                            <p className="text-body-md font-medium text-on-surface">{session.title}</p>
                            <p className="text-body-sm text-on-surface-variant">
                              {session.instructor}
                            </p>
                          </div>
                          <span className="rounded-full bg-primary/15 px-sm py-xs text-label-md text-primary">
                            {session.status === "ready" ? "Ready" : "Active"}
                          </span>
                        </div>
                        <div className="flex items-center gap-sm text-body-sm text-on-surface-variant">
                          <Clock3 className="size-4" />
                          <span>{session.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-lg border border-outline-variant bg-surface-container p-lg">
                  <h2 className="text-headline-md text-on-surface">Payment Protection</h2>
                  <p className="mt-xs text-body-sm text-on-surface-variant">
                    Simulated escrow keeps session money held until you confirm completion.
                  </p>

                  <div className="my-lg rounded-md bg-surface-container-low p-md">
                    <div className="mb-sm flex items-center justify-between text-body-sm">
                      <span className="text-on-surface-variant">Held</span>
                      <span className="font-medium text-on-surface">1,250 EGP</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-surface-variant">
                      <div className="h-full w-[64%] rounded-full bg-primary" />
                    </div>
                    <div className="mt-sm flex items-center justify-between text-body-sm">
                      <span className="text-on-surface-variant">Released</span>
                      <span className="text-on-surface">2,700 EGP</span>
                    </div>
                  </div>

                  <Button className="w-full bg-secondary text-on-secondary hover:bg-secondary/90" render={<Link to="/student/payments" />}>
                    Review payments
                  </Button>
                </article>
              </div>
            </section>
          </div>
    </>
  );
}
