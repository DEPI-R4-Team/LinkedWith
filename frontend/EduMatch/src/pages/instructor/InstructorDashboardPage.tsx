import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Banknote,
  CalendarCheck,
  CalendarClock,
  ChevronRight,
  Clock3,
  ClipboardList,
  FileText,
  UserPen,
  Wallet,
} from "lucide-react";
import { NotificationsDropdown } from "@/components/layout/NotificationsDropdown";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { SessionStatusBadge } from "@/components/ui/SessionStatusBadge";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { getMyApplications } from "@/services/applications.service";
import { getRequests } from "@/services/requests.service";
import { getMyReviews } from "@/services/reviews.service";
import { getMySessions } from "@/services/sessions.service";
import { getInstructorWallet } from "@/services/wallet.service";
import type { Application } from "@/types/application";
import type { LearningRequest } from "@/types/request";
import type { Review } from "@/types/review";
import type { Session } from "@/types/session";
import type { InstructorWallet } from "@/types/wallet";

type DashboardCard = {
  label: string;
  value: string;
  helper: string;
  icon: typeof FileText;
  to: string;
};

function formatMoney(value: string | null | undefined) {
  return `${Number.parseFloat(value ?? "0").toFixed(2)} EGP`;
}

function formatDate(value: string | null | undefined) {
  if (!value) {
    return "Not scheduled yet";
  }
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h2 className="text-headline-md text-on-surface">{title}</h2>
      <p className="mt-xs text-body-sm text-on-surface-variant">{description}</p>
    </div>
  );
}

export function InstructorDashboardPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<LearningRequest[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [wallet, setWallet] = useState<InstructorWallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [requestData, applicationData, sessionData, walletData, reviewData] = await Promise.all([
          getRequests({ status: "open" }),
          getMyApplications(),
          getMySessions(),
          getInstructorWallet(),
          getMyReviews(),
        ]);
        setRequests(requestData);
        setApplications(applicationData);
        setSessions(sessionData);
        setWallet(walletData);
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

  const activeSessions = sessions.filter((session) => ["ready", "active"].includes(session.status));
  const completedSessions = sessions.filter((session) => session.status === "completed");
  const pendingApplications = applications.filter((application) => application.status === "pending");
  const averageRating =
    reviews.length > 0 ? (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length).toFixed(1) : "No reviews yet";

  const stats: DashboardCard[] = [
    {
      label: "Available Requests",
      value: String(requests.length),
      helper: "Open student requests",
      icon: ClipboardList,
      to: ROUTES.INSTRUCTOR.REQUESTS,
    },
    {
      label: "Pending Applications",
      value: String(pendingApplications.length),
      helper: "Waiting for student decision",
      icon: FileText,
      to: ROUTES.INSTRUCTOR.REQUESTS,
    },
    {
      label: "Ready Sessions",
      value: String(activeSessions.length),
      helper: `${completedSessions.length} completed sessions`,
      icon: CalendarClock,
      to: ROUTES.INSTRUCTOR.SESSIONS,
    },
    {
      label: "Wallet Balance",
      value: formatMoney(wallet?.available_balance),
      helper: `${formatMoney(wallet?.pending_balance)} pending`,
      icon: Wallet,
      to: ROUTES.INSTRUCTOR.WALLET,
    },
  ];

  const profile = user?.instructor_profile;
  const missingProfileItems = [
    !profile?.bio ? "Add bio" : null,
    !profile?.skills ? "Add skills" : null,
    !profile?.price_per_session ? "Add price per session" : null,
  ].filter(Boolean) as string[];

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <div className="flex flex-col gap-lg xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl">
            <p className="text-label-md uppercase text-primary">Instructor Dashboard</p>
            <h1 className="mt-xs text-headline-lg text-on-surface">Welcome back, {user?.full_name ?? "Instructor"}</h1>
            <p className="mt-xs text-body-sm text-on-surface-variant sm:text-body-md">
              Manage your sessions, requests, students, and earnings from one place.
            </p>

            <div className="mt-md flex flex-wrap gap-sm">
              <Link className="inline-flex h-10 items-center justify-center gap-xs rounded-md bg-primary px-md text-body-sm font-medium text-on-primary transition hover:bg-primary/90" to={ROUTES.INSTRUCTOR.PROFILE}>
                <UserPen className="size-4" />
                Edit Profile
              </Link>
              <Link className="inline-flex h-10 items-center justify-center gap-xs rounded-md border border-outline-variant bg-surface-container px-md text-body-sm text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface" to={ROUTES.INSTRUCTOR.AVAILABILITY}>
                <Clock3 className="size-4" />
                Set Availability
              </Link>
              <Link className="inline-flex h-10 items-center justify-center gap-xs rounded-md border border-outline-variant bg-surface-container px-md text-body-sm text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface" to={ROUTES.INSTRUCTOR.REQUESTS}>
                <ClipboardList className="size-4" />
                View Requests
              </Link>
              <Link className="inline-flex h-10 items-center justify-center gap-xs rounded-md border border-outline-variant bg-surface-container px-md text-body-sm text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface" to={ROUTES.INSTRUCTOR.WALLET}>
                <Banknote className="size-4" />
                View Earnings
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-sm">
            <NotificationsDropdown />
            <Link to={ROUTES.INSTRUCTOR.PROFILE} className="flex size-10 items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant transition hover:bg-surface-container-highest" aria-label="View profile">
              <span className="text-body-sm font-medium">{initials(user?.full_name ?? "Instructor")}</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="space-y-lg px-margin-mobile py-lg md:px-margin-desktop">
        {error ? <ErrorState message={error} /> : null}
        {loading ? <LoadingState message="Loading dashboard..." /> : null}

        <section className="grid gap-md sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link className={cn("group rounded-lg border border-outline-variant bg-surface-container p-lg transition", "hover:-translate-y-0.5 hover:border-primary/50 hover:bg-surface-container-high")} key={stat.label} to={stat.to}>
                <div className="mb-lg flex items-center justify-between gap-md">
                  <p className="text-label-md uppercase text-on-surface-variant">{stat.label}</p>
                  <div className="rounded-md bg-surface-container-high p-sm text-on-surface-variant transition group-hover:bg-primary/15 group-hover:text-primary">
                    <Icon className="size-5" />
                  </div>
                </div>
                <p className="text-headline-lg text-on-surface">{stat.value}</p>
                <p className="mt-xs text-body-sm text-on-surface-variant">{stat.helper}</p>
              </Link>
            );
          })}
        </section>

        <div className="grid gap-lg xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-lg">
            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <div className="flex flex-col gap-md md:flex-row md:items-center md:justify-between">
                <SectionHeader title="Open Student Requests" description="Real open requests from students." />
                <Link className="inline-flex h-10 items-center justify-center gap-xs rounded-md border border-outline-variant px-md text-body-sm text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface" to={ROUTES.INSTRUCTOR.REQUESTS}>
                  View All
                  <ChevronRight className="size-4" />
                </Link>
              </div>

              <div className="mt-lg grid gap-md">
                {requests.slice(0, 3).length > 0 ? (
                  requests.slice(0, 3).map((request) => (
                    <Link className="rounded-lg border border-outline-variant bg-surface-container-low p-md transition hover:border-primary/40 hover:bg-surface-container-high" key={request.id} to={`/instructor/requests/${request.id}`}>
                      <div className="flex flex-col gap-md lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0">
                          <h3 className="text-body-md font-medium text-on-surface">{request.title}</h3>
                          <p className="mt-xs text-body-sm text-on-surface-variant">Student: {request.student_name ?? "Student"}</p>
                        </div>
                        <p className="text-body-md font-semibold text-secondary">{request.base_price ?? "Not set"} EGP</p>
                      </div>
                      <p className="mt-md text-body-sm text-on-surface-variant line-clamp-2">{request.description}</p>
                    </Link>
                  ))
                ) : (
                  <EmptyState message="New student requests will appear here when available." title="No open requests" />
                )}
              </div>
            </section>

            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <div className="flex flex-col gap-md md:flex-row md:items-center md:justify-between">
                <SectionHeader title="Upcoming Sessions" description="Ready and active assigned sessions." />
                <Link className="inline-flex h-10 items-center justify-center gap-xs rounded-md border border-outline-variant px-md text-body-sm text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface" to={ROUTES.INSTRUCTOR.SESSIONS}>
                  View Schedule
                  <ChevronRight className="size-4" />
                </Link>
              </div>

              <div className="mt-lg grid gap-md lg:grid-cols-3">
                {activeSessions.slice(0, 3).length > 0 ? (
                  activeSessions.slice(0, 3).map((session) => (
                    <Link className="flex min-h-[210px] flex-col rounded-lg border border-outline-variant bg-surface-container-low p-md transition hover:border-primary/40 hover:bg-surface-container-high" key={session.id} to={`/instructor/sessions/${session.id}`}>
                      <div className="flex items-start justify-between gap-sm">
                        <div className="min-w-0">
                          <h3 className="text-body-md font-medium text-on-surface">{session.request_title ?? "Learning Session"}</h3>
                          <p className="mt-xs text-body-sm text-on-surface-variant">Student: {session.student_name ?? "Student"}</p>
                        </div>
                        <SessionStatusBadge status={session.status} />
                      </div>
                      <p className="mt-md text-body-sm text-on-surface-variant">
                        <CalendarCheck className="mr-xs inline size-4 text-primary" />
                        {formatDate(session.scheduled_at)}
                      </p>
                    </Link>
                  ))
                ) : (
                  <div className="lg:col-span-3">
                    <EmptyState message="Sessions will appear after a student accepts your application and completes payment." title="No sessions yet" />
                  </div>
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-lg">
            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <div className="flex items-start justify-between gap-md">
                <div>
                  <p className="text-label-md uppercase text-primary">Profile Status</p>
                  <p className="mt-xs text-headline-md text-on-surface">{profile?.verification_status?.replaceAll("_", " ") ?? "Not added yet"}</p>
                </div>
                <div className="rounded-md bg-primary/15 p-sm text-primary">
                  <UserPen className="size-5" />
                </div>
              </div>
              <p className="mt-md text-body-sm text-on-surface-variant">
                Rating: {averageRating}
              </p>
              <ul className="mt-md space-y-xs">
                {missingProfileItems.length > 0 ? (
                  missingProfileItems.map((item) => (
                    <li className="flex items-center gap-xs text-body-sm text-on-surface-variant" key={item}>
                      <span className="size-1.5 rounded-full bg-tertiary" />
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="text-body-sm text-on-surface-variant">Core profile fields are added.</li>
                )}
              </ul>
              <Link className="mt-md inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-md text-body-sm font-medium text-on-primary transition hover:bg-primary/90" to={ROUTES.INSTRUCTOR.PROFILE}>
                Complete Profile
              </Link>
            </section>

            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <SectionHeader title="Wallet" description="Simulated earnings from completed sessions." />
              <dl className="mt-lg space-y-md text-body-sm">
                <div className="flex justify-between gap-md">
                  <dt className="text-on-surface-variant">Pending</dt>
                  <dd className="font-medium text-on-surface">{formatMoney(wallet?.pending_balance)}</dd>
                </div>
                <div className="flex justify-between gap-md">
                  <dt className="text-on-surface-variant">Available</dt>
                  <dd className="font-medium text-on-surface">{formatMoney(wallet?.available_balance)}</dd>
                </div>
                <div className="flex justify-between gap-md">
                  <dt className="text-on-surface-variant">Total earned</dt>
                  <dd className="font-medium text-on-surface">{formatMoney(wallet?.total_earned)}</dd>
                </div>
              </dl>
              <Link className="mt-md inline-flex h-10 w-full items-center justify-center rounded-md border border-outline-variant px-md text-body-sm text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface" to={ROUTES.INSTRUCTOR.WALLET}>
                View Wallet
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}
