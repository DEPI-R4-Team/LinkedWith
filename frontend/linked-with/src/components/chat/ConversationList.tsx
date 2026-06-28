import { Search, SquarePen } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  ConversationItem,
  type Conversation,
} from "@/components/chat/ConversationItem";

type ConversationListProps = {
  activeConversationId: string;
  conversations: Conversation[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNewMessage: () => void;
  onSelectConversation: (conversationId: string) => void;
};

export function ConversationList({
  activeConversationId,
  conversations,
  searchTerm,
  onSearchChange,
  onNewMessage,
  onSelectConversation,
}: ConversationListProps) {
  return (
    <aside className="flex min-h-[420px] flex-col border-b border-outline-variant bg-surface-container-low lg:w-[320px] lg:border-b-0 lg:border-r">
      <div className="border-b border-outline-variant p-lg">
        <div className="flex items-center justify-between gap-md">
          <h1 className="text-headline-md text-on-surface">Messages</h1>
          <button
            aria-label="New message"
            className="flex size-10 items-center justify-center rounded-md border border-outline-variant bg-surface-container text-on-surface transition hover:bg-surface-container-high"
            onClick={onNewMessage}
            type="button"
          >
            <SquarePen className="size-4" />
          </button>
        </div>

        <div className="relative mt-md">
          <Search className="pointer-events-none absolute left-md top-1/2 size-4 -translate-y-1/2 text-on-surface-variant" />
          <Input
            className="h-11 border-outline-variant bg-surface-container pl-10 text-on-surface"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search conversations..."
            value={searchTerm}
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-xs overflow-y-auto p-sm">
        {conversations.map((conversation) => (
          <ConversationItem
            conversation={conversation}
            isActive={conversation.id === activeConversationId}
            key={conversation.id}
            onSelect={onSelectConversation}
          />
        ))}
      </div>
    </aside>
  );
}
