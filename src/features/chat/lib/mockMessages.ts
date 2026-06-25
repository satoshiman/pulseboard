import { faker } from "@faker-js/faker";
import type { Message } from "../../../shared/types";

// Generate messages với markdown nặng (để thấy parsing lag)
export function generateMarkdownMessages(count: number): Message[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `msg-${i}`,
    chatId: "main",
    sender: faker.person.firstName(),
    content: `
# Heading ${i}
**Bold text** and *italic text* and \`inline code\`

\`\`\`typescript
const result = data.filter(x => x.active).map(x => x.value);
\`\`\`

- Item 1
- Item 2
- Item **important**

${faker.lorem.paragraph(2)}
    `.trim(),
    timestamp: Date.now() - (count - i) * 60000,
    isStreaming: false,
    reactions: {},
  }));
}
