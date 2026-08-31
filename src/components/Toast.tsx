import { Icon } from "./Icon";

interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-[fadeIn_0.2s_ease-out]">
      <div className="flex items-center gap-2 rounded-full bg-ink-900 text-cream-50 text-sm font-medium pl-3 pr-5 py-2.5 shadow-xl shadow-ink-900/20">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 shrink-0">
          <Icon name="check" className="h-3.5 w-3.5" />
        </span>
        {message}
      </div>
    </div>
  );
}
