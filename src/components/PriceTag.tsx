interface PriceTagProps {
  price: number;
  originalPrice?: number;
  align?: "left" | "right";
  variant?: "light" | "dark";
}

export function PriceTag({
  price,
  originalPrice,
  align = "right",
  variant = "light",
}: PriceTagProps) {
  const hasDiscount = !!originalPrice && originalPrice > price;
  const discountPct = hasDiscount
    ? Math.round(100 - (price / originalPrice!) * 100)
    : 0;
  const dark = variant === "dark";

  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      {hasDiscount && (
        <div className={`flex items-center gap-1.5 ${align === "right" ? "justify-end" : ""}`}>
          <span
            className={`text-xs line-through ${dark ? "text-white/60" : "text-ink-300"}`}
          >
            ${originalPrice!.toLocaleString("es-AR")}
          </span>
          <span
            className={`text-xs font-bold rounded-full px-1.5 py-0.5 ${
              dark ? "text-brand-800 bg-white" : "text-brand-700 bg-brand-100"
            }`}
          >
            -{discountPct}%
          </span>
        </div>
      )}
      <p
        className={`font-display font-medium text-lg ${dark ? "text-white" : "text-ink-900"}`}
      >
        ${price.toLocaleString("es-AR")}
      </p>
    </div>
  );
}
