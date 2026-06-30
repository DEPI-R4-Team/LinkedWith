import { CheckCircle2, Circle } from "lucide-react";

const checklist = [
  { label: "Personal info completed", done: true },
  { label: "Email verified", done: true },
  { label: "Learning preferences added", done: true },
  { label: "Profile photo missing", done: false },
];

export function ProfileCompletionCard() {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
      <div className="flex items-center justify-between gap-md">
        <h2 className="text-headline-md text-on-surface">Profile Completion</h2>
        <span className="text-body-sm font-medium text-primary">85%</span>
      </div>
      <div className="mt-md h-2 rounded-full bg-surface-container-low">
        <div className="h-2 w-[85%] rounded-full bg-primary" />
      </div>
      <div className="mt-lg space-y-sm">
        {checklist.map((item) => (
          <div className="flex items-center gap-sm text-body-sm" key={item.label}>
            {item.done ? (
              <CheckCircle2 className="size-4 text-emerald-300" />
            ) : (
              <Circle className="size-4 text-on-surface-variant" />
            )}
            <span className={item.done ? "text-on-surface" : "text-on-surface-variant"}>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
