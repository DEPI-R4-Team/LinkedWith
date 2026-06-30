type TrustFeature = {
  icon: string;
  label: string;
  iconColor: string;
};

const FEATURES: TrustFeature[] = [
  { icon: "bolt", label: "Instant matching", iconColor: "text-primary" },
  { icon: "group", label: "Group discounts", iconColor: "text-secondary" },
  { icon: "shield", label: "Secure held payments", iconColor: "text-tertiary" },
  { icon: "verified", label: "Verified instructors", iconColor: "text-primary" },
  { icon: "star", label: "Verified reviews", iconColor: "text-secondary" },
];

export function TrustStrip() {
  return (
    <div className="border-y border-outline-variant bg-surface-container-lowest py-6">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:justify-between items-center text-on-surface-variant text-body-sm font-medium">
          {FEATURES.map((feature) => (
            <li key={feature.label} className="flex items-center gap-2">
              <span
                className={`material-symbols-outlined text-[18px] ${feature.iconColor}`}
                style={{ fontVariationSettings: "'FILL' 0" }}
                aria-hidden="true"
              >
                {feature.icon}
              </span>
              {feature.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
