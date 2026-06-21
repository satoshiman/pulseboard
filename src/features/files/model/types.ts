export interface File {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size: number;
  lastModified: Date;
  extension: string;
}
