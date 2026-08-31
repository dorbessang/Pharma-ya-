import { getMedication, getPharmacy } from "../data/mock";
import type { Order, OrderStatus } from "../types";

interface OrdersScreenProps {
  orders: Order[];
  onBack: () => void;
}

const STATUS_STEPS: { key: OrderStatus; label: string }[] = [
  { key: "enviado", label: "Enviado" },
  { key: "confirmado", label: "Confirmado" },
  { key: "preparando", label: "Preparando" },
  { key: "listo", label: "Listo para retirar" },
];

function statusIndex(status: OrderStatus) {
  return STATUS_STEPS.findIndex((s) => s.key === status);
}

export function OrdersScreen({ orders, onBack }: OrdersScreenProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="text-sm text-slate-500 hover:text-slate-700 mb-4"
      >
        ← Volver
      </button>

      <h2 className="text-xl font-semibold text-slate-900 mb-1">Mis pedidos</h2>
      <p className="text-sm text-slate-500 mb-6">
        Reservas y recetas enviadas a farmacias, para retirar en el local.
      </p>

      {orders.length === 0 ? (
        <div className="text-center py-16 text-slate-500 bg-white border border-slate-200 rounded-xl">
          Todavía no hiciste ninguna reserva. Buscá un medicamento y chateá con
          una farmacia para empezar.
        </div>
      ) : (
        <div className="space-y-4">
          {[...orders].reverse().map((order) => {
            const medication = order.medicationId
              ? getMedication(order.medicationId)
              : undefined;
            const pharmacy = getPharmacy(order.pharmacyId);
            if (!pharmacy) return null;
            const idx = statusIndex(order.status);

            return (
              <div
                key={order.id}
                className="bg-white border border-slate-200 rounded-xl p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {medication
                        ? medication.brandName
                        : order.kind === "receta"
                          ? "Receta enviada"
                          : "Producto a confirmar"}
                    </p>
                    <p className="text-sm text-slate-500">
                      {pharmacy.name} · {pharmacy.neighborhood}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 rounded-full px-2.5 py-1 shrink-0">
                    {order.kind === "receta" ? "Receta enviada" : "Reserva"}
                  </span>
                </div>

                <div className="mt-4 flex items-center">
                  {STATUS_STEPS.map((step, i) => (
                    <div key={step.key} className="flex-1 flex items-center">
                      <div className="flex flex-col items-center gap-1 w-full">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            i <= idx ? "bg-emerald-600" : "bg-slate-200"
                          }`}
                        />
                        <span
                          className={`text-[10px] text-center leading-tight ${
                            i <= idx
                              ? "text-emerald-700 font-medium"
                              : "text-slate-400"
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                      {i < STATUS_STEPS.length - 1 && (
                        <div
                          className={`h-0.5 flex-1 -mt-4 ${
                            i < idx ? "bg-emerald-600" : "bg-slate-200"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
