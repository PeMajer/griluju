import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const SITE_URL = "https://griluju.cz";
const OUTPUT_DIR = join(process.cwd(), "out");

async function generateSitemap() {
  const indexContent = await readFile(
    join(process.cwd(), "content-index.json"),
    "utf-8"
  );
  const posts = JSON.parse(indexContent);

  const staticPages = [
    { path: "/cs", priority: "1.0", changefreq: "weekly" },
    { path: "/cs/o-mne", priority: "0.7", changefreq: "monthly" },
    { path: "/cs/kontakt", priority: "0.5", changefreq: "monthly" },
    { path: "/cs/ochrana-soukromi", priority: "0.3", changefreq: "yearly" },
    { path: "/cs/cookies", priority: "0.3", changefreq: "yearly" },
  ];

  const postPages = posts.map((post) => ({
    path: `/cs/${post.slug}`,
    priority: "0.8",
    changefreq: "monthly",
    lastmod: post.date,
  }));

  const allPages = [...staticPages, ...postPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${
      page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ""
    }
  </url>`
  )
  .join("\n")}
</urlset>`;

  await writeFile(join(OUTPUT_DIR, "sitemap.xml"), sitemap);
  console.log(`Generated sitemap.xml with ${allPages.length} URLs`);
}

generateSitemap();
