import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ErrorStateProps = {
  message: string;
  className?: string;
};

export function ErrorState({ message, className }: ErrorStateProps) {
  return (
    <div className={cn("rounded-md border border-error/25 bg-error/10 px-md py-sm text-body-sm text-error", className)}>
      <span className="inline-flex items-center gap-sm">
        <AlertCircle className="size-4" />
        {message}
      </span>
    </div>
  );
}
