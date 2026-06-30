import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Star, X } from "lucide-react";
import { GroupParticipantsCard } from "@/components/cards/GroupParticipantsCard";
import { MeetingAccessCard } from "@/components/cards/MeetingAccessCard";
import { RelatedRequestCard } from "@/components/cards/RelatedRequestCard";
import { SessionActionsCard } from "@/components/cards/SessionActionsCard";
import { SessionChatPreviewCard } from "@/components/cards/SessionChatPreviewCard";
import { SessionInstructorCard } from "@/components/cards/SessionInstructorCard";
import { SessionOverviewCard } from "@/components/cards/SessionOverviewCard";
import { SessionPaymentSummaryCard } from "@/components/cards/SessionPaymentSummaryCard";
import { SessionStatusTimelineCard } from "@/components/cards/SessionStatusTimelineCard";
import type { PaymentStatus } from "@/components/ui/PaymentStatusBadge";
import { createReview } from "@/services/reviews.service";
import { cancelSession, confirmSessionCompletion, getSessionById, startSession } from "@/services/sessions.service";
import type { Session } from "@/types/session";
import type { SessionDetailsData } from "@/types/sessionDetails";

function formatDate(value: string | null) {
  if (!value) {
    return "To be scheduled";
  }
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));
}

function formatTime(value: string | null) {
  if (!value) {
    return "Flexible";
  }
  return new Intl.DateTimeFormat("en", { timeStyle: "short" }).format(new Date(value));
}

function formatMoney(value: string | null) {
  return `${Number(value ?? 0).toFixed(2)} EGP`;
}

function mapSession(session: Session): SessionDetailsData {
  return {
    id: String(session.id),
    subject: session.request_title ?? "Learning Session",
    instructorName: session.instructor_name ?? "Instructor",
    instructorRole: "Instructor",
    instructorSpecialization: "EduMatch Instructor",
    instructorRating: 0,
    instructorReviews: 0,
    requestTitle: session.request_title ?? "Learning Request",
    sessionType: session.session_type === "offline" ? "Offline" : "Online",
    sessionMode: session.session_mode === "group" ? "Group" : "Individual",
    status: session.status,
    paymentStatus: (session.payment_status ?? "pending") as PaymentStatus,
    date: formatDate(session.scheduled_at),
    time: formatTime(session.scheduled_at),
    duration: "60 Minutes",
    platform: session.session_type === "offline" ? "Offline location" : "Online meeting",
    meetingLink: "Academic placeholder",
    price: formatMoney(session.payment_amount),
    platformFee: formatMoney(session.payment_platform_fee),
    totalPaid: formatMoney(session.payment_total_amount),
    escrowStatus: session.payment_status === "released" ? "Released" : "Held by platform",
    description: "Session created from your accepted learning request.",
  };
}

export function SessionDetailsPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const numericSessionId = Number.parseInt(sessionId ?? "", 10);
  const [backendSession, setBackendSession] = useState<Session | null>(null);
  const [completionMessage, setCompletionMessage] = useState<string | null>(null);
  const [meetingMessage, setMeetingMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  async function loadSession() {
    if (Number.isNaN(numericSessionId)) {
      setError("Invalid session id.");
      setLoading(false);
      return;
    }

    try {
      const data = await getSessionById(numericSessionId);
      setBackendSession(data);
      setReviewSubmitted(data.has_review);
      setError("");
    } catch {
      setError("Could not load session details.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numericSessionId]);

  const session = useMemo(
    () => (backendSession ? mapSession(backendSession) : null),
    [backendSession],
  );

  async function handleStartSession() {
    try {
      const updated = await startSession(numericSessionId);
      setBackendSession(updated);
      setMeetingMessage("Session started.");
    } catch {
      setMeetingMessage("Could not start this session. Make sure payment is held.");
    }
  }

  async function handleConfirmComplete() {
    try {
      const updated = await confirmSessionCompletion(numericSessionId);
      setBackendSession(updated);
      setCompletionMessage("Session completed successfully. Payment has been released to the instructor.");
    } catch {
      setCompletionMessage("Could not confirm completion. The instructor must mark the session completed first.");
    }
  }

  function handleJoinMeeting() {
    void handleStartSession();
  }

  function handleReschedule() {
    setMeetingMessage("Reschedule feature will be available later.");
  }

  async function handleCancelSession() {
    try {
      const updated = await cancelSession(numericSessionId);
      setBackendSession(updated);
      setCompletionMessage("Session cancelled. Any held payment has been refunded in simulation.");
    } catch {
      setCompletionMessage("Could not cancel this session.");
    }
  }

  async function handleSubmitReview() {
    if (!reviewComment.trim()) {
      setMeetingMessage("Add a short review comment before submitting.");
      return;
    }

    try {
      await createReview({ session_id: numericSessionId, rating: reviewRating, comment: reviewComment.trim() });
      setReviewSubmitted(true);
      setReviewOpen(false);
      setMeetingMessage("Review submitted successfully.");
      await loadSession();
    } catch {
      setMeetingMessage("Could not submit review. You may have already reviewed this session.");
    }
  }

  if (loading) {
    return <div className="p-lg text-body-sm text-on-surface-variant">Loading session details...</div>;
  }

  if (error || !session) {
    return <div className="p-lg text-body-sm text-error">{error || "Session not found."}</div>;
  }

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <Link className="inline-flex items-center gap-xs text-body-sm text-secondary transition hover:text-secondary-fixed" to="/student/sessions">
          <ArrowLeft className="size-4" />
          Back to Sessions
        </Link>
        <div className="mt-md">
          <p className="text-label-md uppercase text-secondary">Session #{session.id}</p>
          <h1 className="mt-xs text-headline-lg text-on-surface">Session Details</h1>
          <p className="mt-xs max-w-3xl text-body-sm text-on-surface-variant">
            Review session information, payment status, meeting access, and completion actions.
          </p>
        </div>
      </header>

      <div className="grid gap-lg px-margin-mobile py-lg md:px-margin-desktop xl:grid-cols-[minmax(0,1fr)_360px]">
        <main className="min-w-0 space-y-lg">
          <SessionOverviewCard session={session} />
          <RelatedRequestCard session={session} />
          <MeetingAccessCard session={session} />
          {meetingMessage ? (
            <p className="rounded-md border border-secondary/25 bg-secondary/10 px-md py-sm text-body-sm text-secondary">
              {meetingMessage}
            </p>
          ) : null}
          {backendSession?.instructor_marked_completed_at ? (
            <p className="rounded-md border border-emerald-400/25 bg-emerald-400/10 px-md py-sm text-body-sm text-emerald-300">
              Instructor marked this session as completed. You can confirm completion when ready.
            </p>
          ) : null}
          <SessionChatPreviewCard sessionId={sessionId} />
          <GroupParticipantsCard session={session} />
        </main>

        <aside className="space-y-lg">
          <SessionStatusTimelineCard session={session} />
          <SessionPaymentSummaryCard session={session} />
          <SessionActionsCard
            completedMessage={completionMessage}
            onCancelSession={handleCancelSession}
            onConfirmComplete={handleConfirmComplete}
            onJoinMeeting={handleJoinMeeting}
            onLeaveReview={() => setReviewOpen(true)}
            onReschedule={handleReschedule}
            session={session}
          />
          {session.status === "completed" && reviewSubmitted ? (
            <p className="rounded-md border border-primary/25 bg-primary/10 px-md py-sm text-body-sm text-primary">
              Review submitted.
            </p>
          ) : null}
          <SessionInstructorCard session={session} />
        </aside>
      </div>

      {reviewOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-margin-mobile">
          <section className="w-full max-w-lg rounded-lg border border-outline-variant bg-surface-container p-lg shadow-xl">
            <div className="flex items-start justify-between gap-md">
              <div>
                <p className="text-label-md uppercase text-secondary">Review</p>
                <h2 className="mt-xs text-headline-md text-on-surface">Leave Review</h2>
              </div>
              <button
                aria-label="Close review modal"
                className="flex size-9 items-center justify-center rounded-md border border-outline-variant text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
                onClick={() => setReviewOpen(false)}
                type="button"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-lg space-y-md">
              <div>
                <p className="text-label-md uppercase text-on-surface-variant">Rating</p>
                <div className="mt-sm flex gap-xs">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      aria-label={`Rate ${rating}`}
                      className="text-tertiary"
                      key={rating}
                      onClick={() => setReviewRating(rating)}
                      type="button"
                    >
                      <Star className={rating <= reviewRating ? "size-7 fill-tertiary" : "size-7"} />
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                className="min-h-28 w-full rounded-md border border-outline-variant bg-surface-container-low px-md py-sm text-body-sm text-on-surface outline-none transition placeholder:text-on-surface-variant focus:border-primary"
                onChange={(event) => setReviewComment(event.target.value)}
                placeholder="Share how the session went..."
                value={reviewComment}
              />
              <div className="flex flex-col gap-sm sm:flex-row sm:justify-end">
                <button
                  className="inline-flex h-10 items-center justify-center rounded-md border border-outline-variant px-md text-body-sm text-on-surface-variant transition hover:bg-surface-container-high"
                  onClick={() => setReviewOpen(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-md text-body-sm font-medium text-on-primary transition hover:bg-primary/90"
                  onClick={() => void handleSubmitReview()}
                  type="button"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
