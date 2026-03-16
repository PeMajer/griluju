import { getMobileSrc, get2xSrc } from "@/lib/image-paths";

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Hero image with responsive + retina support via <img srcset>.
 *
 * Uses plain <img srcset sizes> instead of <picture><source> to avoid
 * double download: the browser's preload scanner correctly evaluates
 * srcset and downloads only one variant. Next.js also auto-generates
 * a matching <link rel="preload" imagesrcset> from fetchPriority="high".
 */
export function HeroImage({ src, alt, className }: HeroImageProps) {
  const mobileSrc = getMobileSrc(src);
  const mobile2xSrc = get2xSrc(mobileSrc);
  const desktop2xSrc = get2xSrc(src);

  const srcSet = `${mobileSrc} 640w, ${mobile2xSrc} 1024w, ${src} 1200w, ${desktop2xSrc} 1920w`;
  const sizes = "(max-width: 768px) 100vw, 1200px";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={1200}
      height={675}
      fetchPriority="high"
      decoding="async"
      className={className}
    />
  );
}
