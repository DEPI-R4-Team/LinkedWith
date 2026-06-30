import { Link } from "react-router-dom";
import { PaymentStatusBadge, type PaymentStatus } from "@/components/ui/PaymentStatusBadge";

export type PaymentHistoryRow = {
  id: string;
  sessionId?: string;
  session: string;
  instructor: string;
  amount: string;
  platformFee: string;
  total: string;
  status: PaymentStatus;
  date: string;
  action: "Pay Now" | "View Session" | "View Receipt" | "View Details";
};

type PaymentHistoryTableProps = {
  onViewReceipt: (row: PaymentHistoryRow) => void;
  rows: PaymentHistoryRow[];
};

export function PaymentHistoryTable({ onViewReceipt, rows }: PaymentHistoryTableProps) {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
      <h2 className="text-headline-md text-on-surface">Payment History</h2>

      <div className="mt-lg overflow-x-auto">
        <table className="w-full min-w-[840px] text-left text-body-sm">
          <thead className="border-b border-outline-variant text-label-md uppercase text-on-surface-variant">
            <tr>
              <th className="pb-sm pr-md font-medium">Session</th>
              <th className="pb-sm pr-md font-medium">Instructor</th>
              <th className="pb-sm pr-md font-medium">Amount</th>
              <th className="pb-sm pr-md font-medium">Platform Fee</th>
              <th className="pb-sm pr-md font-medium">Total</th>
              <th className="pb-sm pr-md font-medium">Status</th>
              <th className="pb-sm pr-md font-medium">Date</th>
              <th className="pb-sm font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="py-md pr-md font-medium text-on-surface">{row.session}</td>
                <td className="py-md pr-md text-on-surface-variant">{row.instructor}</td>
                <td className="py-md pr-md text-on-surface-variant">{row.amount}</td>
                <td className="py-md pr-md text-on-surface-variant">{row.platformFee}</td>
                <td className="py-md pr-md text-on-surface">{row.total}</td>
                <td className="py-md pr-md">
                  <PaymentStatusBadge status={row.status} />
                </td>
                <td className="py-md pr-md text-on-surface-variant">{row.date}</td>
                <td className="py-md">
                  {row.action === "Pay Now" ? (
                    <Link
                      className="inline-flex h-9 items-center justify-center rounded-md bg-tertiary px-md text-body-sm font-medium text-on-tertiary transition hover:bg-tertiary/90 disabled:cursor-not-allowed disabled:opacity-60"
                      to={row.sessionId ? `/student/payments/session/${row.sessionId}` : "/student/payments"}
                    >
                      Pay Now
                    </Link>
                  ) : row.action === "View Session" ? (
                    <Link
                      className="inline-flex h-9 items-center justify-center rounded-md border border-secondary/40 px-md text-body-sm font-medium text-secondary transition hover:bg-secondary/10"
                      to={row.sessionId ? `/student/sessions/${row.sessionId}` : "/student/sessions"}
                    >
                      View Session
                    </Link>
                  ) : (
                    <button
                      className="inline-flex h-9 items-center justify-center rounded-md border border-outline-variant px-md text-body-sm font-medium text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
                      onClick={() => onViewReceipt(row)}
                      type="button"
                    >
                      {row.action}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
