import { getMobileSrc, get2xSrc } from "@/lib/image-paths";

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Hero image with responsive + retina support via <picture>.
 *
 * Serves 4 variants (browser picks the first matching <source>):
 *   mobile retina  — hero-mobile@2x.webp  (≤768px, ≥1.5x DPR)
 *   mobile 1x      — hero-mobile.webp     (≤768px)
 *   desktop retina — hero@2x.webp         (≥1.5x DPR)
 *   desktop 1x     — hero.webp            (fallback)
 *
 * Missing variants are handled gracefully: if a <source> URL 404s,
 * the browser falls back to the next <source> or the <img> src.
 */
export function HeroImage({ src, alt, className }: HeroImageProps) {
  const mobileSrc = getMobileSrc(src);
  const mobile2xSrc = get2xSrc(mobileSrc);
  const desktop2xSrc = get2xSrc(src);

  return (
    <picture>
      {/* Mobile retina */}
      <source
        srcSet={mobile2xSrc}
        media="(max-width: 768px) and (-webkit-min-device-pixel-ratio: 1.5), (max-width: 768px) and (min-resolution: 144dpi)"
        type="image/webp"
      />
      {/* Mobile 1x */}
      <source
        srcSet={mobileSrc}
        media="(max-width: 768px)"
        type="image/webp"
      />
      {/* Desktop retina */}
      <source
        srcSet={desktop2xSrc}
        media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)"
        type="image/webp"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={1200}
        height={675}
        fetchPriority="high"
        decoding="async"
        className={className}
      />
    </picture>
  );
}
