export function LoadingScreen() {
  return (
    <div className="animate-fade-in bg-background min-h-screen flex flex-col items-center justify-center gap-6">
      {/* Brand */}
      <div className="flex items-center gap-2 text-primary">
        <span
          className="material-symbols-outlined text-[32px]"
          style={{ fontVariationSettings: "'FILL' 0" }}
          aria-hidden="true"
        >
          school
        </span>
        <span className="text-headline-md font-headline-md font-bold">GradConnect</span>
      </div>

      {/* Spinner */}
      <div
        className="w-10 h-10 rounded-full border-2 border-surface-container-highest border-t-primary animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
