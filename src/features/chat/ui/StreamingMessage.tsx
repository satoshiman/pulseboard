import { memo } from 'react';

interface StreamingMessageProps {
  content: string;
}

// ✅ Component nhỏ, re-render độc lập với MessageList
export const StreamingMessage = memo(function StreamingMessage({ content }: StreamingMessageProps) {
  return (
    <div className="mb-4 p-3 border rounded border-dashed border-blue-300 bg-blue-50/50">
      <span className="font-medium text-sm text-blue-600">AI</span>
      <p className="mt-1 text-sm">
        {content}
        <span className="animate-pulse ml-0.5">▋</span>
      </p>
    </div>
  );
});
