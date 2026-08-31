import type { Pharmacy } from "../types";
import { OpenBadge } from "./OpenBadge";

interface PharmacyCardProps {
  pharmacy: Pharmacy;
  onClick: () => void;
}

export function PharmacyCard({ pharmacy, onClick }: PharmacyCardProps) {
  return (
    <button
      onClick={onClick}
      className="text-left bg-white border border-slate-200 rounded-xl p-4 hover:border-emerald-300 hover:shadow-sm transition"
    >
      <div className="flex items-start gap-3">
        <div className="h-11 w-11 shrink-0 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
          {pharmacy.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-slate-900 truncate">
            {pharmacy.name}
          </p>
          <p className="text-xs text-slate-500 truncate">
            {pharmacy.chain} · {pharmacy.neighborhood}
          </p>
          <div className="flex items-center gap-1 text-xs text-amber-500 mt-0.5">
            ★ <span className="text-slate-600">{pharmacy.rating}</span>
            <span className="text-slate-400">· {pharmacy.distanceKm} km</span>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <OpenBadge pharmacy={pharmacy} />
      </div>
    </button>
  );
}
