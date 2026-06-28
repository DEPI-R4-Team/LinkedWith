import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";

export function InstructorProfilePage() {
  const { instructorId } = useParams();

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <Link className="inline-flex items-center gap-xs text-body-sm text-secondary transition hover:text-secondary-fixed" to="/student/instructors">
          <ArrowLeft className="size-4" />
          Back to Instructors
        </Link>
        <p className="mt-md text-label-md uppercase text-secondary">Instructor Profile</p>
        <h1 className="mt-xs text-headline-lg text-on-surface">Dr. Sarah Jenkins</h1>
        <p className="mt-xs max-w-2xl text-body-sm text-on-surface-variant">
          Mock profile page for instructor route: {instructorId ?? "1"}.
        </p>
      </header>

      <div className="grid gap-lg px-margin-mobile py-lg md:px-margin-desktop xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
          <div className="flex items-start gap-md">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary text-body-md font-semibold text-on-primary">
              SJ
            </div>
            <div>
              <h2 className="text-headline-md text-on-surface">Computer Science & AI</h2>
              <p className="mt-sm text-body-sm text-on-surface-variant">
                React, JavaScript, state management, machine learning, and academic project guidance.
              </p>
              <p className="mt-sm flex items-center gap-xs text-body-sm text-on-surface-variant">
                <Star className="size-4 fill-tertiary text-tertiary" />
                <span className="font-medium text-on-surface">4.9</span>
                <span>(124 reviews)</span>
              </p>
            </div>
          </div>
        </section>

        <aside className="rounded-lg border border-outline-variant bg-surface-container p-lg">
          <h2 className="text-headline-md text-on-surface">Actions</h2>
          <div className="mt-lg grid gap-sm">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-md text-body-sm font-medium text-on-primary transition hover:bg-primary/90"
              to="/student/requests/create"
            >
              Create Request
            </Link>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md border border-secondary/40 px-md text-body-sm font-medium text-secondary transition hover:bg-secondary/10"
              to="/student/chat"
            >
              Open Chat
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
