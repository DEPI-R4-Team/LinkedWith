type BrandLogoProps = {
  subtitle?: string;
};

export function BrandLogo({ subtitle = "Sign in to your academic portal" }: BrandLogoProps) {
  return (
    <div className="text-center mb-xl">
      <h1 className="text-headline-xl font-headline-xl text-primary mb-sm">GradConnect</h1>
      <p className="text-body-md font-body-md text-on-surface-variant">{subtitle}</p>
    </div>
  );
}
