import type { Pharmacy } from "../types";
import { OpenBadge } from "./OpenBadge";
import { Icon } from "./Icon";

interface PharmacyCardProps {
  pharmacy: Pharmacy;
  onClick: () => void;
}

const AVATAR_STYLES = [
  "from-brand-400 to-brand-600",
  "from-ink-400 to-ink-600",
  "from-amber-400 to-brand-500",
];

export function PharmacyCard({ pharmacy, onClick }: PharmacyCardProps) {
  const gradient = AVATAR_STYLES[pharmacy.id.charCodeAt(pharmacy.id.length - 1) % AVATAR_STYLES.length];

  return (
    <button
      onClick={onClick}
      className="text-left bg-white border border-ink-900/8 rounded-2xl p-4 hover:border-brand-300 hover:shadow-lg hover:shadow-ink-900/5 hover:-translate-y-0.5 transition-all"
    >
      <div className="flex items-start gap-3">
        <div
          className={`h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br ${gradient} text-white font-display font-medium text-lg flex items-center justify-center`}
        >
          {pharmacy.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-ink-900 truncate">{pharmacy.name}</p>
          <p className="text-xs text-ink-400 truncate">
            {pharmacy.chain} · {pharmacy.neighborhood}
          </p>
          <div className="flex items-center gap-1 text-xs mt-1">
            <Icon name="star" className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-ink-600 font-medium">{pharmacy.rating}</span>
            <span className="text-ink-300">· {pharmacy.distanceKm} km</span>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <OpenBadge pharmacy={pharmacy} />
      </div>
    </button>
  );
}
