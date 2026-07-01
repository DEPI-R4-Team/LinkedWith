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
    <section
      className={cn(
        "flex w-full min-w-0 justify-center rounded-lg border border-dashed border-outline bg-surface-container-low p-xl text-center",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[32rem] min-w-0 flex-col items-center">
        <div className="mx-auto mb-md flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Inbox className="size-6" />
        </div>
        <h2 className="w-full whitespace-normal break-normal text-center text-headline-md text-on-surface [overflow-wrap:normal] [word-break:normal]">
          {title}
        </h2>
        <p className="mx-auto mt-sm w-full max-w-[28rem] whitespace-normal break-normal text-center text-body-sm leading-relaxed text-on-surface-variant [overflow-wrap:normal] [word-break:normal]">
          {message}
        </p>
        {action ? <div className="mt-lg flex w-full justify-center">{action}</div> : null}
      </div>
    </section>
  );
}
