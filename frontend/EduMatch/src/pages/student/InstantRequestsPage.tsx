import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, MessageSquareText, WalletCards, Zap } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { cancelInstantRequest, getMyInstantRequests } from "@/services/instantRequests.service";
import type { InstantRequest } from "@/types/instantRequest";

function formatDate(value: string | null) {
  return value ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "Not set";
}

function money(value: string | null) {
  return value ? `${value} EGP` : "Not set";
}

export function InstantRequestsPage() {
  const [requests, setRequests] = useState<InstantRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadRequests() {
    try {
      setRequests(await getMyInstantRequests());
      setError("");
    } catch {
      setError("Could not load instant requests. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadRequests();
  }, []);

  async function handleCancel(requestId: number) {
    try {
      await cancelInstantRequest(requestId);
      setMessage("Instant request cancelled.");
      await loadRequests();
    } catch {
      setMessage("Could not cancel this instant request.");
    }
  }

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <div className="flex flex-col gap-md sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-headline-lg text-on-surface">Instant Requests</h1>
            <p className="mt-xs max-w-2xl text-body-sm text-on-surface-variant">
              Track urgent requests accepted by available instructors.
            </p>
          </div>
          <Link className="inline-flex h-10 items-center justify-center gap-xs rounded-md bg-primary px-md text-body-sm font-medium text-on-primary hover:bg-primary/90" to="/student/instant-requests/create">
            <Zap className="size-4" />
            Create Instant Request
          </Link>
        </div>
      </header>

      <main className="space-y-md px-margin-mobile py-lg md:px-margin-desktop">
        {message ? <p className="rounded-md border border-secondary/25 bg-secondary/10 px-md py-sm text-body-sm text-secondary">{message}</p> : null}
        {error ? <ErrorState message={error} /> : null}

        {loading ? (
          <LoadingState message="Loading instant requests..." />
        ) : requests.length === 0 ? (
          <EmptyState title="No instant requests yet." message="Create one when you need urgent help." />
        ) : (
          <section className="grid gap-md lg:grid-cols-2">
            {requests.map((request) => (
              <article className="rounded-lg border border-outline-variant bg-surface-container p-lg" key={request.id}>
                <div className="flex items-start justify-between gap-md">
                  <div className="min-w-0">
                    <h2 className="truncate text-headline-md text-on-surface">{request.title}</h2>
                    <p className="mt-xs text-body-sm text-on-surface-variant">{request.subject}</p>
                  </div>
                  <span className="rounded-full bg-secondary/15 px-sm py-xs text-label-md uppercase text-secondary">{request.status}</span>
                </div>
                <p className="mt-md line-clamp-2 text-body-sm text-on-surface-variant">{request.description}</p>
                <div className="mt-lg grid gap-sm text-body-sm sm:grid-cols-2">
                  <span className="text-on-surface-variant">Budget: <b className="text-on-surface">{money(request.budget)}</b></span>
                  <span className="text-on-surface-variant">Expires: <b className="text-on-surface">{formatDate(request.expires_at)}</b></span>
                  <span className="text-on-surface-variant">Instructor: <b className="text-on-surface">{request.accepted_instructor_name ?? "Not accepted yet"}</b></span>
                </div>
                <div className="mt-lg flex flex-wrap gap-sm">
                  <Link className="inline-flex h-10 items-center justify-center rounded-md border border-secondary/40 px-md text-body-sm text-secondary transition hover:bg-secondary/10" to={`/student/instant-requests/${request.id}`}>
                    Details
                  </Link>
                  {request.status === "waiting_payment" && request.session_id ? (
                    <Link className="inline-flex h-10 items-center justify-center gap-xs rounded-md bg-primary px-md text-body-sm font-medium text-on-primary hover:bg-primary/90" to={`/student/payments/session/${request.session_id}`}>
                      <WalletCards className="size-4" />
                      Pay Now
                    </Link>
                  ) : null}
                  {request.status === "paid" && request.session_id ? (
                    <Link className="inline-flex h-10 items-center justify-center gap-xs rounded-md border border-outline-variant px-md text-body-sm text-on-surface-variant hover:bg-surface-container-high" to={`/student/sessions/${request.session_id}`}>
                      <MessageSquareText className="size-4" />
                      Open Chat
                    </Link>
                  ) : null}
                  {request.status === "instant_open" || request.status === "waiting_payment" ? (
                    <button className="inline-flex h-10 items-center justify-center gap-xs rounded-md border border-error/35 px-md text-body-sm text-error hover:bg-error/10" onClick={() => void handleCancel(request.id)} type="button">
                      <Clock className="size-4" />
                      Cancel
                    </button>
                  ) : null}
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </>
  );
}
