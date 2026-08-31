import { useState } from "react";
import {
  PHARMACIES,
  POPULAR_SEARCHES,
  getMedication,
  getPharmacy,
  offersOnDiscount,
} from "../data/mock";
import type { Medication, Pharmacy } from "../types";
import { PharmacyCard } from "../components/PharmacyCard";
import { PromoCard } from "../components/PromoCard";
import { Icon } from "../components/Icon";

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
    <div>
      <div className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-cream-50 to-cream-50">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-200/50 blur-3xl" />
        <div className="absolute top-10 -left-16 h-56 w-56 rounded-full bg-ink-200/40 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 pt-14 pb-4 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-700 bg-white rounded-full px-3 py-1.5 shadow-sm">
            <Icon name="package" className="h-3.5 w-3.5" />
            Retiro en local · sin envíos
          </span>

          <h1 className="mt-5 font-display font-medium text-4xl sm:text-5xl text-ink-950 tracking-tight text-balance">
            Tu medicamento, en la farmacia de al lado
          </h1>
          <p className="mt-4 text-ink-500 max-w-xl mx-auto text-balance">
            Buscá por droga o marca, mirá quién lo tiene más barato y
            reservalo charlando directo con la farmacia.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearch(query);
            }}
            className="mt-8 bg-white rounded-2xl border border-ink-900/8 shadow-xl shadow-ink-900/5 p-3 sm:p-3.5 flex flex-col sm:flex-row gap-2 sm:gap-1 max-w-2xl mx-auto"
          >
            <div className="flex-1 text-left flex items-center gap-2.5 px-3 py-1.5">
              <Icon name="search" className="h-4.5 w-4.5 text-brand-500 shrink-0" />
              <div className="min-w-0 flex-1">
                <label className="block text-[11px] font-semibold text-ink-400 uppercase tracking-wide">
                  Droga o marca
                </label>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ej: Paracetamol, Tafirol..."
                  className="w-full text-ink-900 placeholder:text-ink-300 outline-none"
                />
              </div>
            </div>
            <div className="hidden sm:block w-px bg-ink-900/8 my-1" />
            <div className="flex-1 text-left flex items-center gap-2.5 px-3 py-1.5">
              <Icon name="pin" className="h-4.5 w-4.5 text-brand-500 shrink-0" />
              <div className="min-w-0 flex-1">
                <label className="block text-[11px] font-semibold text-ink-400 uppercase tracking-wide">
                  Ubicación
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full text-ink-900 outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="rounded-xl bg-brand-600 hover:bg-brand-700 transition-colors text-white font-semibold px-6 py-3 shadow-md shadow-brand-600/30"
            >
              Buscar
            </button>
          </form>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-ink-400 mr-1">Populares:</span>
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => onSearch(term)}
                className="text-sm rounded-full bg-white hover:bg-brand-50 border border-ink-900/8 transition-colors px-3 py-1 text-ink-600 font-medium"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <section className="mt-12">
          <div className="flex items-center gap-2">
            <Icon name="tag" className="h-5 w-5 text-brand-600" />
            <h2 className="font-display font-medium text-xl text-ink-950">
              Ofertas cerca tuyo
            </h2>
          </div>
          <p className="text-sm text-ink-400 mt-0.5">
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
          <div className="flex items-center gap-2">
            <Icon name="pin" className="h-5 w-5 text-brand-600" />
            <h2 className="font-display font-medium text-xl text-ink-950">
              Farmacias cerca tuyo
            </h2>
          </div>
          <p className="text-sm text-ink-400 mt-0.5">
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

        <section className="mt-14 mb-4 grid sm:grid-cols-3 gap-4">
          <Step
            icon="search"
            title="Buscá o explorá"
            text="Por droga, marca, o directamente por la farmacia de tu barrio."
          />
          <Step
            icon="chat"
            title="Chateá con la farmacia"
            text="Reservá el medicamento o mandá tu receta para que te lo vayan preparando."
          />
          <Step
            icon="package"
            title="Retirá en el local"
            text="Vas cuando te confirman que está listo. Sin envíos, sin esperas de más."
          />
        </section>
      </div>
    </div>
  );
}

function Step({
  icon,
  title,
  text,
}: {
  icon: "search" | "chat" | "package";
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-white border border-ink-900/8 p-5">
      <div className="h-10 w-10 rounded-xl bg-ink-900 text-brand-400 flex items-center justify-center mb-3">
        <Icon name={icon} className="h-5 w-5" />
      </div>
      <h3 className="font-display font-medium text-ink-950">{title}</h3>
      <p className="mt-1 text-sm text-ink-500">{text}</p>
    </div>
  );
}
