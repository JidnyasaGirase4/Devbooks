"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import type { Book, Category } from "@/lib/data";

export default function CategoriesGridClient({
  categories,
  books,
  settings = {},
}: {
  categories: Category[];
  books: Book[];
  settings?: Record<string, string>;
}) {
  const eyebrowText =
    settings["categories.eyebrow"] || "5 languages, hundreds of books";
  const heroTitle = settings["categories.title"] || "Categories.";
  const heroSubtitle =
    settings["categories.subtitle"] ||
    "Pick a language and dive into a curated shelf — from first lines to production-grade patterns.";
  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-900/8 bg-cream-100/60">
        <div className="absolute inset-0 paper opacity-30" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-300/40 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="eyebrow"
          >
            <BookOpen className="h-3 w-3" /> {eyebrowText}
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

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => {
            const featured = books.filter((b) => b.category === c.slug).slice(
              0,
              3
            );
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
                      className={`absolute inset-0 bg-gradient-to-br ${c.accent} opacity-25 mix-blend-multiply`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/75 via-ink-900/10 to-transparent" />
                    <div className="absolute left-5 top-5 text-3xl drop-shadow-md">
                      {c.emoji}
                    </div>
                    <div className="absolute right-5 top-5 chip !bg-cream-50/90 !text-ink-900">
                      {c.count} books
                    </div>
                    <div className="absolute bottom-5 left-5 right-5">
                      <h2 className="display text-3xl font-semibold text-cream-50">
                        {c.name}
                      </h2>
                      <p className="mt-1 text-xs text-cream-50/80">
                        {c.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-5 p-6">
                    <p className="text-sm text-ink-700/80">{c.description}</p>

                    <div className="flex items-end justify-between">
                      <div className="flex gap-2">
                        {featured.map((b) => (
                          <div
                            key={b.id}
                            className={`relative h-16 w-12 flex-none overflow-hidden rounded-lg bg-gradient-to-br ${b.cover} shadow-md`}
                            title={b.title}
                          >
                            <div className="absolute inset-y-0 left-0 w-1 bg-black/25" />
                          </div>
                        ))}
                      </div>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink-900/5 text-ink-800 transition-all duration-300 group-hover:bg-ink-900 group-hover:text-cream-50 group-hover:rotate-[-12deg]">
                        <ArrowRight className="h-4 w-4" strokeWidth={2} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
