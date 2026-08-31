import { getMedication, offersForPharmacy } from "../data/mock";
import type { Medication, Offer, Pharmacy } from "../types";
import { OpenBadge } from "../components/OpenBadge";
import { PriceTag } from "../components/PriceTag";
import { StockBadge } from "../components/StockBadge";
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
        className="text-sm text-slate-500 hover:text-slate-700 mb-4"
      >
        ← Volver
      </button>

      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 shrink-0 rounded-xl bg-emerald-100 text-emerald-700 font-bold text-xl flex items-center justify-center">
            {pharmacy.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-semibold text-slate-900">
              {pharmacy.name}
            </h2>
            <p className="text-sm text-slate-500">
              {pharmacy.chain} · {pharmacy.address}, {pharmacy.neighborhood}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-sm">
              <span className="text-amber-500">
                ★ <span className="text-slate-600">{pharmacy.rating}</span>
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500">{pharmacy.distanceKm} km</span>
              <span className="text-slate-400">·</span>
              <OpenBadge pharmacy={pharmacy} />
            </div>
          </div>
        </div>

        <button
          onClick={() => onChat(pharmacy)}
          className="mt-4 w-full sm:w-auto rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors text-white text-sm font-medium py-2.5 px-5"
        >
          💬 Chatear con la farmacia
        </button>
      </div>

      <div className="mt-6 bg-white border border-slate-200 rounded-xl p-5">
        <h3 className="font-medium text-slate-900 mb-3">Horarios</h3>
        <dl className="text-sm divide-y divide-slate-100">
          {scheduleForDisplay(pharmacy).map((day) => (
            <div
              key={day.label}
              className={`flex items-center justify-between py-1.5 ${
                day.isToday ? "font-medium text-slate-900" : "text-slate-600"
              }`}
            >
              <dt>{day.label}</dt>
              <dd>{day.text}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-6">
        <h3 className="font-medium text-slate-900 mb-3">
          Catálogo en este local ({catalog.length})
        </h3>
        <div className="space-y-3">
          {catalog.map(({ offer, medication }) => (
            <div
              key={offer.id}
              className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="font-semibold text-slate-900 truncate">
                  {medication.brandName}
                </p>
                <p className="text-sm text-slate-500 truncate">
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
                  className="mt-2 text-xs font-medium text-emerald-700 hover:text-emerald-800 disabled:text-slate-300 disabled:cursor-not-allowed"
                >
                  Reservar →
                </button>
              </div>
            </div>
          ))}

          {catalog.length === 0 && (
            <div className="text-center py-10 text-slate-500 text-sm">
              Este local todavía no cargó su catálogo.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
