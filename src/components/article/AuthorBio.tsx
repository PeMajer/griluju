import Image from "next/image";
import Link from "next/link";
import { type Locale, t, siteConfig } from "@/lib/i18n";

interface AuthorBioProps {
  locale: Locale;
}

export function AuthorBio({ locale }: AuthorBioProps) {
  return (
    <div
      className="mt-12 rounded-2xl p-8"
      style={{ backgroundColor: "var(--bg-warm)" }}
    >
      <div className="flex items-start gap-4">
        <Image
          src="/images/author/petr.jpg"
          alt={siteConfig.author}
          width={56}
          height={56}
          className="h-14 w-14 rounded-full object-cover flex-shrink-0"
        />
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
