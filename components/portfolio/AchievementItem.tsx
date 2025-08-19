import Link from "next/link";
import type { Achievement } from "@/lib/portfolio";

export default function AchievementItem({ item }: { item: Achievement }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-border/60">
      <div>
        <p className="font-medium">{item.title}</p>
        <p className="text-sm text-muted-foreground">{item.issuer}</p>
      </div>
      <div className="text-sm text-muted-foreground flex items-center gap-3">
        {item.date && <span>{item.date}</span>}
        {item.link && (
          <Link href={item.link} className="text-accent hover:underline">
            Ver
          </Link>
        )}
      </div>
    </div>
  );
}
