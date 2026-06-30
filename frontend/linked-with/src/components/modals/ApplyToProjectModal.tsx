import { useState } from "react";
import { CalendarClock, CircleDollarSign, Users } from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectSummary = {
  id: string;
  title: string;
  subject: string;
  subjectColor: string;
  description: string;
  duration: string;
  teamSize?: string;
};

type ApplyToProjectModalProps = {
  project: ProjectSummary;
  onClose: () => void;
  onSubmit: () => void;
};

export function ApplyToProjectModal({
  project,
  onClose,
  onSubmit,
}: ApplyToProjectModalProps) {
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-md backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Apply to Project"
    >
      <div className="w-full max-w-2xl rounded-lg border border-outline-variant bg-surface-container shadow-2xl">
        <div className="flex items-center justify-between border-b border-outline-variant px-lg py-md">
          <h2 className="text-headline-md text-on-surface">Apply to Project</h2>
          <button
            aria-label="Close"
            className="flex size-8 items-center justify-center rounded-md text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
            onClick={onClose}
            type="button"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-lg py-md">
          <div className="rounded-lg border border-outline-variant bg-surface-container-low p-md">
            <span
              className={cn(
                "mb-sm inline-block rounded-md border px-sm py-xs text-label-md uppercase",
                project.subjectColor,
              )}
            >
              {project.subject}
            </span>
            <h3 className="text-body-md font-medium text-on-surface">
              {project.title}
            </h3>
            <p className="mt-xs text-body-sm text-on-surface-variant">
              Posted by Student • 2 days ago
            </p>
            <p className="mt-md text-body-sm text-on-surface-variant">
              {project.description}
            </p>
            <div className="mt-md flex flex-wrap gap-md border-t border-outline-variant pt-md text-body-sm text-on-surface-variant">
              <span className="flex items-center gap-xs">
                <CalendarClock className="size-4" />
                Duration: {project.duration}
              </span>
              {project.teamSize && (
                <span className="flex items-center gap-xs">
                  <Users className="size-4" />
                  {project.teamSize}
                </span>
              )}
              <span className="flex items-center gap-xs">
                <CircleDollarSign className="size-4" />
                Student Budget: $500 – $800
              </span>
            </div>
          </div>

          <div className="mt-lg">
            <h4 className="text-body-md font-medium text-on-surface">
              Message to Student
            </h4>
            <p className="mt-xs text-body-sm text-on-surface-variant">
              Introduce yourself, explain your relevant expertise, and outline how
              you plan to guide the project.
            </p>
            <textarea
              className="mt-sm h-32 w-full resize-none rounded-md border border-outline-variant bg-surface-container-low px-md py-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hello, I'm Dr. Smith. I have extensive experience in reinforcement learning applied to urban systems..."
              value={message}
            />
          </div>

          <div className="mt-lg">
            <h4 className="text-body-md font-medium text-on-surface">
              Proposed Price (USD)
            </h4>
            <p className="mt-xs text-body-sm text-on-surface-variant">
              Enter your expected compensation for advising this project. Keep the
              student's stated budget in mind.
            </p>
            <div className="relative mt-sm">
              <span className="pointer-events-none absolute left-md top-1/2 -translate-y-1/2 text-body-sm text-on-surface-variant">
                $
              </span>
              <input
                className="h-10 w-full max-w-xs rounded-md border border-outline-variant bg-surface-container-low pl-8 pr-md text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                type="number"
                value={price}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-sm border-t border-outline-variant px-lg py-md">
          <button
            className="inline-flex h-10 items-center justify-center rounded-md border border-outline-variant px-lg text-body-sm text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-lg text-body-sm font-medium text-on-primary transition hover:bg-primary/90"
            onClick={onSubmit}
            type="button"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}
