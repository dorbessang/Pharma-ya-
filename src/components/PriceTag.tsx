interface PriceTagProps {
  price: number;
  originalPrice?: number;
  align?: "left" | "right";
}

export function PriceTag({ price, originalPrice, align = "right" }: PriceTagProps) {
  const hasDiscount = !!originalPrice && originalPrice > price;
  const discountPct = hasDiscount
    ? Math.round(100 - (price / originalPrice!) * 100)
    : 0;

  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      {hasDiscount && (
        <div className="flex items-center gap-1.5 justify-end">
          <span className="text-xs text-slate-400 line-through">
            ${originalPrice!.toLocaleString("es-AR")}
          </span>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full px-1.5 py-0.5">
            -{discountPct}%
          </span>
        </div>
      )}
      <p className="font-semibold text-slate-900">
        ${price.toLocaleString("es-AR")}
      </p>
    </div>
  );
}
