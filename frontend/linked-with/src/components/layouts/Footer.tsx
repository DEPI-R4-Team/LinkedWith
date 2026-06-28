const FOOTER_LINKS = [
  { href: "#", label: "About" },
  { href: "#", label: "Terms" },
  { href: "#", label: "Privacy" },
  { href: "#", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-background py-12 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-primary text-[24px]"
            style={{ fontVariationSettings: "'FILL' 0" }}
            aria-hidden="true"
          >
            school
          </span>
          <span className="text-body-md font-bold text-on-background">GradConnect</span>
        </div>

        {/* Links */}
        <nav aria-label="Footer">
          <ul className="flex gap-6">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-body-sm text-on-surface-variant hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Note */}
        <div className="text-[12px] text-on-surface-variant/60 flex items-center gap-1">
          <span
            className="material-symbols-outlined text-[14px]"
            style={{ fontVariationSettings: "'FILL' 0" }}
            aria-hidden="true"
          >
            info
          </span>
          Academic Graduation Project Simulation
        </div>
      </div>
    </footer>
  );
}
