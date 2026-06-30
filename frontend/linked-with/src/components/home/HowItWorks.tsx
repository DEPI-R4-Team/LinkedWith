type StepBadge = { text: string; className: string };

type HowItWorksStep = {
  number: number;
  title: string;
  description: string;
  tags?: string[];
  badge?: StepBadge;
};

const STEPS: HowItWorksStep[] = [
  {
    number: 1,
    title: "Post Request",
    description:
      "Student chooses normal, instant, or group request and describes what they need.",
    tags: ["Normal", "Instant"],
  },
  {
    number: 2,
    title: "Instructor Matches",
    description:
      "Instructors apply, or the first available instructor accepts an instant request.",
  },
  {
    number: 3,
    title: "Payment Held",
    description:
      "After acceptance, the student pays and the platform holds the payment safely.",
    badge: { text: "Held", className: "bg-secondary/20 text-secondary border border-secondary/30" },
  },
  {
    number: 4,
    title: "Learn & Complete",
    description:
      "Student and instructor chat, join the session, and confirm completion.",
  },
  {
    number: 5,
    title: "Release & Review",
    description:
      "Payment is released to the instructor, and the student leaves a review.",
    badge: { text: "Released", className: "bg-primary/20 text-primary border border-primary/30" },
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-headline-lg md:text-headline-xl font-bold text-on-background">
            How your learning request becomes a real session
          </h2>
          <p className="text-body-lg text-on-surface-variant max-w-[42rem] mx-auto">
            From posting a request to releasing the payment, every step is clear and
            protected.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Desktop connector line */}
          <div
            className="hidden lg:block absolute top-6 left-0 w-full h-0.5 bg-outline-variant z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div
                  className={
                    step.number === 1
                      ? "w-12 h-12 rounded-full bg-primary text-[#1000a9] flex items-center justify-center font-bold shadow-[0_0_15px_rgba(192,193,255,0.4)]"
                      : "w-12 h-12 rounded-full bg-surface-container border border-outline-variant text-primary flex items-center justify-center font-bold"
                  }
                >
                  {step.number}
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-on-background">{step.title}</h3>
                  <p className="text-body-sm text-on-surface-variant">{step.description}</p>

                  {step.tags && (
                    <div className="flex flex-wrap justify-center gap-1">
                      {step.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 bg-surface-container rounded border border-outline-variant"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {step.badge && (
                    <span
                      className={`inline-block text-[10px] px-2 py-0.5 rounded ${step.badge.className}`}
                    >
                      {step.badge.text}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
