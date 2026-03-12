import type { LucideIcon } from "lucide-react";

interface IconCardProps {
  icon: LucideIcon;
  title: string;
  text: string;
}

export function IconCard({ icon: Icon, title, text }: IconCardProps) {
  return (
    <div className="group bg-bg-card border border-smoke rounded-xl p-5 hover:border-heat/30 hover:shadow-md transition-all">
      <div className="flex items-start gap-3.5">
        <Icon size={20} className="text-heat mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
        <div>
          <h3 className="text-base text-coal mb-1">{title}</h3>
          <p className="text-stone text-sm leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
}
