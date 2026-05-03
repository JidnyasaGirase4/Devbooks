"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Sparkles,
  BookMarked,
  Award,
  Globe,
  Star,
  Quote,
  Users,
} from "lucide-react";
import BookCard from "@/components/BookCard";
import BannerSlider from "@/components/BannerSlider";
import { HERO_IMAGES, type Book, type Category } from "@/lib/data";
import type { Banner, Testimonial } from "@/lib/queries";

type IconProps = { className?: string };

const PythonIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} aria-hidden>
    <linearGradient id="py-a" x1="70.25" x2="170.48" y1="1237.4" y2="1151.4" gradientTransform="matrix(.563 0 0 -.568 -29.69 707.05)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#5A9FD4" />
      <stop offset="1" stopColor="#306998" />
    </linearGradient>
    <linearGradient id="py-b" x1="209.41" x2="173.62" y1="1098.4" y2="1149.1" gradientTransform="matrix(.563 0 0 -.568 -29.69 707.05)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#FFD43B" />
      <stop offset="1" stopColor="#FFE873" />
    </linearGradient>
    <path fill="url(#py-a)" d="M63.39 1.5c-5.27 0-10.3.45-14.73 1.24-13.04 2.3-15.4 7.13-15.4 16.04v11.76h30.81v3.92H21.7c-8.96 0-16.81 5.39-19.27 15.65-2.83 11.76-2.95 19.1 0 31.37 2.2 9.14 7.43 15.65 16.4 15.65h10.6V83.05c0-10.18 8.81-19.16 19.26-19.16h30.78c8.58 0 15.4-7.06 15.4-15.68V18.78c0-8.36-7.04-14.65-15.4-16.04C73.59 1.95 68.65 1.5 63.39 1.5zM46.7 10.94c3.18 0 5.79 2.65 5.79 5.91 0 3.25-2.6 5.87-5.79 5.87-3.2 0-5.79-2.62-5.79-5.87 0-3.26 2.6-5.91 5.79-5.91z" />
    <path fill="url(#py-b)" d="M97.46 34.46v11.41c0 10.62-9 19.55-19.27 19.55H47.42c-8.43 0-15.4 7.22-15.4 15.68V110.5c0 8.37 7.27 13.29 15.4 15.68 9.74 2.86 19.07 3.38 30.78 0 7.74-2.24 15.4-6.74 15.4-15.68V98.74h-30.78v-3.92h46.18c8.96 0 12.3-6.25 15.4-15.65 3.21-9.66 3.07-18.96 0-31.37-2.21-8.94-6.43-15.65-15.4-15.65zM80.18 109.51c3.2 0 5.79 2.62 5.79 5.87 0 3.27-2.59 5.91-5.79 5.91-3.18 0-5.79-2.65-5.79-5.91.01-3.25 2.6-5.87 5.79-5.87z" />
  </svg>
);

const JavaScriptIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} aria-hidden>
    <rect width="128" height="128" rx="16" fill="#F7DF1E" />
    <path fill="#000" d="M59.36 117.43c-3.15-.65-6.36-2.32-8.41-4.36-.92-.92-2.42-3.06-2.42-3.46 0-.13 6.04-3.66 6.78-3.97.16-.07.4.13.81.66 1.84 2.4 3.78 3.45 7.04 3.78 4.4.45 7.94-1.31 8.97-4.46.36-1.13.41-1.93.39-12.96l-.06-15.37h7.26v15.85c0 14.96-.04 16.07-.6 18.13-1.45 5.15-4.85 8.07-10.99 9.39-2.05.45-7.7.61-8.77.27zM93.77 117.07c-2.91-.86-5.69-2.51-7.71-4.55-.99-1.01-2.97-3.62-2.97-3.92 0-.05 1.49-1.05 3.31-2.21l3.31-2.13.95 1.36c2.15 3.05 4.85 4.46 8.5 4.43 3.46-.03 5.65-1.39 5.6-3.49-.04-1.92-1.46-3.06-7.04-5.66-7.71-3.59-10.6-5.83-12.34-9.55-1.05-2.25-1.39-7.21-.6-9.53 1.29-3.74 4.7-6.51 9.13-7.42 1.18-.24 4.65-.4 6.36-.27 4.4.31 7.46 1.86 10.05 5.07 1.16 1.43 2.69 3.74 2.69 4.05 0 .26-6.07 4.13-6.43 4.13-.16 0-.46-.39-.69-.85-1.59-3.36-5.37-4.84-8.84-3.45-2.16.85-2.81 1.96-2.81 4.36 0 2.05.93 3.05 4.34 4.69 6.6 3.13 8.7 4.31 10.91 6.04 4.41 3.43 5.87 9.34 3.7 14.78-2.39 5.99-9.71 9.41-19.42 9.07-.91-.03-2.63-.18-3.94-.4z" />
  </svg>
);

const JavaIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} aria-hidden>
    <path fill="#fff" d="M52.4 81.3s-4.7 2.74 3.34 3.66c9.74 1.11 14.72.95 25.46-1.08 0 0 2.83 1.77 6.79 3.31-24.06 10.32-54.45-.6-35.59-5.89zM49.46 67.84s-5.27 3.9 2.78 4.73c10.4 1.07 18.62 1.16 32.83-1.58 0 0 1.97 2 5.07 3.09-29.09 8.5-61.49.67-40.68-6.24z" />
    <path fill="#0074BD" d="M74.21 44.99c5.93 6.83-1.56 12.97-1.56 12.97s15.05-7.77 8.14-17.5c-6.46-9.07-11.41-13.58 15.4-29.13 0 0-42.07 10.5-21.98 33.66z" />
    <path fill="#EA2D2E" d="M106.04 91.32s3.48 2.87-3.83 5.09c-13.92 4.22-57.95 5.49-70.18.17-4.4-1.91 3.85-4.56 6.45-5.11 2.71-.59 4.26-.48 4.26-.48-4.89-3.45-31.61 6.77-13.58 9.69 49.16 7.97 89.6-3.59 76.88-9.36zM54.66 53.91s-22.39 5.32-7.93 7.25c6.11.82 18.27.63 29.6-.32 9.26-.78 18.55-2.44 18.55-2.44s-3.26 1.4-5.62 3c-22.74 5.98-66.66 3.2-54.02-2.92 10.69-5.17 19.42-4.57 19.42-4.57zM94.81 76.35c23.11-12.01 12.43-23.55 4.97-22a4.66 4.66 0 0 0-2.64 1.28s.32-.51 1.04-.73c8.13-2.86 14.39 8.43-4.77 23.43.01 0 .29-.27.4-1.98z" />
    <path fill="#0074BD" d="M80.79 0s12.79 12.8-12.14 32.47c-19.99 15.79-4.56 24.79 0 35.07-11.66-10.52-20.22-19.78-14.48-28.4C62.6 26.49 85.95 20.37 80.79 0z" />
    <path fill="#EA2D2E" d="M56.93 117.78c22.18 1.42 56.25-.79 57.06-11.29 0 0-1.55 3.98-18.34 7.13-18.95 3.56-42.32 3.15-56.18.87 0 .01 2.84 2.35 17.46 3.29z" />
  </svg>
);

const HtmlIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} aria-hidden>
    <path fill="#E44D26" d="M19.04 113 8.76 0h110.48l-10.29 112.98L63.94 128" />
    <path fill="#F16529" d="m64 118.41 36.06-9.96 8.79-98.46H64" />
    <path fill="#EBEBEB" d="M64 52.15H45.95l-1.25-13.97H64V24.55H29.84l3.61 40.43H64zm0 35.16-.06.01-15.18-4.1-.97-10.85h-13.7l1.91 21.36 27.93 7.75.07-.02z" />
    <path fill="#fff" d="M63.95 52.15v13.63h16.78l-1.58 17.66-15.2 4.1v14.18l27.95-7.74.21-2.3 3.2-35.87.34-3.66H63.95zm0-27.6v13.63h32.91l.27-3.06.62-6.92.33-3.65z" />
  </svg>
);

const ReactIcon = ({ className }: IconProps) => (
  <svg viewBox="-11.5 -10.23 23 20.46" className={className} aria-hidden>
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const CATEGORY_ICONS: Record<string, React.ComponentType<IconProps>> = {
  python: PythonIcon,
  java: JavaIcon,
  javascript: JavaScriptIcon,
  "html-css": HtmlIcon,
  react: ReactIcon,
};

function parseStatValue(s: string): {
  value: number;
  suffix: string;
  decimals: number;
} {
  const m = s.match(/^([\d.]+)(.*)$/);
  if (!m) return { value: 0, suffix: s, decimals: 0 };
  const [, num, suf] = m;
  const value = parseFloat(num) || 0;
  const decimals = num.includes(".") ? (num.split(".")[1]?.length ?? 0) : 0;
  return { value, suffix: suf, decimals };
}

const STAT_VISUALS = [
  { Icon: BookMarked, gradient: "from-brand-500 to-teal-600", halo: "bg-brand-300/40" },
  { Icon: Users, gradient: "from-gold-500 to-orange-500", halo: "bg-gold-300/40" },
  { Icon: Star, gradient: "from-rose-500 to-pink-600", halo: "bg-rose-300/40" },
  { Icon: Sparkles, gradient: "from-cyan-500 to-sky-600", halo: "bg-cyan-300/40" },
];

function buildStats(settings: Record<string, string>) {
  const defaults = [
    { v: "500+", l: "Curated books" },
    { v: "120K", l: "Readers worldwide" },
    { v: "4.9★", l: "Average rating" },
    { v: "70+", l: "Free resources" },
  ];
  return defaults.map((d, i) => {
    const raw = settings[`home.stat${i + 1}_value`] || d.v;
    const label = settings[`home.stat${i + 1}_label`] || d.l;
    const parsed = parseStatValue(raw);
    return { ...parsed, label, ...STAT_VISUALS[i] };
  });
}

function CountUp({
  to,
  decimals = 0,
  duration = 1.6,
}: {
  to: number;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let raf = 0;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return <span ref={ref}>{n.toFixed(decimals)}</span>;
}

const HERO_TILES = [
  {
    label: "Python",
    tag: "Beginner · Advanced",
    Icon: PythonIcon,
    gradient: "from-emerald-600 to-teal-700",
  },
  {
    label: "JavaScript",
    tag: "180+ books",
    Icon: JavaScriptIcon,
    gradient: "from-yellow-500 to-amber-600",
  },
  {
    label: "Java",
    tag: "Enterprise · OOP",
    Icon: JavaIcon,
    gradient: "from-orange-600 to-amber-800",
  },
  {
    label: "HTML & CSS",
    tag: "Modern layouts",
    Icon: HtmlIcon,
    gradient: "from-rose-500 to-pink-600",
  },
];

export default function HomePageClient({
  books,
  categories,
  banners = [],
  testimonials = [],
  settings = {},
}: {
  books: Book[];
  categories: Category[];
  banners?: Banner[];
  testimonials?: Testimonial[];
  settings?: Record<string, string>;
}) {
  const featured = books.slice(0, 8);
  const heroStack = [books[0], books[3], books[6], books[9]].filter(Boolean) as Book[];

  // CMS-driven copy with sensible fallbacks
  const heroEyebrow =
    settings["hero.eyebrow"] || "Spring 2026 collection · 50+ new arrivals";
  const heroTitle =
    settings["hero.title"] || "The library every developer deserves.";
  const heroSubtitle =
    settings["hero.subtitle"] ||
    "Hand-picked programming books for Python, Java, JavaScript, HTML & CSS — curated, reviewed, and shipped to readers in 32 countries.";
  const ctaPrimaryLabel =
    settings["hero.cta_primary_label"] || "Browse the library";
  const ctaPrimaryHref = settings["hero.cta_primary_href"] || "/books";
  const ctaSecondaryLabel =
    settings["hero.cta_secondary_label"] || "Free resources";
  const ctaSecondaryHref =
    settings["hero.cta_secondary_href"] || "/free-resources";

  const showBanners =
    (settings["home.show_banners"] ?? "yes").toLowerCase() !== "no" &&
    banners.length > 0;
  const showCategories =
    (settings["home.show_categories"] ?? "yes").toLowerCase() !== "no";
  const showFeatured =
    (settings["home.show_featured"] ?? "yes").toLowerCase() !== "no";
  const showTestimonials =
    (settings["home.show_testimonials"] ?? "yes").toLowerCase() !== "no";
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section ref={heroRef} className="relative isolate">
        <div className="absolute inset-0 -z-20 bg-cream-50" />
        <div className="absolute inset-0 -z-10 paper opacity-50" />
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute right-0 top-0 -z-10 hidden h-[680px] w-[55%] overflow-hidden lg:block"
        >
          <Image
            src={settings["home.hero_image"] || HERO_IMAGES.primary}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
            unoptimized={!!settings["home.hero_image"]}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream-50 via-cream-50/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream-50" />
        </motion.div>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-20 pb-24 sm:px-6 sm:pb-32 lg:grid-cols-12 lg:gap-8 lg:pt-28">
          <div className="home-hero-copy lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              <Sparkles className="h-3 w-3 text-gold-500 animate-twinkle" />
              {heroEyebrow}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="display home-hero-title mt-6 text-balance text-4xl text-ink-900 sm:text-6xl lg:text-7xl"
            >
              {heroTitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 max-w-xl text-lg text-ink-700/80"
            >
              {heroSubtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link href={ctaPrimaryHref} className="btn-primary">
                {ctaPrimaryLabel}
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
              <Link href={ctaSecondaryHref} className="btn-outline">
                {ctaSecondaryLabel}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 flex items-center gap-6"
            >
              <div className="flex -space-x-3">
                {[
                  "from-brand-500 to-brand-700",
                  "from-gold-500 to-gold-700",
                  "from-rose-400 to-pink-600",
                  "from-cyan-500 to-sky-700",
                ].map((g, i) => (
                  <div
                    key={i}
                    className={`h-10 w-10 rounded-full border-2 border-cream-50 bg-gradient-to-br ${g} shadow-md`}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-gold-600">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                  ))}
                  <span className="ml-1 text-sm font-semibold text-ink-900">
                    {settings["home.hero_trust_rating"] || "4.9"}
                  </span>
                </div>
                <div className="text-xs text-ink-700/70">
                  {settings["home.hero_trust_text"] ||
                    "Trusted by 120,000+ developers"}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:col-span-5"
          >
            <div className="relative grid grid-cols-2 gap-4">
              {HERO_TILES.map((tile, i) => (
                <motion.div
                  key={tile.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className={`relative flex aspect-[5/4] flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${tile.gradient} p-5 text-white shadow-2xl shadow-ink-900/25 ring-1 ring-white/15 ${
                    i % 2 === 1 ? "translate-y-6" : ""
                  } animate-float`}
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_55%)]" />
                  <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 ring-ink-900/5">
                    <tile.Icon className="h-10 w-10" />
                  </div>
                  <div className="display relative mt-3 text-center text-lg font-semibold drop-shadow-sm">
                    {settings[`home.hero_tile${i + 1}_label`] || tile.label}
                  </div>
                  <div className="relative mt-0.5 text-[9px] uppercase tracking-[0.2em] text-white/75">
                    {settings[`home.hero_tile${i + 1}_tag`] || tile.tag}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="absolute -left-8 top-1/2 hidden h-48 w-48 -translate-y-1/2 rounded-full bg-gold-300/40 blur-3xl lg:block" />
          </motion.div>
        </div>

        {/* Stats strip */}
        <div className="relative overflow-hidden border-y border-ink-900/8 bg-gradient-to-b from-cream-100 to-cream-50">
          <div className="absolute inset-0 paper opacity-30" />
          <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-8 sm:grid-cols-4 sm:gap-5 sm:px-6 sm:py-10">
            {buildStats(settings).map((s, i) => {
              const Icon = s.Icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="group relative flex flex-col items-start gap-3 overflow-hidden rounded-2xl border border-ink-900/8 bg-cream-50 p-5 shadow-sm transition-shadow duration-300 hover:shadow-xl"
                >
                  <motion.div
                    className={`absolute -right-6 -top-6 h-24 w-24 rounded-full ${s.halo} blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />

                  <motion.span
                    initial={{ scale: 0.6, rotate: -10 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.08 + 0.1,
                      ease: "backOut",
                    }}
                    whileHover={{ rotate: -8, scale: 1.08 }}
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${s.gradient} text-white shadow-md`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </motion.span>

                  <div
                    className={`display text-3xl font-semibold leading-none bg-gradient-to-br ${s.gradient} bg-clip-text text-transparent sm:text-4xl`}
                  >
                    <CountUp to={s.value} decimals={s.decimals} />
                    {s.suffix}
                  </div>

                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-700/70">
                    {s.label}
                  </div>

                  <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BANNERS */}
      {showBanners && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <BannerSlider banners={banners} />
        </section>
      )}

      {/* CATEGORIES */}
      {showCategories && (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeader
          eyebrow="Browse by stack"
          title="Pick your language."
          subtitle="Every category is curated by working developers — no SEO fluff."
          ctaLabel="View all categories"
          ctaHref="/categories"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => {
            const Icon = CATEGORY_ICONS[c.slug];
            return (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Link
                  href={`/categories/${c.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-900/8 bg-cream-50 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-ink-900/10"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${c.accent} opacity-30 mix-blend-multiply`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />
                    {Icon && (
                      <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-lg ring-1 ring-ink-900/10 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                        <Icon className="h-7 w-7" />
                      </div>
                    )}
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
            );
          })}
        </div>
      </section>
      )}

      {/* FEATURED BOOKS */}
      {showFeatured && (
      <section className="border-y border-ink-900/8 bg-cream-100/60 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Featured"
            title="Editors' picks for the month."
            subtitle="Bestsellers and hidden gems from across the library."
            ctaLabel="See all books"
            ctaHref="/books"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </div>
      </section>
      )}

      {/* WHY US */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="absolute -left-6 -top-6 -z-10 h-full w-full rounded-3xl bg-gradient-to-br from-gold-300 to-brand-300 opacity-50 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src={settings["home.whyus_image"] || HERO_IMAGES.library}
                alt="A wall of books"
                width={800}
                height={1000}
                className="h-full w-full object-cover"
                unoptimized={!!settings["home.whyus_image"]}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="absolute -bottom-8 -right-4 max-w-[260px] rounded-3xl border border-ink-900/8 bg-cream-50 p-5 shadow-2xl shadow-ink-900/15"
            >
              <div className="flex items-center gap-2 text-gold-600">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-2 text-sm text-ink-800">
                "{settings["home.whyus_quote"] ||
                  "DevBooks saves me hours of guessing what's worth reading."}"
              </p>
              <p className="mt-2 text-xs font-semibold text-ink-700/70">
                — {settings["home.whyus_quote_author"] || "Maya R., Sr. Engineer"}
              </p>
            </motion.div>
          </div>

          <div>
            <span className="eyebrow">
              {settings["home.whyus_eyebrow"] || "Why DevBooks"}
            </span>
            <h2 className="display mt-4 text-4xl text-ink-900 sm:text-5xl">
              {settings["home.whyus_title"] ||
                "Built by developers, for developers."}
            </h2>
            <p className="mt-4 max-w-lg text-ink-700/80">
              {settings["home.whyus_body"] ||
                "Every book on DevBooks is read, reviewed, and tagged by working engineers. No noise, no SEO-optimized fluff — just titles that actually move you forward."}
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: BookMarked,
                  title:
                    settings["home.whyus_feature1_title"] || "Hand-picked",
                  body:
                    settings["home.whyus_feature1_body"] ||
                    "Every book is reviewed before it lands here.",
                },
                {
                  icon: Award,
                  title:
                    settings["home.whyus_feature2_title"] || "Trusted authors",
                  body:
                    settings["home.whyus_feature2_body"] ||
                    "Industry leaders and bestselling educators only.",
                },
                {
                  icon: Sparkles,
                  title:
                    settings["home.whyus_feature3_title"] || "Free chapters",
                  body:
                    settings["home.whyus_feature3_body"] ||
                    "Preview before you commit — always.",
                },
                {
                  icon: Globe,
                  title:
                    settings["home.whyus_feature4_title"] ||
                    "Worldwide delivery",
                  body:
                    settings["home.whyus_feature4_body"] ||
                    "Digital and print, shipped wherever you code.",
                },
              ].map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.li
                    key={f.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group card p-5 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-brand-100">
                      <Icon className="h-4 w-4 group-hover:animate-bounce-soft" strokeWidth={2} />
                    </span>
                    <h3 className="mt-3 text-sm font-semibold text-ink-900">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-sm text-ink-700/80">{f.body}</p>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {showTestimonials && (
      <section className="relative overflow-hidden bg-ink-900 py-16 text-cream-100 sm:py-24">
        <div className="absolute inset-0 paper opacity-30" />
        <div className="absolute -top-24 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand-700/30 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="eyebrow !border-cream-100/15 !bg-cream-100/5 !text-cream-100/70">
              {settings["home.testimonials_eyebrow"] || "Loved by readers"}
            </span>
            <h2 className="display mt-4 text-4xl text-cream-50 sm:text-5xl">
              {settings["home.testimonials_title"] ||
                "120,000+ developers, one bookshelf."}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-3xl border border-cream-100/10 bg-cream-100/5 p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-cream-100/10"
              >
                <Quote className="h-8 w-8 text-gold-400/60" strokeWidth={1.5} />
                <blockquote className="mt-4 text-base leading-relaxed text-cream-100">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full bg-gradient-to-br ${t.accent}`}
                  />
                  <div>
                    <div className="text-sm font-semibold text-cream-50">
                      {t.name}
                    </div>
                    <div className="text-xs text-cream-100/60">{t.role}</div>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-700 via-brand-800 to-ink-900 p-8 text-cream-50 shadow-2xl shadow-brand-700/20 sm:p-12 lg:p-16">
          <div className="absolute inset-0 paper opacity-25" />
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gold-500/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-brand-500/40 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="eyebrow !border-cream-50/20 !bg-cream-50/10 !text-cream-100">
                <Sparkles className="h-3 w-3 animate-twinkle" />
                {settings["home.cta_eyebrow"] || "Start free"}
              </span>
              <h2 className="display mt-4 text-4xl sm:text-5xl">
                {settings["home.cta_title"] || "Build your bookshelf today."}
              </h2>
              <p className="mt-3 max-w-md text-cream-100/80">
                {settings["home.cta_body"] ||
                  "Create a free account and we'll send you a hand-picked book recommendation every week — tailored to your stack."}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={settings["home.cta_primary_href"] || "/register"}
                  className="btn-gold"
                >
                  {settings["home.cta_primary_label"] || "Create free account"}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>
                <Link
                  href={settings["home.cta_secondary_href"] || "/books"}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-50/20 px-5 py-2.5 text-sm font-semibold text-cream-50 transition-colors hover:bg-cream-50/10"
                >
                  {settings["home.cta_secondary_label"] || "Browse first"}
                </Link>
              </div>
            </div>

            <div className="relative h-64 lg:h-80">
              <Image
                src={settings["home.cta_image"] || HERO_IMAGES.desk}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="rounded-2xl object-cover shadow-2xl"
                unoptimized={!!settings["home.cta_image"]}
              />
              <div className="absolute -bottom-4 -left-4 hidden h-32 w-32 rounded-2xl bg-gold-500/90 p-4 text-ink-900 shadow-xl backdrop-blur sm:block">
                <div className="display text-3xl font-semibold leading-none">
                  {settings["home.cta_badge_value"] || "10"}
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-wider">
                  {settings["home.cta_badge_label"] || "Free books inside"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-xl">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="display mt-4 text-4xl text-ink-900 sm:text-5xl">
          {title}
        </h2>
        <p className="mt-3 text-ink-700/80">{subtitle}</p>
      </div>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="group inline-flex items-center gap-1 self-start text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900 sm:self-end"
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
