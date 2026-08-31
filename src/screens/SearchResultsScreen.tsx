import { MEDICATIONS } from "../data/mock";
import type { Medication } from "../types";
import { Icon } from "../components/Icon";

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
        className="inline-flex items-center gap-1 text-sm text-ink-400 hover:text-ink-700 mb-4 font-medium"
      >
        <Icon name="arrowLeft" className="h-4 w-4" />
        Volver a la búsqueda
      </button>

      <h2 className="font-display font-medium text-2xl text-ink-950">
        Resultados para "{query || "todos los medicamentos"}"
      </h2>
      <p className="text-sm text-ink-400 mt-1">
        {results.length} medicamento{results.length !== 1 ? "s" : ""} encontrado
        {results.length !== 1 ? "s" : ""}
      </p>

      <div className="mt-6 space-y-3">
        {results.map((med) => (
          <button
            key={med.id}
            onClick={() => onSelect(med)}
            className="w-full text-left bg-white border border-ink-900/8 rounded-2xl p-4 flex items-center justify-between hover:border-brand-300 hover:shadow-lg hover:shadow-ink-900/5 transition-all"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-ink-900">
                  {med.brandName}
                </span>
                {med.requiresPrescription && (
                  <span className="text-xs bg-ink-100 text-ink-600 px-2 py-0.5 rounded-full font-medium">
                    Requiere receta
                  </span>
                )}
              </div>
              <p className="text-sm text-ink-400 mt-0.5">
                {med.drugName} · {med.presentation}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-brand-600 text-sm font-semibold shrink-0">
              Ver farmacias
              <Icon name="arrowRight" className="h-4 w-4" />
            </span>
          </button>
        ))}

        {results.length === 0 && (
          <div className="text-center py-16 text-ink-400">
            No encontramos medicamentos que coincidan con tu búsqueda.
          </div>
        )}
      </div>
    </div>
  );
}
