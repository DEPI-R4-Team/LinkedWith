import type { ComponentProps } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type InputWithIconProps = ComponentProps<typeof Input> & {
  icon: string;
};

export function InputWithIcon({ icon, className, ...props }: InputWithIconProps) {
  return (
    <div className="relative">
      <span
        className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant select-none pointer-events-none"
        style={{ fontVariationSettings: "'FILL' 0" }}
        aria-hidden="true"
      >
        {icon}
      </span>
      <Input
        className={cn(
          "w-full bg-[#0F172A] border-outline-variant rounded-lg pl-10 pr-3 py-2 h-auto",
          "text-body-md text-on-surface",
          "placeholder:text-on-surface-variant/50",
          "focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/50",
          className,
        )}
        {...props}
      />
    </div>
  );
}
