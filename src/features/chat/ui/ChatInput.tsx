import { useState, useCallback } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSend = useCallback(() => {
    if (inputValue.trim()) {
      onSend(inputValue);
      setInputValue("");
    }
  }, [inputValue, onSend]);

  return (
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
  );
}
