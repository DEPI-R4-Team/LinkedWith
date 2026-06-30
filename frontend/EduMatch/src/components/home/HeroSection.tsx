import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { FloatingPreviews } from "./FloatingPreviews";
import { ROUTES } from "@/lib/routes";

const AVATARS = ["👨‍🏫", "👩‍💻", "👨‍🎓"] as const;

export function HeroSection() {
  return (
    <section className="min-h-[85vh] flex items-center relative overflow-hidden px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto pt-8 pb-16">
      {/* Radial background gradient */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none"
        aria-hidden="true"
      />

      <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        {/* ── Left: Content ── */}
        <div className="space-y-8 text-center lg:text-left pt-12 lg:pt-0">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant text-body-sm text-secondary mx-auto lg:mx-0">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
            </span>
            Instant &amp; scheduled learning sessions
          </div>

          {/* Headline */}
          <h1 className="text-headline-xl md:text-[56px] md:leading-[64px] font-bold text-on-background tracking-tight">
            Get the right instructor{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              exactly when you need one.
            </span>
          </h1>

          {/* Description */}
          <p className="text-body-lg text-on-surface-variant max-w-[36rem] mx-auto lg:mx-0">
            Post detailed academic requests for scheduled sessions, or request instant
            help and connect with a verified instructor in seconds. The smarter way to
            learn.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <Link
              to={ROUTES.REGISTER}
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full sm:w-auto px-8 py-3.5 h-auto rounded-lg text-label-md font-semibold shadow-[0_0_20px_rgba(192,193,255,0.3)] hover:opacity-90 gap-2",
              )}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 0" }}
                aria-hidden="true"
              >
                add_circle
              </span>
              Create a Request
            </Link>
            <Link
              to={ROUTES.REGISTER}
              className="w-full sm:w-auto bg-surface-container border border-outline-variant text-on-background font-label-md text-label-md px-8 py-3.5 rounded-lg hover:bg-surface-variant transition-colors inline-flex items-center justify-center gap-2"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 0" }}
                aria-hidden="true"
              >
                co_present
              </span>
              Join as Instructor
            </Link>
          </div>

          {/* Avatar row */}
          <div className="flex items-center gap-4 justify-center lg:justify-start text-body-sm text-on-surface-variant pt-4">
            <div className="flex -space-x-2" aria-hidden="true">
              {AVATARS.map((emoji, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-background flex items-center justify-center text-[10px]"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <span>Over 500+ active sessions this week</span>
          </div>
        </div>

        {/* ── Right: Floating UI ── */}
        <FloatingPreviews />
      </div>
    </section>
  );
}
