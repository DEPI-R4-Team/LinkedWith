import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { getMyReviews } from "@/services/reviews.service";
import type { Review } from "@/types/review";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));
}

export function StudentReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReviews() {
      try {
        const data = await getMyReviews();
        setReviews(data);
        setError("");
      } catch {
        setError("Could not load reviews. Make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    }

    void loadReviews();
  }, []);

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <h1 className="text-headline-lg text-on-surface">My Reviews</h1>
        <p className="mt-xs max-w-2xl text-body-sm text-on-surface-variant">
          Reviews you submitted after completed sessions.
        </p>
      </header>

      <div className="space-y-md px-margin-mobile py-lg md:px-margin-desktop">
        {error ? <p className="rounded-md border border-error/25 bg-error/10 px-md py-sm text-body-sm text-error">{error}</p> : null}
        {loading ? (
          <p className="rounded-md border border-outline-variant bg-surface-container p-md text-body-sm text-on-surface-variant">
            Loading reviews...
          </p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <article className="rounded-lg border border-outline-variant bg-surface-container p-lg" key={review.id}>
              <div className="flex flex-col gap-md sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-label-md uppercase text-secondary">{review.session_title ?? "Learning Session"}</p>
                  <h2 className="mt-xs text-headline-md text-on-surface">{review.instructor_name ?? "Instructor"}</h2>
                  <p className="mt-xs text-body-sm text-on-surface-variant">{formatDate(review.created_at)}</p>
                </div>
                <div className="flex gap-xs text-tertiary">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Star className={rating <= review.rating ? "size-5 fill-tertiary" : "size-5"} key={rating} />
                  ))}
                </div>
              </div>
              <p className="mt-md text-body-sm leading-relaxed text-on-surface-variant">{review.comment ?? "No comment."}</p>
            </article>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-outline bg-surface-container-low p-xl text-center">
            <h2 className="text-headline-md text-on-surface">No reviews yet</h2>
            <p className="mt-sm text-body-sm text-on-surface-variant">
              Complete a session to leave your first review.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
