"use client";

import { motion } from "framer-motion";
import {
  Download,
  FileText,
  Video,
  GraduationCap,
  BookOpen,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import type { Book, Category } from "@/lib/data";
import type { ResourceRow } from "@/lib/queries";

const typeIcons = {
  PDF: FileText,
  Cheatsheet: BookOpen,
  Course: GraduationCap,
  Video: Video,
};

const typeColors: Record<string, string> = {
  PDF: "from-rose-500 to-pink-600",
  Cheatsheet: "from-gold-500 to-orange-500",
  Course: "from-brand-500 to-teal-600",
  Video: "from-cyan-500 to-sky-600",
};

export default function FreeResourcesClient({
  freeBooks,
  categories,
  settings = {},
  resources = [],
}: {
  freeBooks: Book[];
  categories: Category[];
  settings?: Record<string, string>;
  resources?: ResourceRow[];
}) {
  const eyebrowText =
    settings["freeResources.eyebrow"] || "100% free, forever";
  const heroTitle =
    settings["freeResources.title"] || "Free resources for developers.";
  const heroSubtitle =
    settings["freeResources.subtitle"] ||
    "Cheatsheets, full books, video courses, and PDFs — all free, all curated by working engineers.";

  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-900/8 bg-cream-100/60">
        <div className="absolute inset-0 paper opacity-30" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-rose-300/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-gold-300/40 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="eyebrow !border-rose-500/20 !bg-rose-500/10 !text-rose-700"
          >
            <Sparkles className="h-3 w-3 animate-twinkle" /> {eyebrowText}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="display mt-4 text-4xl text-ink-900 sm:text-6xl"
          >
            {heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-4 max-w-xl text-ink-700/80"
          >
            {heroSubtitle}
          </motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex items-end justify-between">
          <div>
            <span className="eyebrow">
              {settings["freeResources.freebooks_eyebrow"] || "Free books"}
            </span>
            <h2 className="display mt-3 text-4xl text-ink-900">
              {settings["freeResources.freebooks_title"] ||
                "Read cover-to-cover."}
            </h2>
            <p className="mt-2 text-ink-700/80">
              {settings["freeResources.freebooks_subtitle"] ||
                "No signup required."}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {freeBooks.map((b, i) => {
            const cat = categories.find((c) => c.slug === b.category);
            return (
              <motion.a
                key={b.id}
                href="#"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group flex gap-4 rounded-3xl border border-ink-900/8 bg-cream-50 p-4 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-900/10 sm:gap-5 sm:p-5"
              >
                <div
                  className={`relative h-32 w-20 flex-none overflow-hidden rounded-xl bg-gradient-to-br ${b.cover} p-3 text-white shadow-md sm:w-24`}
                >
                  <div className="absolute inset-y-0 left-0 w-1.5 bg-black/25" />
                  <div className="display text-[9px] uppercase tracking-[0.2em] text-white/70">
                    {b.level}
                  </div>
                  <div className="display mt-1 line-clamp-3 text-xs font-semibold leading-tight">
                    {b.title}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="chip !bg-ink-900/5 !text-ink-700">
                    {cat?.emoji} {cat?.name}
                  </span>
                  <h3 className="display mt-2 line-clamp-2 text-lg font-semibold text-ink-900">
                    {b.title}
                  </h3>
                  <div className="mt-1 text-xs text-ink-700/60">
                    by {b.author}
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 transition-transform group-hover:translate-x-1">
                    <Download className="h-3.5 w-3.5" strokeWidth={2} />
                    Read free
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </section>

      <section className="border-y border-ink-900/8 bg-cream-100/60 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div>
            <span className="eyebrow">Cheatsheets, courses & guides</span>
            <h2 className="display mt-3 text-4xl text-ink-900">
              Bite-sized learning.
            </h2>
            <p className="mt-2 text-ink-700/80">
              Resources to keep on your second monitor.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r, i) => {
              const Icon = typeIcons[r.type];
              const cat = categories.find((c) => c.slug === r.category_slug);
              return (
                <motion.a
                  key={r.id}
                  href={r.href ?? "#"}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group flex h-full flex-col rounded-3xl border border-ink-900/8 bg-cream-50 p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-900/10"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${typeColors[r.type]} px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-3 w-3 group-hover:animate-wiggle" strokeWidth={2} />
                      {r.type}
                    </span>
                    <span className="text-[11px] font-medium text-ink-700/50">
                      {cat?.emoji} {cat?.name}
                    </span>
                  </div>
                  <h3 className="display mt-4 text-xl font-semibold text-ink-900">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-700/80">
                    {r.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-6">
                    <span className="text-sm font-semibold text-brand-700">
                      Get it free
                    </span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink-900/5 text-ink-800 transition-all duration-300 group-hover:bg-ink-900 group-hover:text-cream-50 group-hover:rotate-[-12deg]">
                      <ArrowRight className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-rose-500 via-pink-600 to-fuchsia-700 p-8 text-cream-50 shadow-2xl shadow-rose-500/20 sm:p-12 lg:p-16">
          <div className="absolute inset-0 paper opacity-25" />
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gold-400/40 blur-3xl" />

          <div className="relative max-w-2xl">
            <span className="eyebrow !border-cream-50/20 !bg-cream-50/10 !text-cream-100">
              Newsletter
            </span>
            <h2 className="display mt-4 text-4xl sm:text-5xl">
              A free resource every Friday.
            </h2>
            <p className="mt-3 max-w-md text-cream-100/85">
              Subscribe and we'll send a hand-picked resource to your inbox
              every week — books, cheatsheets, videos.
            </p>
            <form className="mt-7 flex max-w-md items-center gap-2 rounded-full bg-cream-50 p-1.5 pl-5">
              <input
                type="email"
                placeholder="you@dev.com"
                className="flex-1 bg-transparent text-sm text-ink-900 placeholder:text-ink-700/40 focus:outline-none"
              />
              <button type="submit" className="btn-primary !py-2 !px-5">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
