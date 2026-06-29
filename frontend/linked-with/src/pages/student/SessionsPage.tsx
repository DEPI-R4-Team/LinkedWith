import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { FeaturedSessionCard, type FeaturedSession } from "@/components/cards/FeaturedSessionCard";
import { MiniCalendarCard } from "@/components/cards/MiniCalendarCard";
import { PaymentProtectionCard } from "@/components/cards/PaymentProtectionCard";
import { SessionStatsCard } from "@/components/cards/SessionStatsCard";
import { SessionRow, type StudentSession } from "@/components/sessions/SessionRow";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FilterValue = "all" | "scheduled" | "active" | "completed" | "cancelled";

const featuredSession: FeaturedSession = {
  id: "1",
  instructor: "Dr. Sarah Jenkins",
  subject: "React State Management Review",
  dateTime: "Today, 14:00",
  type: "Online",
  status: "scheduled",
  platform: "Google Meet",
  paymentStatus: "held",
  sessionMode: "Individual",
};

const sessions: StudentSession[] = [
  {
    id: "1",
    instructor: "Ahmed Mostafa",
    subject: "Frontend Project Consultation",
    date: "Oct 24, 10:00 AM",
    type: "Online",
    status: "scheduled",
    paymentStatus: "held",
    sessionMode: "Individual",
  },
  {
    id: "2",
    instructor: "Mona Hassan",
    subject: "Database ERD Review",
    date: "Oct 25, 15:30 PM",
    type: "Online",
    status: "completed",
    paymentStatus: "released",
    sessionMode: "Individual",
  },
  {
    id: "3",
    instructor: "Omar Khaled",
    subject: "Calculus Problem Solving",
    date: "Oct 27, 12:00 PM",
    type: "Offline",
    status: "cancelled",
    paymentStatus: "refunded",
    sessionMode: "Group",
  },
];

const filters: Array<{ label: string; value: FilterValue }> = [
  { label: "All", value: "all" },
  { label: "Scheduled", value: "scheduled" },
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

export function SessionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const visibleSessions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return sessions.filter((session) => {
      const searchableText = [session.instructor, session.subject].join(" ").toLowerCase();
      const matchesSearch = !query || searchableText.includes(query);

      return matchesSearch && matchesFilter(session, activeFilter);
    });
  }, [activeFilter, searchTerm]);

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
          <FeaturedSessionCard session={featuredSession} />

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
              {visibleSessions.length > 0 ? (
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
