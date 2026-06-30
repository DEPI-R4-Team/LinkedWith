import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const days = ["S", "M", "T", "W", "T", "F", "S"];
const dates = Array.from({ length: 35 }, (_, index) => index + 1);

export function MiniCalendarCard() {
  const [message, setMessage] = useState("");

  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
      <div className="flex items-center justify-between gap-md">
        <h2 className="text-headline-md text-on-surface">October 2023</h2>
        <div className="flex gap-xs">
          <button
            aria-label="Previous month"
            className="flex size-8 items-center justify-center rounded-md border border-outline-variant text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
            onClick={() => setMessage("Calendar month navigation is a placeholder in this academic version.")}
            type="button"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            aria-label="Next month"
            className="flex size-8 items-center justify-center rounded-md border border-outline-variant text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
            onClick={() => setMessage("Calendar month navigation is a placeholder in this academic version.")}
            type="button"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      {message ? <p className="mt-sm text-body-sm text-secondary">{message}</p> : null}

      <div className="mt-md grid grid-cols-7 gap-xs text-center">
        {days.map((day, index) => (
          <span className="text-label-md uppercase text-on-surface-variant" key={`${day}-${index}`}>
            {day}
          </span>
        ))}
        {dates.map((date) => (
          <span
            className={cn(
              "flex aspect-square items-center justify-center rounded-md text-body-sm text-on-surface-variant",
              date === 21 && "bg-emerald-400 text-[#052e1a]",
              date === 24 && "bg-primary text-on-primary",
              date === 23 && "bg-surface-container-high text-on-surface ring-1 ring-outline-variant",
            )}
            key={date}
          >
            {date}
          </span>
        ))}
      </div>
    </section>
  );
}
