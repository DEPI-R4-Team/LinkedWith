import { useRef } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { Paperclip, Send } from "lucide-react";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onAttach: () => void;
  onSend: () => void;
  disabled?: boolean;
};

export function ChatInput({ value, disabled = false, onAttach, onChange, onSend }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSend();
    textareaRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <form
      className="border-t border-outline-variant bg-surface-container-low px-lg py-md"
      onSubmit={handleSubmit}
    >
      <div className="flex items-end gap-sm rounded-lg border border-outline-variant bg-surface-container p-sm">
        <button
          aria-label="Attach file"
          className="flex size-10 shrink-0 items-center justify-center rounded-md text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
          onClick={onAttach}
          disabled={disabled}
          type="button"
        >
          <Paperclip className="size-4" />
        </button>

        <textarea
          className="max-h-32 min-h-10 flex-1 resize-none bg-transparent py-sm text-body-sm text-on-surface outline-none placeholder:text-on-surface-variant"
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={disabled ? "Open a session to chat..." : "Type a message..."}
          ref={textareaRef}
          rows={1}
          value={value}
        />

        <button
          aria-label="Send message"
          className="flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary text-on-secondary transition hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={disabled || !value.trim()}
          type="submit"
        >
          <Send className="size-4" />
        </button>
      </div>
      <p className="mt-sm text-label-md text-on-surface-variant">
        Press Enter to send, Shift+Enter for new line.
      </p>
    </form>
  );
}
