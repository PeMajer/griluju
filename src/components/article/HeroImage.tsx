interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
}

/** Derives the 2x variant path: /images/foo/hero.webp → /images/foo/hero@2x.webp */
function get2xSrc(src: string): string {
  return src.replace(/(\.[^.]+)$/, "@2x$1");
}

/**
 * Hero image with retina support via <picture>.
 * Looks for a @2x variant (e.g. hero@2x.webp) for retina displays.
 * If the 2x file doesn't exist, the browser silently falls back to src.
 */
export function HeroImage({ src, alt, className }: HeroImageProps) {
  const src2x = get2xSrc(src);

  return (
    <picture>
      <source
        srcSet={src2x}
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
