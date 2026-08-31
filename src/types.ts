export type StockLevel = "alto" | "bajo" | "sin-stock";

export interface Medication {
  id: string;
  brandName: string;
  drugName: string;
  presentation: string;
  requiresPrescription: boolean;
  category: string;
}

/** lunes = 0 ... domingo = 6 */
export interface DaySchedule {
  open: string; // "09:00"
  close: string; // "20:00"
  closed?: boolean;
}

export interface Pharmacy {
  id: string;
  name: string;
  chain: string;
  address: string;
  neighborhood: string;
  distanceKm: number;
  rating: number;
  phone: string;
  hours: DaySchedule[]; // 7 entries, lunes a domingo
}

export interface Offer {
  id: string;
  medicationId: string;
  pharmacyId: string;
  price: number;
  originalPrice?: number;
  stock: StockLevel;
  updatedMinutesAgo: number;
}

export type MessageSender = "user" | "pharmacy";

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  time: string;
  attachmentName?: string;
}

export type OrderStatus =
  | "enviado"
  | "confirmado"
  | "preparando"
  | "listo"
  | "retirado";

export interface Order {
  id: string;
  medicationId?: string;
  pharmacyId: string;
  status: OrderStatus;
  createdAt: string;
  kind: "reserva" | "receta";
}
