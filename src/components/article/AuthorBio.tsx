import Link from "next/link";
import { type Locale, t, siteConfig } from "@/lib/i18n";

interface AuthorBioProps {
  locale: Locale;
}

export function AuthorBio({ locale }: AuthorBioProps) {
  return (
    <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 shrink-0 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg">
          TM
        </div>
        <div>
          <Link
            href={`/${locale}/o-mne`}
            className="font-semibold text-gray-900 hover:text-orange-600 transition-colors"
          >
            {siteConfig.author}
          </Link>
          <p className="mt-1 text-sm text-gray-600">
            {t(locale, "author.bio")}
          </p>
        </div>
      </div>
    </div>
  );
}
