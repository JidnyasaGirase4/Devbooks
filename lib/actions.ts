"use server";

import path from "path";
import { promises as fs } from "fs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import db from "./db";
import {
  checkCredentials,
  clearAdminCookie,
  isAdmin,
  setAdminCookie,
} from "./auth";

// =================================================
// Auth actions
// =================================================

export type LoginState = {
  error?: string;
};

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "Please enter your username and password." };
  }
  if (!checkCredentials(username, password)) {
    return { error: "Invalid username or password." };
  }
  setAdminCookie();
  redirect("/admin");
}

export async function logoutAction() {
  clearAdminCookie();
  redirect("/admin/login");
}

const requireAdmin = () => {
  if (!isAdmin()) redirect("/admin/login");
};

const revalidateAll = () => {
  revalidatePath("/");
  revalidatePath("/books");
  revalidatePath("/categories");
  revalidatePath("/admin");
};

// =================================================
// Category CRUD
// =================================================

export type CategoryFormState = {
  error?: string;
  fieldErrors?: Partial<{
    slug: string;
    name: string;
    tagline: string;
    description: string;
    emoji: string;
    image: string;
    accent: string;
    count: string;
    display_order: string;
  }>;
};

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function validateCategoryForm(formData: FormData): {
  ok: boolean;
  state: CategoryFormState;
  values: {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    emoji: string;
    image: string;
    accent: string;
    count: number;
    display_order: number;
  };
} {
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const name = String(formData.get("name") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const emoji = String(formData.get("emoji") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();
  const accent = String(formData.get("accent") ?? "").trim();
  const count = Number(formData.get("count") ?? 0);
  const display_order = Number(formData.get("display_order") ?? 0);

  const fieldErrors: CategoryFormState["fieldErrors"] = {};
  if (!slug) fieldErrors.slug = "Slug is required.";
  else if (!SLUG_RE.test(slug))
    fieldErrors.slug = "Use lowercase letters, numbers and dashes only.";
  if (!name || name.length < 2) fieldErrors.name = "Name is required.";
  if (name.length > 100) fieldErrors.name = "Max 100 characters.";
  if (!Number.isFinite(count) || count < 0)
    fieldErrors.count = "Must be a non-negative number.";
  if (!Number.isFinite(display_order))
    fieldErrors.display_order = "Must be a number.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      state: { error: "Please fix the errors below.", fieldErrors },
      values: {
        slug,
        name,
        tagline,
        description,
        emoji,
        image,
        accent,
        count,
        display_order,
      },
    };
  }
  return {
    ok: true,
    state: {},
    values: {
      slug,
      name,
      tagline,
      description,
      emoji,
      image,
      accent: accent || "from-brand-500 to-teal-600",
      count,
      display_order,
    },
  };
}

export async function addCategoryAction(
  _prev: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  requireAdmin();
  const v = validateCategoryForm(formData);
  if (!v.ok) return v.state;

  try {
    await db.query(
      `INSERT INTO categories
        (slug, name, tagline, description, count, accent, emoji, image, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        v.values.slug,
        v.values.name,
        v.values.tagline || null,
        v.values.description || null,
        v.values.count,
        v.values.accent,
        v.values.emoji || null,
        v.values.image || null,
        v.values.display_order,
      ]
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.toLowerCase().includes("duplicate")) {
      return {
        error: "A category with that slug already exists.",
        fieldErrors: { slug: "Already in use." },
      };
    }
    return { error: msg };
  }

  revalidateAll();
  redirect("/admin/categories?status=added");
}

export async function updateCategoryAction(
  originalSlug: string,
  _prev: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  requireAdmin();
  const v = validateCategoryForm(formData);
  if (!v.ok) return v.state;

  try {
    await db.query(
      `UPDATE categories SET
        slug = ?, name = ?, tagline = ?, description = ?,
        count = ?, accent = ?, emoji = ?, image = ?, display_order = ?
       WHERE slug = ?`,
      [
        v.values.slug,
        v.values.name,
        v.values.tagline || null,
        v.values.description || null,
        v.values.count,
        v.values.accent,
        v.values.emoji || null,
        v.values.image || null,
        v.values.display_order,
        originalSlug,
      ]
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.toLowerCase().includes("duplicate")) {
      return {
        error: "Slug already in use by another category.",
        fieldErrors: { slug: "Already in use." },
      };
    }
    return { error: msg };
  }

  revalidateAll();
  redirect("/admin/categories?status=updated");
}

export async function deleteCategoryAction(formData: FormData): Promise<void> {
  requireAdmin();
  const slug = String(formData.get("slug") ?? "").trim();
  if (!slug) return;

  try {
    await db.query("DELETE FROM categories WHERE slug = ?", [slug]);
  } catch {
    // FK from books to categories prevents delete if books still reference it.
    redirect("/admin/categories?status=fk_block");
  }
  revalidateAll();
  redirect("/admin/categories?status=deleted");
}

// =================================================
// Book CRUD
// =================================================

export type BookFormState = {
  error?: string;
  fieldErrors?: Partial<
    Record<
      | "slug"
      | "title"
      | "author"
      | "category_slug"
      | "level"
      | "price"
      | "old_price"
      | "rating"
      | "reviews"
      | "cover"
      | "cover_image"
      | "badge"
      | "description"
      | "display_order",
      string
    >
  >;
};

const LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;
const BADGES = ["", "Bestseller", "New", "Free"] as const;

function emptyToNull(v: string): string | null {
  return v.trim().length === 0 ? null : v.trim();
}

function validateBookForm(formData: FormData): {
  ok: boolean;
  state: BookFormState;
  values: {
    slug: string;
    title: string;
    author: string;
    category_slug: string;
    level: (typeof LEVELS)[number];
    price: number;
    old_price: number | null;
    rating: number;
    reviews: number;
    cover: string | null;
    cover_image: string | null;
    badge: (typeof BADGES)[number] | null;
    description: string | null;
    display_order: number;
  };
} {
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const category_slug = String(formData.get("category_slug") ?? "").trim();
  const level = String(formData.get("level") ?? "Beginner") as
    (typeof LEVELS)[number];
  const price = Number(formData.get("price") ?? 0);
  const oldPriceRaw = String(formData.get("old_price") ?? "").trim();
  const old_price = oldPriceRaw === "" ? null : Number(oldPriceRaw);
  const rating = Number(formData.get("rating") ?? 0);
  const reviews = Number(formData.get("reviews") ?? 0);
  const cover = emptyToNull(String(formData.get("cover") ?? ""));
  const cover_image = emptyToNull(String(formData.get("cover_image") ?? ""));
  const badgeRaw = String(formData.get("badge") ?? "") as
    (typeof BADGES)[number];
  const badge = badgeRaw === "" ? null : badgeRaw;
  const description = emptyToNull(String(formData.get("description") ?? ""));
  const display_order = Number(formData.get("display_order") ?? 0);

  const fieldErrors: BookFormState["fieldErrors"] = {};
  if (!slug) fieldErrors.slug = "Slug is required.";
  else if (!SLUG_RE.test(slug))
    fieldErrors.slug = "Use lowercase letters, numbers and dashes only.";
  if (!title) fieldErrors.title = "Title is required.";
  if (!author) fieldErrors.author = "Author is required.";
  if (!category_slug) fieldErrors.category_slug = "Pick a category.";
  if (!LEVELS.includes(level)) fieldErrors.level = "Invalid level.";
  if (!Number.isFinite(price) || price < 0)
    fieldErrors.price = "Must be a non-negative number.";
  if (old_price !== null && (!Number.isFinite(old_price) || old_price < 0))
    fieldErrors.old_price = "Must be a non-negative number.";
  if (!Number.isFinite(rating) || rating < 0 || rating > 5)
    fieldErrors.rating = "Rating must be 0–5.";
  if (!Number.isFinite(reviews) || reviews < 0)
    fieldErrors.reviews = "Must be a non-negative number.";
  if (!Number.isFinite(display_order))
    fieldErrors.display_order = "Must be a number.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      state: { error: "Please fix the errors below.", fieldErrors },
      values: {
        slug,
        title,
        author,
        category_slug,
        level,
        price,
        old_price,
        rating,
        reviews,
        cover,
        cover_image,
        badge,
        description,
        display_order,
      },
    };
  }
  return {
    ok: true,
    state: {},
    values: {
      slug,
      title,
      author,
      category_slug,
      level,
      price,
      old_price,
      rating,
      reviews,
      cover: cover ?? "from-brand-500 to-teal-600",
      cover_image,
      badge,
      description,
      display_order,
    },
  };
}

export async function addBookAction(
  _prev: BookFormState,
  formData: FormData
): Promise<BookFormState> {
  requireAdmin();
  const v = validateBookForm(formData);
  if (!v.ok) return v.state;

  try {
    await db.query(
      `INSERT INTO books
        (slug, title, author, category_slug, level, price, old_price,
         rating, reviews, cover, cover_image, badge, description, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        v.values.slug,
        v.values.title,
        v.values.author,
        v.values.category_slug,
        v.values.level,
        v.values.price,
        v.values.old_price,
        v.values.rating,
        v.values.reviews,
        v.values.cover,
        v.values.cover_image,
        v.values.badge,
        v.values.description,
        v.values.display_order,
      ]
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.toLowerCase().includes("duplicate")) {
      return {
        error: "A book with that slug already exists.",
        fieldErrors: { slug: "Already in use." },
      };
    }
    if (msg.toLowerCase().includes("foreign key")) {
      return {
        error: "Selected category doesn't exist.",
        fieldErrors: { category_slug: "Pick a valid category." },
      };
    }
    return { error: msg };
  }

  revalidateAll();
  redirect("/admin/books?status=added");
}

export async function updateBookAction(
  originalSlug: string,
  _prev: BookFormState,
  formData: FormData
): Promise<BookFormState> {
  requireAdmin();
  const v = validateBookForm(formData);
  if (!v.ok) return v.state;

  try {
    await db.query(
      `UPDATE books SET
        slug = ?, title = ?, author = ?, category_slug = ?, level = ?,
        price = ?, old_price = ?, rating = ?, reviews = ?,
        cover = ?, cover_image = ?, badge = ?, description = ?, display_order = ?
       WHERE slug = ?`,
      [
        v.values.slug,
        v.values.title,
        v.values.author,
        v.values.category_slug,
        v.values.level,
        v.values.price,
        v.values.old_price,
        v.values.rating,
        v.values.reviews,
        v.values.cover,
        v.values.cover_image,
        v.values.badge,
        v.values.description,
        v.values.display_order,
        originalSlug,
      ]
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.toLowerCase().includes("duplicate")) {
      return {
        error: "Slug already in use by another book.",
        fieldErrors: { slug: "Already in use." },
      };
    }
    if (msg.toLowerCase().includes("foreign key")) {
      return {
        error: "Selected category doesn't exist.",
        fieldErrors: { category_slug: "Pick a valid category." },
      };
    }
    return { error: msg };
  }

  revalidateAll();
  redirect("/admin/books?status=updated");
}

export async function deleteBookAction(formData: FormData): Promise<void> {
  requireAdmin();
  const slug = String(formData.get("slug") ?? "").trim();
  if (!slug) return;

  await db.query("DELETE FROM books WHERE slug = ?", [slug]);
  revalidateAll();
  redirect("/admin/books?status=deleted");
}

// =================================================
// Settings (key/value bulk update)
// =================================================

export type SettingsFormState = { error?: string; ok?: boolean };

export async function updateSettingsAction(
  _prev: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  requireAdmin();
  // Each input is named "settings[key.path]"
  const updates: Array<[string, string]> = [];
  for (const [name, value] of formData.entries()) {
    const m = name.match(/^settings\[(.+)\]$/);
    if (!m) continue;
    updates.push([m[1], typeof value === "string" ? value : ""]);
  }

  if (updates.length === 0) return { error: "Nothing to save." };

  try {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();
      for (const [k, v] of updates) {
        await conn.query(
          "UPDATE settings SET `value` = ? WHERE `key` = ?",
          [v, k]
        );
      }
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }

  revalidateAll();
  // Allow each page editor to redirect back to itself.
  const back = String(formData.get("_redirect") ?? "").trim();
  const safe = back.startsWith("/admin/") ? back : "/admin/pages?status=saved";
  redirect(safe);
}

// =================================================
// Banners CRUD
// =================================================

export type BannerFormState = {
  error?: string;
  fieldErrors?: Partial<
    Record<
      "title" | "subtitle" | "image_url" | "link_url" | "link_label" | "display_order",
      string
    >
  >;
};

function validateBannerForm(formData: FormData): {
  ok: boolean;
  state: BannerFormState;
  values: {
    title: string;
    subtitle: string | null;
    image_url: string | null;
    link_url: string | null;
    link_label: string | null;
    display_order: number;
    is_active: 0 | 1;
  };
} {
  const title = String(formData.get("title") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim();
  const image_url = String(formData.get("image_url") ?? "").trim();
  const link_url = String(formData.get("link_url") ?? "").trim();
  const link_label = String(formData.get("link_label") ?? "").trim();
  const display_order = Number(formData.get("display_order") ?? 0);
  const is_active = formData.get("is_active") === "on" ? 1 : 0;

  const fieldErrors: BannerFormState["fieldErrors"] = {};
  if (!title) fieldErrors.title = "Title is required.";
  if (!Number.isFinite(display_order))
    fieldErrors.display_order = "Must be a number.";
  if (subtitle.length > 500)
    fieldErrors.subtitle = "Max 500 characters.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      state: { error: "Please fix the errors below.", fieldErrors },
      values: {
        title,
        subtitle: subtitle || null,
        image_url: image_url || null,
        link_url: link_url || null,
        link_label: link_label || null,
        display_order,
        is_active,
      },
    };
  }
  return {
    ok: true,
    state: {},
    values: {
      title,
      subtitle: subtitle || null,
      image_url: image_url || null,
      link_url: link_url || null,
      link_label: link_label || null,
      display_order,
      is_active,
    },
  };
}

export async function addBannerAction(
  _prev: BannerFormState,
  formData: FormData
): Promise<BannerFormState> {
  requireAdmin();
  const v = validateBannerForm(formData);
  if (!v.ok) return v.state;

  try {
    await db.query(
      `INSERT INTO banners
        (title, subtitle, image_url, link_url, link_label, display_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        v.values.title,
        v.values.subtitle,
        v.values.image_url,
        v.values.link_url,
        v.values.link_label,
        v.values.display_order,
        v.values.is_active,
      ]
    );
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }

  revalidateAll();
  redirect("/admin/banners?status=added");
}

export async function updateBannerAction(
  id: number,
  _prev: BannerFormState,
  formData: FormData
): Promise<BannerFormState> {
  requireAdmin();
  const v = validateBannerForm(formData);
  if (!v.ok) return v.state;

  try {
    await db.query(
      `UPDATE banners SET
        title = ?, subtitle = ?, image_url = ?, link_url = ?, link_label = ?,
        display_order = ?, is_active = ?
       WHERE id = ?`,
      [
        v.values.title,
        v.values.subtitle,
        v.values.image_url,
        v.values.link_url,
        v.values.link_label,
        v.values.display_order,
        v.values.is_active,
        id,
      ]
    );
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }

  revalidateAll();
  redirect("/admin/banners?status=updated");
}

export async function deleteBannerAction(formData: FormData): Promise<void> {
  requireAdmin();
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id) || id <= 0) return;
  await db.query("DELETE FROM banners WHERE id = ?", [id]);
  revalidateAll();
  redirect("/admin/banners?status=deleted");
}

export async function toggleBannerAction(formData: FormData): Promise<void> {
  requireAdmin();
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id) || id <= 0) return;
  await db.query(
    "UPDATE banners SET is_active = 1 - is_active WHERE id = ?",
    [id]
  );
  revalidateAll();
  redirect("/admin/banners?status=toggled");
}

// =================================================
// Media (file uploads + library)
// =================================================

export type MediaFormState = { error?: string; ok?: boolean };

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIMES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);
const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

function safeBase(name: string): string {
  return name
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60) || "file";
}

export async function uploadMediaAction(
  _prev: MediaFormState,
  formData: FormData
): Promise<MediaFormState> {
  requireAdmin();
  const file = formData.get("file");
  const alt = String(formData.get("alt") ?? "").trim();
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Pick a file to upload." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { error: "File is larger than 5 MB." };
  }
  if (!ALLOWED_MIMES.has(file.type)) {
    return { error: `Unsupported file type (${file.type}).` };
  }

  const ext = EXT_BY_MIME[file.type] ?? "bin";
  const filename = `${Date.now()}-${safeBase(file.name)}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  const fullPath = path.join(dir, filename);

  try {
    await fs.mkdir(dir, { recursive: true });
    const buf = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(fullPath, buf);
    const url = `/uploads/${filename}`;
    await db.query(
      `INSERT INTO media (filename, url, alt, mime_type, size_bytes)
       VALUES (?, ?, ?, ?, ?)`,
      [filename, url, alt || null, file.type, file.size]
    );
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }

  revalidatePath("/admin/media");
  redirect("/admin/media?status=uploaded");
}

export async function deleteMediaAction(formData: FormData): Promise<void> {
  requireAdmin();
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id) || id <= 0) return;

  try {
    const [rows] = await db.query(
      "SELECT filename FROM media WHERE id = ?",
      [id]
    );
    const filename = (rows as Array<{ filename: string }>)[0]?.filename;
    if (filename) {
      const fullPath = path.join(
        process.cwd(),
        "public",
        "uploads",
        filename
      );
      await fs.unlink(fullPath).catch(() => {
        /* file may already be gone */
      });
    }
    await db.query("DELETE FROM media WHERE id = ?", [id]);
  } catch {
    /* swallow — admin sees the page revalidate */
  }

  revalidatePath("/admin/media");
  redirect("/admin/media?status=deleted");
}

// =================================================
// Testimonials CRUD
// =================================================

export type TestimonialFormState = {
  error?: string;
  fieldErrors?: Partial<
    Record<"quote" | "name" | "role" | "accent" | "display_order", string>
  >;
};

function validateTestimonialForm(formData: FormData): {
  ok: boolean;
  state: TestimonialFormState;
  values: {
    quote: string;
    name: string;
    role: string | null;
    accent: string;
    display_order: number;
    is_active: 0 | 1;
  };
} {
  const quote = String(formData.get("quote") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const accent =
    String(formData.get("accent") ?? "").trim() ||
    "from-brand-500 to-brand-700";
  const display_order = Number(formData.get("display_order") ?? 0);
  const is_active = formData.get("is_active") === "on" ? 1 : 0;

  const fe: TestimonialFormState["fieldErrors"] = {};
  if (!quote) fe.quote = "Quote is required.";
  if (!name) fe.name = "Name is required.";
  if (!Number.isFinite(display_order))
    fe.display_order = "Must be a number.";

  if (Object.keys(fe).length > 0)
    return {
      ok: false,
      state: { error: "Please fix the errors below.", fieldErrors: fe },
      values: {
        quote,
        name,
        role: role || null,
        accent,
        display_order,
        is_active,
      },
    };

  return {
    ok: true,
    state: {},
    values: {
      quote,
      name,
      role: role || null,
      accent,
      display_order,
      is_active,
    },
  };
}

export async function addTestimonialAction(
  _prev: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  requireAdmin();
  const v = validateTestimonialForm(formData);
  if (!v.ok) return v.state;

  try {
    await db.query(
      `INSERT INTO testimonials (quote, name, role, accent, display_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        v.values.quote,
        v.values.name,
        v.values.role,
        v.values.accent,
        v.values.display_order,
        v.values.is_active,
      ]
    );
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }
  revalidateAll();
  redirect("/admin/testimonials?status=added");
}

export async function updateTestimonialAction(
  id: number,
  _prev: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  requireAdmin();
  const v = validateTestimonialForm(formData);
  if (!v.ok) return v.state;

  try {
    await db.query(
      `UPDATE testimonials SET quote = ?, name = ?, role = ?, accent = ?,
        display_order = ?, is_active = ? WHERE id = ?`,
      [
        v.values.quote,
        v.values.name,
        v.values.role,
        v.values.accent,
        v.values.display_order,
        v.values.is_active,
        id,
      ]
    );
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }
  revalidateAll();
  redirect("/admin/testimonials?status=updated");
}

export async function deleteTestimonialAction(
  formData: FormData
): Promise<void> {
  requireAdmin();
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id) || id <= 0) return;
  await db.query("DELETE FROM testimonials WHERE id = ?", [id]);
  revalidateAll();
  redirect("/admin/testimonials?status=deleted");
}

// =================================================
// Team members CRUD
// =================================================

export type TeamFormState = {
  error?: string;
  fieldErrors?: Partial<
    Record<
      "name" | "role" | "bio" | "initials" | "accent" | "display_order",
      string
    >
  >;
};

function validateTeamForm(formData: FormData): {
  ok: boolean;
  state: TeamFormState;
  values: {
    name: string;
    role: string | null;
    bio: string | null;
    initials: string | null;
    accent: string;
    display_order: number;
    is_active: 0 | 1;
  };
} {
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const initials = String(formData.get("initials") ?? "").trim().toUpperCase();
  const accent =
    String(formData.get("accent") ?? "").trim() ||
    "from-brand-500 to-brand-700";
  const display_order = Number(formData.get("display_order") ?? 0);
  const is_active = formData.get("is_active") === "on" ? 1 : 0;

  const fe: TeamFormState["fieldErrors"] = {};
  if (!name) fe.name = "Name is required.";
  if (!Number.isFinite(display_order))
    fe.display_order = "Must be a number.";

  if (Object.keys(fe).length > 0)
    return {
      ok: false,
      state: { error: "Please fix the errors below.", fieldErrors: fe },
      values: {
        name,
        role: role || null,
        bio: bio || null,
        initials: initials || null,
        accent,
        display_order,
        is_active,
      },
    };
  return {
    ok: true,
    state: {},
    values: {
      name,
      role: role || null,
      bio: bio || null,
      initials: initials || null,
      accent,
      display_order,
      is_active,
    },
  };
}

export async function addTeamAction(
  _prev: TeamFormState,
  formData: FormData
): Promise<TeamFormState> {
  requireAdmin();
  const v = validateTeamForm(formData);
  if (!v.ok) return v.state;
  try {
    await db.query(
      `INSERT INTO team_members
        (name, role, bio, initials, accent, display_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        v.values.name,
        v.values.role,
        v.values.bio,
        v.values.initials,
        v.values.accent,
        v.values.display_order,
        v.values.is_active,
      ]
    );
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }
  revalidateAll();
  redirect("/admin/team?status=added");
}

export async function updateTeamAction(
  id: number,
  _prev: TeamFormState,
  formData: FormData
): Promise<TeamFormState> {
  requireAdmin();
  const v = validateTeamForm(formData);
  if (!v.ok) return v.state;
  try {
    await db.query(
      `UPDATE team_members SET
        name = ?, role = ?, bio = ?, initials = ?,
        accent = ?, display_order = ?, is_active = ?
       WHERE id = ?`,
      [
        v.values.name,
        v.values.role,
        v.values.bio,
        v.values.initials,
        v.values.accent,
        v.values.display_order,
        v.values.is_active,
        id,
      ]
    );
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }
  revalidateAll();
  redirect("/admin/team?status=updated");
}

export async function deleteTeamAction(formData: FormData): Promise<void> {
  requireAdmin();
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id) || id <= 0) return;
  await db.query("DELETE FROM team_members WHERE id = ?", [id]);
  revalidateAll();
  redirect("/admin/team?status=deleted");
}

// =================================================
// Resources CRUD
// =================================================

export type ResourceFormState = {
  error?: string;
  fieldErrors?: Partial<
    Record<
      | "title"
      | "description"
      | "type"
      | "category_slug"
      | "href"
      | "display_order",
      string
    >
  >;
};

const RESOURCE_TYPES = ["PDF", "Cheatsheet", "Course", "Video"] as const;

function validateResourceForm(formData: FormData): {
  ok: boolean;
  state: ResourceFormState;
  values: {
    title: string;
    description: string | null;
    type: (typeof RESOURCE_TYPES)[number];
    category_slug: string | null;
    href: string | null;
    display_order: number;
    is_active: 0 | 1;
  };
} {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const type = String(
    formData.get("type") ?? "PDF"
  ) as (typeof RESOURCE_TYPES)[number];
  const category_slug = String(formData.get("category_slug") ?? "").trim();
  const href = String(formData.get("href") ?? "").trim();
  const display_order = Number(formData.get("display_order") ?? 0);
  const is_active = formData.get("is_active") === "on" ? 1 : 0;

  const fe: ResourceFormState["fieldErrors"] = {};
  if (!title) fe.title = "Title is required.";
  if (!RESOURCE_TYPES.includes(type)) fe.type = "Pick a valid type.";
  if (!Number.isFinite(display_order))
    fe.display_order = "Must be a number.";

  if (Object.keys(fe).length > 0)
    return {
      ok: false,
      state: { error: "Please fix the errors below.", fieldErrors: fe },
      values: {
        title,
        description: description || null,
        type,
        category_slug: category_slug || null,
        href: href || null,
        display_order,
        is_active,
      },
    };

  return {
    ok: true,
    state: {},
    values: {
      title,
      description: description || null,
      type,
      category_slug: category_slug || null,
      href: href || null,
      display_order,
      is_active,
    },
  };
}

export async function addResourceAction(
  _prev: ResourceFormState,
  formData: FormData
): Promise<ResourceFormState> {
  requireAdmin();
  const v = validateResourceForm(formData);
  if (!v.ok) return v.state;
  try {
    await db.query(
      `INSERT INTO resources
        (title, description, type, category_slug, href, display_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        v.values.title,
        v.values.description,
        v.values.type,
        v.values.category_slug,
        v.values.href,
        v.values.display_order,
        v.values.is_active,
      ]
    );
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }
  revalidateAll();
  redirect("/admin/resources?status=added");
}

export async function updateResourceAction(
  id: number,
  _prev: ResourceFormState,
  formData: FormData
): Promise<ResourceFormState> {
  requireAdmin();
  const v = validateResourceForm(formData);
  if (!v.ok) return v.state;
  try {
    await db.query(
      `UPDATE resources SET
        title = ?, description = ?, type = ?, category_slug = ?, href = ?,
        display_order = ?, is_active = ?
       WHERE id = ?`,
      [
        v.values.title,
        v.values.description,
        v.values.type,
        v.values.category_slug,
        v.values.href,
        v.values.display_order,
        v.values.is_active,
        id,
      ]
    );
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }
  revalidateAll();
  redirect("/admin/resources?status=updated");
}

export async function deleteResourceAction(formData: FormData): Promise<void> {
  requireAdmin();
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id) || id <= 0) return;
  await db.query("DELETE FROM resources WHERE id = ?", [id]);
  revalidateAll();
  redirect("/admin/resources?status=deleted");
}

// =================================================
// Page sections — full page builder CRUD + reorder
// =================================================

export type SectionFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

const PAGE_REVALIDATE_MAP: Record<string, string> = {
  home: "/",
  books: "/books",
  categories: "/categories",
  "free-resources": "/free-resources",
  about: "/about",
  contact: "/contact",
};

function revalidatePage(slug: string) {
  const path = PAGE_REVALIDATE_MAP[slug];
  if (path) revalidatePath(path);
  revalidatePath(`/admin/pages/${slug}/sections`);
}

function parseSectionFormToContent(
  type: string,
  formData: FormData
): Record<string, unknown> {
  // Most fields are simple key/value strings.
  // Array-shape types ('stats_strip', 'feature_grid') get a JSON textarea
  // named "items_json". We parse it back into structured form.
  const obj: Record<string, unknown> = {};
  for (const [name, value] of formData.entries()) {
    if (name.startsWith("_") || name === "type" || name === "is_active")
      continue;
    if (name === "items_json") continue;
    obj[name] = typeof value === "string" ? value : "";
  }
  if (type === "stats_strip" || type === "feature_grid") {
    const raw = String(formData.get("items_json") ?? "");
    try {
      obj.items = raw.trim() ? JSON.parse(raw) : [];
    } catch {
      // Caller handles invalid JSON
      throw new Error(
        "Items JSON is invalid. Use the format shown in the placeholder."
      );
    }
  }
  if (type === "featured_books") {
    const lim = Number(obj.limit);
    obj.limit = Number.isFinite(lim) && lim > 0 ? lim : 8;
  }
  return obj;
}

export async function addSectionAction(
  pageSlug: string,
  _prev: SectionFormState,
  formData: FormData
): Promise<SectionFormState> {
  requireAdmin();
  const type = String(formData.get("type") ?? "").trim();
  if (!type) return { error: "Pick a section type." };
  const is_active = formData.get("is_active") === "on" ? 1 : 0;

  let content: Record<string, unknown>;
  try {
    content = parseSectionFormToContent(type, formData);
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }

  // Append at the end
  const [rows] = await db.query(
    "SELECT COALESCE(MAX(display_order), 0) AS max FROM page_sections WHERE page_slug = ?",
    [pageSlug]
  );
  const max = (rows as Array<{ max: number }>)[0]?.max ?? 0;

  await db.query(
    `INSERT INTO page_sections (page_slug, section_type, content, display_order, is_active)
     VALUES (?, ?, ?, ?, ?)`,
    [pageSlug, type, JSON.stringify(content), max + 1, is_active]
  );

  revalidatePage(pageSlug);
  redirect(`/admin/pages/${pageSlug}/sections?status=added`);
}

export async function updateSectionAction(
  id: number,
  pageSlug: string,
  type: string,
  _prev: SectionFormState,
  formData: FormData
): Promise<SectionFormState> {
  requireAdmin();
  const is_active = formData.get("is_active") === "on" ? 1 : 0;

  let content: Record<string, unknown>;
  try {
    content = parseSectionFormToContent(type, formData);
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }

  await db.query(
    "UPDATE page_sections SET content = ?, is_active = ? WHERE id = ?",
    [JSON.stringify(content), is_active, id]
  );

  revalidatePage(pageSlug);
  redirect(`/admin/pages/${pageSlug}/sections?status=updated`);
}

export async function deleteSectionAction(formData: FormData): Promise<void> {
  requireAdmin();
  const id = Number(formData.get("id"));
  const pageSlug = String(formData.get("page_slug") ?? "");
  if (!Number.isFinite(id) || id <= 0 || !pageSlug) return;

  await db.query("DELETE FROM page_sections WHERE id = ?", [id]);
  revalidatePage(pageSlug);
  redirect(`/admin/pages/${pageSlug}/sections?status=deleted`);
}

export async function moveSectionAction(formData: FormData): Promise<void> {
  requireAdmin();
  const id = Number(formData.get("id"));
  const pageSlug = String(formData.get("page_slug") ?? "");
  const direction = String(formData.get("direction") ?? "");
  if (!Number.isFinite(id) || id <= 0 || !pageSlug) return;
  if (direction !== "up" && direction !== "down") return;

  // Get all sections for this page to compute swap target
  const [rows] = await db.query(
    "SELECT id, display_order FROM page_sections WHERE page_slug = ? ORDER BY display_order ASC, id ASC",
    [pageSlug]
  );
  const list = rows as Array<{ id: number; display_order: number }>;
  const idx = list.findIndex((r) => r.id === id);
  if (idx < 0) return;

  const swapIdx = direction === "up" ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= list.length) return;

  const a = list[idx];
  const b = list[swapIdx];

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query(
      "UPDATE page_sections SET display_order = ? WHERE id = ?",
      [b.display_order, a.id]
    );
    await conn.query(
      "UPDATE page_sections SET display_order = ? WHERE id = ?",
      [a.display_order, b.id]
    );
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }

  revalidatePage(pageSlug);
  redirect(`/admin/pages/${pageSlug}/sections?status=reordered`);
}

export async function toggleSectionAction(formData: FormData): Promise<void> {
  requireAdmin();
  const id = Number(formData.get("id"));
  const pageSlug = String(formData.get("page_slug") ?? "");
  if (!Number.isFinite(id) || id <= 0) return;
  await db.query(
    "UPDATE page_sections SET is_active = 1 - is_active WHERE id = ?",
    [id]
  );
  revalidatePage(pageSlug);
  redirect(`/admin/pages/${pageSlug}/sections?status=toggled`);
}
