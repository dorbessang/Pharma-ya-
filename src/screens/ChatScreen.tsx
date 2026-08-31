import { useEffect, useRef, useState } from "react";
import type { ChatMessage, Medication, Pharmacy } from "../types";
import { OpenBadge } from "../components/OpenBadge";

interface ChatScreenProps {
  pharmacy: Pharmacy;
  medication?: Medication;
  onBack: () => void;
  onReserve: (kind: "reserva" | "receta") => void;
}

function now() {
  return new Date().toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export function ChatScreen({
  pharmacy,
  medication,
  onBack,
  onReserve,
}: ChatScreenProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: makeId(),
      sender: "pharmacy",
      text: medication
        ? `¡Hola! Somos ${pharmacy.name}. Vimos que te interesa ${medication.brandName}. ¿Querés que te lo reservemos o preferís mandarnos la receta?`
        : `¡Hola! Somos ${pharmacy.name}. ¿En qué te podemos ayudar? Podés consultarnos stock, precios o enviarnos una receta.`,
      time: now(),
    },
  ]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function pushUserMessage(text: string, attachmentName?: string) {
    setMessages((prev) => [
      ...prev,
      { id: makeId(), sender: "user", text, time: now(), attachmentName },
    ]);
  }

  function pushPharmacyReply(text: string) {
    setPending(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: makeId(), sender: "pharmacy", text, time: now() },
      ]);
      setPending(false);
    }, 900);
  }

  function handleSend() {
    if (!draft.trim()) return;
    pushUserMessage(draft.trim());
    setDraft("");
    pushPharmacyReply(
      "Gracias por tu mensaje, en breve te confirmamos desde el mostrador."
    );
  }

  function handleReservar() {
    const label = medication ? medication.brandName : "el producto";
    pushUserMessage(`Quiero reservar ${label}.`);
    pushPharmacyReply(
      `¡Listo! Te lo dejamos reservado. Podés retirarlo hoy hasta la hora de cierre, solo mostrá esta conversación en el mostrador.`
    );
    onReserve("reserva");
  }

  function handleFileSelected(file: File) {
    pushUserMessage("Te mando la receta 📎", file.name);
    pushPharmacyReply(
      "Recibimos tu receta, la estamos validando. En cuanto esté lista te avisamos por acá para que la retires."
    );
    onReserve("receta");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col h-[calc(100vh-140px)]">
      <button
        onClick={onBack}
        className="text-sm text-slate-500 hover:text-slate-700 mb-3 self-start"
      >
        ← Volver
      </button>

      <div className="bg-white border border-slate-200 rounded-t-xl p-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
          {pharmacy.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-slate-900">{pharmacy.name}</p>
          <OpenBadge pharmacy={pharmacy} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-slate-100 border-x border-slate-200 p-4 space-y-3">
        {medication && (
          <div className="bg-white border border-slate-200 rounded-lg p-3 text-sm">
            <p className="font-medium text-slate-900">{medication.brandName}</p>
            <p className="text-slate-500 text-xs">
              {medication.drugName} · {medication.presentation}
            </p>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                m.sender === "user"
                  ? "bg-emerald-600 text-white rounded-br-sm"
                  : "bg-white text-slate-800 border border-slate-200 rounded-bl-sm"
              }`}
            >
              {m.attachmentName && (
                <div
                  className={`mb-1.5 flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs ${
                    m.sender === "user"
                      ? "bg-emerald-700/40"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  📄 {m.attachmentName}
                </div>
              )}
              <p>{m.text}</p>
              <p
                className={`text-[10px] mt-1 ${
                  m.sender === "user" ? "text-emerald-100" : "text-slate-400"
                }`}
              >
                {m.time}
              </p>
            </div>
          </div>
        ))}

        {pending && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm text-slate-400">
              escribiendo…
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="bg-white border border-slate-200 rounded-b-xl p-3">
        <div className="flex flex-wrap gap-2 mb-2">
          <button
            onClick={handleReservar}
            className="text-xs font-medium rounded-full border border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5"
          >
            {medication ? `Reservar ${medication.brandName}` : "Reservar producto"}
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-xs font-medium rounded-full border border-slate-300 text-slate-600 hover:bg-slate-50 px-3 py-1.5"
          >
            📎 Enviar receta
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelected(file);
              e.target.value = "";
            }}
          />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Escribí un mensaje..."
            className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm outline-none focus:border-emerald-400"
          />
          <button
            type="submit"
            className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
