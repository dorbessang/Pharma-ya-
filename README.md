# Pharma Ya

Prototipo de una plataforma estilo Rappi/PedidosYa, pero sin envíos: buscás un
medicamento (por droga o marca), ves qué farmacias cercanas tienen stock, a
qué precio (con ofertas activas), sus horarios y si están abiertas ahora, y
reservás o mandás tu receta chateando directo con la farmacia para retirar en
el local.

## Estado actual

Este es un **prototipo de diseño**: la interfaz y el flujo de uso están
implementados. Los datos (medicamentos, farmacias, stock, precios, horarios)
son de ejemplo (`src/data/mock.ts`), y el chat con la farmacia simula
respuestas automáticas en el cliente — no hay backend ni farmacias reales del
otro lado todavía.

## Flujo

1. **Buscar o explorar** — por droga/marca, o navegando las farmacias y
   ofertas cercanas desde el home.
2. **Resultados y ofertas** — medicamentos que coinciden con la búsqueda, con
   precio, descuentos activos, stock y distancia de cada farmacia.
3. **Perfil de farmacia** — horarios completos, estado abierto/cerrado
   calculado en tiempo real, y catálogo del local.
4. **Chat con la farmacia** — reservar un producto o enviar una receta
   (adjuntando un archivo) para que la vayan preparando.
5. **Mis pedidos** — seguimiento del estado de cada reserva/receta enviada
   (enviado → confirmado → preparando → listo para retirar).

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4

## Desarrollo

```bash
npm install
npm run dev
```
