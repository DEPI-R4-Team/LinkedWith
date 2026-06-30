import { useState } from "react";
import { CalendarClock, Clock3, Save, Zap } from "lucide-react";

const availabilitySlots = [
  { day: "Today", time: "6:00 PM - 9:00 PM", active: true },
  { day: "Tomorrow", time: "5:00 PM - 8:00 PM", active: true },
  { day: "Thursday", time: "7:00 PM - 10:00 PM", active: false },
];

export function InstructorAvailabilityPage() {
  const [notice, setNotice] = useState("");

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <h1 className="text-headline-lg text-on-surface">Availability</h1>
        <p className="mt-xs max-w-2xl text-body-sm text-on-surface-variant">
          Manage when students can request sessions with you.
        </p>
      </header>

      <div className="space-y-lg px-margin-mobile py-lg md:px-margin-desktop">
        {notice && (
          <p className="rounded-md border border-secondary/25 bg-secondary/10 px-md py-sm text-body-sm text-secondary">
            {notice}
          </p>
        )}

        <section className="grid gap-md md:grid-cols-3">
          <article className="rounded-lg border border-outline-variant bg-surface-container p-lg">
            <div className="mb-md flex items-center justify-between gap-md">
              <p className="text-label-md uppercase text-on-surface-variant">
                Available today
              </p>
              <Clock3 className="size-5 text-primary" />
            </div>
            <p className="text-headline-md text-on-surface">6:00 PM - 9:00 PM</p>
            <p className="mt-xs text-body-sm text-on-surface-variant">
              Visible to students browsing instructors.
            </p>
          </article>

          <article className="rounded-lg border border-outline-variant bg-surface-container p-lg">
            <div className="mb-md flex items-center justify-between gap-md">
              <p className="text-label-md uppercase text-on-surface-variant">
                Next free slot
              </p>
              <CalendarClock className="size-5 text-secondary" />
            </div>
            <p className="text-headline-md text-on-surface">Tomorrow, 5:00 PM</p>
            <p className="mt-xs text-body-sm text-on-surface-variant">
              First available time for new sessions.
            </p>
          </article>

          <article className="rounded-lg border border-outline-variant bg-surface-container p-lg">
            <div className="mb-md flex items-center justify-between gap-md">
              <p className="text-label-md uppercase text-on-surface-variant">
                Instant requests
              </p>
              <Zap className="size-5 text-tertiary" />
            </div>
            <p className="text-headline-md text-on-surface">Enabled</p>
            <p className="mt-xs text-body-sm text-on-surface-variant">
              You can receive urgent matching requests.
            </p>
          </article>
        </section>

        <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
          <div className="flex flex-col gap-md sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-headline-md text-on-surface">Weekly Slots</h2>
              <p className="mt-xs text-body-sm text-on-surface-variant">
                Static sample schedule for now. Backend saving comes later.
              </p>
            </div>
            <button
              className="inline-flex h-10 cursor-pointer items-center justify-center gap-xs rounded-md bg-primary px-md text-body-sm font-medium text-on-primary transition hover:bg-primary/90"
              onClick={() => setNotice("Availability preferences saved locally for this demo.")}
              type="button"
            >
              <Save className="size-4" />
              Save Availability
            </button>
          </div>

          <div className="mt-lg grid gap-md">
            {availabilitySlots.map((slot) => (
              <div
                className="flex flex-col gap-sm rounded-md border border-outline-variant bg-surface-container-low p-md sm:flex-row sm:items-center sm:justify-between"
                key={slot.day}
              >
                <div>
                  <p className="text-body-md font-medium text-on-surface">{slot.day}</p>
                  <p className="text-body-sm text-on-surface-variant">{slot.time}</p>
                </div>
                <span
                  className={
                    slot.active
                      ? "inline-flex w-fit rounded-full bg-emerald-400/15 px-sm py-xs text-label-md uppercase text-emerald-300 ring-1 ring-emerald-400/25"
                      : "inline-flex w-fit rounded-full bg-outline/15 px-sm py-xs text-label-md uppercase text-on-surface-variant ring-1 ring-outline/25"
                  }
                >
                  {slot.active ? "Available" : "Hidden"}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
