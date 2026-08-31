import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { PrototypeBanner } from "./components/PrototypeBanner";
import { Toast } from "./components/Toast";
import { HomeScreen } from "./screens/HomeScreen";
import { SearchResultsScreen } from "./screens/SearchResultsScreen";
import { PharmacyOffersScreen } from "./screens/PharmacyOffersScreen";
import type { Medication } from "./types";

type View =
  | { name: "home" }
  | { name: "results"; query: string }
  | { name: "offers"; medication: Medication };

export default function App() {
  const [view, setView] = useState<View>({ name: "home" });
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timeout);
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <PrototypeBanner />
      <Header onLogoClick={() => setView({ name: "home" })} />

      <main className="flex-1">
        {view.name === "home" && (
          <HomeScreen
            onSearch={(query) => setView({ name: "results", query })}
          />
        )}

        {view.name === "results" && (
          <SearchResultsScreen
            query={view.query}
            onSelect={(medication) => setView({ name: "offers", medication })}
            onBack={() => setView({ name: "home" })}
          />
        )}

        {view.name === "offers" && (
          <PharmacyOffersScreen
            medication={view.medication}
            onBack={() =>
              setView({
                name: "results",
                query: view.medication.drugName,
              })
            }
            onAction={setToast}
          />
        )}
      </main>

      <footer className="text-center text-xs text-slate-400 py-6">
        Pharma Ya · Prototipo de diseño · {new Date().getFullYear()}
      </footer>

      <Toast message={toast} />
    </div>
  );
}
