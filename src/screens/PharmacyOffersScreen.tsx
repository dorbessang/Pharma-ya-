import { getPharmacy, offersForMedication } from "../data/mock";
import type { Medication, Offer, Pharmacy } from "../types";
import { StockBadge } from "../components/StockBadge";
import { OpenBadge } from "../components/OpenBadge";
import { PriceTag } from "../components/PriceTag";

interface PharmacyOffersScreenProps {
  medication: Medication;
  onBack: () => void;
  onSelectPharmacy: (pharmacy: Pharmacy) => void;
  onReserve: (pharmacy: Pharmacy, medication: Medication) => void;
}

export function PharmacyOffersScreen({
  medication,
  onBack,
  onSelectPharmacy,
  onReserve,
}: PharmacyOffersScreenProps) {
  const offers = offersForMedication(medication.id)
    .map((offer) => ({ offer, pharmacy: getPharmacy(offer.pharmacyId) }))
    .filter(
      (o): o is { offer: Offer; pharmacy: Pharmacy } => o.pharmacy !== undefined
    )
    .sort((a, b) => a.pharmacy.distanceKm - b.pharmacy.distanceKm);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="text-sm text-slate-500 hover:text-slate-700 mb-4"
      >
        ← Volver a resultados
      </button>

      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-slate-900">
            {medication.brandName}
          </h2>
          {medication.requiresPrescription && (
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
              Requiere receta
            </span>
          )}
        </div>
        <p className="text-sm text-slate-500 mt-0.5">
          {medication.drugName} · {medication.presentation}
        </p>
      </div>

      <h3 className="font-medium text-slate-900 mb-3">
        Farmacias cercanas ({offers.length})
      </h3>

      <div className="space-y-3">
        {offers.map(({ offer, pharmacy }) => (
          <div
            key={offer.id}
            className="bg-white border border-slate-200 rounded-xl p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <button
                onClick={() => onSelectPharmacy(pharmacy)}
                className="text-left"
              >
                <p className="font-semibold text-slate-900 hover:text-emerald-700">
                  {pharmacy.name}
                </p>
                <p className="text-sm text-slate-500">
                  {pharmacy.chain} · {pharmacy.address}, {pharmacy.neighborhood}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-500">
                  <span>{pharmacy.distanceKm} km</span>
                  <span>·</span>
                  <OpenBadge pharmacy={pharmacy} />
                  <span>·</span>
                  <span>Stock actualizado hace {offer.updatedMinutesAgo} min</span>
                </div>
              </button>
              <div className="shrink-0">
                <PriceTag price={offer.price} originalPrice={offer.originalPrice} />
                <div className="mt-1">
                  <StockBadge level={offer.stock} />
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                disabled={offer.stock === "sin-stock"}
                onClick={() => onReserve(pharmacy, medication)}
                className="flex-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors text-white text-sm font-medium py-2"
              >
                Chatear y reservar
              </button>
              <button
                onClick={() => onSelectPharmacy(pharmacy)}
                className="flex-1 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors text-sm font-medium py-2 text-slate-700"
              >
                Ver farmacia
              </button>
            </div>
          </div>
        ))}

        {offers.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            Todavía no cargamos datos de stock para este medicamento.
          </div>
        )}
      </div>
    </div>
  );
}
