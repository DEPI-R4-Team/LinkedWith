import { useMemo, useState } from "react";
import { MessageSquare } from "lucide-react";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatInput } from "@/components/chat/ChatInput";
import { ConversationList } from "@/components/chat/ConversationList";
import type { Conversation } from "@/components/chat/ConversationItem";
import { MessageBubble, type ChatMessage } from "@/components/chat/MessageBubble";

const mockConversations: Conversation[] = [
  {
    id: "dr-sarah-jenkins",
    name: "Dr. Sarah Jenkins",
    role: "React Instructor",
    lastMessage:
      "The revised structure looks solid. Let's discuss it in our next session.",
    time: "Now",
    unread: 0,
    online: true,
  },
  {
    id: "frontend-group-a",
    name: "Frontend Group A",
    role: "Group Session",
    lastMessage: "Ahmed: I pushed the latest updates to the project.",
    time: "10:42 AM",
    unread: 3,
    online: false,
  },
  {
    id: "ahmed-mostafa",
    name: "Ahmed Mostafa",
    role: "Frontend Development",
    lastMessage: "Thanks for sharing the project files.",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "mona-hassan",
    name: "Mona Hassan",
    role: "Database Instructor",
    lastMessage: "Your ERD needs a small relationship correction.",
    time: "Mon",
    unread: 0,
    online: false,
  },
];

const initialMessages: ChatMessage[] = [
  {
    id: "message-1",
    sender: "instructor",
    senderName: "Dr. Sarah Jenkins",
    text:
      "I reviewed the latest React code you sent. The component structure is better now, but we should improve the state management part.",
  },
  {
    id: "message-2",
    sender: "instructor",
    senderName: "Dr. Sarah Jenkins",
    text: "I added notes to explain where the state logic can be simplified.",
    attachment: {
      name: "React_State_Notes.pdf",
      size: "2.4 MB",
    },
  },
  {
    id: "message-3",
    sender: "student",
    text:
      "Thank you, Doctor. Could you explain the difference between local state and shared state in our next session?",
  },
  {
    id: "message-4",
    sender: "instructor",
    senderName: "Dr. Sarah Jenkins",
    text:
      "Of course. We can go through examples using your own project so it becomes clearer.",
  },
];

export function ChatPage() {
  const [activeConversationId, setActiveConversationId] = useState(mockConversations[0].id);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [notice, setNotice] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const visibleConversations = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return mockConversations;
    }

    return mockConversations.filter((conversation) =>
      [conversation.name, conversation.role, conversation.lastMessage]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [searchTerm]);

  const activeConversation =
    mockConversations.find((conversation) => conversation.id === activeConversationId) ??
    mockConversations[0];

  const handleSendMessage = () => {
    const trimmedMessage = messageText.trim();

    if (!trimmedMessage) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: `message-${currentMessages.length + 1}`,
        sender: "student",
        text: trimmedMessage,
      },
    ]);
    setMessageText("");
  };

  return (
    <div className="flex h-screen min-h-[720px] flex-col overflow-hidden bg-[#0f172a] lg:flex-row">
      <ConversationList
        activeConversationId={activeConversationId}
        conversations={visibleConversations}
        onNewMessage={() => setNotice("New chat creation is a placeholder for the academic version.")}
        onSearchChange={setSearchTerm}
        onSelectConversation={(conversationId) => {
          setActiveConversationId(conversationId);
          setShowOptions(false);
        }}
        searchTerm={searchTerm}
      />

      <section className="flex min-h-0 flex-1 flex-col bg-background/80">
        <ChatHeader
          conversation={activeConversation}
          onMoreOptions={() => setShowOptions((current) => !current)}
          onReportIssue={() => {
            setNotice("Report issue is a placeholder for the academic version.");
            setShowOptions(false);
          }}
          onVideoPlaceholder={() => setNotice("Video meeting is a placeholder in this academic version.")}
          showOptions={showOptions}
        />

        <div className="min-h-0 flex-1 overflow-y-auto px-margin-mobile py-lg md:px-margin-desktop">
          <div className="mx-auto flex max-w-5xl flex-col gap-md">
            {notice ? (
              <p className="rounded-md border border-secondary/25 bg-secondary/10 px-md py-sm text-body-sm text-secondary">
                {notice}
              </p>
            ) : null}
            <div className="flex justify-center">
              <span className="rounded-full border border-outline-variant bg-surface-container px-sm py-xs text-label-md uppercase text-on-surface-variant">
                Today, 9:41 AM
              </span>
            </div>

            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onDownloadAttachment={() => setNotice("File download is a placeholder in this academic version.")}
              />
            ))}

            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-sm border border-outline-variant bg-surface-container px-md py-sm">
                <div className="flex gap-xs">
                  <span className="size-2 rounded-full bg-on-surface-variant" />
                  <span className="size-2 rounded-full bg-on-surface-variant" />
                  <span className="size-2 rounded-full bg-on-surface-variant" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {visibleConversations.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-lg text-center">
            <div className="mb-md flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
              <MessageSquare className="size-6" />
            </div>
            <h2 className="text-headline-md text-on-surface">No conversations found</h2>
            <p className="mt-sm text-body-sm text-on-surface-variant">
              Try searching by instructor, group, or message text.
            </p>
          </div>
        ) : null}

        <ChatInput
          onAttach={() => setNotice("File attachments are not implemented yet.")}
          onChange={setMessageText}
          onSend={handleSendMessage}
          value={messageText}
        />
      </section>
    </div>
  );
}
