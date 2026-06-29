import { CreditCard, FileText, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";
import { RequestStatusBadge, type RequestStatus } from "@/components/ui/RequestStatusBadge";

type RequestSummaryCardProps = {
  applicationsCount: number;
  budget: string;
  paymentStatus: string;
  requestStatus: RequestStatus;
};

const actionByStatus: Partial<Record<RequestStatus, { label: string; to: string }>> = {
  waiting_payment: { label: "Pay Now", to: "/student/payments" },
  in_session: { label: "Open Session", to: "/student/sessions" },
  completed: { label: "Leave Review", to: "/student/reviews" },
};

export function RequestSummaryCard({
  applicationsCount,
  budget,
  paymentStatus,
  requestStatus,
}: RequestSummaryCardProps) {
  const action = actionByStatus[requestStatus] ?? {
    label: "Edit Request",
    to: "/student/requests/1/edit",
  };

  return (
    <aside className="rounded-lg border border-outline-variant bg-surface-container-low p-lg">
      <div className="rounded-md border border-primary/20 bg-primary/10 p-lg text-center">
        <p className="text-headline-xl text-primary">{applicationsCount}</p>
        <p className="mt-xs text-label-md uppercase text-on-surface-variant">Applications</p>
      </div>

      <dl className="mt-lg space-y-md">
        <div className="flex items-center justify-between gap-md">
          <dt className="flex items-center gap-sm text-body-sm text-on-surface-variant">
            <FileText className="size-4 text-secondary" />
            Request status
          </dt>
          <dd>
            <RequestStatusBadge status={requestStatus} />
          </dd>
        </div>
        <div className="flex items-center justify-between gap-md">
          <dt className="flex items-center gap-sm text-body-sm text-on-surface-variant">
            <CreditCard className="size-4 text-secondary" />
            Payment
          </dt>
          <dd className="text-right text-body-sm font-medium text-on-surface">{paymentStatus}</dd>
        </div>
        <div className="flex items-center justify-between gap-md">
          <dt className="flex items-center gap-sm text-body-sm text-on-surface-variant">
            <WalletCards className="size-4 text-secondary" />
            Budget
          </dt>
          <dd className="text-body-sm font-medium text-on-surface">{budget}</dd>
        </div>
      </dl>

      <Link
        className="mt-lg inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-md text-body-sm font-medium text-on-primary transition hover:bg-primary/90"
        to={action.to}
      >
        {action.label}
      </Link>
    </aside>
  );
}
