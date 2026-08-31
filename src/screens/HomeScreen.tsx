import { useState } from "react";
import {
  MEDICATIONS,
  PHARMACIES,
  POPULAR_SEARCHES,
  getMedication,
  getPharmacy,
  offersOnDiscount,
} from "../data/mock";
import type { Medication, Pharmacy } from "../types";
import { PharmacyCard } from "../components/PharmacyCard";
import { PromoCard } from "../components/PromoCard";

interface HomeScreenProps {
  onSearch: (query: string) => void;
  onSelectPharmacy: (pharmacy: Pharmacy) => void;
  onSelectMedication: (medication: Medication) => void;
}

export function HomeScreen({
  onSearch,
  onSelectPharmacy,
  onSelectMedication,
}: HomeScreenProps) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Palermo, CABA");

  const promos = offersOnDiscount();
  const nearbyPharmacies = [...PHARMACIES].sort(
    (a, b) => a.distanceKm - b.distanceKm
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Encontrá tu medicamento
        </h1>
        <p className="mt-3 text-slate-600">
          Buscá por droga o marca, mirá qué farmacia lo tiene más barato y
          reservalo para retirar. Sin envíos, directo al mostrador.
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
          <span className="text-sm text-slate-500 mr-1">
            Búsquedas frecuentes:
          </span>
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
      </div>

      <section className="mt-14">
        <h2 className="text-lg font-semibold text-slate-900">
          Ofertas cerca tuyo
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Descuentos activos en farmacias de tu zona.
        </p>
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {promos.map((offer) => {
            const medication = getMedication(offer.medicationId);
            const pharmacy = getPharmacy(offer.pharmacyId);
            if (!medication || !pharmacy) return null;
            return (
              <PromoCard
                key={offer.id}
                offer={offer}
                medication={medication}
                pharmacy={pharmacy}
                onClick={() => onSelectMedication(medication)}
              />
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-slate-900">
          Farmacias cerca tuyo
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Mirá horarios, catálogo y reservá por chat.
        </p>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {nearbyPharmacies.map((pharmacy) => (
            <PharmacyCard
              key={pharmacy.id}
              pharmacy={pharmacy}
              onClick={() => onSelectPharmacy(pharmacy)}
            />
          ))}
        </div>
      </section>

      <section className="mt-14 grid sm:grid-cols-3 gap-6">
        <Step
          number="1"
          title="Buscá o explorá"
          text="Por droga, marca, o directamente por la farmacia de tu barrio."
        />
        <Step
          number="2"
          title="Chateá con la farmacia"
          text="Reservá el medicamento o mandá tu receta para que te lo vayan preparando."
        />
        <Step
          number="3"
          title="Retirá en el local"
          text="Vas cuando te confirman que está listo. Sin envíos, sin esperas de más."
        />
      </section>

      <p className="mt-10 text-center text-xs text-slate-400">
        Búsqueda por: {MEDICATIONS.length} medicamentos de ejemplo
      </p>
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
