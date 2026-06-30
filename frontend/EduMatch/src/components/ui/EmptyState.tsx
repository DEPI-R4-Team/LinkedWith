import type { ReactNode } from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  message: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({ title, message, action, className }: EmptyStateProps) {
  return (
    <section className={cn("rounded-lg border border-dashed border-outline bg-surface-container-low p-xl text-center", className)}>
      <div className="mx-auto mb-md flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Inbox className="size-6" />
      </div>
      <h2 className="text-headline-md text-on-surface">{title}</h2>
      <p className="mx-auto mt-sm max-w-xl text-body-sm text-on-surface-variant">{message}</p>
      {action ? <div className="mt-lg flex justify-center">{action}</div> : null}
    </section>
  );
}
