import { cn } from "@/lib/utils";

export type Conversation = {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
};

type ConversationItemProps = {
  conversation: Conversation;
  isActive: boolean;
  onSelect: (conversationId: string) => void;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export function ConversationItem({
  conversation,
  isActive,
  onSelect,
}: ConversationItemProps) {
  return (
    <button
      className={cn(
        "w-full rounded-lg border p-md text-left transition",
        isActive
          ? "border-primary/50 bg-primary/15 shadow-[0_0_28px_rgba(192,193,255,0.10)]"
          : "border-transparent bg-transparent hover:border-outline-variant hover:bg-surface-container-high",
      )}
      onClick={() => onSelect(conversation.id)}
      type="button"
    >
      <div className="flex gap-sm">
        <div className="relative shrink-0">
          <div
            className={cn(
              "flex size-11 items-center justify-center rounded-full text-body-sm font-semibold",
              isActive
                ? "bg-primary text-on-primary"
                : "bg-surface-container-high text-on-surface",
            )}
          >
            {getInitials(conversation.name)}
          </div>
          {conversation.online ? (
            <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-surface-container bg-emerald-400" />
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-sm">
            <div className="min-w-0">
              <h3 className="truncate text-body-sm font-medium text-on-surface">
                {conversation.name}
              </h3>
              <p className="truncate text-label-md uppercase text-on-surface-variant">
                {conversation.role}
              </p>
            </div>
            <span className="shrink-0 text-label-md text-on-surface-variant">
              {conversation.time}
            </span>
          </div>

          <div className="mt-sm flex items-center gap-sm">
            <p className="line-clamp-2 min-w-0 flex-1 text-body-sm text-on-surface-variant">
              {conversation.lastMessage}
            </p>
            {conversation.unread > 0 ? (
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-label-md text-on-secondary">
                {conversation.unread}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </button>
  );
}
