import Link from "next/link";
import { type Locale, t, siteConfig } from "@/lib/i18n";

interface AuthorBioProps {
  locale: Locale;
}

export function AuthorBio({ locale }: AuthorBioProps) {
  return (
    <div
      className="mt-8 rounded-xl p-6 bg-bg-warm border border-smoke"
    >
      <div className="flex items-start gap-4">
        {/* Avatar placeholder — replace with real photo */}
        <div className="h-14 w-14 shrink-0 rounded-full bg-heat-lt flex items-center justify-center text-2xl">
          👨‍🍳
        </div>
        <div>
          <Link
            href="/o-mne"
            className="font-display font-semibold text-coal hover:text-heat transition-colors duration-150"
          >
            {siteConfig.author}
          </Link>
          <p className="mt-1 text-sm text-stone leading-relaxed">
            {t(locale, "author.bio")}
          </p>
          <Link
            href="/o-mne"
            className="mt-2 inline-block text-sm font-medium text-heat hover:text-heat-dk transition-colors duration-150"
          >
            Číst více →
          </Link>
        </div>
      </div>
    </div>
  );
}
