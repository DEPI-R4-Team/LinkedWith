import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Search } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { Input } from "@/components/ui/input";
import { getAdminRequests } from "@/services/admin.service";
import type { AdminRequest } from "@/types/admin";

function date(value: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));
}

function money(value: string | null) {
  return value ? `${Number(value).toFixed(2)} EGP` : "Not set";
}

export function AdminRequestsPage() {
  const [requests, setRequests] = useState<AdminRequest[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRequests() {
      setLoading(true);
      try {
        setRequests(await getAdminRequests({ search: search || undefined, status: status || undefined }));
        setError("");
      } catch {
        setError("Could not load requests. Admin access is required.");
      } finally {
        setLoading(false);
      }
    }
    void loadRequests();
  }, [search, status]);

  return (
    <AdminPage title="Requests" description="Read-only request monitoring." error={error} loading={loading} empty={!requests.length}>
      <div className="flex flex-col gap-sm sm:flex-row">
        <div className="relative min-w-0 flex-1"><Search className="pointer-events-none absolute left-md top-1/2 size-4 -translate-y-1/2 text-on-surface-variant" /><Input className="h-10 border-outline-variant bg-surface-container pl-10 text-on-surface" placeholder="Search requests..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <select className="h-10 rounded-md border border-outline-variant bg-surface-container px-md text-body-sm text-on-surface" value={status} onChange={(e) => setStatus(e.target.value)}>
          {["", "open", "waiting_payment", "paid", "in_session", "completed", "cancelled"].map((item) => <option key={item} value={item}>{item || "All statuses"}</option>)}
        </select>
      </div>
      <Table headers={["Title", "Student", "Status", "Budget", "Applications", "Created"]}>
        {requests.map((request) => <div className="grid gap-md border-b border-outline-variant px-lg py-md last:border-b-0 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_130px_120px_110px_120px]" key={request.id}>
          <span className="min-w-0"><span className="block truncate text-body-sm font-medium text-on-surface">{request.title}</span><span className="block truncate text-body-sm text-on-surface-variant">{request.subject}</span></span>
          <span className="text-body-sm text-on-surface-variant">{request.student_name ?? "Student"}</span>
          <span className="text-body-sm capitalize text-on-surface-variant">{request.status.replaceAll("_", " ")}</span>
          <span className="text-body-sm text-on-surface-variant">{money(request.budget)}</span>
          <span className="text-body-sm text-on-surface-variant">{request.applications_count}</span>
          <span className="text-body-sm text-on-surface-variant">{date(request.created_at)}</span>
        </div>)}
      </Table>
    </AdminPage>
  );
}

function AdminPage({ title, description, error, loading, empty, children }: { title: string; description: string; error: string; loading: boolean; empty: boolean; children: ReactNode }) {
  return <><header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop"><h1 className="text-headline-lg text-on-surface">{title}</h1><p className="mt-xs text-body-sm text-on-surface-variant">{description}</p></header><div className="space-y-lg px-margin-mobile py-lg md:px-margin-desktop">{error ? <ErrorState message={error} /> : null}{loading ? <LoadingState message={`Loading ${title.toLowerCase()}...`} /> : null}{children}{!loading && empty ? <EmptyState title={`No ${title.toLowerCase()} found`} message="Real platform data will appear here when available." /> : null}</div></>;
}

function Table({ headers, children }: { headers: string[]; children: ReactNode }) {
  return <section className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container"><div className="hidden gap-md border-b border-outline-variant bg-surface-container-low px-lg py-sm md:grid md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_130px_120px_110px_120px]">{headers.map((h) => <span className="text-label-md uppercase text-on-surface-variant" key={h}>{h}</span>)}</div>{children}</section>;
}
