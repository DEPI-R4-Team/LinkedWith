import { useEffect } from "react";

const REVEAL_SELECTOR = ".landing-reveal";
const MOTION_READY_CLASS = "landing-motion-ready";
const VISIBLE_CLASS = "is-visible";
const FALLBACK_DELAY_MS = 1200;

export function LandingMotion() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!targets.length) {
      return;
    }

    const showAll = () => {
      document
        .querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
        .forEach((target) => target.classList.add(VISIBLE_CLASS));
    };

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      showAll();
      return;
    }

    document.documentElement.classList.add(MOTION_READY_CLASS);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(VISIBLE_CLASS);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.1,
      },
    );

    targets.forEach((target) => {
      target.classList.remove(VISIBLE_CLASS);
      observer.observe(target);
    });

    const fallbackTimer = window.setTimeout(showAll, FALLBACK_DELAY_MS);

    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
      document.documentElement.classList.remove(MOTION_READY_CLASS);
    };
  }, []);

  return null;
}
