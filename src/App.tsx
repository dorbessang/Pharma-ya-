import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { PrototypeBanner } from "./components/PrototypeBanner";
import { Toast } from "./components/Toast";
import { HomeScreen } from "./screens/HomeScreen";
import { SearchResultsScreen } from "./screens/SearchResultsScreen";
import { PharmacyOffersScreen } from "./screens/PharmacyOffersScreen";
import { PharmacyDetailScreen } from "./screens/PharmacyDetailScreen";
import { ChatScreen } from "./screens/ChatScreen";
import { OrdersScreen } from "./screens/OrdersScreen";
import type { Medication, Order, OrderStatus, Pharmacy } from "./types";

type View =
  | { name: "home" }
  | { name: "results"; query: string }
  | { name: "offers"; medication: Medication }
  | { name: "pharmacy"; pharmacy: Pharmacy }
  | { name: "chat"; pharmacy: Pharmacy; medication?: Medication }
  | { name: "orders" };

function makeOrderId() {
  return Math.random().toString(36).slice(2, 10);
}

export default function App() {
  const [view, setView] = useState<View>({ name: "home" });
  const [toast, setToast] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timeout);
  }, [toast]);

  function createOrder(
    pharmacy: Pharmacy,
    medication: Medication | undefined,
    kind: "reserva" | "receta"
  ) {
    const status: OrderStatus = "confirmado";
    setOrders((prev) => [
      ...prev,
      {
        id: makeOrderId(),
        medicationId: medication?.id,
        pharmacyId: pharmacy.id,
        status,
        createdAt: new Date().toISOString(),
        kind,
      },
    ]);
    setToast(
      kind === "receta"
        ? "Receta enviada — la agregamos a Mis pedidos"
        : "Reserva confirmada — la agregamos a Mis pedidos"
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PrototypeBanner />
      <Header
        onLogoClick={() => setView({ name: "home" })}
        onOrdersClick={() => setView({ name: "orders" })}
        ordersCount={orders.length}
      />

      <main className="flex-1">
        {view.name === "home" && (
          <HomeScreen
            onSearch={(query) => setView({ name: "results", query })}
            onSelectPharmacy={(pharmacy) => setView({ name: "pharmacy", pharmacy })}
            onSelectMedication={(medication) =>
              setView({ name: "offers", medication })
            }
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
              setView({ name: "results", query: view.medication.drugName })
            }
            onSelectPharmacy={(pharmacy) => setView({ name: "pharmacy", pharmacy })}
            onReserve={(pharmacy, medication) =>
              setView({ name: "chat", pharmacy, medication })
            }
          />
        )}

        {view.name === "pharmacy" && (
          <PharmacyDetailScreen
            pharmacy={view.pharmacy}
            onBack={() => setView({ name: "home" })}
            onChat={(pharmacy, medication) =>
              setView({ name: "chat", pharmacy, medication })
            }
          />
        )}

        {view.name === "chat" && (
          <ChatScreen
            pharmacy={view.pharmacy}
            medication={view.medication}
            onBack={() => setView({ name: "pharmacy", pharmacy: view.pharmacy })}
            onReserve={(kind) => createOrder(view.pharmacy, view.medication, kind)}
          />
        )}

        {view.name === "orders" && (
          <OrdersScreen orders={orders} onBack={() => setView({ name: "home" })} />
        )}
      </main>

      <footer className="text-center text-xs text-slate-400 py-6">
        Pharma Ya · Prototipo de diseño · {new Date().getFullYear()}
      </footer>

      <Toast message={toast} />
    </div>
  );
}
