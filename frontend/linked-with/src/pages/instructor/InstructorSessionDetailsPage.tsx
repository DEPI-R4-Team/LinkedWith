import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarClock,
  Clock3,
  MessageSquareText,
  Monitor,
  Users,
  Video,
} from "lucide-react";
import { SessionStatusBadge, type SessionStatus } from "@/components/ui/SessionStatusBadge";
import { ROUTES } from "@/lib/routes";

type SessionDetailsData = {
  id: string;
  subject: string;
  studentName: string;
  studentInitials: string;
  status: SessionStatus;
  date: string;
  time: string;
  duration: string;
  sessionType: "Online" | "Offline";
  sessionMode: "Individual" | "Group";
  platform: string;
  price: string;
  platformFee: string;
  totalEarned: string;
  description: string;
};

const mockSession: SessionDetailsData = {
  id: "featured-1",
  subject: "AI-Driven Medical Diagnostics — Code Review",
  studentName: "James Smith",
  studentInitials: "JS",
  status: "scheduled",
  date: "Oct 24, 2026",
  time: "14:00",
  duration: "60 Minutes",
  sessionType: "Online",
  sessionMode: "Individual",
  platform: "Google Meet",
  price: "120 EGP",
  platformFee: "12 EGP",
  totalEarned: "108 EGP",
  description:
    "Review the student's ML model architecture, discuss training pipeline improvements, and provide feedback on the data preprocessing steps for retinal disease detection.",
};

export function InstructorSessionDetailsPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [notice, setNotice] = useState("");

  const session = mockSession;

  const metadata = [
    { icon: CalendarClock, label: `${session.date} at ${session.time}` },
    { icon: Clock3, label: session.duration },
    { icon: Monitor, label: session.sessionType },
    { icon: Users, label: session.sessionMode },
    { icon: Video, label: session.platform },
  ];

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <Link
          className="mb-md inline-flex items-center gap-xs text-body-sm text-on-surface-variant transition hover:text-on-surface"
          to={ROUTES.INSTRUCTOR.SESSIONS}
        >
          <ArrowLeft className="size-4" />
          Back to Sessions
        </Link>
        <div className="flex flex-col gap-md lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-headline-lg text-on-surface">{session.subject}</h1>
            <p className="mt-xs text-body-sm text-on-surface-variant">
              Session ID: {sessionId ?? session.id}
            </p>
          </div>
          <SessionStatusBadge status={session.status} />
        </div>
      </header>

      <div className="space-y-lg px-margin-mobile py-lg md:px-margin-desktop">
        {notice && (
          <p className="rounded-md border border-secondary/25 bg-secondary/10 px-md py-sm text-body-sm text-secondary">
            {notice}
          </p>
        )}

        <div className="grid gap-lg xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-lg">
            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <h2 className="text-headline-md text-on-surface">Session Overview</h2>
              <p className="mt-md text-body-sm leading-relaxed text-on-surface-variant">
                {session.description}
              </p>
              <div className="mt-lg grid gap-md sm:grid-cols-2">
                {metadata.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      className="flex items-center gap-sm text-body-sm"
                      key={item.label}
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-surface-container-high text-on-surface-variant">
                        <Icon className="size-4" />
                      </div>
                      <span className="text-on-surface">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <h2 className="text-headline-md text-on-surface">Payment Summary</h2>
              <div className="mt-md space-y-sm">
                <div className="flex items-center justify-between text-body-sm">
                  <span className="text-on-surface-variant">Session Price</span>
                  <span className="text-on-surface">{session.price}</span>
                </div>
                <div className="flex items-center justify-between text-body-sm">
                  <span className="text-on-surface-variant">Platform Fee</span>
                  <span className="text-on-surface">-{session.platformFee}</span>
                </div>
                <div className="border-t border-outline-variant pt-sm">
                  <div className="flex items-center justify-between text-body-sm font-medium">
                    <span className="text-on-surface">Your Earnings</span>
                    <span className="text-primary">{session.totalEarned}</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-lg">
            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <h2 className="text-headline-md text-on-surface">Student</h2>
              <div className="mt-md flex items-center gap-sm">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-body-sm font-medium text-primary">
                  {session.studentInitials}
                </div>
                <div>
                  <p className="text-body-md font-medium text-on-surface">
                    {session.studentName}
                  </p>
                  <p className="text-body-sm text-on-surface-variant">Student</p>
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <h2 className="text-headline-md text-on-surface">Quick Actions</h2>
              <div className="mt-md space-y-sm">
                <Link
                  className="flex h-10 w-full items-center justify-center gap-xs rounded-md bg-primary text-body-sm font-medium text-on-primary transition hover:bg-primary/90"
                  to={ROUTES.INSTRUCTOR.CHAT}
                >
                  <MessageSquareText className="size-4" />
                  Open Chat
                </Link>
                <button
                  className="flex h-10 w-full items-center justify-center gap-xs rounded-md border border-outline-variant text-body-sm text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
                  onClick={() =>
                    setNotice(
                      "Video meeting is a placeholder in this academic version.",
                    )
                  }
                  type="button"
                >
                  <Video className="size-4" />
                  Start Meeting
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}
