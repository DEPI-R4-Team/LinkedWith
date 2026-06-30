import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Review = {
  id: string;
  studentName: string;
  studentInitials: string;
  studentColor: string;
  rating: number;
  comment: string;
  date: string;
  project: string;
};

const overallRating = 4.9;
const totalReviews = 24;
const ratingDistribution = [
  { stars: 5, count: 19 },
  { stars: 4, count: 4 },
  { stars: 3, count: 1 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

const reviews: Review[] = [
  {
    id: "1",
    studentName: "James Smith",
    studentInitials: "JS",
    studentColor: "bg-primary/20 text-primary",
    rating: 5,
    comment:
      "Dr. Smith's guidance on our ML project was exceptional. He provided clear direction on model architecture and always made time for questions.",
    date: "Oct 24, 2023",
    project: "AI-Driven Medical Diagnostics",
  },
  {
    id: "2",
    studentName: "Aisha Khan",
    studentInitials: "AK",
    studentColor: "bg-secondary/20 text-secondary",
    rating: 5,
    comment:
      "Excellent advisor who truly understands blockchain technology. The code reviews were thorough and helped me improve significantly.",
    date: "Oct 20, 2023",
    project: "Blockchain Voting System",
  },
  {
    id: "3",
    studentName: "Michael Rodriguez",
    studentInitials: "MR",
    studentColor: "bg-error/20 text-error",
    rating: 4,
    comment:
      "Very knowledgeable in control systems. Sometimes sessions ran short, but the feedback quality was always high.",
    date: "Oct 18, 2023",
    project: "Autonomous Drone Navigation",
  },
  {
    id: "4",
    studentName: "Emily Wong",
    studentInitials: "EW",
    studentColor: "bg-tertiary/20 text-tertiary",
    rating: 5,
    comment:
      "Great at breaking down complex business concepts. Helped us develop a solid market entry framework.",
    date: "Oct 12, 2023",
    project: "FinTech Market Strategy",
  },
];

function StarRating({ rating, size = "size-4" }: { rating: number; size?: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          className={cn(
            size,
            i < rating ? "fill-tertiary text-tertiary" : "text-outline",
          )}
          key={i}
        />
      ))}
    </div>
  );
}

export function InstructorReviewsPage() {
  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <h1 className="text-headline-lg text-on-surface">Reviews</h1>
        <p className="mt-xs max-w-2xl text-body-sm text-on-surface-variant">
          Student ratings and feedback from your advisory sessions.
        </p>
      </header>

      <div className="space-y-lg px-margin-mobile py-lg md:px-margin-desktop">
        <div className="grid gap-lg lg:grid-cols-[300px_minmax(0,1fr)]">
          <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
            <div className="text-center">
              <p className="text-display-lg text-on-surface">{overallRating}</p>
              <StarRating rating={Math.round(overallRating)} size="size-5" />
              <p className="mt-sm text-body-sm text-on-surface-variant">
                Based on {totalReviews} reviews
              </p>
            </div>

            <div className="mt-lg space-y-sm">
              {ratingDistribution.map((entry) => (
                <div className="flex items-center gap-sm" key={entry.stars}>
                  <span className="w-4 text-right text-body-sm text-on-surface-variant">
                    {entry.stars}
                  </span>
                  <Star className="size-3.5 fill-tertiary text-tertiary" />
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-variant">
                    <div
                      className="h-full rounded-full bg-tertiary"
                      style={{
                        width: `${totalReviews > 0 ? (entry.count / totalReviews) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <span className="w-6 text-right text-body-sm text-on-surface-variant">
                    {entry.count}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-md">
            {reviews.map((review) => (
              <article
                className="rounded-lg border border-outline-variant bg-surface-container p-lg"
                key={review.id}
              >
                <div className="flex items-start justify-between gap-md">
                  <div className="flex items-center gap-sm">
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-full text-body-sm font-medium",
                        review.studentColor,
                      )}
                    >
                      {review.studentInitials}
                    </span>
                    <div>
                      <p className="text-body-md font-medium text-on-surface">
                        {review.studentName}
                      </p>
                      <p className="text-body-sm text-on-surface-variant">
                        {review.project}
                      </p>
                    </div>
                  </div>
                  <p className="shrink-0 text-body-sm text-on-surface-variant">
                    {review.date}
                  </p>
                </div>
                <div className="mt-md">
                  <StarRating rating={review.rating} />
                </div>
                <p className="mt-sm text-body-sm leading-relaxed text-on-surface-variant">
                  {review.comment}
                </p>
              </article>
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
