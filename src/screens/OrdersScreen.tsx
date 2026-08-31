import { getMedication, getPharmacy } from "../data/mock";
import type { Order, OrderStatus } from "../types";
import { Icon } from "../components/Icon";

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
        className="inline-flex items-center gap-1 text-sm text-ink-400 hover:text-ink-700 mb-4 font-medium"
      >
        <Icon name="arrowLeft" className="h-4 w-4" />
        Volver
      </button>

      <h2 className="font-display font-medium text-2xl text-ink-950 mb-1">
        Mis pedidos
      </h2>
      <p className="text-sm text-ink-400 mb-6">
        Reservas y recetas enviadas a farmacias, para retirar en el local.
      </p>

      {orders.length === 0 ? (
        <div className="text-center py-16 px-6 text-ink-400 bg-white border border-ink-900/8 rounded-2xl">
          <div className="mx-auto h-12 w-12 rounded-full bg-brand-50 flex items-center justify-center mb-3">
            <Icon name="package" className="h-6 w-6 text-brand-400" />
          </div>
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
                className="bg-white border border-ink-900/8 rounded-2xl p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink-900">
                      {medication
                        ? medication.brandName
                        : order.kind === "receta"
                          ? "Receta enviada"
                          : "Producto a confirmar"}
                    </p>
                    <p className="text-sm text-ink-400">
                      {pharmacy.name} · {pharmacy.neighborhood}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-ink-500 bg-ink-50 rounded-full px-2.5 py-1 shrink-0">
                    {order.kind === "receta" ? "Receta enviada" : "Reserva"}
                  </span>
                </div>

                <div className="mt-4 flex items-center">
                  {STATUS_STEPS.map((step, i) => (
                    <div key={step.key} className="flex-1 flex items-center">
                      <div className="flex flex-col items-center gap-1 w-full">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            i <= idx ? "bg-brand-600" : "bg-ink-100"
                          }`}
                        />
                        <span
                          className={`text-[10px] text-center leading-tight ${
                            i <= idx
                              ? "text-brand-700 font-semibold"
                              : "text-ink-300"
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                      {i < STATUS_STEPS.length - 1 && (
                        <div
                          className={`h-0.5 flex-1 -mt-4 ${
                            i < idx ? "bg-brand-600" : "bg-ink-100"
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
