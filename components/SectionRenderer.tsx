"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  BookMarked,
  Award,
  Globe,
  Heart,
  Users,
  Star,
  Quote as QuoteIcon,
  TrendingUp,
  Library,
  Layers,
  GraduationCap,
} from "lucide-react";
import BookCard from "@/components/BookCard";
import BannerSlider from "@/components/BannerSlider";
import type { Book, Category } from "@/lib/data";
import type {
  Banner,
  PageSection,
  ResourceRow,
  TeamMember,
  Testimonial,
} from "@/lib/queries";

// =================================================
// Public renderer
// =================================================

export type SectionContext = {
  banners: Banner[];
  books: Book[];
  categories: Category[];
  testimonials: Testimonial[];
  team: TeamMember[];
  resources: ResourceRow[];
};

export default function SectionRenderer({
  sections,
  ctx,
}: {
  sections: PageSection[];
  ctx: SectionContext;
}) {
  return (
    <div>
      {sections.map((s) => (
        <SectionSwitch key={s.id} section={s} ctx={ctx} />
      ))}
    </div>
  );
}

function SectionSwitch({
  section,
  ctx,
}: {
  section: PageSection;
  ctx: SectionContext;
}) {
  const c = section.content as Record<string, unknown>;
  switch (section.section_type) {
    case "hero":
      return <HeroSection content={c} />;
    case "stats_strip":
      return <StatsStripSection content={c} />;
    case "feature_grid":
      return <FeatureGridSection content={c} />;
    case "cta_panel":
      return <CtaPanelSection content={c} />;
    case "text_block":
      return <TextBlockSection content={c} />;
    case "image_block":
      return <ImageBlockSection content={c} />;
    case "quote_block":
      return <QuoteBlockSection content={c} />;
    case "banner_slider":
      return <BannerSliderSection banners={ctx.banners} />;
    case "categories_grid":
      return <CategoriesGridSection content={c} categories={ctx.categories} />;
    case "featured_books":
      return <FeaturedBooksSection content={c} books={ctx.books} />;
    case "testimonials_grid":
      return (
        <TestimonialsGridSection
          content={c}
          testimonials={ctx.testimonials}
        />
      );
    case "team_grid":
      return <TeamGridSection content={c} team={ctx.team} />;
    case "resources_grid":
      return <ResourcesGridSection content={c} resources={ctx.resources} />;
    default:
      return null;
  }
}

const str = (v: unknown, fallback = "") => (typeof v === "string" ? v : fallback);
const num = (v: unknown, fallback = 0) =>
  typeof v === "number" ? v : Number(v) || fallback;

// =================================================
// Section components
// =================================================

function HeroSection({ content }: { content: Record<string, unknown> }) {
  const eyebrow = str(content.eyebrow);
  const title = str(content.title);
  const subtitle = str(content.subtitle);
  const ctaLabel = str(content.ctaLabel);
  const ctaHref = str(content.ctaHref, "/");
  const secondaryLabel = str(content.secondaryLabel);
  const secondaryHref = str(content.secondaryHref, "/");

  return (
    <section className="relative overflow-hidden border-b border-ink-900/8 bg-cream-100/40">
      <div className="absolute inset-0 paper opacity-30" />
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-gold-300/30 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-6 py-20 text-center">
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="eyebrow inline-flex"
          >
            <Sparkles className="h-3 w-3 text-gold-500 animate-twinkle" />
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="display mt-4 text-balance text-5xl text-ink-900 sm:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-5 max-w-2xl text-lg text-ink-700/80"
          >
            {subtitle}
          </motion.p>
        )}
        {(ctaLabel || secondaryLabel) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-3"
          >
            {ctaLabel && (
              <Link href={ctaHref} className="btn-primary">
                {ctaLabel}
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            )}
            {secondaryLabel && (
              <Link href={secondaryHref} className="btn-outline">
                {secondaryLabel}
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}

function StatsStripSection({ content }: { content: Record<string, unknown> }) {
  const items = Array.isArray(content.items)
    ? (content.items as Array<{ value: string; label: string }>)
    : [];
  if (items.length === 0) return null;
  const gradients = [
    "from-brand-500 to-teal-600",
    "from-gold-500 to-orange-500",
    "from-rose-500 to-pink-600",
    "from-cyan-500 to-sky-600",
  ];
  return (
    <section className="border-y border-ink-900/8 bg-gradient-to-b from-cream-100 to-cream-50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 py-10 sm:grid-cols-4 sm:gap-5">
        {items.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-ink-900/8 bg-cream-50 p-5 shadow-sm"
          >
            <span
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${
                gradients[i % gradients.length]
              } text-white shadow-md`}
            >
              <TrendingUp className="h-4 w-4" strokeWidth={2} />
            </span>
            <div className="display mt-3 text-3xl font-semibold text-ink-900">
              {str(s.value)}
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-ink-700/70">
              {str(s.label)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  Sparkles,
  BookMarked,
  Award,
  Globe,
  Heart,
  Users,
  Star,
  Library,
  Layers,
  GraduationCap,
  Quote: QuoteIcon,
  TrendingUp,
};

function FeatureGridSection({
  content,
}: {
  content: Record<string, unknown>;
}) {
  const items = Array.isArray(content.items)
    ? (content.items as Array<{ icon: string; title: string; body: string }>)
    : [];
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          {str(content.eyebrow) && (
            <span className="eyebrow inline-flex">{str(content.eyebrow)}</span>
          )}
          {str(content.title) && (
            <h2 className="display mt-4 text-4xl text-ink-900 sm:text-5xl">
              {str(content.title)}
            </h2>
          )}
          {str(content.body) && (
            <p className="mt-4 text-ink-700/80">{str(content.body)}</p>
          )}
        </div>
        {items.length > 0 && (
          <ul className="grid gap-4 sm:grid-cols-2">
            {items.map((f, i) => {
              const Icon = ICON_MAP[f.icon] ?? Sparkles;
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group card p-5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-ink-900">
                    {str(f.title)}
                  </h3>
                  <p className="mt-1 text-sm text-ink-700/80">{str(f.body)}</p>
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

function CtaPanelSection({ content }: { content: Record<string, unknown> }) {
  const ctaLabel = str(content.ctaLabel);
  const ctaHref = str(content.ctaHref, "/");
  const secondaryLabel = str(content.secondaryLabel);
  const secondaryHref = str(content.secondaryHref, "/");
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-700 via-brand-800 to-ink-900 p-10 text-cream-50 shadow-2xl shadow-brand-700/20 sm:p-16">
        <div className="absolute inset-0 paper opacity-25" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-500/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-brand-500/40 blur-3xl" />
        <div className="relative max-w-2xl">
          {str(content.eyebrow) && (
            <span className="eyebrow !border-cream-50/20 !bg-cream-50/10 !text-cream-100">
              <Sparkles className="h-3 w-3 animate-twinkle" />
              {str(content.eyebrow)}
            </span>
          )}
          <h2 className="display mt-4 text-3xl sm:text-5xl">
            {str(content.title)}
          </h2>
          {str(content.body) && (
            <p className="mt-3 text-cream-100/80">{str(content.body)}</p>
          )}
          {(ctaLabel || secondaryLabel) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {ctaLabel && (
                <Link href={ctaHref} className="btn-gold">
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>
              )}
              {secondaryLabel && (
                <Link
                  href={secondaryHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-50/20 px-5 py-2.5 text-sm font-semibold text-cream-50 transition-colors hover:bg-cream-50/10"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function TextBlockSection({ content }: { content: Record<string, unknown> }) {
  const align = str(content.align, "left") === "center" ? "text-center" : "";
  return (
    <section className={`mx-auto max-w-3xl px-6 py-16 ${align}`}>
      {str(content.eyebrow) && (
        <span className="eyebrow">{str(content.eyebrow)}</span>
      )}
      {str(content.title) && (
        <h2 className="display mt-3 text-3xl text-ink-900 sm:text-4xl">
          {str(content.title)}
        </h2>
      )}
      <div className="prose-policy mt-4 whitespace-pre-line text-ink-700/85">
        {str(content.body)}
      </div>
    </section>
  );
}

function ImageBlockSection({ content }: { content: Record<string, unknown> }) {
  const src = str(content.src);
  if (!src) return null;
  const alt = str(content.alt);
  const caption = str(content.caption);
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <figure className="overflow-hidden rounded-3xl">
        <div className="relative aspect-[16/9]">
          <Image src={src} alt={alt} fill className="object-cover" unoptimized />
        </div>
        {caption && (
          <figcaption className="mt-3 text-center text-sm text-ink-700/70">
            {caption}
          </figcaption>
        )}
      </figure>
    </section>
  );
}

function QuoteBlockSection({ content }: { content: Record<string, unknown> }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-center">
      <QuoteIcon
        className="mx-auto h-10 w-10 text-gold-400/70"
        strokeWidth={1.5}
      />
      <blockquote className="display mt-4 text-balance text-2xl text-ink-900 sm:text-3xl">
        {str(content.quote)}
      </blockquote>
      {(str(content.author) || str(content.role)) && (
        <figcaption className="mt-4 text-sm text-ink-700/70">
          {str(content.author)}
          {str(content.role) ? ` · ${str(content.role)}` : ""}
        </figcaption>
      )}
    </section>
  );
}

function BannerSliderSection({ banners }: { banners: Banner[] }) {
  if (banners.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <BannerSlider banners={banners} />
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-xl">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        {title && (
          <h2 className="display mt-4 text-4xl text-ink-900 sm:text-5xl">
            {title}
          </h2>
        )}
        {subtitle && <p className="mt-3 text-ink-700/80">{subtitle}</p>}
      </div>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="group inline-flex items-center gap-1 self-start text-sm font-semibold text-brand-700 hover:text-brand-900 sm:self-end"
        >
          {ctaLabel}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            strokeWidth={2}
          />
        </Link>
      )}
    </div>
  );
}

function CategoriesGridSection({
  content,
  categories,
}: {
  content: Record<string, unknown>;
  categories: Category[];
}) {
  if (categories.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeader
        eyebrow={str(content.eyebrow)}
        title={str(content.title)}
        subtitle={str(content.subtitle)}
        ctaLabel={str(content.ctaLabel)}
        ctaHref={str(content.ctaHref)}
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              href={`/categories/${c.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-900/8 bg-cream-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                {c.image && (
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />
                )}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${c.accent} opacity-30 mix-blend-multiply`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />
                <div className="absolute left-5 top-5 text-3xl drop-shadow-md">
                  {c.emoji}
                </div>
                <div className="absolute right-5 top-5 chip !bg-cream-50/90 !text-ink-900">
                  {c.count} books
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="display text-3xl font-semibold text-cream-50">
                    {c.name}
                  </h3>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-between p-6">
                <p className="text-sm text-ink-700/80">{c.tagline}</p>
                <span className="ml-3 inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-ink-900/5 text-ink-800 transition-all duration-300 group-hover:bg-ink-900 group-hover:text-cream-50 group-hover:rotate-[-12deg]">
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FeaturedBooksSection({
  content,
  books,
}: {
  content: Record<string, unknown>;
  books: Book[];
}) {
  const limit = num(content.limit, 8);
  const list = books.slice(0, limit);
  if (list.length === 0) return null;
  return (
    <section className="border-y border-ink-900/8 bg-cream-100/60 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={str(content.eyebrow)}
          title={str(content.title)}
          subtitle={str(content.subtitle)}
          ctaLabel={str(content.ctaLabel)}
          ctaHref={str(content.ctaHref)}
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsGridSection({
  content,
  testimonials,
}: {
  content: Record<string, unknown>;
  testimonials: Testimonial[];
}) {
  if (testimonials.length === 0) return null;
  return (
    <section className="relative overflow-hidden bg-ink-900 py-20 text-cream-100">
      <div className="absolute inset-0 paper opacity-25" />
      <div className="absolute -top-24 left-1/2 h-72 w-[60rem] -translate-x-1/2 rounded-full bg-brand-700/30 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          {str(content.eyebrow) && (
            <span className="eyebrow !border-cream-100/15 !bg-cream-100/5 !text-cream-100/70">
              {str(content.eyebrow)}
            </span>
          )}
          {str(content.title) && (
            <h2 className="display mt-4 text-3xl text-cream-50 sm:text-5xl">
              {str(content.title)}
            </h2>
          )}
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl border border-cream-100/10 bg-cream-100/5 p-6 backdrop-blur"
            >
              <QuoteIcon className="h-7 w-7 text-gold-400/60" strokeWidth={1.5} />
              <blockquote className="mt-3 text-sm leading-relaxed text-cream-100">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${t.accent}`} />
                <div>
                  <div className="text-sm font-semibold text-cream-50">
                    {t.name}
                  </div>
                  <div className="text-xs text-cream-100/60">{t.role ?? ""}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamGridSection({
  content,
  team,
}: {
  content: Record<string, unknown>;
  team: TeamMember[];
}) {
  if (team.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-2xl">
        {str(content.eyebrow) && (
          <span className="eyebrow">{str(content.eyebrow)}</span>
        )}
        {str(content.title) && (
          <h2 className="display mt-4 text-4xl text-ink-900 sm:text-5xl">
            {str(content.title)}
          </h2>
        )}
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {team.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="card p-7 text-center"
          >
            <div
              className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${m.accent} text-xl font-bold text-white shadow-lg`}
            >
              {m.initials ?? m.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="display mt-4 text-lg font-semibold text-ink-900">
              {m.name}
            </div>
            <div className="text-sm text-brand-700">{m.role ?? ""}</div>
            <p className="mt-2 text-sm text-ink-700/80">{m.bio ?? ""}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ResourcesGridSection({
  content,
  resources,
}: {
  content: Record<string, unknown>;
  resources: ResourceRow[];
}) {
  if (resources.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-2xl">
        {str(content.eyebrow) && (
          <span className="eyebrow">{str(content.eyebrow)}</span>
        )}
        {str(content.title) && (
          <h2 className="display mt-4 text-4xl text-ink-900 sm:text-5xl">
            {str(content.title)}
          </h2>
        )}
        {str(content.subtitle) && (
          <p className="mt-3 text-ink-700/80">{str(content.subtitle)}</p>
        )}
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((r, i) => (
          <motion.a
            key={r.id}
            href={r.href ?? "#"}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="card p-6 transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-700 px-2.5 py-1 text-[11px] font-semibold text-cream-50">
              {r.type}
            </span>
            <h3 className="display mt-3 text-lg font-semibold text-ink-900">
              {r.title}
            </h3>
            {r.description && (
              <p className="mt-2 text-sm text-ink-700/80">{r.description}</p>
            )}
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
              Get it free <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
