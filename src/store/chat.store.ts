import { create } from "zustand";
import type { Message } from "@/shared/types";
import { generateMarkdownMessages } from "@/features/chat/lib/mockMessages";

interface ChatStore {
  messages: Message[];
  streamingContent: string;
  isStreaming: boolean;
  appendToken: (token: string) => void;
  finalizeStreaming: () => void;
  startStreaming: () => void;
  sendMessage: (content: string, sender: "User" | "AI") => void;
  reactToMessage: (id: string, emoji: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  // ✅ Pre-load 1000 messages
  messages: generateMarkdownMessages(1000),
  streamingContent: "",
  isStreaming: false,

  startStreaming: () =>
    set(() => ({ streamingContent: "", isStreaming: true })),

  appendToken: (token) =>
    set((state) => ({ streamingContent: state.streamingContent + token })),

  finalizeStreaming: () =>
    set((state) => {
      if (!state.streamingContent) return state;
      const newMsg: Message = {
        id: `msg-${Date.now()}`,
        chatId: "main",
        sender: "AI",
        content: state.streamingContent,
        timestamp: Date.now(),
        isStreaming: false,
        reactions: {},
      };
      return {
        messages: [...state.messages, newMsg],
        streamingContent: "",
        isStreaming: false,
      };
    }),

  sendMessage: (content, sender) =>
    set((state) => {
      const newMsg: Message = {
        id: `msg-${Date.now()}-${Math.random()}`,
        chatId: "main",
        sender,
        content,
        timestamp: Date.now(),
        isStreaming: false,
        reactions: {},
      };
      return {
        messages: [...state.messages, newMsg],
      };
    }),

  reactToMessage: (id, emoji) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id
          ? {
              ...m,
              reactions: {
                ...m.reactions,
                [emoji]: (m.reactions[emoji] ?? 0) + 1,
              },
            }
          : m,
      ),
    })),
}));

// ✅ Selector hooks
export const useMessages = () => useChatStore((s) => s.messages);
export const useMessagesCount = () => useChatStore((s) => s.messages.length);
export const useStreamingContent = () =>
  useChatStore((s) => s.streamingContent);
export const useIsStreaming = () => useChatStore((s) => s.isStreaming);
