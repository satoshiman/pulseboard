import { memo, useMemo, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import type { Message } from "@/shared/types";

interface ChatMessageProps {
  message: Message;
  onReact: (messageId: string, emoji: string) => void;
}

export const ChatMessage = memo<ChatMessageProps>(
  function ChatMessage({ message, onReact }) {
    // ✅ Parse markdown CHỈ khi content thay đổi
    const markdownContent = useMemo(
      () => <ReactMarkdown>{message.content}</ReactMarkdown>,
      [message.content],
    );

    // ✅ Chỉ tính reactions khi reactions object thay đổi
    const reactionSummary = useMemo(
      () =>
        Object.entries(message.reactions)
          .filter(([, count]) => count > 0)
          .map(([emoji, count]) => `${emoji} ${count}`),
      [message.reactions],
    );

    const handleReact = useCallback(
      () => onReact(message.id, "❤️"),
      [message.id, onReact],
    );

    return (
      <div className="mb-4 p-3 border rounded">
        <div className="font-medium text-sm mb-2">{message.sender}</div>
        <div className="prose prose-sm prose-p:my-1 prose-headings:my-2">
          {markdownContent}
        </div>
        {reactionSummary.length > 0 && (
          <div className="flex gap-2 mt-2">
            {reactionSummary.map((r) => (
              <span
                key={r}
                className="text-xs bg-muted px-2 py-0.5 rounded-full"
              >
                {r}
              </span>
            ))}
          </div>
        )}
        <button
          onClick={handleReact}
          className="text-xs text-muted-foreground mt-1 hover:text-foreground"
        >
          ❤️ React
        </button>
      </div>
    );
  },

  // ✅ Custom equality: chỉ re-render khi content, reactions, hoặc onReact thay đổi
  (prev, next) =>
    prev.message.content === next.message.content &&
    prev.message.reactions === next.message.reactions &&
    prev.onReact === next.onReact,
);
