import type { StockLevel } from "../types";

const STYLES: Record<StockLevel, { label: string; className: string }> = {
  alto: { label: "En stock", className: "bg-emerald-100 text-emerald-800" },
  bajo: { label: "Últimas unidades", className: "bg-amber-100 text-amber-800" },
  "sin-stock": { label: "Sin stock", className: "bg-rose-100 text-rose-700" },
};

export function StockBadge({ level }: { level: StockLevel }) {
  const style = STYLES[level];
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${style.className}`}
    >
      {style.label}
    </span>
  );
}
