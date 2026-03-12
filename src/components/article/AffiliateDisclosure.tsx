import { type Locale, t } from "@/lib/i18n";

interface AffiliateDisclosureProps {
  locale: Locale;
}

export function AffiliateDisclosure({ locale }: AffiliateDisclosureProps) {
  return (
    <div className="mb-8 flex items-start gap-3 rounded-xl border border-smoke px-5 py-4 text-[13px] text-stone/80">
      <span className="text-xs leading-none mt-0.5 shrink-0">*</span>
      <span>{t(locale, "article.affiliate")}</span>
    </div>
  );
}
