// features/files/ui/FileExplorer.tsx ← INTENTIONALLY BAD (anti-pattern)
// Mục đích: quan sát freeze khi render 50k DOM nodes cùng lúc
import { useFiles } from "../api/useFiles";
import { FileRow } from "./FileRow";

export function FileExplorer() {
  const { data: files = [] } = useFiles(); // 50.000 files

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
        <span className="text-sm font-medium">
          Files ({files.length.toLocaleString()})
        </span>
        <span className="text-xs text-red-500 font-mono">
          ❌ Naive render — {files.length.toLocaleString()} DOM nodes
        </span>
      </div>

      {/* ❌ Render TẤT CẢ 50k rows vào DOM — anti-pattern */}
      <div style={{ maxHeight: "600px", overflow: "auto" }}>
        {files.map((file) => (
          <FileRow key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
}
