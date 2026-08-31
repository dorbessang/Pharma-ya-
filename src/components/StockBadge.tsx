import type { StockLevel } from "../types";

const STYLES: Record<StockLevel, { label: string; dot: string; text: string; bg: string }> = {
  alto: { label: "En stock", dot: "bg-emerald-500", text: "text-emerald-800", bg: "bg-emerald-100" },
  bajo: { label: "Últimas unidades", dot: "bg-amber-500", text: "text-amber-800", bg: "bg-amber-100" },
  "sin-stock": { label: "Sin stock", dot: "bg-rose-500", text: "text-rose-700", bg: "bg-rose-100" },
};

export function StockBadge({ level }: { level: StockLevel }) {
  const s = STYLES[level];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${s.bg} ${s.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
