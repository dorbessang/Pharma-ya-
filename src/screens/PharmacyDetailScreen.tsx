import { getMedication, offersForPharmacy } from "../data/mock";
import type { Medication, Offer, Pharmacy } from "../types";
import { OpenBadge } from "../components/OpenBadge";
import { PriceTag } from "../components/PriceTag";
import { StockBadge } from "../components/StockBadge";
import { Icon } from "../components/Icon";
import { scheduleForDisplay } from "../utils/schedule";

interface PharmacyDetailScreenProps {
  pharmacy: Pharmacy;
  onBack: () => void;
  onChat: (pharmacy: Pharmacy, medication?: Medication) => void;
}

export function PharmacyDetailScreen({
  pharmacy,
  onBack,
  onChat,
}: PharmacyDetailScreenProps) {
  const catalog = offersForPharmacy(pharmacy.id)
    .map((offer) => ({ offer, medication: getMedication(offer.medicationId) }))
    .filter(
      (o): o is { offer: Offer; medication: Medication } =>
        o.medication !== undefined
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1 text-sm text-ink-400 hover:text-ink-700 mb-4 font-medium"
      >
        <Icon name="arrowLeft" className="h-4 w-4" />
        Volver
      </button>

      <div className="bg-white border border-ink-900/8 rounded-2xl p-5">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white font-display font-medium text-2xl flex items-center justify-center">
            {pharmacy.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <h2 className="font-display font-medium text-2xl text-ink-950">
              {pharmacy.name}
            </h2>
            <p className="text-sm text-ink-400">
              {pharmacy.chain} · {pharmacy.address}, {pharmacy.neighborhood}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-sm">
              <span className="inline-flex items-center gap-1 text-ink-600 font-medium">
                <Icon name="star" className="h-4 w-4 fill-amber-400 text-amber-400" />
                {pharmacy.rating}
              </span>
              <span className="text-ink-200">·</span>
              <span className="text-ink-500">{pharmacy.distanceKm} km</span>
              <span className="text-ink-200">·</span>
              <OpenBadge pharmacy={pharmacy} />
            </div>
          </div>
        </div>

        <button
          onClick={() => onChat(pharmacy)}
          className="mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 transition-colors text-white text-sm font-semibold py-2.5 px-5 shadow-md shadow-brand-600/25"
        >
          <Icon name="chat" className="h-4 w-4" />
          Chatear con la farmacia
        </button>
      </div>

      <div className="mt-6 bg-white border border-ink-900/8 rounded-2xl p-5">
        <h3 className="font-display font-medium text-ink-950 mb-3">Horarios</h3>
        <dl className="text-sm divide-y divide-ink-900/5">
          {scheduleForDisplay(pharmacy).map((day) => (
            <div
              key={day.label}
              className={`flex items-center justify-between py-1.5 ${
                day.isToday ? "font-semibold text-ink-900" : "text-ink-500"
              }`}
            >
              <dt className="flex items-center gap-1.5">
                {day.isToday && <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />}
                {day.label}
              </dt>
              <dd>{day.text}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-6">
        <h3 className="font-display font-medium text-ink-950 mb-3">
          Catálogo en este local ({catalog.length})
        </h3>
        <div className="space-y-3">
          {catalog.map(({ offer, medication }) => (
            <div
              key={offer.id}
              className="bg-white border border-ink-900/8 rounded-2xl p-4 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="font-semibold text-ink-900 truncate">
                  {medication.brandName}
                </p>
                <p className="text-sm text-ink-400 truncate">
                  {medication.drugName} · {medication.presentation}
                </p>
                <div className="mt-1">
                  <StockBadge level={offer.stock} />
                </div>
              </div>
              <div className="text-right shrink-0">
                <PriceTag price={offer.price} originalPrice={offer.originalPrice} />
                <button
                  disabled={offer.stock === "sin-stock"}
                  onClick={() => onChat(pharmacy, medication)}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 disabled:text-ink-300 disabled:cursor-not-allowed"
                >
                  Reservar
                  <Icon name="arrowRight" className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}

          {catalog.length === 0 && (
            <div className="text-center py-10 text-ink-400 text-sm">
              Este local todavía no cargó su catálogo.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
