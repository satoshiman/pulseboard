import { create } from 'zustand';
import type { Message } from '@/shared/types';

interface ChatStore {
  messages: Message[];
  messagesById: Map<string, Message>; // ✅ O(1) index
  streamingContent: string;
  isStreaming: boolean;
  addMessage: (msg: Message) => void;
  updateMessage: (id: string, update: Partial<Message>) => void;
  reactToMessage: (id: string, emoji: string) => void;
  appendToken: (token: string) => void;
  finalizeStreaming: () => void;
  initialize: (messages: Message[]) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  messagesById: new Map(),
  streamingContent: '',
  isStreaming: false,

  initialize: (messages) =>
    set({
      messages,
      messagesById: new Map(messages.map(m => [m.id, m])),
    }),

  addMessage: (msg) =>
    set(state => {
      const newIndex = new Map(state.messagesById);
      newIndex.set(msg.id, msg);
      return { messages: [...state.messages, msg], messagesById: newIndex };
    }),

  updateMessage: (id, update) =>
    set(state => {
      const existing = state.messagesById.get(id);
      if (!existing) return state;
      const updated = { ...existing, ...update };
      const newIndex = new Map(state.messagesById);
      newIndex.set(id, updated);
      return {
        messages: state.messages.map(m => m.id === id ? updated : m),
        messagesById: newIndex,
      };
    }),

  reactToMessage: (id, emoji) => {
    const msg = get().messagesById.get(id);
    if (!msg) return;
    get().updateMessage(id, {
      reactions: { ...msg.reactions, [emoji]: (msg.reactions[emoji] ?? 0) + 1 },
    });
  },

  appendToken: (token) =>
    set(state => ({ streamingContent: state.streamingContent + token })),

  finalizeStreaming: () =>
    set(state => {
      if (!state.streamingContent) return state;
      const newMsg: Message = {
        id: `msg-${Date.now()}`,
        chatId: 'main',
        sender: 'AI',
        content: state.streamingContent,
        timestamp: Date.now(),
        isStreaming: false,
        reactions: {},
      };
      const newIndex = new Map(state.messagesById);
      newIndex.set(newMsg.id, newMsg);
      return {
        messages: [...state.messages, newMsg],
        messagesById: newIndex,
        streamingContent: '',
        isStreaming: false,
      };
    }),
}));

export const useMessages = () => useChatStore(s => s.messages);
export const useMessageById = (id: string) => useChatStore(s => s.messagesById.get(id));
export const useStreamingContent = () => useChatStore(s => s.streamingContent);
export const useIsStreaming = () => useChatStore(s => s.isStreaming);
