import { Link } from "react-router-dom";
import { EmptyState } from "@/components/ui/EmptyState";
import { ROUTES } from "@/lib/routes";

export function InstructorProjectsPage() {
  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <div>
          <h1 className="text-headline-lg text-on-surface">Browse Projects</h1>
          <p className="mt-xs text-body-sm text-on-surface-variant">
            Project-specific requests are not connected yet.
          </p>
        </div>
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
          message="Use the Browse Requests page for real student learning requests. Project-specific APIs can be added later."
          title="Project requests are not connected yet"
        />
      </div>
    </>
  );
}
