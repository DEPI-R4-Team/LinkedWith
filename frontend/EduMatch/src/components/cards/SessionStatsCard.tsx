import { CalendarCheck, CalendarClock, CirclePause, XCircle } from "lucide-react";

const stats = [
  { label: "Completed", value: "12", icon: CalendarCheck, className: "text-emerald-300" },
  { label: "Upcoming", value: "4", icon: CalendarClock, className: "text-primary" },
  { label: "Active", value: "1", icon: CirclePause, className: "text-blue-300" },
  { label: "Cancelled", value: "2", icon: XCircle, className: "text-error" },
];

export function SessionStatsCard() {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
      <h2 className="text-headline-md text-on-surface">Session Stats</h2>
      <div className="mt-md grid grid-cols-2 gap-sm">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="rounded-md border border-outline-variant bg-surface-container-low p-md" key={stat.label}>
              <Icon className={`mb-sm size-5 ${stat.className}`} />
              <p className="text-headline-md text-on-surface">{stat.value}</p>
              <p className="text-body-sm text-on-surface-variant">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
