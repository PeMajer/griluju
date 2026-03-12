import Image from "next/image";
import Link from "next/link";
import { type Locale, siteConfig } from "@/lib/i18n";

// locale kept for future i18n, unused for now
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface AuthorBioProps {
  locale: Locale;
}

export function AuthorBio({ locale: _locale }: AuthorBioProps) {
  return (
    <div className="rounded-2xl p-8 flex items-start gap-5 border border-smoke" style={{ backgroundColor: "var(--bg-warm)" }}>
      <Image
        src="/images/author/petr.jpg"
        alt={siteConfig.author}
        width={56}
        height={56}
        className="h-14 w-14 rounded-full object-cover flex-shrink-0"
      />
      <div>
        <h3 className="text-lg text-coal mb-1">{siteConfig.author}</h3>
        <p className="text-sm text-stone leading-relaxed mb-3">
          Griluji přes 10 let na Weber Kettle. Specializuji se na pomalé grilování,
          pulled pork, brisket a steaky metodou reverse sear.
        </p>
        <Link
          href="/o-mne"
          className="text-sm font-semibold text-heat hover:underline"
        >
          Číst více →
        </Link>
      </div>
    </div>
  );
}
