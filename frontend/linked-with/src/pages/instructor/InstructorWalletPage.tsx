import { useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  CircleDollarSign,
  Clock3,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Transaction = {
  id: string;
  description: string;
  studentName: string;
  amount: string;
  type: "credit" | "debit" | "pending";
  date: string;
};

const walletStats = [
  {
    label: "Pending Balance",
    value: "680 EGP",
    helper: "Held until session completion",
    icon: Clock3,
    tone: "bg-tertiary/15 text-tertiary ring-tertiary/20",
  },
  {
    label: "Available Balance",
    value: "2,340 EGP",
    helper: "Ready to withdraw",
    icon: Wallet,
    tone: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/20",
  },
  {
    label: "Total Earned",
    value: "5,120 EGP",
    helper: "All time",
    icon: CircleDollarSign,
    tone: "bg-primary/15 text-primary ring-primary/20",
  },
];

const transactions: Transaction[] = [
  {
    id: "1",
    description: "Session: AI Medical Diagnostics Review",
    studentName: "James Smith",
    amount: "+108 EGP",
    type: "credit",
    date: "Oct 24, 2023",
  },
  {
    id: "2",
    description: "Session: Blockchain Architecture Review",
    studentName: "Aisha Khan",
    amount: "+95 EGP",
    type: "credit",
    date: "Oct 22, 2023",
  },
  {
    id: "3",
    description: "Withdrawal to Bank Account",
    studentName: "—",
    amount: "-500 EGP",
    type: "debit",
    date: "Oct 20, 2023",
  },
  {
    id: "4",
    description: "Session: Drone Navigation Midterm",
    studentName: "Michael Rodriguez",
    amount: "120 EGP",
    type: "pending",
    date: "Oct 18, 2023",
  },
  {
    id: "5",
    description: "Session: FinTech Strategy Discussion",
    studentName: "Emily Wong",
    amount: "+85 EGP",
    type: "credit",
    date: "Oct 15, 2023",
  },
];

const typeClasses: Record<Transaction["type"], string> = {
  credit: "text-emerald-300",
  debit: "text-error",
  pending: "text-tertiary",
};

export function InstructorWalletPage() {
  const [notice, setNotice] = useState("");

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <h1 className="text-headline-lg text-on-surface">Wallet</h1>
        <p className="mt-xs max-w-2xl text-body-sm text-on-surface-variant">
          Track your earnings, pending payments, and withdrawals.
        </p>
      </header>

      <div className="space-y-lg px-margin-mobile py-lg md:px-margin-desktop">
        {notice && (
          <p className="rounded-md border border-secondary/25 bg-secondary/10 px-md py-sm text-body-sm text-secondary">
            {notice}
          </p>
        )}

        <section className="grid gap-md sm:grid-cols-3">
          {walletStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                className="rounded-lg border border-outline-variant bg-surface-container p-lg"
                key={stat.label}
              >
                <div className="mb-lg flex items-center justify-between gap-md">
                  <p className="text-label-md uppercase text-on-surface-variant">
                    {stat.label}
                  </p>
                  <div className={cn("rounded-md p-sm ring-1", stat.tone)}>
                    <Icon className="size-5" />
                  </div>
                </div>
                <p className="text-headline-lg text-on-surface">{stat.value}</p>
                <p className="mt-xs text-body-sm text-on-surface-variant">
                  {stat.helper}
                </p>
              </article>
            );
          })}
        </section>

        <div className="flex flex-wrap gap-sm">
          <button
            className="inline-flex h-10 items-center justify-center gap-xs rounded-md bg-primary px-md text-body-sm font-medium text-on-primary transition hover:bg-primary/90"
            onClick={() =>
              setNotice(
                "Withdrawal is a simulated action in this academic version. Funds have been queued for processing.",
              )
            }
            type="button"
          >
            <ArrowUpFromLine className="size-4" />
            Withdraw to Bank
          </button>
        </div>

        <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
          <h2 className="text-headline-md text-on-surface">
            Transaction History
          </h2>
          <div className="mt-lg overflow-hidden rounded-md border border-outline-variant">
            <div className="hidden grid-cols-[minmax(0,2fr)_minmax(0,1fr)_100px_120px] gap-md border-b border-outline-variant bg-surface-container-low px-lg py-sm md:grid">
              <span className="text-label-md uppercase text-on-surface-variant">
                Description
              </span>
              <span className="text-label-md uppercase text-on-surface-variant">
                Student
              </span>
              <span className="text-label-md uppercase text-on-surface-variant text-right">
                Amount
              </span>
              <span className="text-label-md uppercase text-on-surface-variant text-right">
                Date
              </span>
            </div>
            {transactions.map((tx, index) => (
              <div
                className={cn(
                  "grid gap-y-xs gap-x-md px-lg py-md md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_100px_120px] md:items-center",
                  index !== transactions.length - 1 &&
                    "border-b border-outline-variant",
                )}
                key={tx.id}
              >
                <div className="flex items-center gap-sm">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-surface-container-high text-on-surface-variant">
                    {tx.type === "debit" ? (
                      <ArrowUpFromLine className="size-4" />
                    ) : (
                      <ArrowDownToLine className="size-4" />
                    )}
                  </div>
                  <p className="truncate text-body-sm text-on-surface">
                    {tx.description}
                  </p>
                </div>
                <p className="text-body-sm text-on-surface-variant">
                  {tx.studentName}
                </p>
                <p
                  className={cn(
                    "text-body-sm font-medium md:text-right",
                    typeClasses[tx.type],
                  )}
                >
                  {tx.amount}
                </p>
                <p className="text-body-sm text-on-surface-variant md:text-right">
                  {tx.date}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
