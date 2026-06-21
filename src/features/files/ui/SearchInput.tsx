import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/shared/hooks/useDebounce';

interface SearchInputProps {
  onSearch: (query: string) => void;
}

export function SearchInput({ onSearch }: SearchInputProps) {
  const [value, setValue] = useState('');

  // ✅ Chỉ gọi onSearch sau 300ms dừng gõ
  const debouncedSearch = useDebounce(onSearch, 300);

  return (
    <Input
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        debouncedSearch(e.target.value);
      }}
      placeholder="Tìm kiếm file..."
      className="max-w-sm"
    />
  );
}
