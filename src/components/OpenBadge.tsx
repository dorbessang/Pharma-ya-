import type { Pharmacy } from "../types";
import { isPharmacyOpenNow, openStatusLabel } from "../utils/schedule";

export function OpenBadge({ pharmacy }: { pharmacy: Pharmacy }) {
  const open = isPharmacyOpenNow(pharmacy);
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium ${
        open ? "text-emerald-700" : "text-rose-600"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          open ? "bg-emerald-500" : "bg-rose-500"
        }`}
      />
      {openStatusLabel(pharmacy)}
    </span>
  );
}
