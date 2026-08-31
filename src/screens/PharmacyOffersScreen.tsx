import { PHARMACY_OFFERS } from "../data/mock";
import type { Medication } from "../types";
import { StockBadge } from "../components/StockBadge";

interface PharmacyOffersScreenProps {
  medication: Medication;
  onBack: () => void;
  onAction: (message: string) => void;
}

export function PharmacyOffersScreen({
  medication,
  onBack,
  onAction,
}: PharmacyOffersScreenProps) {
  const offers = [...(PHARMACY_OFFERS[medication.id] ?? [])].sort(
    (a, b) => a.distanceKm - b.distanceKm
  );

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

      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-slate-900">
          Farmacias cercanas ({offers.length})
        </h3>
        <button
          onClick={() => onAction("El mapa interactivo estará disponible próximamente")}
          className="text-sm text-emerald-700 hover:text-emerald-800"
        >
          Ver en mapa
        </button>
      </div>

      <div className="space-y-3">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white border border-slate-200 rounded-xl p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">
                  {offer.pharmacyName}
                </p>
                <p className="text-sm text-slate-500">
                  {offer.chain} · {offer.address}, {offer.neighborhood}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-500">
                  <span>{offer.distanceKm} km</span>
                  <span>·</span>
                  <span>{offer.openNow ? "Abierta ahora" : "Cerrada"}</span>
                  <span>·</span>
                  <span>Actualizado hace {offer.updatedMinutesAgo} min</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold text-slate-900">
                  ${offer.price.toLocaleString("es-AR")}
                </p>
                <div className="mt-1">
                  <StockBadge level={offer.stock} />
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                disabled={offer.stock === "sin-stock"}
                onClick={() =>
                  onAction(`Reserva en ${offer.pharmacyName} — próximamente`)
                }
                className="flex-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors text-white text-sm font-medium py-2"
              >
                Reservar
              </button>
              <button
                onClick={() =>
                  onAction("Cómo llegar estará disponible próximamente")
                }
                className="flex-1 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors text-sm font-medium py-2 text-slate-700"
              >
                Cómo llegar
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
