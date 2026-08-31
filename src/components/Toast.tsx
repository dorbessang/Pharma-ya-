interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="rounded-full bg-slate-900 text-white text-sm px-5 py-2.5 shadow-lg">
        {message}
      </div>
    </div>
  );
}
