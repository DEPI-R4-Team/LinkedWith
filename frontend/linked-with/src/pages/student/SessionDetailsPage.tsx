import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
import type { SessionStatus } from "@/components/ui/SessionStatusBadge";
import type { SessionDetailsData } from "@/types/sessionDetails";

const sessionData: SessionDetailsData = {
  id: "SES-1024",
  subject: "React State Management Review",
  instructorName: "Dr. Sarah Jenkins",
  instructorRole: "React Instructor",
  instructorSpecialization: "Computer Science & AI",
  instructorRating: 4.9,
  instructorReviews: 124,
  requestTitle: "React State Management Help",
  sessionType: "Online",
  sessionMode: "Individual",
  status: "scheduled",
  paymentStatus: "held",
  date: "Oct 24, 2026",
  time: "14:00",
  duration: "60 Minutes",
  platform: "Google Meet",
  meetingLink: "UI-only placeholder",
  price: "120 EGP",
  platformFee: "12 EGP",
  totalPaid: "132 EGP",
  escrowStatus: "Held by platform",
  description:
    "Review React local state, shared state, hooks, component rendering, and best practices using the student's project.",
};

export function SessionDetailsPage() {
  const [status, setStatus] = useState<SessionStatus>(sessionData.status);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(sessionData.paymentStatus);
  const [completionMessage, setCompletionMessage] = useState<string | null>(null);
  const [meetingMessage, setMeetingMessage] = useState<string | null>(null);

  const session = useMemo(
    () => ({
      ...sessionData,
      status,
      paymentStatus,
    }),
    [paymentStatus, status],
  );

  function handleConfirmComplete() {
    setStatus("completed");
    setPaymentStatus("released");
    setCompletionMessage("Session completed successfully. Payment has been released to the instructor.");
  }

  function handleJoinMeeting() {
    setMeetingMessage("Meeting link is a placeholder in this academic version.");
  }

  function handleReschedule() {
    setMeetingMessage("Reschedule feature will be available later.");
  }

  function handleCancelSession() {
    setStatus("cancelled");
    setPaymentStatus(paymentStatus === "held" ? "refunded" : paymentStatus);
    setCompletionMessage("Session cancelled. Payment has been marked as refunded in simulation.");
  }

  function handleLeaveReview() {
    setMeetingMessage("Review page is not implemented yet.");
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
          <SessionChatPreviewCard />
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
            onLeaveReview={handleLeaveReview}
            onReschedule={handleReschedule}
            session={session}
          />
          <SessionInstructorCard session={session} />
        </aside>
      </div>
    </>
  );
}
