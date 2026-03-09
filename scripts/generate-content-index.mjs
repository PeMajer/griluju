import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";

const postsDir = join(process.cwd(), "content/posts");

async function generateIndex() {
  const slugs = await readdir(postsDir);
  const posts = [];

  for (const slug of slugs) {
    const filePath = join(postsDir, slug, "index.mdx");
    try {
      const content = await readFile(filePath, "utf-8");
      const { data } = matter(content);
      posts.push({
        slug: data.slug || slug,
        title: data.title,
        category: data.category,
        keywords: data.keywords || [],
        date: data.date,
      });
    } catch {
      // skip directories without index.mdx
    }
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  await writeFile(
    join(process.cwd(), "content-index.json"),
    JSON.stringify(posts, null, 2) + "\n"
  );

  console.log(`Generated content-index.json with ${posts.length} posts`);
}

generateIndex();
