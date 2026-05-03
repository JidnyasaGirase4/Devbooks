// =============================================================
// Type definitions + static assets only.
// All BOOKS / CATEGORIES are now served from MySQL via lib/queries.ts
// =============================================================

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  count: number;
  accent: string;
  emoji: string;
  image: string;
};

export type Book = {
  id: string; // = `slug` column from DB
  title: string;
  author: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  cover: string;
  coverImage?: string;
  badge?: "Bestseller" | "New" | "Free";
  description: string;
};

export const HERO_IMAGES = {
  primary:
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1600&q=80",
  desk: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
  library:
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=80",
  workspace:
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
};

export type Resource = {
  title: string;
  description: string;
  type: "PDF" | "Cheatsheet" | "Course" | "Video";
  category: string;
  href: string;
};

export const RESOURCES: Resource[] = [
  {
    title: "Python Cheatsheet — Standard Library Essentials",
    description:
      "Two-page reference covering everything from list comprehensions to dataclasses.",
    type: "Cheatsheet",
    category: "python",
    href: "#python-cheatsheet",
  },
  {
    title: "JavaScript Async Patterns Handbook",
    description:
      "Promises, async/await, generators and modern async iteration patterns.",
    type: "PDF",
    category: "javascript",
    href: "#js-async",
  },
  {
    title: "CSS Grid in 30 Minutes",
    description:
      "A free crash course that takes you from zero to confident with CSS Grid.",
    type: "Video",
    category: "html-css",
    href: "#css-grid",
  },
  {
    title: "Java Interview Prep Pack",
    description:
      "300+ curated questions across core Java, concurrency, and Spring.",
    type: "PDF",
    category: "java",
    href: "#java-interview",
  },
  {
    title: "React Hooks Reference Card",
    description:
      "All built-in hooks with usage tips, gotchas and dependency rules.",
    type: "Cheatsheet",
    category: "react",
    href: "#react-hooks",
  },
  {
    title: "Modern HTML5 Semantics — Free Course",
    description:
      "Six lessons that level up your accessibility and SEO foundations.",
    type: "Course",
    category: "html-css",
    href: "#html-course",
  },
];

export const NAV_ROUTES = [
  { label: "Home", href: "/" },
  { label: "Books", href: "/books" },
  { label: "Categories", href: "/categories", hasDropdown: true },
  { label: "Free Resources", href: "/free-resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
