/** /images/foo/hero.webp → /images/foo/hero-mobile.webp */
export function getMobileSrc(src: string): string {
  return src.replace(/(\.[^.]+)$/, "-mobile$1");
}

/** /images/foo/hero.webp → /images/foo/hero@2x.webp */
export function get2xSrc(src: string): string {
  return src.replace(/(\.[^.]+)$/, "@2x$1");
}
