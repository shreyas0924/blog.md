import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogsDir = path.join(process.cwd(), "blogs");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  published?: boolean;
}
export interface Post extends PostMeta {
  content: string;
}

function ensureBlogsDir() {
  if (!fs.existsSync(blogsDir)) {
    fs.mkdirSync(blogsDir, { recursive: true });
  }
}

export function getAllPosts(): PostMeta[] {
  ensureBlogsDir();
  const files = fs.readdirSync(blogsDir).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(blogsDir, filename), "utf-8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title || slug,
      date: data.date
        ? new Date(data.date).toISOString()
        : new Date().toISOString(),
      description: data.description || "",
      tags: data.tags || [],
      published: data.published === true,
    };
  });

  return posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): Post | null {
  ensureBlogsDir();
  const filepath = path.join(blogsDir, `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;

  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);
  if (!data.published) return null;
  return {
    slug,
    title: data.title || slug,
    date: data.date
      ? new Date(data.date).toISOString()
      : new Date().toISOString(),
    description: data.description || "",
    tags: data.tags || [],
    content,
  };
}

export function getAllSlugs(): string[] {
  ensureBlogsDir();
  return fs
    .readdirSync(blogsDir)
    .filter((f) => f.endsWith(".md"))
    .filter((f) => {
      const raw = fs.readFileSync(path.join(blogsDir, f), "utf-8");
      const { data } = matter(raw);
      return data.published === true;
    })
    .map((f) => f.replace(/\.md$/, ""));
}
