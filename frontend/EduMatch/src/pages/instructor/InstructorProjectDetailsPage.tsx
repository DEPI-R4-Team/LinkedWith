import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { ROUTES } from "@/lib/routes";

export function InstructorProjectDetailsPage() {
  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <Link
          className="mb-md inline-flex items-center gap-xs text-body-sm text-on-surface-variant transition hover:text-on-surface"
          to={ROUTES.INSTRUCTOR.PROJECTS}
        >
          <ArrowLeft className="size-4" />
          Back to Projects
        </Link>
        <h1 className="text-headline-lg text-on-surface">Project Details</h1>
        <p className="mt-xs text-body-sm text-on-surface-variant">
          Project-specific request details are not connected yet.
        </p>
      </header>

      <div className="px-margin-mobile py-lg md:px-margin-desktop">
        <EmptyState
          action={
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-md text-body-sm font-medium text-on-primary transition hover:bg-primary/90"
              to={ROUTES.INSTRUCTOR.REQUESTS}
            >
              Browse Real Requests
            </Link>
          }
          message="Real request details are available from the Browse Requests page."
          title="Project details are not connected yet"
        />
      </div>
    </>
  );
}
