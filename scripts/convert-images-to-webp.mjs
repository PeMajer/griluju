/**
 * Converts all JPG/PNG images in public/images/ to WebP format.
 * Skips files that already have a WebP counterpart.
 * Usage: node scripts/convert-images-to-webp.mjs
 */

import { readdir, stat } from "fs/promises";
import { join, extname, basename } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const PUBLIC_IMAGES = join(process.cwd(), "public", "images");

async function findImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findImages(fullPath)));
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function convertToWebP(filePath) {
  const ext = extname(filePath);
  const webpPath = filePath.slice(0, -ext.length) + ".webp";

  // Check if WebP already exists
  try {
    await stat(webpPath);
    console.log(`  skip: ${basename(webpPath)} (already exists)`);
    return;
  } catch {
    // doesn't exist, continue
  }

  const image = sharp(filePath);
  const meta = await image.metadata();

  await image
    .webp({ quality: 82, effort: 4 })
    .toFile(webpPath);

  const originalStat = await stat(filePath);
  const webpStat = await stat(webpPath);
  const saved = originalStat.size - webpStat.size;
  const pct = ((saved / originalStat.size) * 100).toFixed(0);

  console.log(
    `  converted: ${basename(filePath)} → ${basename(webpPath)}` +
    ` (${(originalStat.size / 1024).toFixed(0)} kB → ${(webpStat.size / 1024).toFixed(0)} kB, -${pct}%)`
  );
}

async function main() {
  console.log("Converting images to WebP...\n");
  const images = await findImages(PUBLIC_IMAGES);

  if (images.length === 0) {
    console.log("No JPG/PNG images found.");
    return;
  }

  for (const img of images) {
    await convertToWebP(img);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
