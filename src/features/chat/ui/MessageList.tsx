import { useRef, useLayoutEffect, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ChatMessage } from "./ChatMessage";
import {
  useMessages,
  useMessagesCount,
  useChatStore,
} from "@/store/chat.store";

export function MessageList() {
  const messages = useMessages();
  const messagesCount = useMessagesCount();
  const containerRef = useRef<HTMLDivElement>(null);

  // ✅ useCallback: stable reference → không phá vỡ memo của ChatMessage
  const handleReact = useCallback((messageId: string, emoji: string) => {
    useChatStore.getState().reactToMessage(messageId, emoji);
  }, []);

  // React Compiler skips memoization here because useVirtualizer returns incompatible functions.
  // This is acceptable - the component will still work correctly without memoization.
  const virtualizer = useVirtualizer({
    count: messagesCount,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 120,
    getItemKey: (index) => messages[index]!.id,
    anchorTo: "end",
    followOnAppend: true,
    scrollEndThreshold: 80,
    overscan: 5,
  });

  // Scroll to end on mount
  useLayoutEffect(() => {
    virtualizer.scrollToEnd();
  }, [virtualizer]);

  return (
    <div ref={containerRef} style={{ flex: 1, overflow: "auto" }}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((item) => (
          <div
            key={item.key}
            ref={virtualizer.measureElement}
            data-index={item.index}
            style={{
              position: "absolute",
              top: 0,
              width: "100%",
              transform: `translateY(${item.start}px)`,
            }}
          >
            <ChatMessage message={messages[item.index]} onReact={handleReact} />
          </div>
        ))}
      </div>
    </div>
  );
}
