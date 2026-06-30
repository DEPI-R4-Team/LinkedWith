import { cn } from "@/lib/utils";

export type SessionStatus =
  | "ready"
  | "scheduled"
  | "active"
  | "completed"
  | "cancelled"
  | "disputed";

type SessionStatusBadgeProps = {
  status: SessionStatus;
  className?: string;
};

const statusLabels: Record<SessionStatus, string> = {
  ready: "Ready",
  scheduled: "Scheduled",
  active: "Active",
  completed: "Completed",
  cancelled: "Cancelled",
  disputed: "Disputed",
};

const statusClasses: Record<SessionStatus, string> = {
  ready: "bg-primary/15 text-primary ring-primary/25",
  scheduled: "bg-tertiary/15 text-tertiary ring-tertiary/25",
  active: "bg-blue-400/15 text-blue-300 ring-blue-400/25",
  completed: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/25",
  cancelled: "bg-error/15 text-error ring-error/25",
  disputed: "bg-orange-400/15 text-orange-300 ring-orange-400/25",
};

export function SessionStatusBadge({ status, className }: SessionStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full px-sm py-xs text-label-md uppercase ring-1",
        statusClasses[status],
        className,
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
