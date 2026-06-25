import { faker } from "@faker-js/faker";
import type { Notification, FileItem, Message } from "@/shared/types";

export function generateFakeNotification(): Notification {
  return {
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(["info", "warning", "error", "success"]),
    title: faker.lorem.sentence(3),
    message: faker.lorem.paragraph(1),
    timestamp: Date.now(),
    read: faker.datatype.boolean({ probability: 0.7 }),
  };
}

export function generateFakeFiles(count: number): FileItem[] {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.system.fileName(),
    path: faker.system.filePath(),
    size: faker.number.int({ min: 100, max: 10_000_000 }),
    type: faker.datatype.boolean({ probability: 0.8 }) ? "file" : "folder",
    lastModified: faker.date.past().getTime(),
    starred: faker.datatype.boolean({ probability: 0.1 }),
    tags: faker.helpers.arrayElements([
      "urgent",
      "review",
      "archive",
      "personal",
    ]),
  }));
}

export function generateFakeMessage(chatId: string): Message {
  return {
    id: faker.string.uuid(),
    chatId,
    sender: faker.person.firstName(),
    content: faker.lorem.sentences(faker.number.int({ min: 1, max: 4 })),
    timestamp: Date.now(),
    isStreaming: false,
  };
}
