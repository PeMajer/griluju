import { type Locale, t } from "@/lib/i18n";

interface AffiliateDisclosureProps {
  locale: Locale;
}

export function AffiliateDisclosure({ locale }: AffiliateDisclosureProps) {
  return (
    <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
      {t(locale, "article.affiliate")}
    </div>
  );
}
