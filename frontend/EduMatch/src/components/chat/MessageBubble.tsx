import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

export type ChatMessage = {
  id: string;
  sender: "student" | "instructor";
  senderName?: string;
  text: string;
  attachment?: {
    name: string;
    size: string;
  };
};

type MessageBubbleProps = {
  message: ChatMessage;
  onDownloadAttachment?: () => void;
};

export function MessageBubble({ message, onDownloadAttachment }: MessageBubbleProps) {
  const isOutgoing = message.sender === "student";

  return (
    <div className={cn("flex", isOutgoing ? "justify-end" : "justify-start")}>
      <div className={cn("max-w-[min(680px,88%)]", isOutgoing ? "items-end" : "items-start")}>
        {!isOutgoing && message.senderName ? (
          <p className="mb-xs text-label-md uppercase text-on-surface-variant">
            {message.senderName}
          </p>
        ) : null}

        <div
          className={cn(
            "rounded-2xl px-md py-sm text-body-sm shadow-sm",
            isOutgoing
              ? "rounded-br-sm bg-primary text-on-primary"
              : "rounded-bl-sm border border-outline-variant bg-surface-container text-on-surface",
          )}
        >
          <p className="whitespace-pre-wrap">{message.text}</p>

          {message.attachment ? (
            <div
              className={cn(
                "mt-sm flex items-center justify-between gap-md rounded-md p-sm",
                isOutgoing
                  ? "bg-on-primary/10 text-on-primary"
                  : "bg-surface-container-low text-on-surface",
              )}
            >
              <div className="min-w-0">
                <p className="truncate text-body-sm font-medium">{message.attachment.name}</p>
                <p className="text-label-md opacity-75">{message.attachment.size}</p>
              </div>
              <button
                aria-label="Download attachment"
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-md transition",
                  isOutgoing ? "hover:bg-on-primary/10" : "hover:bg-surface-container-high",
                )}
                onClick={onDownloadAttachment}
                type="button"
              >
                <Download className="size-4" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
