import { useState, useCallback } from "react";
import { MessageList } from "./MessageList";
import { StreamingMessage } from "./StreamingMessage";
import {
  useIsStreaming,
  useStreamingContent,
  useChatStore,
} from "@/store/chat.store";

export function Chat() {
  const [inputValue, setInputValue] = useState("");
  const isStreaming = useIsStreaming();
  const streamingContent = useStreamingContent();
  const sendMessage = useChatStore((s) => s.sendMessage);
  const appendToken = useChatStore((s) => s.appendToken);
  const finalizeStreaming = useChatStore((s) => s.finalizeStreaming);

  const handleSend = useCallback(() => {
    if (inputValue.trim()) {
      sendMessage(inputValue, "User");
      setInputValue("");

      // Demo streaming: AI trả lời sau 1s
      setTimeout(() => {
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
    }
  }, [inputValue, sendMessage, appendToken, finalizeStreaming]);

  return (
    <div className="flex flex-col" style={{ height: "80vh" }}>
      {/* ✅ MessageList KHÔNG re-render khi user gõ trong input */}
      <MessageList />

      {/* ✅ StreamingMessage tách biệt, re-render khi token mới */}
      {isStreaming && <StreamingMessage content={streamingContent} />}

      <div className="border-t p-4 flex gap-2">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Nhập tin nhắn... (Enter để gửi)"
          className="flex-1 border rounded px-3 py-2 text-sm"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
