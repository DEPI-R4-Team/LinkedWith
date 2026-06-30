import { cn } from "@/lib/utils";
import type { RegisterRole } from "@/types/auth";

export type { RegisterRole as Role };

type RoleOption = {
  value: RegisterRole;
  label: string;
  icon: string;
};

const ROLES: RoleOption[] = [
  { value: "student", label: "Student", icon: "school" },
  { value: "instructor", label: "Instructor", icon: "history_edu" },
];

type RoleSelectorProps = {
  value: RegisterRole;
  onChange: (role: RegisterRole) => void;
};

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <div className="flex flex-col gap-xs">
      <span className="text-label-md font-label-md text-on-surface">Select Role</span>
      <div className="grid grid-cols-2 gap-md">
        {ROLES.map((role) => {
          const isActive = value === role.value;
          return (
            <button
              key={role.value}
              type="button"
              onClick={() => onChange(role.value)}
              aria-pressed={isActive}
              className={cn(
                "group flex flex-col items-center gap-sm p-md rounded-lg border transition-all cursor-pointer",
                isActive
                  ? "border-primary bg-primary-container/10"
                  : "border-outline-variant bg-surface-container-lowest hover:border-outline hover:bg-surface-container-low",
              )}
            >
              <span
                className={cn(
                  "material-symbols-outlined group-hover:scale-110",
                  isActive
                    ? "text-primary transition-transform"
                    : "text-on-surface-variant group-hover:text-on-surface transition-all",
                )}
                style={{ fontSize: "32px", fontVariationSettings: "'FILL' 0" }}
                aria-hidden="true"
              >
                {role.icon}
              </span>
              <span className="text-label-md font-label-md text-on-surface">{role.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
