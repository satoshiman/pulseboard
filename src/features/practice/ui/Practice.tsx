import {
  useState,
  useDeferredValue,
  useTransition,
  memo,
  useEffect,
} from "react";

export default function ProductDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // 1. Dùng useTransition cho search query
  const [isPending, startTransition] = useTransition();

  // 2. Dùng useDeferredValue cho giá trị debounced
  const deferredSearchQuery = useDeferredValue(debouncedQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value); // Update input ngay (urgent)
  };

  // 3. Debounce searchQuery (truyền thống)
  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => {
        setDebouncedQuery(searchQuery); // Heavy computation sau debounce + transition
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, startTransition]);

  // Trạng thái delay
  const isUpdating = isPending || searchQuery !== debouncedQuery;

  return (
    <div className="p-6">
      {/* INPUT: Update ngay, heavy computation defer bằng useTransition */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Tìm kiếm sản phẩm (gõ liên tục không lag)..."
        className="border p-2 w-full mb-4"
      />

      {/* Hiển thị hiệu ứng loading mờ nhẹ khi React đang xử lý ngầm */}
      {isUpdating && (
        <p className="text-sm text-gray-500 animate-pulse mb-4">
          Đang tính toán kết quả mới...
        </p>
      )}

      {/* DANH SÁCH NẶNG: Nhận vào các giá trị "hoãn" (deferred/transitioned) */}
      <div
        style={{ opacity: isUpdating ? 0.6 : 1, transition: "opacity 0.2s" }}
      >
        <HeavyProductList
          query={deferredSearchQuery} // Dùng bản deferred để tránh block input
        />
      </div>
    </div>
  );
}

// Component xử lý render nặng (Ví dụ: 5000 items kèm chart)
const HeavyProductList = memo(function HeavyProductList({
  query,
}: {
  query: string;
}) {
  const [data, setData] = useState<string | null>(null);

  // Giả lập API call với network latency
  useEffect(() => {
    // Giả lập API delay 3s
    const timer = setTimeout(() => {
      const filteredData = `Results for "${query}"`;
      setData(filteredData);
    }, 3000);

    return () => {
      clearTimeout(timer);
      setData(null); // Reset khi component unmount hoặc deps thay đổi
    };
  }, [query]);

  return (
    <div className="border p-4 rounded bg-gray-50">
      {!data ? (
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
          <p className="text-xs text-gray-500">Loading API data...</p>
        </div>
      ) : (
        <>
          <h3>Kết quả filter cho: "{query}"</h3>
          <p className="text-xs text-gray-400">{data}</p>
          <p className="text-xs text-gray-500 mt-2">
            💡 Simulated API latency: 800ms
          </p>
        </>
      )}
    </div>
  );
});
