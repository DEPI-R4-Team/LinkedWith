const GROUP_AVATARS = ["A", "B", "C"] as const;

export function FloatingPreviews() {
  return (
    <div
      className="relative hidden lg:block h-[600px] w-full perspective-[1000px]"
      aria-hidden="true"
    >
      {/* Soft background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl" />

      {/* Student Request Card */}
      <div className="absolute top-10 right-10 w-[340px] bg-surface-container/80 backdrop-blur-xl border border-outline-variant rounded-xl p-5 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 z-10">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-error-container text-on-error-container flex items-center justify-center">
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                bolt
              </span>
            </span>
            <div>
              <div className="text-body-sm font-semibold text-on-background">
                React Debugging
              </div>
              <div className="text-[10px] text-on-surface-variant">
                Instant Help Required
              </div>
            </div>
          </div>
          <span className="px-2 py-0.5 bg-surface-variant rounded text-[10px] text-on-surface-variant animate-pulse">
            Searching...
          </span>
        </div>
        {/* Skeleton lines */}
        <div className="space-y-2 mt-4">
          <div className="h-2 bg-surface-variant rounded w-full" />
          <div className="h-2 bg-surface-variant rounded w-4/5" />
          <div className="h-2 bg-surface-variant rounded w-2/3" />
        </div>
      </div>

      {/* Instructor Notification Card */}
      <div className="absolute top-40 left-0 w-[300px] bg-surface-container border border-outline-variant rounded-xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.4)] -rotate-6 hover:-rotate-2 transition-transform duration-500 z-30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px]">
            <div className="w-full h-full rounded-full bg-surface-container flex items-center justify-center">
              <span
                className="material-symbols-outlined text-primary text-[20px]"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                person
              </span>
            </div>
          </div>
          <div>
            <div className="text-body-sm font-semibold">New Instant Request</div>
            <div className="text-[11px] text-on-surface-variant">
              Sarah wants help with React
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            tabIndex={-1}
            className="flex-1 bg-surface-variant text-on-surface-variant text-[11px] py-1.5 rounded hover:bg-surface-container-highest transition"
          >
            Ignore
          </button>
          <button
            type="button"
            tabIndex={-1}
            className="flex-1 bg-primary text-[#1000a9] text-[11px] font-medium py-1.5 rounded hover:opacity-90 transition"
          >
            Accept Session
          </button>
        </div>
      </div>

      {/* Group Discount Card */}
      <div className="absolute bottom-20 right-4 w-[280px] bg-surface-container-low border border-primary/20 rounded-xl p-4 shadow-xl rotate-2 hover:rotate-6 transition-transform duration-500 z-20">
        <div className="flex items-center gap-2 text-primary mb-2">
          <span
            className="material-symbols-outlined text-[18px]"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            group
          </span>
          <span className="text-body-sm font-semibold">Group Discount Active</span>
        </div>
        <div className="flex justify-between items-end mt-2">
          <div className="flex -space-x-2">
            {GROUP_AVATARS.map((letter) => (
              <div
                key={letter}
                className="w-6 h-6 rounded-full bg-surface-variant border border-outline-variant flex items-center justify-center text-[10px]"
              >
                {letter}
              </div>
            ))}
          </div>
          <div className="text-right">
            <div className="text-[10px] text-on-surface-variant line-through">
              100 EGP/hr
            </div>
            <div className="text-body-md font-bold text-secondary">70 EGP/hr</div>
          </div>
        </div>
      </div>

      {/* Escrow Badge */}
      <div className="absolute top-[45%] right-[-10px] bg-surface-container-highest border border-outline-variant rounded-full px-3 py-1.5 shadow-lg flex items-center gap-2 z-40 hover:scale-105 transition">
        <span
          className="material-symbols-outlined text-[14px] text-secondary"
          style={{ fontVariationSettings: "'FILL' 0" }}
        >
          lock
        </span>
        <span className="text-[11px] font-medium text-on-surface">
          Payment Held Safely
        </span>
      </div>
    </div>
  );
}
