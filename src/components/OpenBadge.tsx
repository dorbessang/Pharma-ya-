import type { Pharmacy } from "../types";
import { isPharmacyOpenNow, openStatusLabel } from "../utils/schedule";
import { Icon } from "./Icon";

export function OpenBadge({ pharmacy }: { pharmacy: Pharmacy }) {
  const open = isPharmacyOpenNow(pharmacy);
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold ${
        open ? "text-emerald-700" : "text-rose-600"
      }`}
    >
      <Icon name="clock" className="h-3.5 w-3.5" />
      {openStatusLabel(pharmacy)}
    </span>
  );
}
