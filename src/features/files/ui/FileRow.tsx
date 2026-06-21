import { memo } from "react";
import type { File } from "../model/types";

interface FileRowProps {
  file: File;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "short" }).format(date);
}

// ✅ memo: chỉ re-render nếu file object thay đổi
const FileRow = memo(function FileRow({ file }: FileRowProps) {
  return (
    <div className="flex items-center gap-3 px-4 h-12 hover:bg-muted border-b">
      <span className="text-sm">{file.type === "folder" ? "📁" : "📄"}</span>
      <span className="flex-1 text-sm truncate">{file.name}</span>
      <span className="text-xs text-muted-foreground w-20 text-right">
        {formatFileSize(file.size)}
      </span>
      <span className="text-xs text-muted-foreground w-20 text-right">
        {formatDate(file.lastModified)}
      </span>
    </div>
  );
});

export { FileRow };
