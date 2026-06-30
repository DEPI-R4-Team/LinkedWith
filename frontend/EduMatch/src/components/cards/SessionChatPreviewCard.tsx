import { Link } from "react-router-dom";
import { MessageSquareText } from "lucide-react";

type SessionChatPreviewCardProps = {
  sessionId?: string;
};

export function SessionChatPreviewCard({ sessionId }: SessionChatPreviewCardProps) {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
      <div>
        <p className="text-label-md uppercase text-secondary">Session Chat</p>
        <h2 className="mt-xs text-headline-md text-on-surface">Latest Message</h2>
      </div>

      <div className="mt-lg rounded-md border border-outline-variant bg-surface-container-low p-md">
        <p className="text-body-sm text-on-surface-variant">
          Open chat to view real database messages for this session.
        </p>
      </div>

      <Link
        className="mt-lg inline-flex h-10 w-full items-center justify-center gap-xs rounded-md border border-secondary/40 px-md text-body-sm font-medium text-secondary transition hover:bg-secondary/10 sm:w-auto"
        to={sessionId ? `/student/chat?sessionId=${sessionId}` : "/student/chat"}
      >
        <MessageSquareText className="size-4" />
        Open Chat
      </Link>
    </section>
  );
}
