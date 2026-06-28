import {
  BadgeDollarSign,
  CircleDollarSign,
  GraduationCap,
  RefreshCw,
  ShieldCheck,
  WalletCards,
  X,
} from "lucide-react";
import { useState } from "react";
import { HeldPaymentCard, type HeldPayment } from "@/components/cards/HeldPaymentCard";
import { PaymentSummaryCard } from "@/components/cards/PaymentSummaryCard";
import {
  StudentPaymentRequiredCard,
  type PendingPayment,
} from "@/components/cards/StudentPaymentRequiredCard";
import {
  PaymentHistoryTable,
  type PaymentHistoryRow,
} from "@/components/tables/PaymentHistoryTable";

const pendingPayments: PendingPayment[] = [
  {
    id: "pending-react-state",
    session: "React State Management Help",
    instructor: "Dr. Sarah Jenkins",
    sessionPrice: "120 EGP",
    platformFee: "12 EGP",
    total: "132 EGP",
    status: "pending",
  },
  {
    id: "pending-database-design",
    session: "Database Design Session",
    instructor: "Mona Hassan",
    sessionPrice: "150 EGP",
    platformFee: "15 EGP",
    total: "165 EGP",
    status: "pending",
  },
];

const heldPayments: HeldPayment[] = [
  {
    id: "held-frontend-group",
    session: "Frontend Group Revision",
    instructor: "Ahmed Mostafa",
    sessionMode: "Group",
    studentsJoined: "4",
    yourShare: "70 EGP",
    instructorTotal: "280 EGP",
    status: "held",
    sessionId: "1",
    sessionStatus: "Scheduled",
  },
  {
    id: "held-python-basics",
    session: "Python Basics Help",
    instructor: "Omar Khaled",
    sessionMode: "Individual",
    amountHeld: "100 EGP",
    status: "held",
    sessionId: "2",
    sessionStatus: "In Session",
  },
];

const historyRows: PaymentHistoryRow[] = [
  {
    id: "history-react-debugging",
    session: "React Debugging",
    instructor: "Dr. Sarah Jenkins",
    amount: "120 EGP",
    platformFee: "12 EGP",
    total: "132 EGP",
    status: "pending",
    date: "Oct 22, 2026",
    action: "Pay Now",
  },
  {
    id: "history-database-erd",
    session: "Database ERD Review",
    instructor: "Mona Hassan",
    amount: "150 EGP",
    platformFee: "15 EGP",
    total: "165 EGP",
    status: "held",
    date: "Oct 20, 2026",
    action: "View Session",
  },
  {
    id: "history-frontend-group",
    session: "Frontend Group Revision",
    instructor: "Ahmed Mostafa",
    amount: "70 EGP",
    platformFee: "7 EGP",
    total: "77 EGP",
    status: "released",
    date: "Oct 18, 2026",
    action: "View Receipt",
  },
  {
    id: "history-calculus",
    session: "Calculus Session",
    instructor: "Omar Khaled",
    amount: "100 EGP",
    platformFee: "10 EGP",
    total: "110 EGP",
    status: "refunded",
    date: "Oct 15, 2026",
    action: "View Details",
  },
];

const summaryCards = [
  {
    title: "Pending Payments",
    value: "2",
    description: "Awaiting your payment",
    icon: CircleDollarSign,
  },
  {
    title: "Held Payments",
    value: "3",
    description: "Protected by platform",
    icon: ShieldCheck,
  },
  {
    title: "Released Payments",
    value: "8",
    description: "Sent to instructors",
    icon: BadgeDollarSign,
  },
  {
    title: "Refunded Payments",
    value: "1",
    description: "Returned payments",
    icon: RefreshCw,
  },
];

const protectionSteps = [
  "Instructor Accepts",
  "Student Pays",
  "Platform Holds",
  "Session Completed",
  "Payment Released",
];

export function PaymentsPage() {
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentHistoryRow | null>(null);

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <div>
          <h1 className="text-headline-lg text-on-surface">Payments</h1>
          <p className="mt-xs max-w-2xl text-body-sm text-on-surface-variant">
            Track your session payments, held amounts, refunds, and payment history.
          </p>
        </div>
      </header>

      <div className="space-y-lg px-margin-mobile py-lg md:px-margin-desktop">
        <section className="grid gap-lg sm:grid-cols-2 2xl:grid-cols-4">
          {summaryCards.map((card) => (
            <PaymentSummaryCard
              description={card.description}
              icon={card.icon}
              key={card.title}
              title={card.title}
              value={card.value}
            />
          ))}
        </section>

        <div className="grid gap-lg 2xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <main className="min-w-0 space-y-lg">
            <section className="space-y-md rounded-lg border border-outline-variant bg-surface-container p-lg">
              <div>
                <p className="text-label-md uppercase text-secondary">Action Needed</p>
                <h2 className="mt-xs text-headline-md text-on-surface">Payment Required</h2>
              </div>
              <div className="space-y-md">
                {pendingPayments.map((payment) => (
                  <StudentPaymentRequiredCard
                    key={payment.id}
                    payment={payment}
                  />
                ))}
              </div>
            </section>

            <section className="space-y-md rounded-lg border border-outline-variant bg-surface-container p-lg">
              <div>
                <p className="text-label-md uppercase text-secondary">Escrow</p>
                <h2 className="mt-xs text-headline-md text-on-surface">Held Payments</h2>
              </div>
              <div className="space-y-md">
                {heldPayments.map((payment) => (
                  <HeldPaymentCard key={payment.id} payment={payment} />
                ))}
              </div>
            </section>

            <PaymentHistoryTable onViewReceipt={setSelectedReceipt} rows={historyRows} />
          </main>

          <aside className="space-y-lg">
            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <div className="flex items-start gap-md">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <h2 className="text-headline-md text-on-surface">How Payment Protection Works</h2>
                  <p className="mt-sm text-body-sm text-on-surface-variant">
                    Your payment is not released to the instructor until the session is completed
                    and confirmed.
                  </p>
                </div>
              </div>
              <ol className="mt-lg space-y-sm">
                {protectionSteps.map((step, index) => (
                  <li className="flex items-center gap-sm" key={step}>
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-label-md text-on-primary">
                      {index + 1}
                    </span>
                    <span className="text-body-sm text-on-surface">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <div className="flex items-start gap-md">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary/15 text-secondary">
                  <GraduationCap className="size-5" />
                </div>
                <div>
                  <h2 className="text-headline-md text-on-surface">Group Session Payments</h2>
                  <p className="mt-sm text-body-sm text-on-surface-variant">
                    For group sessions, each student pays only their own reduced share. The
                    instructor receives the total amount after completion.
                  </p>
                </div>
              </div>
              <dl className="mt-lg grid gap-sm rounded-md border border-outline-variant bg-surface-container-low p-md text-body-sm">
                <div className="flex justify-between gap-md">
                  <dt className="text-on-surface-variant">Students Joined</dt>
                  <dd className="font-medium text-on-surface">4</dd>
                </div>
                <div className="flex justify-between gap-md">
                  <dt className="text-on-surface-variant">Price Per Student</dt>
                  <dd className="font-medium text-on-surface">70 EGP</dd>
                </div>
                <div className="flex justify-between gap-md">
                  <dt className="text-on-surface-variant">Your Share</dt>
                  <dd className="font-medium text-on-surface">70 EGP</dd>
                </div>
                <div className="flex justify-between gap-md">
                  <dt className="text-on-surface-variant">Instructor Total</dt>
                  <dd className="font-medium text-on-surface">280 EGP</dd>
                </div>
              </dl>
            </section>

            <section className="rounded-lg border border-tertiary/30 bg-tertiary/10 p-lg">
              <div className="mb-sm flex items-center gap-sm text-tertiary">
                <WalletCards className="size-5" />
                <h2 className="text-headline-md">Academic Simulation</h2>
              </div>
              <p className="text-body-sm text-on-surface-variant">
                Payments in this project are simulated for graduation project purposes. No real
                money is processed.
              </p>
            </section>
          </aside>
        </div>
      </div>
      {selectedReceipt ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-margin-mobile">
          <section className="w-full max-w-lg rounded-lg border border-outline-variant bg-surface-container p-lg shadow-xl">
            <div className="flex items-start justify-between gap-md">
              <div>
                <p className="text-label-md uppercase text-secondary">Receipt</p>
                <h2 className="mt-xs text-headline-md text-on-surface">{selectedReceipt.session}</h2>
              </div>
              <button
                aria-label="Close receipt"
                className="flex size-9 items-center justify-center rounded-md border border-outline-variant text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
                onClick={() => setSelectedReceipt(null)}
                type="button"
              >
                <X className="size-4" />
              </button>
            </div>
            <dl className="mt-lg space-y-sm text-body-sm">
              {[
                ["Payment ID", selectedReceipt.id],
                ["Instructor", selectedReceipt.instructor],
                ["Amount", selectedReceipt.amount],
                ["Platform fee", selectedReceipt.platformFee],
                ["Total", selectedReceipt.total],
                ["Status", selectedReceipt.status],
                ["Date", selectedReceipt.date],
              ].map(([label, value]) => (
                <div className="flex justify-between gap-md" key={label}>
                  <dt className="text-on-surface-variant">{label}</dt>
                  <dd className="text-right font-medium text-on-surface">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      ) : null}
    </>
  );
}
