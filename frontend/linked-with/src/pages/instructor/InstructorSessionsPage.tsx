import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarClock,
  Clock3,
  Filter,
  Search,
  Video,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { SessionStatusBadge, type SessionStatus } from "@/components/ui/SessionStatusBadge";
import { cn } from "@/lib/utils";

type InstructorSession = {
  id: string;
  studentName: string;
  subject: string;
  date: string;
  type: "Online" | "Offline";
  status: SessionStatus;
  sessionMode: "Individual" | "Group";
};

type FilterValue = "all" | SessionStatus;

const filters: Array<{ label: string; value: FilterValue }> = [
  { label: "All", value: "all" },
  { label: "Scheduled", value: "scheduled" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const featuredSession = {
  id: "featured-1",
  studentName: "James Smith",
  subject: "AI-Driven Medical Diagnostics — Code Review",
  dateTime: "Today, 14:00",
  type: "Online" as const,
  status: "scheduled" as SessionStatus,
  platform: "Google Meet",
  sessionMode: "Individual" as const,
};

const sessions: InstructorSession[] = [
  {
    id: "1",
    studentName: "Aisha Khan",
    subject: "Blockchain Voting System Review",
    date: "Oct 24, 10:00 AM",
    type: "Online",
    status: "scheduled",
    sessionMode: "Individual",
  },
  {
    id: "2",
    studentName: "Michael Rodriguez",
    subject: "Drone Navigation — Midterm Check",
    date: "Oct 25, 15:30 PM",
    type: "Online",
    status: "completed",
    sessionMode: "Individual",
  },
  {
    id: "3",
    studentName: "Emily Wong",
    subject: "Market Entry Methodology Discussion",
    date: "Oct 27, 12:00 PM",
    type: "Offline",
    status: "cancelled",
    sessionMode: "Group",
  },
];

export function InstructorSessionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const visibleSessions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return sessions.filter((session) => {
      const searchable = [session.studentName, session.subject]
        .join(" ")
        .toLowerCase();
      const matchesSearch = !query || searchable.includes(query);
      const matchesFilter =
        activeFilter === "all" || session.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [activeFilter, searchTerm]);

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <div className="flex flex-col gap-md xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="text-headline-lg text-on-surface">Sessions</h1>
            <p className="mt-xs max-w-2xl text-body-sm text-on-surface-variant">
              Manage your scheduled advisory sessions with students.
            </p>
          </div>
          <div className="flex w-full flex-col gap-sm sm:flex-row xl:w-auto">
            <div className="relative min-w-0 flex-1 xl:w-[280px]">
              <Search className="pointer-events-none absolute left-md top-1/2 size-4 -translate-y-1/2 text-on-surface-variant" />
              <Input
                className="h-10 border-outline-variant bg-surface-container pl-10 text-on-surface"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search sessions..."
                value={searchTerm}
              />
            </div>
            <button
              className="inline-flex h-10 items-center justify-center gap-xs rounded-md border border-outline-variant bg-surface-container px-md text-body-sm text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
              onClick={() => setShowFilterMenu((prev) => !prev)}
              type="button"
            >
              <Filter className="size-4 text-secondary" />
              Filter
            </button>
            {showFilterMenu && (
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
            )}
          </div>
        </div>
      </header>

      <div className="space-y-lg px-margin-mobile py-lg md:px-margin-desktop">
        <Link
          className="block rounded-lg border border-primary/30 bg-gradient-to-r from-primary/10 to-primary/5 p-lg transition hover:border-primary/50"
          to={`/instructor/sessions/${featuredSession.id}`}
        >
          <div className="flex flex-col gap-md sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-label-md uppercase text-primary">
                Next Session
              </p>
              <h2 className="mt-xs text-headline-md text-on-surface">
                {featuredSession.subject}
              </h2>
              <p className="mt-xs text-body-sm text-on-surface-variant">
                Student: {featuredSession.studentName}
              </p>
            </div>
            <SessionStatusBadge status={featuredSession.status} />
          </div>
          <div className="mt-md flex flex-wrap gap-md text-body-sm text-on-surface-variant">
            <span className="flex items-center gap-xs">
              <CalendarClock className="size-4" />
              {featuredSession.dateTime}
            </span>
            <span className="flex items-center gap-xs">
              <Video className="size-4" />
              {featuredSession.platform}
            </span>
          </div>
        </Link>

        <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
          <div className="flex flex-col gap-md md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-label-md uppercase text-secondary">Sessions</p>
              <h2 className="mt-xs text-headline-md text-on-surface">
                Later This Week
              </h2>
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
              visibleSessions.map((session) => (
                <Link
                  className="flex flex-col gap-sm rounded-md border border-outline-variant bg-surface-container-low p-md transition hover:border-primary/50 hover:bg-surface-container-high sm:flex-row sm:items-center sm:justify-between"
                  key={session.id}
                  to={`/instructor/sessions/${session.id}`}
                >
                  <div className="min-w-0">
                    <p className="truncate text-body-md font-medium text-on-surface">
                      {session.subject}
                    </p>
                    <p className="text-body-sm text-on-surface-variant">
                      Student: {session.studentName}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-sm">
                    <span className="flex items-center gap-xs text-body-sm text-on-surface-variant">
                      <Clock3 className="size-4" />
                      {session.date}
                    </span>
                    <SessionStatusBadge status={session.status} />
                  </div>
                </Link>
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-outline bg-surface-container-low p-xl text-center">
                <h3 className="text-headline-md text-on-surface">
                  No sessions found
                </h3>
                <p className="mt-sm text-body-sm text-on-surface-variant">
                  Try changing your search keyword or selected status.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
