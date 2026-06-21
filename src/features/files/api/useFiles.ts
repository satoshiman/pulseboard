import { useMemo } from 'react';
import { faker } from '@faker-js/faker';
import type { File } from '../model/types';

const EXTENSIONS = ['ts', 'tsx', 'js', 'jsx', 'css', 'json', 'md', 'png', 'svg', 'html'];

function generateFiles(count: number): File[] {
  return Array.from({ length: count }, (_, i) => {
    const ext = faker.helpers.arrayElement(EXTENSIONS);
    const type = faker.helpers.arrayElement(['file', 'file', 'file', 'folder'] as const);
    return {
      id: `file-${i}`,
      name: type === 'folder' ? faker.system.directoryPath().split('/').pop()! : faker.system.fileName({ extensionCount: 0 }) + '.' + ext,
      type,
      size: type === 'folder' ? 0 : faker.number.int({ min: 512, max: 50_000_000 }),
      lastModified: faker.date.recent({ days: 365 }),
      extension: type === 'folder' ? '' : ext,
    };
  });
}

// Generate once at module level — không re-generate khi re-render
const FAKE_FILES = generateFiles(50_000);

export function useFiles() {
  const data = useMemo(() => FAKE_FILES, []);
  return { data };
}
