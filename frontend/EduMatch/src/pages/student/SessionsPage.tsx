import { useEffect, useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { FeaturedSessionCard, type FeaturedSession } from "@/components/cards/FeaturedSessionCard";
import { MiniCalendarCard } from "@/components/cards/MiniCalendarCard";
import { PaymentProtectionCard } from "@/components/cards/PaymentProtectionCard";
import { SessionStatsCard } from "@/components/cards/SessionStatsCard";
import { SessionRow, type StudentSession } from "@/components/sessions/SessionRow";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getMySessions } from "@/services/sessions.service";
import type { Session } from "@/types/session";

type FilterValue = "all" | StudentSession["status"];

const filters: Array<{ label: string; value: FilterValue }> = [
  { label: "All", value: "all" },
  { label: "Ready", value: "ready" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

function matchesFilter(session: StudentSession, filter: FilterValue) {
  if (filter === "all") {
    return true;
  }

  return session.status === filter;
}

function formatSessionDate(value: string | null) {
  if (!value) {
    return "To be scheduled";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function mapSession(session: Session): StudentSession {
  return {
    id: String(session.id),
    instructor: session.instructor_name ?? "Instructor",
    subject: session.request_title ?? "Learning Session",
    date: formatSessionDate(session.scheduled_at),
    type: session.session_type === "offline" ? "Offline" : "Online",
    status: session.status,
    paymentStatus:
      session.payment_status === "held"
        ? "held"
        : session.payment_status === "released"
          ? "released"
          : session.payment_status === "refunded"
            ? "refunded"
            : session.request_status === "waiting_payment"
              ? "pending"
              : "held",
    sessionMode: session.session_mode === "group" ? "Group" : "Individual",
  };
}

function toFeaturedSession(session: StudentSession): FeaturedSession {
  return {
    id: session.id,
    instructor: session.instructor,
    subject: session.subject,
    dateTime: session.date,
    type: session.type,
    status: session.status,
    platform: session.type === "Online" ? "Online meeting" : "Offline",
    paymentStatus: session.paymentStatus,
    sessionMode: session.sessionMode,
  };
}

export function SessionsPage() {
  const [sessions, setSessions] = useState<StudentSession[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSessions() {
      try {
        const data = await getMySessions();
        setSessions(data.map(mapSession));
        setError("");
      } catch {
        setError("Could not load sessions. Make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    }

    void loadSessions();
  }, []);

  const visibleSessions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return sessions.filter((session) => {
      const searchableText = [session.instructor, session.subject].join(" ").toLowerCase();
      const matchesSearch = !query || searchableText.includes(query);

      return matchesSearch && matchesFilter(session, activeFilter);
    });
  }, [activeFilter, searchTerm, sessions]);

  const featuredSession = sessions[0] ? toFeaturedSession(sessions[0]) : null;

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <div className="flex flex-col gap-md xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="text-headline-lg text-on-surface">Scheduled Sessions</h1>
            <p className="mt-xs max-w-2xl text-body-sm text-on-surface-variant">
              Manage your upcoming learning sessions and completed instructor meetings.
            </p>
          </div>

          <div className="flex w-full flex-col gap-sm sm:flex-row xl:w-auto">
            <div className="relative min-w-0 flex-1 xl:w-[280px]">
              <Search className="pointer-events-none absolute left-md top-1/2 size-4 -translate-y-1/2 text-on-surface-variant" />
              <Input
                className="h-10 border-outline-variant bg-surface-container pl-10 text-on-surface"
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search sessions..."
                value={searchTerm}
              />
            </div>
            <button
              className="inline-flex h-10 items-center justify-center gap-xs rounded-md border border-outline-variant bg-surface-container px-md text-body-sm text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
              onClick={() => setShowFilterMenu((current) => !current)}
              type="button"
            >
              <Filter className="size-4 text-secondary" />
              Filter
            </button>
            {showFilterMenu ? (
              <div className="rounded-md border border-outline-variant bg-surface-container p-xs sm:absolute sm:right-margin-desktop sm:top-24 sm:z-20 sm:w-44">
                {filters.map((filter) => (
                  <button
                    className="block w-full rounded-md px-sm py-xs text-left text-body-sm text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
                    key={filter.value}
                    onClick={() => {
                      setActiveFilter(filter.value);
                      setShowFilterMenu(false);
                    }}
                    type="button"
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <div className="grid gap-lg px-margin-mobile py-lg md:px-margin-desktop 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <main className="min-w-0 space-y-lg">
          {featuredSession ? <FeaturedSessionCard session={featuredSession} /> : null}
          {error ? <p className="rounded-md border border-error/25 bg-error/10 px-md py-sm text-body-sm text-error">{error}</p> : null}

          <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
            <div className="flex flex-col gap-md md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-label-md uppercase text-secondary">Sessions</p>
                <h2 className="mt-xs text-headline-md text-on-surface">Later This Week</h2>
              </div>

              <div className="flex max-w-full gap-xs overflow-x-auto rounded-lg border border-outline-variant bg-surface-container-low p-xs">
                {filters.map((filter) => (
                  <button
                    aria-pressed={activeFilter === filter.value}
                    className={cn(
                      "h-9 shrink-0 rounded-md px-md text-body-sm font-medium transition",
                      activeFilter === filter.value
                        ? "bg-primary text-on-primary"
                        : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
                    )}
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    type="button"
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-lg space-y-md">
              {loading ? (
                <div className="rounded-lg border border-dashed border-outline bg-surface-container-low p-xl text-center">
                  <p className="text-body-sm text-on-surface-variant">Loading sessions...</p>
                </div>
              ) : visibleSessions.length > 0 ? (
                visibleSessions.map((session) => <SessionRow key={session.id} session={session} />)
              ) : (
                <div className="rounded-lg border border-dashed border-outline bg-surface-container-low p-xl text-center">
                  <h3 className="text-headline-md text-on-surface">No sessions found</h3>
                  <p className="mt-sm text-body-sm text-on-surface-variant">
                    Try changing your search keyword or selected status.
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>

        <aside className="space-y-lg">
          <SessionStatsCard />
          <MiniCalendarCard />
          <PaymentProtectionCard />
        </aside>
      </div>
    </>
  );
}
