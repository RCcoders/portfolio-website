import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// Resolve path based on type
const contentDir = (type: "projects" | "certifications") =>
  path.join(process.cwd(), "content", type);

// Return list of slugs (filenames without .md)
export async function getSlugs(type: "projects" | "certifications") {
  const dirPath = contentDir(type);

  // Check if directory exists
  if (!fs.existsSync(dirPath)) {
    console.warn(`Directory does not exist: ${dirPath}`);
    return [];
  }

  return fs.readdirSync(dirPath).filter(f => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
}

type FrontMatter = {
  title?: string;
  date?: string;
  description?: string;
  [key: string]: unknown;
};

// Return one item’s front matter + HTML + slug
export async function getItem(type: "projects" | "certifications", slug: string) {
  const fullPath = path.join(contentDir(type), `${slug}.md`);

  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Markdown file not found: ${fullPath}`);
  }

  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);
  const processed = await remark().use(html).process(content);
  return {
    frontMatter: data as FrontMatter,
    html: processed.toString(),
    slug,
  };
}

// Return all items for a given type
export async function getAllItems(type: "projects" | "certifications") {
  const slugs = await getSlugs(type);
  return Promise.all(slugs.map((s) => getItem(type, s)));
}
