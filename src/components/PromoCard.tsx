import type { Medication, Offer, Pharmacy } from "../types";
import { PriceTag } from "./PriceTag";

interface PromoCardProps {
  offer: Offer;
  medication: Medication;
  pharmacy: Pharmacy;
  onClick: () => void;
}

export function PromoCard({ offer, medication, pharmacy, onClick }: PromoCardProps) {
  return (
    <button
      onClick={onClick}
      className="text-left shrink-0 w-56 bg-white border border-slate-200 rounded-xl p-4 hover:border-emerald-300 hover:shadow-sm transition"
    >
      <span className="inline-block text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full px-2 py-0.5 mb-2">
        Oferta
      </span>
      <p className="font-semibold text-slate-900 leading-tight">
        {medication.brandName}
      </p>
      <p className="text-xs text-slate-500 mt-0.5">{medication.presentation}</p>
      <p className="text-xs text-slate-500 mt-2 truncate">
        {pharmacy.name} · {pharmacy.distanceKm} km
      </p>
      <div className="mt-2">
        <PriceTag
          price={offer.price}
          originalPrice={offer.originalPrice}
          align="left"
        />
      </div>
    </button>
  );
}
