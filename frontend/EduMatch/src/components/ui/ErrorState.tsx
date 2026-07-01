import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ErrorStateProps = {
  message: string;
  className?: string;
};

export function ErrorState({ message, className }: ErrorStateProps) {
  return (
    <div className={cn("w-full min-w-0 rounded-md border border-error/25 bg-error/10 px-md py-sm text-body-sm text-error", className)}>
      <span className="flex min-w-0 items-center gap-sm whitespace-normal break-normal">
        <AlertCircle className="size-4 shrink-0" />
        <span className="min-w-0 flex-1 whitespace-normal break-normal">{message}</span>
      </span>
    </div>
  );
}
