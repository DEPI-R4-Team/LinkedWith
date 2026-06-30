import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarClock,
  MessageSquareText,
  Send,
  User,
  Wallet,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { RequestStatusBadge } from "@/components/ui/RequestStatusBadge";
import { ROUTES } from "@/lib/routes";
import { applyToRequest } from "@/services/applications.service";
import { getRequestById } from "@/services/requests.service";
import type { LearningRequestDetail } from "@/types/request";

function formatDate(value: string | null) {
  if (!value) {
    return "Flexible";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatMoney(value: string | null) {
  return value ? `${value} EGP` : "Not set";
}

export function InstructorRequestDetailsPage() {
  const { requestId } = useParams<{ requestId: string }>();
  const [request, setRequest] = useState<LearningRequestDetail | null>(null);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadRequest() {
      if (!requestId) {
        setError("Missing request id.");
        setLoading(false);
        return;
      }

      const numericId = Number.parseInt(requestId, 10);
      if (Number.isNaN(numericId)) {
        setError("Invalid request id.");
        setLoading(false);
        return;
      }

      try {
        const data = await getRequestById(numericId);
        setRequest(data);
        setError("");
      } catch {
        setError("Could not load this request. Make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    }

    void loadRequest();
  }, [requestId]);

  async function handleApply() {
    if (!request) {
      return;
    }

    if (!message.trim() || !price.trim()) {
      setNotice("Add a short proposal message and proposed price first.");
      return;
    }

    setSubmitting(true);
    try {
      await applyToRequest({
        request_id: request.id,
        message: message.trim(),
        proposed_price: Number.parseFloat(price),
      });
      setNotice("Application sent. The student can now accept or reject it.");
      setMessage("");
      setPrice("");
    } catch {
      setNotice("Could not send application. You may have already applied to this request.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <Link
          className="mb-md inline-flex items-center gap-xs text-body-sm text-on-surface-variant transition hover:text-on-surface"
          to={ROUTES.INSTRUCTOR.REQUESTS}
        >
          <ArrowLeft className="size-4" />
          Back to Requests
        </Link>
        {loading ? (
          <p className="text-body-sm text-on-surface-variant">Loading request...</p>
        ) : request ? (
          <div className="flex flex-col gap-md lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-headline-lg text-on-surface">{request.title}</h1>
              <p className="mt-xs text-body-sm text-on-surface-variant">
                {request.subject} {request.level ? `- ${request.level}` : ""}
              </p>
            </div>
            <RequestStatusBadge status={request.status} />
          </div>
        ) : null}
      </header>

      <div className="space-y-lg px-margin-mobile py-lg md:px-margin-desktop">
        {error ? (
          <p className="rounded-md border border-error/25 bg-error/10 px-md py-sm text-body-sm text-error">{error}</p>
        ) : null}
        {notice ? (
          <p className="rounded-md border border-secondary/25 bg-secondary/10 px-md py-sm text-body-sm text-secondary">
            {notice}
          </p>
        ) : null}

        {request ? (
          <div className="grid gap-lg xl:grid-cols-[minmax(0,1fr)_360px]">
            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <h2 className="text-headline-md text-on-surface">Request Details</h2>
              <div className="mt-lg grid gap-md sm:grid-cols-2">
                <div className="flex items-center gap-sm">
                  <div className="flex size-9 items-center justify-center rounded-md bg-surface-container-high text-primary">
                    <User className="size-4" />
                  </div>
                  <div>
                    <p className="text-label-md uppercase text-on-surface-variant">Student</p>
                    <p className="text-body-md text-on-surface">{request.student_name ?? "Student"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-sm">
                  <div className="flex size-9 items-center justify-center rounded-md bg-surface-container-high text-secondary">
                    <CalendarClock className="size-4" />
                  </div>
                  <div>
                    <p className="text-label-md uppercase text-on-surface-variant">Preferred Time</p>
                    <p className="text-body-md text-on-surface">{formatDate(request.preferred_datetime)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-sm">
                  <div className="flex size-9 items-center justify-center rounded-md bg-surface-container-high text-tertiary">
                    <Wallet className="size-4" />
                  </div>
                  <div>
                    <p className="text-label-md uppercase text-on-surface-variant">Budget</p>
                    <p className="text-body-md text-on-surface">{formatMoney(request.base_price)}</p>
                  </div>
                </div>
                {request.request_type === "group" ? (
                  <>
                    <div className="flex items-center gap-sm">
                      <div className="flex size-9 items-center justify-center rounded-md bg-surface-container-high text-primary">
                        <User className="size-4" />
                      </div>
                      <div>
                        <p className="text-label-md uppercase text-on-surface-variant">Group Price</p>
                        <p className="text-body-md text-on-surface">{formatMoney(request.current_price_per_student ?? request.final_price_per_student)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-sm">
                      <div className="flex size-9 items-center justify-center rounded-md bg-surface-container-high text-secondary">
                        <User className="size-4" />
                      </div>
                      <div>
                        <p className="text-label-md uppercase text-on-surface-variant">Participants</p>
                        <p className="text-body-md text-on-surface">Max {request.max_participants ?? request.max_students ?? "-"}</p>
                      </div>
                    </div>
                  </>
                ) : null}
                <div className="flex items-center gap-sm">
                  <div className="flex size-9 items-center justify-center rounded-md bg-surface-container-high text-on-surface-variant">
                    <MessageSquareText className="size-4" />
                  </div>
                  <div>
                    <p className="text-label-md uppercase text-on-surface-variant">Applications</p>
                    <p className="text-body-md text-on-surface">{request.applications_count}</p>
                  </div>
                </div>
              </div>

              <div className="mt-lg rounded-md border border-outline-variant bg-surface-container-low p-md">
                <p className="text-label-md uppercase text-on-surface-variant">Student Message</p>
                <p className="mt-xs text-body-sm leading-relaxed text-on-surface">{request.description}</p>
              </div>
            </section>

            <aside className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <h2 className="text-headline-md text-on-surface">Apply</h2>
              <div className="mt-md space-y-sm">
                <textarea
                  className="min-h-28 w-full rounded-md border border-outline-variant bg-surface-container-low px-md py-sm text-body-sm text-on-surface outline-none transition placeholder:text-on-surface-variant focus:border-primary"
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Write a short proposal for the student"
                  value={message}
                />
                <Input
                  className="h-10 border-outline-variant bg-surface-container-low text-on-surface"
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="Proposed price"
                  type="number"
                  value={price}
                />
                <button
                  className="inline-flex h-10 w-full cursor-pointer items-center justify-center gap-xs rounded-md bg-primary px-md text-body-sm font-medium text-on-primary transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-45"
                  disabled={submitting || request.status !== "open"}
                  onClick={() => void handleApply()}
                  type="button"
                >
                  <Send className="size-4" />
                  {submitting ? "Sending..." : "Send Application"}
                </button>
              </div>
            </aside>
          </div>
        ) : null}
      </div>
    </>
  );
}
