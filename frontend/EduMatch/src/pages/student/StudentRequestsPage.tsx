import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BadgeDollarSign,
  BookOpen,
  FileText,
  Plus,
  Users,
  WalletCards,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getMyRequests } from "@/services/requests.service";
import type { LearningRequest } from "@/types/request";

type FilterValue = "all" | "open" | "accepted" | "waiting_payment" | "in_session" | "completed";
type RequestStatus = Exclude<FilterValue, "all">;

type StudentRequest = {
  id: number;
  title: string;
  description: string;
  requestType: "Instant" | "Normal";
  sessionMode: "Individual" | "Group";
  status: RequestStatus;
  applications: number;
  paymentStatus: string;
  priceLabel: string;
  studentsJoined?: number;
};

const filters: Array<{ label: string; value: FilterValue }> = [
  { label: "All Requests", value: "all" },
  { label: "Open", value: "open" },
  { label: "Accepted", value: "accepted" },
  { label: "Waiting Payment", value: "waiting_payment" },
  { label: "In Session", value: "in_session" },
  { label: "Completed", value: "completed" },
];

const statusLabels: Record<RequestStatus, string> = {
  open: "Open",
  accepted: "Accepted",
  waiting_payment: "Waiting Payment",
  in_session: "In Session",
  completed: "Completed",
};

const statusClasses: Record<RequestStatus, string> = {
  open: "bg-secondary/15 text-secondary ring-secondary/25",
  accepted: "bg-primary/15 text-primary ring-primary/25",
  waiting_payment: "bg-tertiary/15 text-tertiary ring-tertiary/25",
  in_session: "bg-blue-400/15 text-blue-300 ring-blue-400/25",
  completed: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/25",
};

function RequestStatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span
      className={cn(
        "rounded-full px-sm py-xs text-label-md uppercase ring-1",
        statusClasses[status],
      )}
    >
      {statusLabels[status]}
    </span>
  );
}

function RequestFilters({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}) {
  return (
    <div className="flex max-w-full gap-xs overflow-x-auto rounded-lg border border-outline-variant bg-surface-container p-xs">
      {filters.map((filter) => (
        <button
          aria-pressed={activeFilter === filter.value}
          className={cn(
            "h-10 shrink-0 rounded-md px-md text-body-sm font-medium transition",
            activeFilter === filter.value
              ? "bg-primary text-on-primary shadow-[0_0_24px_rgba(192,193,255,0.16)]"
              : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
          )}
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          type="button"
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

function RequestCard({ request }: { request: StudentRequest }) {
  const metadata = [
    { icon: BookOpen, label: request.requestType },
    { icon: Users, label: request.sessionMode },
    { icon: FileText, label: `${request.applications} applications` },
    ...(request.studentsJoined
      ? [{ icon: Users, label: `${request.studentsJoined} students joined` }]
      : []),
    { icon: BadgeDollarSign, label: request.paymentStatus },
    { icon: WalletCards, label: request.priceLabel },
  ];

  return (
    <article className="flex min-h-[300px] flex-col rounded-lg border border-outline-variant bg-surface-container p-lg transition hover:border-primary/50 hover:bg-surface-container-high">
      <div className="mb-md flex items-start justify-between gap-md">
        <h2 className="text-headline-md text-on-surface">{request.title}</h2>
        <RequestStatusBadge status={request.status} />
      </div>

      <p className="line-clamp-4 flex-1 text-body-sm text-on-surface-variant">
        {request.description}
      </p>

      <div className="mt-lg grid gap-sm border-t border-outline-variant pt-md sm:grid-cols-2">
        {metadata.map((item) => {
          const Icon = item.icon;

          return (
            <div className="flex min-w-0 items-center gap-xs text-body-sm text-on-surface-variant" key={item.label}>
              <Icon className="size-4 shrink-0 text-secondary" />
              <span className="truncate">{item.label}</span>
            </div>
          );
        })}
      </div>

      <Link
        className="mt-lg inline-flex h-9 w-fit items-center justify-center rounded-md border border-secondary/40 px-md text-body-sm font-medium text-secondary transition hover:bg-secondary/10"
        to={`/student/requests/${request.id}`}
      >
        View Details
      </Link>
    </article>
  );
}

function CreateRequestCard() {
  return (
    <Link
      className="group flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-outline bg-surface-container/70 p-lg text-center transition hover:border-primary hover:bg-surface-container-high hover:shadow-[0_0_36px_rgba(192,193,255,0.14)]"
      to="/student/requests/create"
    >
      <span className="mb-md flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/25 transition group-hover:bg-primary group-hover:text-on-primary">
        <Plus className="size-6" />
      </span>
      <h2 className="text-headline-md text-on-surface">Create New Request</h2>
      <p className="mt-sm max-w-sm text-body-sm text-on-surface-variant">
        Start a new learning request and find a suitable instructor.
      </p>
      <span className="mt-lg inline-flex h-9 items-center justify-center rounded-md border border-secondary/40 px-md text-body-sm font-medium text-secondary transition group-hover:bg-secondary/10">
        Create Request
      </span>
    </Link>
  );
}

export function StudentRequestsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [requests, setRequests] = useState<StudentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    async function loadRequests() {
      try {
        const data = await getMyRequests();
        if (mounted) setRequests(data.map(mapRequest));
      } catch {
        if (mounted) setError("Could not load your requests. Make sure the backend is running.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    void loadRequests();
    return () => {
      mounted = false;
    };
  }, []);

  const visibleRequests = useMemo(() => {
    if (activeFilter === "all") {
      return requests;
    }

    return requests.filter((request) => request.status === activeFilter);
  }, [activeFilter]);

  return (
    <>
          <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
            <div className="flex flex-col gap-md sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-headline-lg text-on-surface">My Requests</h1>
                <p className="mt-xs text-body-sm text-on-surface-variant">
                  Manage and track your learning requests.
                </p>
              </div>

              <div className="flex items-center gap-sm">
                <Link
                  className="inline-flex h-10 items-center justify-center gap-xs rounded-md bg-secondary px-md text-body-sm font-medium text-on-secondary transition hover:bg-secondary/90"
                  to="/student/requests/create"
                >
                  <Plus className="size-4" />
                  New Request
                </Link>
              </div>
            </div>
          </header>

          <div className="space-y-lg px-margin-mobile py-lg md:px-margin-desktop">
            <RequestFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

            <section className="grid gap-lg md:grid-cols-2">
              {loading ? (
                <div className="rounded-lg border border-outline-variant bg-surface-container p-lg text-body-sm text-on-surface-variant">
                  Loading requests...
                </div>
              ) : error ? (
                <div className="rounded-lg border border-error/25 bg-error/10 p-lg text-body-sm text-error">
                  {error}
                </div>
              ) : visibleRequests.length > 0 ? (
                visibleRequests.map((request) => <RequestCard key={request.id} request={request} />)
              ) : (
                <div className="rounded-lg border border-dashed border-outline bg-surface-container/70 p-lg text-center">
                  <h2 className="text-headline-md text-on-surface">No requests yet</h2>
                  <p className="mt-sm text-body-sm text-on-surface-variant">
                    Create your first learning request to start receiving applications.
                  </p>
                </div>
              )}
              <CreateRequestCard />
            </section>
          </div>
    </>
  );
}

function mapRequest(request: LearningRequest): StudentRequest {
  return {
    id: request.id,
    title: request.title,
    description: request.description,
    requestType: request.request_type === "instant" ? "Instant" : "Normal",
    sessionMode: request.session_mode === "group" ? "Group" : "Individual",
    status: request.status as RequestStatus,
    applications: request.applications_count,
    paymentStatus: request.status === "waiting_payment" ? "Waiting Payment" : "Not Required Yet",
    priceLabel: request.base_price ? `${request.base_price} EGP` : "Not set",
    studentsJoined: request.max_students ?? undefined,
  };
}
