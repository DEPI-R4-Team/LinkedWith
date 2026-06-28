import { cn } from "@/lib/utils";

export type PaymentStatus = "pending" | "held" | "released" | "refunded" | "cancelled" | "disputed";

type PaymentStatusBadgeProps = {
  status: PaymentStatus;
  className?: string;
};

const statusLabels: Record<PaymentStatus, string> = {
  pending: "Pending",
  held: "Held",
  released: "Released",
  refunded: "Refunded",
  cancelled: "Cancelled",
  disputed: "Disputed",
};

const statusClasses: Record<PaymentStatus, string> = {
  pending: "bg-tertiary/15 text-tertiary ring-tertiary/25",
  held: "bg-primary/15 text-primary ring-primary/25",
  released: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/25",
  refunded: "bg-secondary/15 text-secondary ring-secondary/25",
  cancelled: "bg-outline/15 text-on-surface-variant ring-outline/25",
  disputed: "bg-error/15 text-error ring-error/25",
};

export function PaymentStatusBadge({ status, className }: PaymentStatusBadgeProps) {
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
