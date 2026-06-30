import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpenCheck,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  FileText,
  Home,
  Plus,
  Search,
} from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { getMyPayments } from "@/services/payments.service";
import { getMyRequests } from "@/services/requests.service";
import { getMyReviews } from "@/services/reviews.service";
import { getMySessions } from "@/services/sessions.service";
import type { Payment } from "@/types/payment";
import type { LearningRequest } from "@/types/request";
import type { Review } from "@/types/review";
import type { Session } from "@/types/session";

type Metric = {
  label: string;
  value: string;
  helper: string;
  icon: typeof FileText;
  tone: "primary" | "cyan" | "amber" | "green";
};

const toneClasses: Record<Metric["tone"], string> = {
  primary: "bg-primary/15 text-primary ring-primary/20",
  cyan: "bg-secondary/15 text-secondary ring-secondary/20",
  amber: "bg-tertiary/15 text-tertiary ring-tertiary/20",
  green: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/20",
};

const statusClasses: Record<string, string> = {
  open: "bg-secondary/15 text-secondary",
  waiting_payment: "bg-tertiary/15 text-tertiary",
  paid: "bg-primary/15 text-primary",
  in_session: "bg-primary/15 text-primary",
  completed: "bg-emerald-400/15 text-emerald-300",
  cancelled: "bg-error/15 text-error",
};

function formatMoney(value: number) {
  return `${value.toFixed(2)} EGP`;
}

function moneyToNumber(value: string | null | undefined) {
  return Number.parseFloat(value ?? "0") || 0;
}

function formatStatus(status: string) {
  return status.replaceAll("_", " ");
}

function formatDate(value: string | null) {
  if (!value) {
    return "Not scheduled yet";
  }
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export function StudentDashboardPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<LearningRequest[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [requestData, sessionData, paymentData, reviewData] = await Promise.all([
          getMyRequests(),
          getMySessions(),
          getMyPayments(),
          getMyReviews(),
        ]);
        setRequests(requestData);
        setSessions(sessionData);
        setPayments(paymentData);
        setReviews(reviewData);
        setError("");
      } catch {
        setError("Could not load dashboard data. Make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    }

    void loadDashboard();
  }, []);

  const metrics = useMemo<Metric[]>(() => {
    const activeRequests = requests.filter((request) => ["open", "accepted", "waiting_payment", "paid", "in_session"].includes(request.status));
    const readySessions = sessions.filter((session) => ["ready", "active"].includes(session.status));
    const completedSessions = sessions.filter((session) => session.status === "completed");
    const heldTotal = payments
      .filter((payment) => payment.status === "held")
      .reduce((total, payment) => total + moneyToNumber(payment.amount), 0);
    const averageGiven =
      reviews.length > 0
        ? (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length).toFixed(1)
        : "No reviews yet";

    return [
      {
        label: "Active Requests",
        value: String(activeRequests.length),
        helper: `${requests.filter((request) => request.status === "waiting_payment").length} waiting for payment`,
        icon: FileText,
        tone: "primary",
      },
      {
        label: "Ready Sessions",
        value: String(readySessions.length),
        helper: `${completedSessions.length} completed sessions`,
        icon: CalendarClock,
        tone: "cyan",
      },
      {
        label: "Held Payments",
        value: formatMoney(heldTotal),
        helper: "Protected until completion",
        icon: CircleDollarSign,
        tone: "amber",
      },
      {
        label: "Reviews Given",
        value: String(reviews.length),
        helper: typeof averageGiven === "string" && averageGiven.includes("No") ? averageGiven : `Average rating ${averageGiven}`,
        icon: CheckCircle2,
        tone: "green",
      },
    ];
  }, [payments, requests, reviews, sessions]);

  const recentRequests = requests.slice(0, 3);
  const nextSessions = sessions.filter((session) => ["ready", "active"].includes(session.status)).slice(0, 3);
  const heldTotal = payments
    .filter((payment) => payment.status === "held")
    .reduce((total, payment) => total + moneyToNumber(payment.amount), 0);
  const releasedTotal = payments
    .filter((payment) => payment.status === "released")
    .reduce((total, payment) => total + moneyToNumber(payment.amount), 0);

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
            <h1 className="text-headline-lg text-on-surface">Welcome back, {user?.full_name ?? "Student"}</h1>
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
              <span className="truncate text-body-sm">Search your requests...</span>
            </Link>
            <Button className="h-10 bg-primary px-md text-on-primary hover:bg-primary/90" render={<Link to="/student/requests/create" />}>
              <Plus className="size-4" />
              New Request
            </Button>
          </div>
        </div>
      </header>

      <div className="space-y-lg px-margin-mobile py-lg md:px-margin-desktop">
        {error ? <ErrorState message={error} /> : null}
        {loading ? <LoadingState message="Loading dashboard..." /> : null}

        <section className="grid gap-md sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <article className="rounded-lg border border-outline-variant bg-surface-container p-lg" key={metric.label}>
                <div className="mb-lg flex items-center justify-between gap-md">
                  <div className={cn("rounded-md p-sm ring-1", toneClasses[metric.tone])}>
                    <Icon className="size-5" />
                  </div>
                  <span className="text-label-md uppercase text-on-surface-variant">Live</span>
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
                <Button className="w-fit border-outline-variant bg-transparent text-primary hover:bg-primary/10" render={<Link to="/student/requests" />} variant="outline">
                  View all
                  <ChevronRight className="size-4" />
                </Button>
              </div>

              {recentRequests.length > 0 ? (
                <div className="overflow-hidden rounded-md border border-outline-variant">
                  {recentRequests.map((request, index) => (
                    <Link
                      className={cn(
                        "grid gap-md bg-surface-container-low p-md transition hover:bg-surface-container-high md:grid-cols-[minmax(0,1fr)_120px_120px_120px]",
                        index !== recentRequests.length - 1 && "border-b border-outline-variant",
                      )}
                      key={request.id}
                      to={`/student/requests/${request.id}`}
                    >
                      <div className="min-w-0">
                        <p className="truncate text-body-md font-medium text-on-surface">{request.title}</p>
                        <p className="text-body-sm text-on-surface-variant">{request.subject}</p>
                      </div>
                      <div>
                        <p className="text-label-md uppercase text-on-surface-variant">Applications</p>
                        <p className="text-body-sm text-on-surface">{request.applications_count}</p>
                      </div>
                      <div>
                        <p className="text-label-md uppercase text-on-surface-variant">Budget</p>
                        <p className="text-body-sm text-on-surface">{request.base_price ?? "Not set"} EGP</p>
                      </div>
                      <div className="flex items-center md:justify-end">
                        <span className={cn("rounded-full px-sm py-xs text-label-md capitalize", statusClasses[request.status] ?? "bg-surface-container-high text-on-surface-variant")}>
                          {formatStatus(request.status)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <EmptyState
                  action={
                    <Link className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-md text-body-sm font-medium text-on-primary transition hover:bg-primary/90" to="/student/requests/create">
                      Create Request
                    </Link>
                  }
                  message="Create your first learning request to start receiving instructor applications."
                  title="No requests yet"
                />
              )}
            </article>
          </div>

          <div className="space-y-lg">
            <article className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <div className="mb-lg flex items-center justify-between">
                <div>
                  <h2 className="text-headline-md text-on-surface">Next Sessions</h2>
                  <p className="text-body-sm text-on-surface-variant">Ready or active sessions.</p>
                </div>
                <BookOpenCheck className="size-5 text-primary" />
              </div>

              {nextSessions.length > 0 ? (
                <div className="space-y-md">
                  {nextSessions.map((session) => (
                    <Link className="block rounded-md border border-outline-variant bg-surface-container-low p-md transition hover:bg-surface-container-high" key={session.id} to={`/student/sessions/${session.id}`}>
                      <div className="mb-md flex items-start justify-between gap-md">
                        <div>
                          <p className="text-body-md font-medium text-on-surface">{session.request_title ?? "Learning Session"}</p>
                          <p className="text-body-sm text-on-surface-variant">{session.instructor_name ?? "Instructor"}</p>
                        </div>
                        <span className="rounded-full bg-primary/15 px-sm py-xs text-label-md capitalize text-primary">{session.status}</span>
                      </div>
                      <div className="flex items-center gap-sm text-body-sm text-on-surface-variant">
                        <CalendarClock className="size-4" />
                        <span>{formatDate(session.scheduled_at)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <EmptyState
                  message="Sessions will appear after you accept an instructor and complete payment."
                  title="No sessions yet"
                />
              )}
            </article>

            <article className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <h2 className="text-headline-md text-on-surface">Payment Protection</h2>
              <p className="mt-xs text-body-sm text-on-surface-variant">
                Simulated escrow keeps session money held until you confirm completion.
              </p>

              <div className="my-lg rounded-md bg-surface-container-low p-md">
                <div className="mb-sm flex items-center justify-between text-body-sm">
                  <span className="text-on-surface-variant">Held</span>
                  <span className="font-medium text-on-surface">{formatMoney(heldTotal)}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-variant">
                  <div className="h-full rounded-full bg-primary" style={{ width: heldTotal + releasedTotal > 0 ? `${(heldTotal / (heldTotal + releasedTotal)) * 100}%` : "0%" }} />
                </div>
                <div className="mt-sm flex items-center justify-between text-body-sm">
                  <span className="text-on-surface-variant">Released</span>
                  <span className="text-on-surface">{formatMoney(releasedTotal)}</span>
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
