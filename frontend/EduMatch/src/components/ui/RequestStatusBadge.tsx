import { cn } from "@/lib/utils";

export type RequestStatus =
  | "open"
  | "pending_instant"
  | "accepted"
  | "waiting_payment"
  | "paid"
  | "in_session"
  | "completed"
  | "cancelled"
  | "expired";

export type ApplicationStatus = "pending" | "accepted" | "rejected";

type StatusBadgeProps = {
  status: RequestStatus | ApplicationStatus;
  className?: string;
};

const statusLabels: Record<RequestStatus | ApplicationStatus, string> = {
  open: "Open",
  pending_instant: "Pending Instant",
  accepted: "Accepted",
  waiting_payment: "Waiting Payment",
  paid: "Paid",
  in_session: "In Session",
  completed: "Completed",
  cancelled: "Cancelled",
  expired: "Expired",
  pending: "Pending",
  rejected: "Rejected",
};

const statusClasses: Record<RequestStatus | ApplicationStatus, string> = {
  open: "bg-secondary/15 text-secondary ring-secondary/25",
  pending_instant: "bg-tertiary/15 text-tertiary ring-tertiary/25",
  accepted: "bg-primary/15 text-primary ring-primary/25",
  waiting_payment: "bg-tertiary/15 text-tertiary ring-tertiary/25",
  paid: "bg-blue-400/15 text-blue-300 ring-blue-400/25",
  in_session: "bg-blue-400/15 text-blue-300 ring-blue-400/25",
  completed: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/25",
  cancelled: "bg-error/15 text-error ring-error/25",
  expired: "bg-outline/15 text-on-surface-variant ring-outline/25",
  pending: "bg-tertiary/15 text-tertiary ring-tertiary/25",
  rejected: "bg-error/15 text-error ring-error/25",
};

export function RequestStatusBadge({ status, className }: StatusBadgeProps) {
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
