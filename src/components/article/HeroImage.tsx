import { getMobileSrc, get2xSrc } from "@/lib/image-paths";

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Hero image with responsive + retina support via <picture>.
 *
 * Uses a single <source> with w-descriptors + sizes so the browser picks
 * the optimal variant based on both viewport width and DPR.
 * This approach must match the <link rel="preload"> imagesrcset/imagesizes
 * in [slug]/page.tsx to avoid double downloads.
 */
export function HeroImage({ src, alt, className }: HeroImageProps) {
  const mobileSrc = getMobileSrc(src);
  const mobile2xSrc = get2xSrc(mobileSrc);
  const desktop2xSrc = get2xSrc(src);

  const srcSet = `${mobileSrc} 640w, ${mobile2xSrc} 1024w, ${src} 1200w, ${desktop2xSrc} 1920w`;
  const sizes = "(max-width: 768px) 100vw, 1200px";

  return (
    <picture>
      <source srcSet={srcSet} sizes={sizes} type="image/webp" />
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
