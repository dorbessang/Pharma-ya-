import type { DaySchedule, Pharmacy } from "../types";

const DAY_LABELS = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

function minutesSinceMidnight(date: Date) {
  return date.getHours() * 60 + date.getMinutes();
}

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** getDay(): domingo=0 ... sábado=6 -> lo convertimos a lunes=0 ... domingo=6 */
function todayIndex(date: Date) {
  return (date.getDay() + 6) % 7;
}

export function isPharmacyOpenNow(pharmacy: Pharmacy, now: Date = new Date()) {
  const today = pharmacy.hours[todayIndex(now)];
  if (!today || today.closed) return false;
  const nowMin = minutesSinceMidnight(now);
  return nowMin >= toMinutes(today.open) && nowMin < toMinutes(today.close);
}

export function todaySchedule(pharmacy: Pharmacy, now: Date = new Date()) {
  return pharmacy.hours[todayIndex(now)];
}

export function openStatusLabel(pharmacy: Pharmacy, now: Date = new Date()) {
  const today = todaySchedule(pharmacy, now);
  if (!today || today.closed) return "Cerrada hoy";
  if (isPharmacyOpenNow(pharmacy, now)) return `Abierta · cierra ${today.close}`;
  const nowMin = minutesSinceMidnight(now);
  if (nowMin < toMinutes(today.open)) return `Cerrada · abre ${today.open}`;
  return "Cerrada · abre mañana";
}

export function formatDaySchedule(schedule: DaySchedule) {
  if (schedule.closed) return "Cerrado";
  return `${schedule.open} a ${schedule.close}`;
}

export function scheduleForDisplay(pharmacy: Pharmacy) {
  return pharmacy.hours.map((schedule, i) => ({
    label: DAY_LABELS[i],
    text: formatDaySchedule(schedule),
    isToday: i === todayIndex(new Date()),
  }));
}
