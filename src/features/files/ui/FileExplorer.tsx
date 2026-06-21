import { useState, useMemo } from "react";
import { useFiles } from "../api/useFiles";
import { FileList } from "./FileList";
import { SearchInput } from "./SearchInput";
import { SortControls } from "./SortControls";
import { filterFiles, sortFiles } from "../lib";
import type { SortField, SortOrder } from "../lib";

export function FileExplorer() {
  const { data: allFiles = [] } = useFiles();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // ✅ useMemo: Chỉ filter lại khi allFiles hoặc searchQuery thay đổi
  const filteredFiles = useMemo(
    () => filterFiles(allFiles, searchQuery),
    [allFiles, searchQuery],
  );

  // ✅ useMemo: Chỉ sort lại khi filtered list hoặc sort params thay đổi
  const sortedFiles = useMemo(
    () => sortFiles(filteredFiles, sortField, sortOrder),
    [filteredFiles, sortField, sortOrder],
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
        <span className="text-sm font-medium">
          Files ({sortedFiles.length.toLocaleString()} /{" "}
          {allFiles.length.toLocaleString()})
        </span>
        <span className="text-xs text-green-600 font-mono">
          ✅ Virtual — ~15 DOM nodes
        </span>
      </div>

      <div className="flex gap-2 px-4 py-2 border-b">
        <SearchInput onSearch={setSearchQuery} />
        <SortControls
          field={sortField}
          order={sortOrder}
          onSort={(field, order) => {
            setSortField(field);
            setSortOrder(order);
          }}
        />
      </div>

      {/* ✅ FileList nhận sortedFiles đã được memoized */}
      <FileList files={sortedFiles} />
    </div>
  );
}
