import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { getAdminSessions } from "@/services/admin.service";
import type { AdminSession } from "@/types/admin";

function date(value: string | null | undefined) {
  return value ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value)) : "Not set";
}

export function AdminSessionsPage() {
  const [sessions, setSessions] = useState<AdminSession[]>([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSessions() {
      setLoading(true);
      try {
        setSessions(await getAdminSessions({ status: status || undefined }));
        setError("");
      } catch {
        setError("Could not load sessions. Admin access is required.");
      } finally {
        setLoading(false);
      }
    }
    void loadSessions();
  }, [status]);

  return <Page title="Sessions" description="Read-only session monitoring." error={error} loading={loading} empty={!sessions.length}>
    <select className="h-10 w-fit rounded-md border border-outline-variant bg-surface-container px-md text-body-sm text-on-surface" value={status} onChange={(e) => setStatus(e.target.value)}>{["", "ready", "active", "completed", "cancelled", "disputed"].map((item) => <option key={item} value={item}>{item || "All statuses"}</option>)}</select>
    <section className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container">
      <Header cols="md:grid-cols-[90px_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_110px_120px_120px]" headers={["ID", "Request", "Student", "Instructor", "Status", "Payment", "Created"]} />
      {sessions.map((session) => <div className="grid gap-md border-b border-outline-variant px-lg py-md last:border-b-0 md:grid-cols-[90px_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_110px_120px_120px]" key={session.id}>
        <span className="text-body-sm text-on-surface-variant">#{session.id}</span><span className="truncate text-body-sm text-on-surface">{session.request_title ?? "Request"}</span><span className="text-body-sm text-on-surface-variant">{session.student_name ?? "Student"}</span><span className="text-body-sm text-on-surface-variant">{session.instructor_name ?? "Instructor"}</span><span className="text-body-sm capitalize text-on-surface-variant">{session.status}</span><span className="text-body-sm capitalize text-on-surface-variant">{session.payment_status ?? "None"}</span><span className="text-body-sm text-on-surface-variant">{date(session.created_at)}</span>
      </div>)}
    </section>
  </Page>;
}

function Page({ title, description, error, loading, empty, children }: { title: string; description: string; error: string; loading: boolean; empty: boolean; children: ReactNode }) {
  return <><header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop"><h1 className="text-headline-lg text-on-surface">{title}</h1><p className="mt-xs text-body-sm text-on-surface-variant">{description}</p></header><div className="space-y-lg px-margin-mobile py-lg md:px-margin-desktop">{error ? <ErrorState message={error} /> : null}{loading ? <LoadingState message={`Loading ${title.toLowerCase()}...`} /> : null}{children}{!loading && empty ? <EmptyState title={`No ${title.toLowerCase()} found`} message="Real platform data will appear here when available." /> : null}</div></>;
}

function Header({ headers, cols }: { headers: string[]; cols: string }) {
  return <div className={`hidden gap-md border-b border-outline-variant bg-surface-container-low px-lg py-sm md:grid ${cols}`}>{headers.map((h) => <span className="text-label-md uppercase text-on-surface-variant" key={h}>{h}</span>)}</div>;
}
