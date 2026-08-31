import { useState } from "react";
import { POPULAR_SEARCHES } from "../data/mock";

interface HomeScreenProps {
  onSearch: (query: string) => void;
}

export function HomeScreen({ onSearch }: HomeScreenProps) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Palermo, CABA");

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
        Encontrá tu medicamento
      </h1>
      <p className="mt-3 text-slate-600">
        Buscá por droga o marca y mirá al instante qué farmacias cerca tuyo
        tienen stock.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(query);
        }}
        className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-3 sm:p-4 flex flex-col sm:flex-row gap-3"
      >
        <div className="flex-1 text-left">
          <label className="block text-xs font-medium text-slate-500 px-1">
            Droga o marca
          </label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej: Paracetamol, Tafirol..."
            className="w-full px-1 py-1.5 text-slate-900 placeholder:text-slate-400 outline-none"
          />
        </div>
        <div className="hidden sm:block w-px bg-slate-200" />
        <div className="flex-1 text-left">
          <label className="block text-xs font-medium text-slate-500 px-1">
            Ubicación
          </label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-1 py-1.5 text-slate-900 outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-medium px-6 py-3"
        >
          Buscar
        </button>
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm text-slate-500 mr-1">Búsquedas frecuentes:</span>
        {POPULAR_SEARCHES.map((term) => (
          <button
            key={term}
            onClick={() => onSearch(term)}
            className="text-sm rounded-full bg-slate-100 hover:bg-slate-200 transition-colors px-3 py-1 text-slate-700"
          >
            {term}
          </button>
        ))}
      </div>

      <div className="mt-16 grid sm:grid-cols-3 gap-6 text-left">
        <Step
          number="1"
          title="Buscá"
          text="Ingresá el nombre de la droga o la marca comercial del medicamento."
        />
        <Step
          number="2"
          title="Comparamos"
          text="Te mostramos las farmacias cercanas con stock disponible y precio."
        />
        <Step
          number="3"
          title="Vas a retirar"
          text="Elegís la farmacia más conveniente y listo."
        />
      </div>
    </div>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl bg-white border border-slate-200 p-5">
      <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 font-semibold flex items-center justify-center mb-3">
        {number}
      </div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{text}</p>
    </div>
  );
}
