import { Info } from "lucide-react";
import { type Locale, t } from "@/lib/i18n";

interface AffiliateDisclosureProps {
  locale: Locale;
}

export function AffiliateDisclosure({ locale }: AffiliateDisclosureProps) {
  return (
    <div className="mb-6 flex gap-3 rounded-lg border border-smoke bg-bg-warm px-4 py-3 text-sm text-stone">
      <Info size={16} className="mt-0.5 shrink-0 text-heat" />
      <span>{t(locale, "article.affiliate")}</span>
    </div>
  );
}
