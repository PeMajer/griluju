import { Users, Clock, Flame, Thermometer, Timer, BarChart2 } from "lucide-react";
import type { Post } from "@/lib/content";
import type { LucideIcon } from "lucide-react";

interface MetaItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface RecipeMetaBoxProps {
  post: Post;
}

export function RecipeMetaBox({ post }: RecipeMetaBoxProps) {
  const items: MetaItem[] = [];

  if (post.servings) items.push({ icon: Users, label: "Porce", value: `${post.servings} os.` });
  if (post.prepTime) items.push({ icon: Clock, label: "Příprava", value: post.prepTime });
  if (post.grillTime) items.push({ icon: Flame, label: "Grilování", value: post.grillTime });
  if (post.internalTemp) items.push({ icon: Thermometer, label: "Teplota masa", value: post.internalTemp });
  if (post.restTime) items.push({ icon: Timer, label: "Odpočinek", value: post.restTime });
  if (post.difficulty) items.push({ icon: BarChart2, label: "Obtížnost", value: post.difficulty });

  if (items.length === 0) return null;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 mb-14">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-smoke rounded-2xl overflow-hidden border border-smoke">
        {items.map((item) => (
          <div
            key={item.label}
            className="bg-bg-card px-4 py-5 text-center flex flex-col items-center gap-2"
          >
            <item.icon size={20} className="text-heat" />
            <span className="text-[11px] uppercase tracking-wider text-stone font-semibold">
              {item.label}
            </span>
            <span className="text-sm font-semibold text-coal">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
