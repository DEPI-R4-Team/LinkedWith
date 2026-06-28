import { Calendar, MoreVertical, Video } from "lucide-react";
import { Link } from "react-router-dom";
import type { Conversation } from "@/components/chat/ConversationItem";

type ChatHeaderProps = {
  conversation: Conversation;
  onMoreOptions: () => void;
  onReportIssue: () => void;
  onVideoPlaceholder: () => void;
  showOptions: boolean;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export function ChatHeader({
  conversation,
  onMoreOptions,
  onReportIssue,
  onVideoPlaceholder,
  showOptions,
}: ChatHeaderProps) {
  return (
    <header className="relative flex flex-col gap-md border-b border-outline-variant bg-surface-container-low px-lg py-md md:flex-row md:items-center md:justify-between">
      <div className="flex min-w-0 items-center gap-md">
        <div className="relative shrink-0">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary text-body-sm font-semibold text-on-primary">
            {getInitials(conversation.name)}
          </div>
          {conversation.online ? (
            <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-surface-container-low bg-emerald-400" />
          ) : null}
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-sm">
            <h2 className="truncate text-headline-md text-on-surface">{conversation.name}</h2>
            {conversation.online ? (
              <span className="rounded-full bg-emerald-400/15 px-sm py-xs text-label-md uppercase text-emerald-300 ring-1 ring-emerald-400/25">
                Online
              </span>
            ) : null}
          </div>
          <p className="text-body-sm text-on-surface-variant">{conversation.role}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-sm">
        <button
          aria-label="Start video call"
          className="flex size-10 items-center justify-center rounded-md border border-outline-variant bg-surface-container text-on-surface transition hover:bg-surface-container-high"
          onClick={onVideoPlaceholder}
          type="button"
        >
          <Video className="size-4" />
        </button>
        <button
          aria-label="More options"
          className="flex size-10 items-center justify-center rounded-md border border-outline-variant bg-surface-container text-on-surface transition hover:bg-surface-container-high"
          onClick={onMoreOptions}
          type="button"
        >
          <MoreVertical className="size-4" />
        </button>
        {showOptions ? (
          <div className="absolute right-lg top-20 z-20 w-52 rounded-md border border-outline-variant bg-surface-container p-xs shadow-lg">
            <Link className="block rounded-md px-sm py-xs text-body-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface" to="/student/sessions/1">
              View Session
            </Link>
            <Link className="block rounded-md px-sm py-xs text-body-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface" to={`/student/instructors/${conversation.id}`}>
              View Instructor Profile
            </Link>
            <button className="block w-full rounded-md px-sm py-xs text-left text-body-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface" onClick={onReportIssue} type="button">
              Report Issue
            </button>
          </div>
        ) : null}
        <Link
          className="inline-flex h-10 items-center justify-center gap-xs rounded-md bg-primary px-md text-body-sm font-medium text-on-primary transition hover:bg-primary/90"
          to="/student/sessions"
        >
          <Calendar className="size-4" />
          Schedule Session
        </Link>
      </div>
    </header>
  );
}
