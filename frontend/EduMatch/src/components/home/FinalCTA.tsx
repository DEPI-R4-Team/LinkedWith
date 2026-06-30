import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

export function FinalCTA() {
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-[1440px] mx-auto">
        <div className="relative rounded-[2rem] bg-surface-container-low border border-outline-variant overflow-hidden p-8 md:p-16 text-center">
          {/* Background radial gradient */}
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 max-w-[42rem] mx-auto space-y-6">
            <h2 className="text-headline-lg md:text-[40px] font-bold text-on-background leading-tight">
              Ready to turn a learning request into a real session?
            </h2>
            <p className="text-body-lg text-on-surface-variant">
              Join the academic nexus today. Whether you need help right now or want to
              plan a comprehensive study group, EduMatch makes it happen.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <Link
                to={ROUTES.REGISTER}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "px-8 py-4 h-auto rounded-xl text-label-md font-semibold shadow-[0_0_20px_rgba(192,193,255,0.2)] hover:opacity-90",
                )}
              >
                Get Started Now
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="bg-surface-variant text-on-background font-label-md text-label-md px-8 py-4 rounded-xl hover:bg-surface-container-highest transition-colors font-semibold border border-outline-variant inline-flex items-center justify-center"
              >
                Explore Requests
              </Link>
            </div>
          </div>

          {/* Floating decor icons */}
          <span
            className="absolute top-10 left-10 material-symbols-outlined text-primary/20 text-[40px] -rotate-12 select-none pointer-events-none"
            style={{ fontVariationSettings: "'FILL' 0" }}
            aria-hidden="true"
          >
            code
          </span>
          <span
            className="absolute bottom-10 right-10 material-symbols-outlined text-secondary/20 text-[40px] rotate-12 select-none pointer-events-none"
            style={{ fontVariationSettings: "'FILL' 0" }}
            aria-hidden="true"
          >
            calculate
          </span>
          <span
            className="absolute top-20 right-20 material-symbols-outlined text-tertiary/20 text-[30px] rotate-45 select-none pointer-events-none"
            style={{ fontVariationSettings: "'FILL' 0" }}
            aria-hidden="true"
          >
            science
          </span>
        </div>
      </div>
    </section>
  );
}
