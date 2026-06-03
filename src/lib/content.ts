import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Entry = {
  title: string;
  slug: string;
  year?: number;
  date?: string;
  tags: string[];
  accent?: string;
  status?: string;
  links?: Record<string, string>;
  body: string;
};

const contentRoot = path.join(process.cwd(), "content");

export function getEntries(kind: "projects" | "blog"): Entry[] {
  const dir = path.join(contentRoot, kind);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => readEntry(kind, file.replace(/\.mdx$/, "")))
    .sort((a, b) => Number(b.year ?? b.date?.slice(0, 4) ?? 0) - Number(a.year ?? a.date?.slice(0, 4) ?? 0));
}

export function getEntry(kind: "projects" | "blog", slug: string): Entry | undefined {
  const file = path.join(contentRoot, kind, `${slug}.mdx`);
  if (!fs.existsSync(file)) return undefined;
  return readEntry(kind, slug);
}

function readEntry(kind: "projects" | "blog", slug: string): Entry {
  const raw = fs.readFileSync(path.join(contentRoot, kind, `${slug}.mdx`), "utf8");
  const parsed = matter(raw);

  return {
    title: String(parsed.data.title),
    slug: String(parsed.data.slug ?? slug),
    year: parsed.data.year ? Number(parsed.data.year) : undefined,
    date: parsed.data.date ? String(parsed.data.date) : undefined,
    tags: Array.isArray(parsed.data.tags) ? parsed.data.tags.map(String) : [],
    accent: parsed.data.accent ? String(parsed.data.accent) : undefined,
    status: parsed.data.status ? String(parsed.data.status) : undefined,
    links: parsed.data.links as Record<string, string> | undefined,
    body: parsed.content.trim(),
  };
}
