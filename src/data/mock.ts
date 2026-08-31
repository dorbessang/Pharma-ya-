import type { DaySchedule, Medication, Offer, Pharmacy } from "../types";

const H8_20: DaySchedule = { open: "08:00", close: "20:00" };
const H9_21: DaySchedule = { open: "09:00", close: "21:00" };
const H9_13: DaySchedule = { open: "09:00", close: "13:00" };
const CLOSED: DaySchedule = { open: "00:00", close: "00:00", closed: true };
const H24: DaySchedule = { open: "00:00", close: "23:59" };

export const MEDICATIONS: Medication[] = [
  {
    id: "med-1",
    brandName: "Tafirol",
    drugName: "Paracetamol",
    presentation: "500mg x 20 comp.",
    requiresPrescription: false,
    category: "Analgésicos",
  },
  {
    id: "med-2",
    brandName: "Ibupirac",
    drugName: "Ibuprofeno",
    presentation: "400mg x 10 comp.",
    requiresPrescription: false,
    category: "Antiinflamatorios",
  },
  {
    id: "med-3",
    brandName: "Amoxidal",
    drugName: "Amoxicilina",
    presentation: "500mg x 8 comp.",
    requiresPrescription: true,
    category: "Antibióticos",
  },
  {
    id: "med-4",
    brandName: "Sertal",
    drugName: "Propinoxato",
    presentation: "10mg x 10 comp.",
    requiresPrescription: false,
    category: "Antiespasmódicos",
  },
  {
    id: "med-5",
    brandName: "Actron",
    drugName: "Ibuprofeno",
    presentation: "600mg x 10 comp.",
    requiresPrescription: false,
    category: "Antiinflamatorios",
  },
  {
    id: "med-6",
    brandName: "Bayaspirina",
    drugName: "Ácido acetilsalicílico",
    presentation: "500mg x 20 comp.",
    requiresPrescription: false,
    category: "Analgésicos",
  },
];

export const PHARMACIES: Pharmacy[] = [
  {
    id: "ph-1",
    name: "Farmacia del Águila",
    chain: "Farmacity",
    address: "Av. Corrientes 2450",
    neighborhood: "Balvanera",
    distanceKm: 0.4,
    rating: 4.6,
    phone: "011 4555-1234",
    hours: [H24, H24, H24, H24, H24, H24, H24],
  },
  {
    id: "ph-2",
    name: "Farmacia San Martín",
    chain: "Independiente",
    address: "San Martín 812",
    neighborhood: "Retiro",
    distanceKm: 0.9,
    rating: 4.3,
    phone: "011 4311-5678",
    hours: [H8_20, H8_20, H8_20, H8_20, H8_20, H9_13, CLOSED],
  },
  {
    id: "ph-3",
    name: "Farmacia 24hs Norte",
    chain: "Farmaonline",
    address: "Cabildo 1980",
    neighborhood: "Belgrano",
    distanceKm: 1.6,
    rating: 4.1,
    phone: "011 4780-4321",
    hours: [H24, H24, H24, H24, H24, H24, H24],
  },
  {
    id: "ph-4",
    name: "Farmacia Vital",
    chain: "Vantage",
    address: "Av. Rivadavia 5200",
    neighborhood: "Caballito",
    distanceKm: 0.6,
    rating: 4.7,
    phone: "011 4901-2233",
    hours: [H9_21, H9_21, H9_21, H9_21, H9_21, H9_21, H9_13],
  },
  {
    id: "ph-5",
    name: "Farmacia del Pueblo",
    chain: "Independiente",
    address: "Directorio 1340",
    neighborhood: "Flores",
    distanceKm: 2.1,
    rating: 4.0,
    phone: "011 4633-9090",
    hours: [H8_20, H8_20, H8_20, H8_20, H8_20, H8_20, CLOSED],
  },
  {
    id: "ph-6",
    name: "Farmacia Central",
    chain: "Farmacity",
    address: "Av. Santa Fe 3120",
    neighborhood: "Palermo",
    distanceKm: 1.1,
    rating: 4.5,
    phone: "011 4821-6655",
    hours: [H24, H24, H24, H24, H24, H24, H24],
  },
];

export const OFFERS: Offer[] = [
  { id: "of-1", medicationId: "med-1", pharmacyId: "ph-1", price: 3200, stock: "alto", updatedMinutesAgo: 12 },
  { id: "of-2", medicationId: "med-1", pharmacyId: "ph-2", price: 2950, originalPrice: 3400, stock: "bajo", updatedMinutesAgo: 35 },
  { id: "of-3", medicationId: "med-1", pharmacyId: "ph-3", price: 3100, stock: "sin-stock", updatedMinutesAgo: 58 },
  { id: "of-4", medicationId: "med-2", pharmacyId: "ph-4", price: 2100, stock: "alto", updatedMinutesAgo: 8 },
  { id: "of-5", medicationId: "med-2", pharmacyId: "ph-5", price: 1980, originalPrice: 2400, stock: "bajo", updatedMinutesAgo: 20 },
  { id: "of-6", medicationId: "med-3", pharmacyId: "ph-6", price: 5400, stock: "bajo", updatedMinutesAgo: 5 },
  { id: "of-7", medicationId: "med-3", pharmacyId: "ph-1", price: 5100, originalPrice: 5900, stock: "alto", updatedMinutesAgo: 15 },
  { id: "of-8", medicationId: "med-4", pharmacyId: "ph-2", price: 1450, stock: "alto", updatedMinutesAgo: 40 },
  { id: "of-9", medicationId: "med-5", pharmacyId: "ph-6", price: 2600, originalPrice: 3050, stock: "alto", updatedMinutesAgo: 3 },
  { id: "of-10", medicationId: "med-6", pharmacyId: "ph-3", price: 1750, stock: "alto", updatedMinutesAgo: 22 },
];

export const POPULAR_SEARCHES = [
  "Paracetamol",
  "Ibuprofeno",
  "Amoxicilina",
  "Tafirol",
  "Sertal",
];

export function getPharmacy(id: string): Pharmacy | undefined {
  return PHARMACIES.find((p) => p.id === id);
}

export function getMedication(id: string): Medication | undefined {
  return MEDICATIONS.find((m) => m.id === id);
}

export function offersForMedication(medicationId: string): Offer[] {
  return OFFERS.filter((o) => o.medicationId === medicationId);
}

export function offersForPharmacy(pharmacyId: string): Offer[] {
  return OFFERS.filter((o) => o.pharmacyId === pharmacyId);
}

export function offersOnDiscount(): Offer[] {
  return OFFERS.filter((o) => o.originalPrice && o.originalPrice > o.price);
}
