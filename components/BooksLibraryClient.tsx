"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import BookCard from "@/components/BookCard";
import type { Book, Category } from "@/lib/data";

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"] as const;

export default function BooksLibraryClient({
  books,
  categories,
  settings = {},
}: {
  books: Book[];
  categories: Category[];
  settings?: Record<string, string>;
}) {
  const eyebrowText =
    settings["books.eyebrow"] ||
    `${books.length} books · ${categories.length} categories`;
  const heroTitle = settings["books.title"] || "The full library.";
  const heroSubtitle =
    settings["books.subtitle"] ||
    "Search, filter and discover the right book for whatever you're building next.";
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("all");
  const [activeLevel, setActiveLevel] =
    useState<(typeof LEVELS)[number]>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter((b) => {
      if (activeCat !== "all" && b.category !== activeCat) return false;
      if (activeLevel !== "All" && b.level !== activeLevel) return false;
      if (
        q &&
        !b.title.toLowerCase().includes(q) &&
        !b.author.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [query, activeCat, activeLevel, books]);

  const hasFilters =
    query.trim() !== "" || activeCat !== "all" || activeLevel !== "All";

  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-900/8 bg-cream-100/60">
        <div className="absolute inset-0 paper opacity-30" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-300/40 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-brand-200/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="eyebrow"
          >
            <Filter className="h-3 w-3" /> {eyebrowText}
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

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24">
        <div className="-mt-10 rounded-3xl border border-ink-900/8 bg-cream-50 p-5 shadow-xl shadow-ink-900/5 backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 items-center gap-2 rounded-full border border-ink-900/10 bg-cream-100 px-4 py-2.5">
              <Search className="h-4 w-4 text-ink-700/50" strokeWidth={1.8} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title or author…"
                className="flex-1 bg-transparent text-sm text-ink-900 placeholder:text-ink-700/40 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-ink-700/50 hover:text-ink-900"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {LEVELS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setActiveLevel(l)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 ${
                    activeLevel === l
                      ? "bg-ink-900 text-cream-50 shadow-md"
                      : "bg-ink-900/5 text-ink-700 hover:bg-ink-900/10"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCat("all")}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 ${
                activeCat === "all"
                  ? "bg-brand-700 text-cream-50 shadow-md"
                  : "bg-ink-900/5 text-ink-700 hover:bg-ink-900/10"
              }`}
            >
              All categories
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => setActiveCat(c.slug)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 ${
                  activeCat === c.slug
                    ? "bg-brand-700 text-cream-50 shadow-md"
                    : "bg-ink-900/5 text-ink-700 hover:bg-ink-900/10"
                }`}
              >
                {c.emoji} {c.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-ink-700/70">
            Showing{" "}
            <span className="font-semibold text-ink-900">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "book" : "books"}
          </p>
          {hasFilters && (
            <button
              onClick={() => {
                setQuery("");
                setActiveCat("all");
                setActiveLevel("All");
              }}
              className="text-xs font-semibold text-brand-700 hover:text-brand-900"
            >
              Clear all filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-ink-900/15 bg-cream-50 p-16 text-center">
            <div className="display text-2xl text-ink-900">No matches.</div>
            <p className="mt-2 text-sm text-ink-700/70">
              Try clearing one of your filters.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
