import "server-only";
import type { RowDataPacket } from "mysql2";
import db from "./db";
import type { Book, Category } from "./data";

// mysql2 returns DECIMAL columns as strings — coerce to number.
const toNum = (v: unknown): number =>
  v == null ? 0 : typeof v === "number" ? v : parseFloat(String(v));

const toNumOrUndef = (v: unknown): number | undefined =>
  v == null ? undefined : toNum(v);

type CategoryRow = RowDataPacket & {
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  count: number | null;
  accent: string | null;
  emoji: string | null;
  image: string | null;
};

type BookRow = RowDataPacket & {
  slug: string;
  title: string;
  author: string;
  category: string;
  level: Book["level"];
  price: string | number;
  old_price: string | number | null;
  rating: string | number;
  reviews: number;
  cover: string | null;
  cover_image: string | null;
  badge: Book["badge"] | null;
  description: string | null;
};

const mapCategory = (r: CategoryRow): Category => ({
  slug: r.slug,
  name: r.name,
  tagline: r.tagline ?? "",
  description: r.description ?? "",
  count: r.count ?? 0,
  accent: r.accent ?? "from-brand-500 to-teal-600",
  emoji: r.emoji ?? "📚",
  image: r.image ?? "",
});

const mapBook = (r: BookRow): Book => ({
  id: r.slug,
  title: r.title,
  author: r.author,
  category: r.category,
  level: r.level,
  price: toNum(r.price),
  oldPrice: toNumOrUndef(r.old_price),
  rating: toNum(r.rating),
  reviews: r.reviews,
  cover: r.cover ?? "from-brand-500 to-teal-600",
  coverImage: r.cover_image ?? undefined,
  badge: r.badge ?? undefined,
  description: r.description ?? "",
});

const BOOK_SELECT = `
  SELECT
    slug, title, author,
    category_slug AS category,
    level, price, old_price,
    rating, reviews,
    cover, cover_image, badge, description
  FROM books
`;

export async function getCategories(): Promise<Category[]> {
  const [rows] = await db.query<CategoryRow[]>(
    "SELECT slug, name, tagline, description, count, accent, emoji, image FROM categories ORDER BY display_order ASC, id ASC"
  );
  return rows.map(mapCategory);
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const [rows] = await db.query<CategoryRow[]>(
    "SELECT slug, name, tagline, description, count, accent, emoji, image FROM categories WHERE slug = ?",
    [slug]
  );
  return rows[0] ? mapCategory(rows[0]) : null;
}

export async function getBooks(): Promise<Book[]> {
  const [rows] = await db.query<BookRow[]>(
    `${BOOK_SELECT} ORDER BY display_order ASC, id ASC`
  );
  return rows.map(mapBook);
}

export async function getFeaturedBooks(limit = 8): Promise<Book[]> {
  const [rows] = await db.query<BookRow[]>(
    `${BOOK_SELECT} ORDER BY display_order ASC, id ASC LIMIT ?`,
    [limit]
  );
  return rows.map(mapBook);
}

export async function getBooksByCategory(slug: string): Promise<Book[]> {
  const [rows] = await db.query<BookRow[]>(
    `${BOOK_SELECT} WHERE category_slug = ? ORDER BY display_order ASC, id ASC`,
    [slug]
  );
  return rows.map(mapBook);
}

export async function getFreeBooks(): Promise<Book[]> {
  const [rows] = await db.query<BookRow[]>(
    `${BOOK_SELECT} WHERE price = 0 ORDER BY display_order ASC, id ASC`
  );
  return rows.map(mapBook);
}

export async function getCategorySlugs(): Promise<string[]> {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT slug FROM categories"
  );
  return rows.map((r) => r.slug as string);
}

export async function getCategoryCount(): Promise<number> {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT COUNT(*) AS n FROM categories"
  );
  return Number(rows[0]?.n ?? 0);
}

export async function getBookCount(): Promise<number> {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT COUNT(*) AS n FROM books"
  );
  return Number(rows[0]?.n ?? 0);
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  const [rows] = await db.query<BookRow[]>(
    `${BOOK_SELECT} WHERE slug = ? LIMIT 1`,
    [slug]
  );
  return rows[0] ? mapBook(rows[0]) : null;
}

export async function getBooksCountByCategory(
  slug: string
): Promise<number> {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT COUNT(*) AS n FROM books WHERE category_slug = ?",
    [slug]
  );
  return Number(rows[0]?.n ?? 0);
}

// =================================================
// Settings (key/value)
// =================================================

export type Setting = {
  key: string;
  value: string;
  group: string;
  label: string | null;
  kind: "text" | "textarea" | "url" | "email" | "tel";
  display_order: number;
};

type SettingRow = RowDataPacket & Setting;

export async function getSettings(): Promise<Setting[]> {
  const [rows] = await db.query<SettingRow[]>(
    "SELECT `key`, `value`, `group`, `label`, `kind`, `display_order` FROM settings ORDER BY `group` ASC, `display_order` ASC"
  );
  return rows.map((r) => ({
    key: r.key,
    value: r.value ?? "",
    group: r.group,
    label: r.label,
    kind: r.kind,
    display_order: r.display_order,
  }));
}

export async function getSettingsMap(): Promise<Record<string, string>> {
  const all = await getSettings().catch(() => [] as Setting[]);
  const map: Record<string, string> = {};
  for (const s of all) map[s.key] = s.value;
  return map;
}

// =================================================
// Banners
// =================================================

export type Banner = {
  id: number;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  link_url: string | null;
  link_label: string | null;
  display_order: number;
  is_active: boolean;
};

type BannerRow = RowDataPacket & {
  id: number;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  link_url: string | null;
  link_label: string | null;
  display_order: number;
  is_active: 0 | 1;
};

const mapBanner = (r: BannerRow): Banner => ({
  id: r.id,
  title: r.title,
  subtitle: r.subtitle,
  image_url: r.image_url,
  link_url: r.link_url,
  link_label: r.link_label,
  display_order: r.display_order,
  is_active: r.is_active === 1,
});

export async function getBanners(): Promise<Banner[]> {
  const [rows] = await db.query<BannerRow[]>(
    "SELECT id, title, subtitle, image_url, link_url, link_label, display_order, is_active FROM banners ORDER BY display_order ASC, id ASC"
  );
  return rows.map(mapBanner);
}

export async function getActiveBanners(): Promise<Banner[]> {
  const [rows] = await db.query<BannerRow[]>(
    "SELECT id, title, subtitle, image_url, link_url, link_label, display_order, is_active FROM banners WHERE is_active = 1 ORDER BY display_order ASC, id ASC"
  );
  return rows.map(mapBanner);
}

export async function getBannerById(id: number): Promise<Banner | null> {
  const [rows] = await db.query<BannerRow[]>(
    "SELECT id, title, subtitle, image_url, link_url, link_label, display_order, is_active FROM banners WHERE id = ?",
    [id]
  );
  return rows[0] ? mapBanner(rows[0]) : null;
}

export async function getBannerCount(): Promise<number> {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT COUNT(*) AS n FROM banners"
  );
  return Number(rows[0]?.n ?? 0);
}

// =================================================
// Media
// =================================================

export type Media = {
  id: number;
  filename: string;
  url: string;
  alt: string | null;
  mime_type: string | null;
  size_bytes: number | null;
  width: number | null;
  height: number | null;
  created_at: string;
};

type MediaRow = RowDataPacket & {
  id: number;
  filename: string;
  url: string;
  alt: string | null;
  mime_type: string | null;
  size_bytes: number | null;
  width: number | null;
  height: number | null;
  created_at: string | Date;
};

const mapMedia = (r: MediaRow): Media => ({
  id: r.id,
  filename: r.filename,
  url: r.url,
  alt: r.alt,
  mime_type: r.mime_type,
  size_bytes: r.size_bytes,
  width: r.width,
  height: r.height,
  created_at: new Date(r.created_at).toISOString(),
});

export async function getMedia(): Promise<Media[]> {
  const [rows] = await db.query<MediaRow[]>(
    "SELECT id, filename, url, alt, mime_type, size_bytes, width, height, created_at FROM media ORDER BY id DESC"
  );
  return rows.map(mapMedia);
}

export async function getMediaById(id: number): Promise<Media | null> {
  const [rows] = await db.query<MediaRow[]>(
    "SELECT id, filename, url, alt, mime_type, size_bytes, width, height, created_at FROM media WHERE id = ?",
    [id]
  );
  return rows[0] ? mapMedia(rows[0]) : null;
}

export async function getMediaCount(): Promise<number> {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT COUNT(*) AS n FROM media"
  );
  return Number(rows[0]?.n ?? 0);
}

// =================================================
// Testimonials
// =================================================

export type Testimonial = {
  id: number;
  quote: string;
  name: string;
  role: string | null;
  accent: string;
  display_order: number;
  is_active: boolean;
};

type TestimonialRow = RowDataPacket & {
  id: number;
  quote: string;
  name: string;
  role: string | null;
  accent: string;
  display_order: number;
  is_active: 0 | 1;
};

const mapTestimonial = (r: TestimonialRow): Testimonial => ({
  id: r.id,
  quote: r.quote,
  name: r.name,
  role: r.role,
  accent: r.accent,
  display_order: r.display_order,
  is_active: r.is_active === 1,
});

export async function getTestimonials(): Promise<Testimonial[]> {
  const [rows] = await db.query<TestimonialRow[]>(
    "SELECT id, quote, name, role, accent, display_order, is_active FROM testimonials ORDER BY display_order ASC, id ASC"
  );
  return rows.map(mapTestimonial);
}

export async function getActiveTestimonials(): Promise<Testimonial[]> {
  const [rows] = await db.query<TestimonialRow[]>(
    "SELECT id, quote, name, role, accent, display_order, is_active FROM testimonials WHERE is_active = 1 ORDER BY display_order ASC, id ASC"
  );
  return rows.map(mapTestimonial);
}

export async function getTestimonialById(
  id: number
): Promise<Testimonial | null> {
  const [rows] = await db.query<TestimonialRow[]>(
    "SELECT id, quote, name, role, accent, display_order, is_active FROM testimonials WHERE id = ?",
    [id]
  );
  return rows[0] ? mapTestimonial(rows[0]) : null;
}

// =================================================
// Team members
// =================================================

export type TeamMember = {
  id: number;
  name: string;
  role: string | null;
  bio: string | null;
  initials: string | null;
  accent: string;
  display_order: number;
  is_active: boolean;
};

type TeamRow = RowDataPacket & {
  id: number;
  name: string;
  role: string | null;
  bio: string | null;
  initials: string | null;
  accent: string;
  display_order: number;
  is_active: 0 | 1;
};

const mapTeam = (r: TeamRow): TeamMember => ({
  id: r.id,
  name: r.name,
  role: r.role,
  bio: r.bio,
  initials: r.initials,
  accent: r.accent,
  display_order: r.display_order,
  is_active: r.is_active === 1,
});

export async function getTeamMembers(): Promise<TeamMember[]> {
  const [rows] = await db.query<TeamRow[]>(
    "SELECT id, name, role, bio, initials, accent, display_order, is_active FROM team_members ORDER BY display_order ASC, id ASC"
  );
  return rows.map(mapTeam);
}

export async function getActiveTeamMembers(): Promise<TeamMember[]> {
  const [rows] = await db.query<TeamRow[]>(
    "SELECT id, name, role, bio, initials, accent, display_order, is_active FROM team_members WHERE is_active = 1 ORDER BY display_order ASC, id ASC"
  );
  return rows.map(mapTeam);
}

export async function getTeamMemberById(
  id: number
): Promise<TeamMember | null> {
  const [rows] = await db.query<TeamRow[]>(
    "SELECT id, name, role, bio, initials, accent, display_order, is_active FROM team_members WHERE id = ?",
    [id]
  );
  return rows[0] ? mapTeam(rows[0]) : null;
}

// =================================================
// Resources (free-resources page)
// =================================================

export type ResourceRow = {
  id: number;
  title: string;
  description: string | null;
  type: "PDF" | "Cheatsheet" | "Course" | "Video";
  category_slug: string | null;
  href: string | null;
  display_order: number;
  is_active: boolean;
};

type RawResourceRow = RowDataPacket & {
  id: number;
  title: string;
  description: string | null;
  type: ResourceRow["type"];
  category_slug: string | null;
  href: string | null;
  display_order: number;
  is_active: 0 | 1;
};

const mapResource = (r: RawResourceRow): ResourceRow => ({
  id: r.id,
  title: r.title,
  description: r.description,
  type: r.type,
  category_slug: r.category_slug,
  href: r.href,
  display_order: r.display_order,
  is_active: r.is_active === 1,
});

export async function getResources(): Promise<ResourceRow[]> {
  const [rows] = await db.query<RawResourceRow[]>(
    "SELECT id, title, description, type, category_slug, href, display_order, is_active FROM resources ORDER BY display_order ASC, id ASC"
  );
  return rows.map(mapResource);
}

export async function getActiveResources(): Promise<ResourceRow[]> {
  const [rows] = await db.query<RawResourceRow[]>(
    "SELECT id, title, description, type, category_slug, href, display_order, is_active FROM resources WHERE is_active = 1 ORDER BY display_order ASC, id ASC"
  );
  return rows.map(mapResource);
}

export async function getResourceById(
  id: number
): Promise<ResourceRow | null> {
  const [rows] = await db.query<RawResourceRow[]>(
    "SELECT id, title, description, type, category_slug, href, display_order, is_active FROM resources WHERE id = ?",
    [id]
  );
  return rows[0] ? mapResource(rows[0]) : null;
}

// =================================================
// Page sections (page builder)
// =================================================

export type PageSection = {
  id: number;
  page_slug: string;
  section_type: string;
  content: Record<string, unknown>;
  display_order: number;
  is_active: boolean;
};

type SectionRow = RowDataPacket & {
  id: number;
  page_slug: string;
  section_type: string;
  content: string | Record<string, unknown>;
  display_order: number;
  is_active: 0 | 1;
};

const parseContent = (raw: SectionRow["content"]): Record<string, unknown> => {
  if (raw == null) return {};
  if (typeof raw === "object") return raw as Record<string, unknown>;
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

const mapSection = (r: SectionRow): PageSection => ({
  id: r.id,
  page_slug: r.page_slug,
  section_type: r.section_type,
  content: parseContent(r.content),
  display_order: r.display_order,
  is_active: r.is_active === 1,
});

export async function getPageSections(slug: string): Promise<PageSection[]> {
  const [rows] = await db.query<SectionRow[]>(
    "SELECT id, page_slug, section_type, content, display_order, is_active FROM page_sections WHERE page_slug = ? ORDER BY display_order ASC, id ASC",
    [slug]
  );
  return rows.map(mapSection);
}

export async function getActivePageSections(
  slug: string
): Promise<PageSection[]> {
  const all = await getPageSections(slug);
  return all.filter((s) => s.is_active);
}

export async function getSectionById(id: number): Promise<PageSection | null> {
  const [rows] = await db.query<SectionRow[]>(
    "SELECT id, page_slug, section_type, content, display_order, is_active FROM page_sections WHERE id = ?",
    [id]
  );
  return rows[0] ? mapSection(rows[0]) : null;
}

export async function getSectionCountsByPage(): Promise<
  Record<string, number>
> {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT page_slug, COUNT(*) AS n FROM page_sections GROUP BY page_slug"
  );
  const map: Record<string, number> = {};
  for (const r of rows) map[r.page_slug as string] = Number(r.n);
  return map;
}
