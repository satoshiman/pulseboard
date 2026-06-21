import type { SortField, SortOrder } from '../lib';

interface SortControlsProps {
  field: SortField;
  order: SortOrder;
  onSort: (field: SortField, order: SortOrder) => void;
}

const SORT_OPTIONS: { label: string; field: SortField }[] = [
  { label: 'Name', field: 'name' },
  { label: 'Size', field: 'size' },
  { label: 'Modified', field: 'lastModified' },
];

export function SortControls({ field, order, onSort }: SortControlsProps) {
  return (
    <div className="flex items-center gap-1">
      {SORT_OPTIONS.map((option) => (
        <button
          key={option.field}
          onClick={() => {
            if (option.field === field) {
              onSort(field, order === 'asc' ? 'desc' : 'asc');
            } else {
              onSort(option.field, 'asc');
            }
          }}
          className={`px-2 py-1 text-xs rounded border transition-colors ${
            option.field === field
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-background text-muted-foreground border-border hover:bg-muted'
          }`}
        >
          {option.label}
          {option.field === field && (
            <span className="ml-1">{order === 'asc' ? '↑' : '↓'}</span>
          )}
        </button>
      ))}
    </div>
  );
}
