# Pharma Ya

Prototipo de una plataforma para buscar medicamentos (por droga o marca) y ver
en qué farmacias cercanas hay stock disponible, precio y distancia.

## Estado actual

Este es un **prototipo de diseño**: la interfaz y el flujo de uso están
implementados, pero todos los datos (medicamentos, farmacias, stock, precios)
son de ejemplo (`src/data/mock.ts`) y las acciones como "Reservar" o "Cómo
llegar" todavía no tienen funcionalidad real.

## Flujo

1. **Buscar** — el usuario ingresa una droga o marca comercial y su ubicación.
2. **Resultados** — se listan los medicamentos que coinciden con la búsqueda.
3. **Farmacias cercanas** — al elegir un medicamento, se muestran las
   farmacias cercanas con stock, precio, distancia y estado (abierta/cerrada).

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4

## Desarrollo

```bash
npm install
npm run dev
```
