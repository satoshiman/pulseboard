import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { FileRow } from './FileRow';
import type { File } from '../model/types';

interface FileListProps {
  files: File[];
}

export function FileList({ files }: FileListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: files.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 48,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  return (
    <div
      ref={containerRef}
      style={{ height: '600px', overflow: 'auto' }}
    >
      <div style={{ height: `${totalSize}px`, position: 'relative' }}>
        {virtualItems.map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <FileRow file={files[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
