import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type LoadingStateProps = {
  message?: string;
  className?: string;
};

export function LoadingState({ message = "Loading...", className }: LoadingStateProps) {
  return (
    <div className={cn("rounded-md border border-outline-variant bg-surface-container p-md text-body-sm text-on-surface-variant", className)}>
      <span className="inline-flex items-center gap-sm">
        <Loader2 className="size-4 animate-spin text-primary" />
        {message}
      </span>
    </div>
  );
}
