import { siteConfig, type DayType, type DayHoursType } from "@/data/siteConfig";
import { dayLabel } from "@/lib/hours";

const DAYS: readonly DayType[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export type OpenStateType =
  | { open: true; today: DayType; until: string }
  | { open: false; today: DayType; opensToday: string }
  | { open: false; today: DayType; nextDay: DayType; nextOpen: string }
  | { open: false; today: DayType };

/** Weekday and minutes-since-midnight where the clinic is, not where the
 *  visitor is. Someone checking from Toronto must get the same answer. */
function clinicTime(
  now: Date,
  timeZone: string,
): { day: DayType; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";
  const index = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
    get("weekday"),
  );
  // Intl gives 24 for midnight in some runtimes; 24:00 and 00:00 are the same instant.
  const hour = Number(get("hour")) % 24;
  return { day: DAYS[index], minutes: hour * 60 + Number(get("minute")) };
}

function toMinutes(time: string): number {
  const [hours, mins] = time.split(":").map(Number);
  return hours * 60 + mins;
}

/** "4:00 p.m." for a single time, matching the style lib/hours.ts uses. */
function clockLabel(time: string): string {
  const [hours, mins] = time.split(":").map(Number);
  const twelve = hours % 12 === 0 ? 12 : hours % 12;
  return `${twelve}:${String(mins).padStart(2, "0")} ${hours >= 12 ? "p.m." : "a.m."}`;
}

function entryFor(day: DayType): DayHoursType | undefined {
  return siteConfig.hours.find((entry) => entry.day === day);
}

/** Pure so it can be driven at fixed instants rather than waited on. */
export function getOpenState(
  now: Date,
  timeZone: string = siteConfig.timezone,
): OpenStateType {
  const { day, minutes } = clinicTime(now, timeZone);
  const today = entryFor(day);

  if (today && !("closed" in today)) {
    if (minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
      return { open: true, today: day, until: clockLabel(today.close) };
    }
    if (minutes < toMinutes(today.open)) {
      return { open: false, today: day, opensToday: clockLabel(today.open) };
    }
  }

  // Closed for the rest of today: wrap forward, Sunday round to Monday.
  const start = DAYS.indexOf(day);
  for (let step = 1; step <= 7; step += 1) {
    const candidate = DAYS[(start + step) % 7];
    const entry = entryFor(candidate);
    if (entry && !("closed" in entry)) {
      return {
        open: false,
        today: day,
        nextDay: candidate,
        nextOpen: clockLabel(entry.open),
      };
    }
  }

  // Every day closed. Cannot happen with the current data, but the badge
  // must not claim an opening that does not exist.
  return { open: false, today: day };
}

export function openStateText(state: OpenStateType): string {
  if (state.open) return `Open now, until ${state.until}`;
  if ("opensToday" in state) return `Closed, opens at ${state.opensToday}`;
  if ("nextDay" in state) {
    return `Closed, opens ${dayLabel(state.nextDay)} at ${state.nextOpen}`;
  }
  return "Closed";
}
