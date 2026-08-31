import { Icon } from "./Icon";

export function PrototypeBanner() {
  return (
    <div className="bg-ink-900 text-cream-100 text-xs sm:text-sm text-center py-2 px-4 flex items-center justify-center gap-1.5">
      <Icon name="tag" className="h-3.5 w-3.5 shrink-0 text-brand-400" />
      Preview de diseño — datos de ejemplo, sin funcionalidad real todavía.
    </div>
  );
}
