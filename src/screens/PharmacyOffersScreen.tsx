import { getPharmacy, offersForMedication } from "../data/mock";
import type { Medication, Offer, Pharmacy } from "../types";
import { StockBadge } from "../components/StockBadge";
import { OpenBadge } from "../components/OpenBadge";
import { PriceTag } from "../components/PriceTag";
import { Icon } from "../components/Icon";

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
        className="inline-flex items-center gap-1 text-sm text-ink-400 hover:text-ink-700 mb-4 font-medium"
      >
        <Icon name="arrowLeft" className="h-4 w-4" />
        Volver a resultados
      </button>

      <div className="bg-gradient-to-br from-ink-900 to-ink-950 rounded-2xl p-5 mb-6 text-white">
        <div className="flex items-center gap-2">
          <h2 className="font-display font-medium text-2xl">
            {medication.brandName}
          </h2>
          {medication.requiresPrescription && (
            <span className="text-xs bg-white/15 text-white px-2 py-0.5 rounded-full font-medium">
              Requiere receta
            </span>
          )}
        </div>
        <p className="text-sm text-ink-200 mt-0.5">
          {medication.drugName} · {medication.presentation}
        </p>
      </div>

      <h3 className="font-display font-medium text-ink-950 mb-3">
        Farmacias cercanas ({offers.length})
      </h3>

      <div className="space-y-3">
        {offers.map(({ offer, pharmacy }) => (
          <div
            key={offer.id}
            className="bg-white border border-ink-900/8 rounded-2xl p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <button
                onClick={() => onSelectPharmacy(pharmacy)}
                className="text-left"
              >
                <p className="font-semibold text-ink-900 hover:text-brand-600">
                  {pharmacy.name}
                </p>
                <p className="text-sm text-ink-400">
                  {pharmacy.chain} · {pharmacy.address}, {pharmacy.neighborhood}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-ink-400">
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
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:bg-ink-100 disabled:text-ink-300 disabled:cursor-not-allowed transition-colors text-white text-sm font-semibold py-2.5"
              >
                <Icon name="chat" className="h-4 w-4" />
                Chatear y reservar
              </button>
              <button
                onClick={() => onSelectPharmacy(pharmacy)}
                className="flex-1 rounded-xl border border-ink-900/10 hover:bg-ink-50 transition-colors text-sm font-semibold py-2.5 text-ink-700"
              >
                Ver farmacia
              </button>
            </div>
          </div>
        ))}

        {offers.length === 0 && (
          <div className="text-center py-16 text-ink-400">
            Todavía no cargamos datos de stock para este medicamento.
          </div>
        )}
      </div>
    </div>
  );
}
