type HowItWorksStep = {
  number: number;
  icon: string;
  title: string;
  description: string;
};

const STEPS: HowItWorksStep[] = [
  {
    number: 1,
    icon: "travel_explore",
    title: "Choose your learning topic",
    description:
      "Pick the subject, skill, or project area where you need focused academic support.",
  },
  {
    number: 2,
    icon: "outgoing_mail",
    title: "Send a request to instructors",
    description:
      "Share your goals, preferred time, and session style so the right instructors can respond.",
  },
  {
    number: 3,
    icon: "school",
    title: "Start your session and learn",
    description:
      "Join online or offline, work through the problem, and keep your progress organized.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-margin-mobile md:px-margin-desktop scroll-mt-24">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="landing-reveal text-center mb-16 space-y-4">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-label-md font-semibold text-primary">
            How it works
          </span>
          <h2 className="text-headline-lg md:text-headline-xl font-bold text-on-background">
            Start learning in three clear steps
          </h2>
          <p className="text-body-lg text-on-surface-variant max-w-[42rem] mx-auto">
            EduMatch keeps the path from topic selection to live learning simple,
            guided, and easy to follow.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Desktop connector line */}
          <div
            className="hidden lg:block absolute top-16 left-[16%] right-[16%] h-0.5 bg-outline-variant z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="landing-reveal landing-card landing-tilt group flex flex-col items-center text-center rounded-2xl border border-outline-variant bg-surface-container-low p-6 shadow-[0_18px_50px_rgba(0,0,0,0.16)] transition-all duration-300 hover:border-primary/40 hover:bg-surface-container"
              >
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-[0_12px_30px_rgba(192,193,255,0.12)] transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105"
                >
                  <span
                    className="material-symbols-outlined text-[28px]"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                    aria-hidden="true"
                  >
                    {step.icon}
                  </span>
                </div>

                <div className="mb-3 inline-flex rounded-full border border-outline-variant bg-background/40 px-3 py-1 text-label-md font-semibold text-secondary">
                  Step {step.number}
                </div>

                <div className="space-y-2">
                  <h3 className="text-headline-md font-semibold text-on-background">{step.title}</h3>
                  <p className="text-body-sm text-on-surface-variant">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
