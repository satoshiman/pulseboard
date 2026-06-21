import type { File } from '../model/types';

export type SortField = 'name' | 'size' | 'lastModified';
export type SortOrder = 'asc' | 'desc';

export function filterFiles(files: File[], query: string): File[] {
  if (!query.trim()) return files;
  const lowerQuery = query.toLowerCase();
  return files.filter((file) => file.name.toLowerCase().includes(lowerQuery));
}

export function sortFiles(files: File[], field: SortField, order: SortOrder): File[] {
  return [...files].sort((a, b) => {
    let comparison = 0;

    switch (field) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'size':
        comparison = a.size - b.size;
        break;
      case 'lastModified':
        comparison = a.lastModified.getTime() - b.lastModified.getTime();
        break;
    }

    return order === 'asc' ? comparison : -comparison;
  });
}
