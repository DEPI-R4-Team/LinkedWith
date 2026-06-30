import { CalendarClock, Clock, GraduationCap, MonitorPlay, Star, Users, Video } from "lucide-react";
import { PaymentStatusBadge } from "@/components/ui/PaymentStatusBadge";
import { SessionStatusBadge } from "@/components/ui/SessionStatusBadge";
import type { SessionDetailsData } from "@/types/sessionDetails";

type SessionOverviewCardProps = {
  session: SessionDetailsData;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export function SessionOverviewCard({ session }: SessionOverviewCardProps) {
  const metadata = [
    { icon: CalendarClock, label: "Date", value: session.date },
    { icon: Clock, label: "Time", value: session.time },
    { icon: Clock, label: "Duration", value: session.duration },
    { icon: MonitorPlay, label: "Session Type", value: session.sessionType },
    { icon: Users, label: "Session Mode", value: session.sessionMode },
    { icon: Video, label: "Platform", value: session.platform },
  ];

  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
      <div className="flex flex-col gap-lg md:flex-row md:items-start md:justify-between">
        <div className="flex min-w-0 gap-md">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary text-body-md font-semibold text-on-primary">
            {getInitials(session.instructorName)}
          </div>
          <div className="min-w-0">
            <h2 className="text-headline-md text-on-surface">{session.subject}</h2>
            <p className="mt-sm text-body-md font-medium text-on-surface">{session.instructorName}</p>
            <p className="text-body-sm text-on-surface-variant">
              {session.instructorRole} · {session.instructorSpecialization}
            </p>
            <p className="mt-sm flex items-center gap-xs text-body-sm text-on-surface-variant">
              <Star className="size-4 fill-tertiary text-tertiary" />
              <span className="font-medium text-on-surface">{session.instructorRating}</span>
              <span>({session.instructorReviews} reviews)</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-sm md:justify-end">
          <SessionStatusBadge status={session.status} />
          <PaymentStatusBadge status={session.paymentStatus} />
        </div>
      </div>

      <div className="mt-lg grid gap-sm sm:grid-cols-2 xl:grid-cols-3">
        {metadata.map((item) => {
          const Icon = item.icon;

          return (
            <div className="rounded-md border border-outline-variant bg-surface-container-low p-md" key={item.label}>
              <p className="flex items-center gap-sm text-label-md uppercase text-secondary">
                <Icon className="size-4" />
                {item.label}
              </p>
              <p className="mt-xs text-body-sm font-medium text-on-surface">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-lg rounded-md border border-outline-variant bg-surface-container-low p-md">
        <p className="flex items-center gap-sm text-label-md uppercase text-secondary">
          <GraduationCap className="size-4" />
          Session focus
        </p>
        <p className="mt-xs text-body-sm text-on-surface-variant">{session.description}</p>
      </div>
    </section>
  );
}
