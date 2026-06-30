import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { PaymentStatusBadge, type PaymentStatus } from "@/components/ui/PaymentStatusBadge";

export type PendingPayment = {
  id: string;
  sessionId: string;
  session: string;
  instructor: string;
  sessionPrice: string;
  platformFee: string;
  total: string;
  status: PaymentStatus;
};

type StudentPaymentRequiredCardProps = {
  payment: PendingPayment;
};

export function StudentPaymentRequiredCard({
  payment,
}: StudentPaymentRequiredCardProps) {
  const isPaid = payment.status === "held";

  return (
    <article className="rounded-lg border border-tertiary/30 bg-tertiary/10 p-lg">
      <div className="flex flex-col gap-md lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-sm flex flex-wrap items-center gap-sm">
            <h3 className="text-headline-md text-on-surface">{payment.session}</h3>
            <PaymentStatusBadge status={payment.status} />
          </div>
          <p className="text-body-sm text-on-surface-variant">Instructor: {payment.instructor}</p>
          <p className="mt-md flex max-w-2xl items-start gap-sm text-body-sm text-on-surface-variant">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-tertiary" />
            Your payment will be held safely by the platform until the session is completed.
          </p>
        </div>

        <Link
          aria-disabled={isPaid}
          className="inline-flex h-10 items-center justify-center rounded-md bg-tertiary px-md text-body-sm font-medium text-on-tertiary transition hover:bg-tertiary/90 disabled:cursor-not-allowed disabled:opacity-60"
          to={isPaid ? "/student/payments" : `/student/payments/session/${payment.sessionId}`}
        >
          {isPaid ? "Payment Held" : "Pay Now"}
        </Link>
      </div>

      <dl className="mt-lg grid gap-sm rounded-md border border-tertiary/20 bg-surface-container-low/80 p-md text-body-sm sm:grid-cols-3">
        <div>
          <dt className="text-on-surface-variant">Session Price</dt>
          <dd className="mt-xs font-medium text-on-surface">{payment.sessionPrice}</dd>
        </div>
        <div>
          <dt className="text-on-surface-variant">Platform Fee</dt>
          <dd className="mt-xs font-medium text-on-surface">{payment.platformFee}</dd>
        </div>
        <div>
          <dt className="text-on-surface-variant">Total</dt>
          <dd className="mt-xs font-medium text-on-surface">{payment.total}</dd>
        </div>
      </dl>
    </article>
  );
}
