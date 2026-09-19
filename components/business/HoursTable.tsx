import { siteConfig } from "@/data/siteConfig";
import { dayLabel, formatHours } from "@/lib/hours";
import { cn } from "@/lib/utils";

export function HoursTable({ className }: { className?: string }) {
  return (
    <table className={cn("w-full border-collapse text-[15px]", className)}>
      <tbody>
        {siteConfig.hours.map((entry) => (
          <tr key={entry.day} className="border-t border-border last:border-b">
            <td className="py-2.5">{dayLabel(entry.day)}</td>
            <td className="py-2.5 text-right text-muted-foreground">
              {formatHours(entry)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
