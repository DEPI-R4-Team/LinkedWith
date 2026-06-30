import { useEffect, useState } from "react";
import { BadgeDollarSign, ClipboardList, MessageSquareQuote, ShieldCheck, Users, Video, WalletCards } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { getAdminPayments, getAdminRequests, getAdminStats, getAdminUsers } from "@/services/admin.service";
import type { AdminPayment, AdminRequest, AdminStats, AdminUser } from "@/types/admin";

function money(value: string | number | null | undefined) {
  return `${Number(value ?? 0).toFixed(2)} EGP`;
}

function date(value: string | null | undefined) {
  return value ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value)) : "Not set";
}

export function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [requests, setRequests] = useState<AdminRequest[]>([]);
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [statsData, userData, requestData, paymentData] = await Promise.all([
          getAdminStats(),
          getAdminUsers({ limit: 5 }),
          getAdminRequests({ limit: 5 }),
          getAdminPayments({ limit: 5 }),
        ]);
        setStats(statsData);
        setUsers(userData);
        setRequests(requestData);
        setPayments(paymentData);
        setError("");
      } catch {
        setError("Could not load admin dashboard. Admin access is required.");
      } finally {
        setLoading(false);
      }
    }
    void loadDashboard();
  }, []);

  const cards = stats
    ? [
        { label: "Total users", value: stats.total_users, icon: Users },
        { label: "Students", value: stats.total_students, icon: Users },
        { label: "Instructors", value: stats.total_instructors, icon: ShieldCheck },
        { label: "Requests", value: stats.total_requests, icon: ClipboardList },
        { label: "Active sessions", value: stats.active_sessions, icon: Video },
        { label: "Held payments", value: stats.held_payments, icon: WalletCards },
        { label: "Released payments", value: stats.released_payments, icon: BadgeDollarSign },
        { label: "Reviews", value: stats.total_reviews, icon: MessageSquareQuote },
      ]
    : [];

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <h1 className="text-headline-lg text-on-surface">Admin Dashboard</h1>
        <p className="mt-xs max-w-2xl text-body-sm text-on-surface-variant">Read-only overview of real platform activity.</p>
      </header>
      <div className="space-y-lg px-margin-mobile py-lg md:px-margin-desktop">
        {error ? <ErrorState message={error} /> : null}
        {loading ? <LoadingState message="Loading admin dashboard..." /> : null}
        {stats ? (
          <>
            <section className="grid gap-md sm:grid-cols-2 xl:grid-cols-4">
              {cards.map((card) => {
                const Icon = card.icon;
                return (
                  <article className="rounded-lg border border-outline-variant bg-surface-container p-lg" key={card.label}>
                    <div className="mb-lg flex items-center justify-between">
                      <p className="text-label-md uppercase text-on-surface-variant">{card.label}</p>
                      <div className="rounded-md bg-primary/15 p-sm text-primary"><Icon className="size-5" /></div>
                    </div>
                    <p className="text-headline-lg text-on-surface">{card.value}</p>
                  </article>
                );
              })}
            </section>
            <section className="grid gap-md lg:grid-cols-3">
              <article className="rounded-lg border border-outline-variant bg-surface-container p-lg">
                <p className="text-label-md uppercase text-secondary">Wallet pending</p>
                <p className="mt-xs text-headline-md text-on-surface">{money(stats.total_wallet_pending_balance)}</p>
              </article>
              <article className="rounded-lg border border-outline-variant bg-surface-container p-lg">
                <p className="text-label-md uppercase text-secondary">Wallet available</p>
                <p className="mt-xs text-headline-md text-on-surface">{money(stats.total_wallet_available_balance)}</p>
              </article>
              <article className="rounded-lg border border-outline-variant bg-surface-container p-lg">
                <p className="text-label-md uppercase text-secondary">Platform revenue</p>
                <p className="mt-xs text-headline-md text-on-surface">{money(stats.total_platform_revenue)}</p>
              </article>
            </section>
            <section className="grid gap-lg xl:grid-cols-3">
              <Recent title="Recent users" rows={users.map((user) => `${user.full_name} - ${user.role} - ${date(user.created_at)}`)} />
              <Recent title="Recent requests" rows={requests.map((request) => `${request.title} - ${request.status} - ${date(request.created_at)}`)} />
              <Recent title="Recent payments" rows={payments.map((payment) => `#${payment.id} - ${payment.status} - ${money(payment.total_amount)}`)} />
            </section>
          </>
        ) : !loading ? (
          <EmptyState title="No admin data" message="Platform data will appear after users start using EduMatch." />
        ) : null}
      </div>
    </>
  );
}

function Recent({ title, rows }: { title: string; rows: string[] }) {
  return (
    <article className="rounded-lg border border-outline-variant bg-surface-container p-lg">
      <h2 className="text-headline-md text-on-surface">{title}</h2>
      <div className="mt-md space-y-sm">
        {rows.length > 0 ? rows.map((row) => <p className="rounded-md bg-surface-container-low p-sm text-body-sm text-on-surface-variant" key={row}>{row}</p>) : <p className="text-body-sm text-on-surface-variant">No data yet.</p>}
      </div>
    </article>
  );
}
