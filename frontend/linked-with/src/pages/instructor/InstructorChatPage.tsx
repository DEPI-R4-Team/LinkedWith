import { useMemo, useState } from "react";
import { MessageSquare } from "lucide-react";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatInput } from "@/components/chat/ChatInput";
import { ConversationList } from "@/components/chat/ConversationList";
import type { Conversation } from "@/components/chat/ConversationItem";
import { MessageBubble, type ChatMessage } from "@/components/chat/MessageBubble";

const mockConversations: Conversation[] = [
  {
    id: "james-smith",
    name: "James Smith",
    role: "CS499 — Capstone",
    lastMessage:
      "I've pushed the latest model training results. Can we review them?",
    time: "Now",
    unread: 2,
    online: true,
  },
  {
    id: "aisha-khan",
    name: "Aisha Khan",
    role: "Blockchain Project",
    lastMessage: "Thank you for the feedback on the smart contract design.",
    time: "11:20 AM",
    unread: 0,
    online: true,
  },
  {
    id: "michael-rodriguez",
    name: "Michael Rodriguez",
    role: "Drone Navigation",
    lastMessage: "The collision avoidance algorithm is passing all tests now.",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "emily-wong",
    name: "Emily Wong",
    role: "FinTech Capstone",
    lastMessage: "Can we schedule the next review meeting?",
    time: "Mon",
    unread: 0,
    online: false,
  },
];

const initialMessages: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "student",
    senderName: "James Smith",
    text: "Dr. Smith, I've completed the data preprocessing pipeline. The dataset now has 12,000 retinal images after augmentation.",
  },
  {
    id: "msg-2",
    sender: "instructor",
    text: "Great progress. Make sure you're using stratified sampling for the train/validation split to maintain class balance.",
  },
  {
    id: "msg-3",
    sender: "student",
    senderName: "James Smith",
    text: "Good point. I'll update the split strategy. Also, should we use ResNet-50 or EfficientNet as the backbone?",
  },
  {
    id: "msg-4",
    sender: "instructor",
    text: "For medical imaging with this dataset size, I'd recommend EfficientNet-B3. It gives better accuracy with fewer parameters. I'll share some benchmark results in our next session.",
  },
];

export function InstructorChatPage() {
  const [activeConversationId, setActiveConversationId] = useState(
    mockConversations[0].id,
  );
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
    mockConversations.find((c) => c.id === activeConversationId) ??
    mockConversations[0];

  function handleSendMessage() {
    const trimmed = messageText.trim();

    if (!trimmed) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: `msg-${current.length + 1}`,
        sender: "instructor",
        text: trimmed,
      },
    ]);
    setMessageText("");
  }

  return (
    <div className="flex h-screen min-h-[720px] flex-col overflow-hidden bg-[#0f172a] lg:flex-row">
      <ConversationList
        activeConversationId={activeConversationId}
        conversations={visibleConversations}
        onNewMessage={() =>
          setNotice(
            "New chat creation is a placeholder for the academic version.",
          )
        }
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
            setNotice(
              "Report issue is a placeholder for the academic version.",
            );
            setShowOptions(false);
          }}
          onVideoPlaceholder={() =>
            setNotice(
              "Video meeting is a placeholder in this academic version.",
            )
          }
          showOptions={showOptions}
        />

        <div className="min-h-0 flex-1 overflow-y-auto px-margin-mobile py-lg md:px-margin-desktop">
          <div className="mx-auto flex max-w-5xl flex-col gap-md">
            {notice && (
              <p className="rounded-md border border-secondary/25 bg-secondary/10 px-md py-sm text-body-sm text-secondary">
                {notice}
              </p>
            )}
            <div className="flex justify-center">
              <span className="rounded-full border border-outline-variant bg-surface-container px-sm py-xs text-label-md uppercase text-on-surface-variant">
                Today, 9:41 AM
              </span>
            </div>

            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onDownloadAttachment={() =>
                  setNotice(
                    "File download is a placeholder in this academic version.",
                  )
                }
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

        {visibleConversations.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center px-lg text-center">
            <div className="mb-md flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
              <MessageSquare className="size-6" />
            </div>
            <h2 className="text-headline-md text-on-surface">
              No conversations found
            </h2>
            <p className="mt-sm text-body-sm text-on-surface-variant">
              Try searching by student name or project.
            </p>
          </div>
        )}

        <ChatInput
          onAttach={() =>
            setNotice("File attachments are not implemented yet.")
          }
          onChange={setMessageText}
          onSend={handleSendMessage}
          value={messageText}
        />
      </section>
    </div>
  );
}
