import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatInput } from "@/components/chat/ChatInput";
import { ConversationList } from "@/components/chat/ConversationList";
import type { Conversation } from "@/components/chat/ConversationItem";
import { MessageBubble, type ChatMessage } from "@/components/chat/MessageBubble";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/lib/routes";
import { getSessionMessages, sendMessage } from "@/services/messages.service";
import { getSessionById } from "@/services/sessions.service";
import type { Message } from "@/types/message";
import type { Session } from "@/types/session";

function errorMessage(error: unknown) {
  const status = (error as { response?: { status?: number } }).response?.status;
  if (status === 403) {
    return "You do not have access to this chat.";
  }
  if (status === 404) {
    return "Session not found.";
  }
  return "Cannot connect to server.";
}

function mapMessage(message: Message, currentUserId: number | null | undefined): ChatMessage {
  const isOutgoing = message.sender_id === currentUserId;
  return {
    id: String(message.id),
    sender: isOutgoing ? "student" : "instructor",
    senderName: isOutgoing ? undefined : message.sender_name ?? "User",
    text: message.message,
  };
}

export function InstructorChatPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const { user } = useAuth();
  const [activeConversationId, setActiveConversationId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const loadMessages = useCallback(async () => {
    if (!sessionId) {
      return;
    }

    try {
      const messageData = await getSessionMessages(sessionId);
      setMessages(messageData.map((message) => mapMessage(message, user?.id)));
      setError("");
    } catch (caughtError) {
      setError(errorMessage(caughtError));
    }
  }, [sessionId, user?.id]);

  useEffect(() => {
    async function loadSessionChat() {
      if (!sessionId) {
        setSession(null);
        setMessages([]);
        setError("");
        return;
      }

      setLoading(true);
      try {
        const sessionData = await getSessionById(Number(sessionId));
        setSession(sessionData);
        await loadMessages();
      } catch (caughtError) {
        setError(errorMessage(caughtError));
      } finally {
        setLoading(false);
      }
    }

    void loadSessionChat();
  }, [loadMessages, sessionId]);

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    const intervalId = window.setInterval(() => {
      void loadMessages();
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [loadMessages, sessionId]);

  const sessionConversation: Conversation | null = session
    ? {
        id: String(session.id),
        name: session.student_name ?? "Student",
        role: session.request_title ?? "Session Chat",
        lastMessage: messages.at(-1)?.text ?? "No messages yet.",
        time: "Now",
        unread: 0,
        online: true,
      }
    : null;

  const conversations = sessionConversation ? [sessionConversation] : [];

  const visibleConversations = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return conversations;
    }

    return conversations.filter((conversation) =>
      [conversation.name, conversation.role, conversation.lastMessage].join(" ").toLowerCase().includes(query),
    );
  }, [conversations, searchTerm]);

  const activeConversation =
    sessionConversation ?? {
      id: "empty",
      name: "Session Chat",
      role: "No session selected",
      lastMessage: "Open a session and click Open Chat to start messaging your student.",
      time: "",
      unread: 0,
      online: false,
    };

  async function handleSendMessage() {
    const trimmedMessage = messageText.trim();
    if (!trimmedMessage || !sessionId) {
      return;
    }

    try {
      const createdMessage = await sendMessage({ session_id: sessionId, message: trimmedMessage });
      setMessages((currentMessages) => [...currentMessages, mapMessage(createdMessage, user?.id)]);
      setMessageText("");
      setError("");
    } catch (caughtError) {
      setError(errorMessage(caughtError));
    }
  }

  return (
    <div className="flex h-screen min-h-[720px] flex-col overflow-hidden bg-[#0f172a] lg:flex-row">
      <ConversationList
        activeConversationId={sessionConversation?.id ?? activeConversationId}
        conversations={visibleConversations}
        onNewMessage={() => setNotice("Open one of your sessions to start chatting.")}
        onSearchChange={setSearchTerm}
        onSelectConversation={(id) => {
          setActiveConversationId(id);
          setShowOptions(false);
        }}
        searchTerm={searchTerm}
      />

      <section className="flex min-h-0 flex-1 flex-col bg-background/80">
        <ChatHeader
          conversation={activeConversation}
          onMoreOptions={() => setShowOptions((prev) => !prev)}
          onReportIssue={() => {
            setNotice("Report issue is a placeholder for the academic version.");
            setShowOptions(false);
          }}
          onVideoPlaceholder={() => setNotice("Video meeting is a placeholder in this academic version.")}
          profilePath={ROUTES.INSTRUCTOR.PROFILE}
          schedulePath={ROUTES.INSTRUCTOR.SESSIONS}
          sessionPath={sessionId ? `/instructor/sessions/${sessionId}` : ROUTES.INSTRUCTOR.SESSIONS}
          showOptions={showOptions}
        />

        <div className="min-h-0 flex-1 overflow-y-auto px-margin-mobile py-lg md:px-margin-desktop">
          <div className="mx-auto flex max-w-5xl flex-col gap-md">
            {notice ? (
              <p className="rounded-md border border-secondary/25 bg-secondary/10 px-md py-sm text-body-sm text-secondary">
                {notice}
              </p>
            ) : null}
            {error ? (
              <p className="rounded-md border border-error/25 bg-error/10 px-md py-sm text-body-sm text-error">{error}</p>
            ) : null}
            {loading ? (
              <p className="rounded-md border border-outline-variant bg-surface-container px-md py-sm text-body-sm text-on-surface-variant">
                Loading chat...
              </p>
            ) : null}

            {!sessionId ? (
              <div className="rounded-lg border border-dashed border-outline bg-surface-container-low p-xl text-center">
                <div className="mx-auto mb-md flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <MessageSquare className="size-6" />
                </div>
                <h2 className="text-headline-md text-on-surface">Select a session to chat</h2>
                <p className="mt-sm text-body-sm text-on-surface-variant">
                  Open a session and click Open Chat to start messaging your student.
                </p>
              </div>
            ) : null}

            {sessionId && messages.length === 0 && !loading && !error ? (
              <p className="rounded-md border border-dashed border-outline bg-surface-container-low p-md text-body-sm text-on-surface-variant">
                No messages yet. Send the first message for this session.
              </p>
            ) : null}

            {sessionId ? messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onDownloadAttachment={() => setNotice("File download is a placeholder in this academic version.")}
              />
            )) : null}
          </div>
        </div>

        <ChatInput
          onAttach={() => setNotice("File attachments are not implemented yet.")}
          onChange={setMessageText}
          onSend={() => void handleSendMessage()}
          disabled={!sessionId}
          value={messageText}
        />
      </section>
    </div>
  );
}
