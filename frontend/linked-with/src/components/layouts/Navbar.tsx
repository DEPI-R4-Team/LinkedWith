import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

const NAV_LINKS = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#instant-help", label: "Instant Help" },
  { href: "#group-sessions", label: "Group Sessions" },
  { href: "#instructors", label: "For Instructors" },
] as const;

export function Navbar() {
  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-outline-variant fixed top-0 left-0 right-0 z-50 h-16">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop h-full flex justify-between items-center">
        {/* Logo + desktop nav */}
        <div className="flex items-center gap-8">
          <Link
            to={ROUTES.HOME}
            className="text-headline-md font-headline-md font-bold text-primary flex items-center gap-2"
          >
            <span
              className="material-symbols-outlined text-[24px]"
              style={{ fontVariationSettings: "'FILL' 0" }}
              aria-hidden="true"
            >
              school
            </span>
            GradConnect
          </Link>

          <div className="hidden lg:flex gap-6 items-center">
            <a
              href=""
              className="text-primary font-bold border-b-2 border-primary pb-1 text-body-sm hover:opacity-80 transition-opacity"
            >
              Home
            </a>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-on-surface-variant text-body-sm hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            to={ROUTES.LOGIN}
            className="hidden sm:block text-on-surface-variant text-body-sm hover:text-primary transition-colors duration-200 font-medium"
          >
            Login
          </Link>
          <Link
            to={ROUTES.REGISTER}
            className={cn(
              buttonVariants({ variant: "default" }),
              "px-5 py-2.5 h-auto rounded-lg text-label-md font-semibold shadow-[0_0_15px_rgba(192,193,255,0.2)] hover:opacity-90",
            )}
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
