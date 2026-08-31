export type StockLevel = "alto" | "bajo" | "sin-stock";

export interface Medication {
  id: string;
  brandName: string;
  drugName: string;
  presentation: string;
  requiresPrescription: boolean;
  category: string;
}

export interface PharmacyOffer {
  id: string;
  pharmacyName: string;
  chain: string;
  address: string;
  neighborhood: string;
  distanceKm: number;
  price: number;
  stock: StockLevel;
  updatedMinutesAgo: number;
  openNow: boolean;
}
