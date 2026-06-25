import { useCallback, memo } from "react";
import { MessageList } from "./MessageList";
import { StreamingMessage } from "./StreamingMessage";
import { ChatInput } from "./ChatInput";
import {
  useIsStreaming,
  useStreamingContent,
  useChatStore,
} from "@/store/chat.store";

export const Chat = memo(function Chat() {
  const isStreaming = useIsStreaming();
  const streamingContent = useStreamingContent();
  const sendMessage = useChatStore((s) => s.sendMessage);
  const appendToken = useChatStore((s) => s.appendToken);
  const finalizeStreaming = useChatStore((s) => s.finalizeStreaming);
  const startStreaming = useChatStore((s) => s.startStreaming);

  const handleSend = useCallback(
    (message: string) => {
      sendMessage(message, "User");

      // Demo streaming: AI trả lời sau 1s
      setTimeout(() => {
        startStreaming();
        const demoResponse =
          "Đây là tin nhắn streaming demo. Token sẽ xuất hiện từng phần một!";
        let index = 0;
        const tokens = demoResponse.split(" ");

        const streamInterval = setInterval(() => {
          if (index < tokens.length) {
            appendToken(tokens[index] + " ");
            index++;
          } else {
            clearInterval(streamInterval);
            finalizeStreaming();
          }
        }, 100);
      }, 1000);
    },
    [sendMessage, appendToken, finalizeStreaming, startStreaming],
  );

  return (
    <div className="flex flex-col" style={{ height: "80vh" }}>
      {/* ✅ MessageList KHÔNG re-render khi user gõ trong input */}
      <MessageList />

      {/* ✅ StreamingMessage tách biệt, re-render khi token mới */}
      {isStreaming && <StreamingMessage content={streamingContent} />}

      {/* ✅ ChatInput tách biệt, local state không ảnh hưởng parent */}
      <ChatInput onSend={handleSend} />
    </div>
  );
});
