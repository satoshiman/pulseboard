import { faker } from "@faker-js/faker";
import type { Message } from "../../../shared/types";

// Generate messages với markdown nặng (để thấy parsing lag)
export function generateMarkdownMessages(count: number): Message[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `msg-${i}`,
    chatId: "main",
    sender: faker.person.firstName(),
    content: `${faker.lorem.paragraph(2)}
    `.trim(),
    timestamp: Date.now() - (count - i) * 60000,
    isStreaming: false,
    reactions: {},
  }));
}
