import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { generateMarkdownMessages } from "../lib/mockMessages";

const MESSAGES = generateMarkdownMessages(1000);

export function Chat() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-col h-[calc(100vh-60px)]">
      {/* ❌ Message list re-render mỗi keystroke */}
      <div className="flex-1 overflow-auto p-4">
        {MESSAGES.map((msg) => (
          <div key={msg.id} className="mb-4 p-3 border rounded">
            <span className="font-medium text-sm">{msg.sender}</span>
            {/* ❌ Parse markdown lại mỗi lần */}
            <div className="prose prose-sm mt-1">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t p-4 bg-white shadow-lg">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>
    </div>
  );
}
