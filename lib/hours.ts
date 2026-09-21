import type { DayHoursType } from "@/data/siteConfig";

function clock(time: string): { text: string; meridiem: "a.m." | "p.m." } {
  const [hours, minutes] = time.split(":").map(Number);
  const twelve = hours % 12 === 0 ? 12 : hours % 12;
  return {
    text: `${twelve}:${String(minutes).padStart(2, "0")}`,
    meridiem: hours >= 12 ? "p.m." : "a.m.",
  };
}

/** "4:00 - 8:00 p.m.", "10:00 a.m. - 1:00 p.m." or "Closed". The meridiem is written once when both ends share it. */
export function formatHours(entry: DayHoursType): string {
  if ("closed" in entry) return "Closed";
  const open = clock(entry.open);
  const close = clock(entry.close);
  if (open.meridiem === close.meridiem) {
    return `${open.text} - ${close.text} ${close.meridiem}`;
  }
  return `${open.text} ${open.meridiem} - ${close.text} ${close.meridiem}`;
}

export function dayLabel(day: DayHoursType["day"]): string {
  return day.charAt(0).toUpperCase() + day.slice(1);
}
