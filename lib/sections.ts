// =================================================
// Section type catalog — the schema admin uses to
// add/edit/delete sections on any page.
// =================================================

export type SectionType =
  | "hero"
  | "stats_strip"
  | "feature_grid"
  | "cta_panel"
  | "text_block"
  | "image_block"
  | "quote_block"
  | "banner_slider"
  | "categories_grid"
  | "featured_books"
  | "testimonials_grid"
  | "team_grid"
  | "resources_grid";

export type StatItem = { value: string; label: string };
export type FeatureItem = { icon: string; title: string; body: string };

export type HeroContent = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export type StatsStripContent = { items: StatItem[] };

export type FeatureGridContent = {
  eyebrow?: string;
  title?: string;
  body?: string;
  items: FeatureItem[];
};

export type CtaPanelContent = {
  eyebrow?: string;
  title: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export type TextBlockContent = {
  eyebrow?: string;
  title?: string;
  body: string;
  align?: "left" | "center";
};

export type ImageBlockContent = {
  src: string;
  alt?: string;
  caption?: string;
};

export type QuoteBlockContent = {
  quote: string;
  author?: string;
  role?: string;
};

export type DataSourceHeader = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  limit?: number;
};

export type AnySection =
  | { id: number; type: "hero"; content: HeroContent }
  | { id: number; type: "stats_strip"; content: StatsStripContent }
  | { id: number; type: "feature_grid"; content: FeatureGridContent }
  | { id: number; type: "cta_panel"; content: CtaPanelContent }
  | { id: number; type: "text_block"; content: TextBlockContent }
  | { id: number; type: "image_block"; content: ImageBlockContent }
  | { id: number; type: "quote_block"; content: QuoteBlockContent }
  | { id: number; type: "banner_slider"; content: DataSourceHeader }
  | { id: number; type: "categories_grid"; content: DataSourceHeader }
  | { id: number; type: "featured_books"; content: DataSourceHeader }
  | { id: number; type: "testimonials_grid"; content: DataSourceHeader }
  | { id: number; type: "team_grid"; content: DataSourceHeader }
  | { id: number; type: "resources_grid"; content: DataSourceHeader };

// User-friendly metadata for the admin type picker
export const SECTION_TYPES: Array<{
  type: SectionType;
  label: string;
  description: string;
  icon: string;
  defaults: Record<string, unknown>;
}> = [
  {
    type: "hero",
    label: "Hero",
    description: "Big headline with subtitle and CTA buttons.",
    icon: "Sparkles",
    defaults: {
      eyebrow: "",
      title: "A great new section",
      subtitle: "",
      ctaLabel: "",
      ctaHref: "",
      secondaryLabel: "",
      secondaryHref: "",
    },
  },
  {
    type: "stats_strip",
    label: "Stats strip",
    description: "Row of big numbers (e.g. 500+ Books).",
    icon: "TrendingUp",
    defaults: {
      items: [
        { value: "100+", label: "Items" },
        { value: "50K", label: "Users" },
        { value: "4.9★", label: "Rating" },
        { value: "10+", label: "Countries" },
      ],
    },
  },
  {
    type: "feature_grid",
    label: "Feature grid",
    description: "Grid of icon + title + body cards.",
    icon: "LayoutGrid",
    defaults: {
      eyebrow: "",
      title: "Why us",
      body: "",
      items: [
        { icon: "Sparkles", title: "Feature one", body: "What makes it great." },
        { icon: "Heart", title: "Feature two", body: "What makes it great." },
        { icon: "Award", title: "Feature three", body: "What makes it great." },
        { icon: "Globe", title: "Feature four", body: "What makes it great." },
      ],
    },
  },
  {
    type: "cta_panel",
    label: "Call-to-action",
    description: "Bold panel with title, body and CTA button.",
    icon: "Megaphone",
    defaults: {
      eyebrow: "",
      title: "Get started",
      body: "",
      ctaLabel: "Sign up",
      ctaHref: "/register",
      secondaryLabel: "",
      secondaryHref: "",
    },
  },
  {
    type: "text_block",
    label: "Text block",
    description: "Plain paragraph with optional eyebrow + title.",
    icon: "Type",
    defaults: { eyebrow: "", title: "", body: "Your text here.", align: "left" },
  },
  {
    type: "image_block",
    label: "Image block",
    description: "Single image with optional caption.",
    icon: "Image",
    defaults: { src: "", alt: "", caption: "" },
  },
  {
    type: "quote_block",
    label: "Quote",
    description: "Big editorial quote with attribution.",
    icon: "Quote",
    defaults: { quote: "Your quote here.", author: "", role: "" },
  },
  {
    type: "banner_slider",
    label: "Banner slider",
    description: "Pulls from your /admin/banners list.",
    icon: "GalleryHorizontal",
    defaults: {},
  },
  {
    type: "categories_grid",
    label: "Categories grid",
    description: "Pulls from /admin/categories.",
    icon: "Layers",
    defaults: { eyebrow: "Browse by stack", title: "Pick your language.", subtitle: "", ctaLabel: "View all", ctaHref: "/categories" },
  },
  {
    type: "featured_books",
    label: "Featured books",
    description: "Top N books from your library.",
    icon: "Library",
    defaults: { eyebrow: "Featured", title: "Editors picks.", subtitle: "", limit: 8, ctaLabel: "See all", ctaHref: "/books" },
  },
  {
    type: "testimonials_grid",
    label: "Testimonials",
    description: "Pulls from /admin/testimonials.",
    icon: "Quote",
    defaults: { eyebrow: "Loved by readers", title: "What people say." },
  },
  {
    type: "team_grid",
    label: "Team grid",
    description: "Pulls from /admin/team.",
    icon: "Users",
    defaults: { eyebrow: "The team", title: "Meet the team." },
  },
  {
    type: "resources_grid",
    label: "Resources grid",
    description: "Pulls from /admin/resources.",
    icon: "GraduationCap",
    defaults: { eyebrow: "Resources", title: "Bite-sized learning.", subtitle: "" },
  },
];

export const PAGE_DEFINITIONS = [
  { slug: "home", title: "Homepage", publicHref: "/" },
  { slug: "books", title: "Books page", publicHref: "/books" },
  { slug: "categories", title: "Categories page", publicHref: "/categories" },
  { slug: "free-resources", title: "Free Resources page", publicHref: "/free-resources" },
  { slug: "about", title: "About page", publicHref: "/about" },
  { slug: "contact", title: "Contact page", publicHref: "/contact" },
] as const;

export type PageSlug = (typeof PAGE_DEFINITIONS)[number]["slug"];

export function getSectionMeta(type: string) {
  return SECTION_TYPES.find((s) => s.type === type);
}
