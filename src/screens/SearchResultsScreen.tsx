import { MEDICATIONS } from "../data/mock";
import type { Medication } from "../types";

interface SearchResultsScreenProps {
  query: string;
  onSelect: (medication: Medication) => void;
  onBack: () => void;
}

export function SearchResultsScreen({
  query,
  onSelect,
  onBack,
}: SearchResultsScreenProps) {
  const normalized = query.trim().toLowerCase();
  const results = normalized
    ? MEDICATIONS.filter(
        (m) =>
          m.brandName.toLowerCase().includes(normalized) ||
          m.drugName.toLowerCase().includes(normalized)
      )
    : MEDICATIONS;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="text-sm text-slate-500 hover:text-slate-700 mb-4"
      >
        ← Volver a la búsqueda
      </button>

      <h2 className="text-xl font-semibold text-slate-900">
        Resultados para "{query || "todos los medicamentos"}"
      </h2>
      <p className="text-sm text-slate-500 mt-1">
        {results.length} medicamento{results.length !== 1 ? "s" : ""} encontrado
        {results.length !== 1 ? "s" : ""}
      </p>

      <div className="mt-6 space-y-3">
        {results.map((med) => (
          <button
            key={med.id}
            onClick={() => onSelect(med)}
            className="w-full text-left bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between hover:border-emerald-300 hover:shadow-sm transition"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900">
                  {med.brandName}
                </span>
                {med.requiresPrescription && (
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    Requiere receta
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500 mt-0.5">
                {med.drugName} · {med.presentation}
              </p>
            </div>
            <span className="text-emerald-700 text-sm font-medium">
              Ver farmacias →
            </span>
          </button>
        ))}

        {results.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            No encontramos medicamentos que coincidan con tu búsqueda.
          </div>
        )}
      </div>
    </div>
  );
}
