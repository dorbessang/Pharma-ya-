import type { Medication, Offer, Pharmacy } from "../types";
import { PriceTag } from "./PriceTag";
import { Icon } from "./Icon";

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
      className="text-left shrink-0 w-56 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl p-4 text-white hover:shadow-xl hover:shadow-brand-600/20 hover:-translate-y-0.5 transition-all"
    >
      <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-900 bg-white rounded-full px-2 py-0.5 mb-3">
        <Icon name="tag" className="h-3 w-3" />
        Oferta
      </span>
      <p className="font-display font-medium text-lg leading-tight">
        {medication.brandName}
      </p>
      <p className="text-xs text-brand-100 mt-0.5">{medication.presentation}</p>
      <p className="text-xs text-brand-100 mt-2.5 truncate">
        {pharmacy.name} · {pharmacy.distanceKm} km
      </p>
      <div className="mt-2">
        <PriceTag
          price={offer.price}
          originalPrice={offer.originalPrice}
          align="left"
          variant="dark"
        />
      </div>
    </button>
  );
}
