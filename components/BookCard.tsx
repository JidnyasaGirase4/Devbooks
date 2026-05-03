"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Heart } from "lucide-react";
import type { Book } from "@/lib/data";

const badgeStyles: Record<NonNullable<Book["badge"]>, string> = {
  Bestseller: "bg-gold-500 text-ink-900",
  New: "bg-brand-500 text-cream-50",
  Free: "bg-rose-500 text-cream-50",
};

export default function BookCard({ book }: { book: Book }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink-900/8 bg-cream-50 shadow-[0_2px_24px_rgba(20,26,24,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(20,26,24,0.12)]"
    >
      <div
        className={`relative flex aspect-[3/4] flex-col justify-between overflow-hidden ${
          book.coverImage ? "bg-ink-900/5" : `bg-gradient-to-br ${book.cover}`
        } p-5`}
      >
        {book.coverImage ? (
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_55%)]" />
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/15 blur-2xl transition-all duration-700 group-hover:scale-125" />
            <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-black/25 blur-3xl" />
            <div className="absolute inset-y-0 left-0 w-2 bg-black/30 mix-blend-multiply" />
            <div className="absolute inset-y-0 left-2 w-px bg-white/20" />

            <div className="relative z-10 flex items-start justify-between text-white">
              <div className="display text-[10px] uppercase tracking-[0.25em] text-white/80">
                {book.level}
              </div>
              <span className="display text-3xl leading-none text-white/40">
                ❝
              </span>
            </div>

            <div className="relative z-10 text-white">
              <div className="display line-clamp-4 text-2xl font-semibold leading-[1.05] drop-shadow-sm">
                {book.title}
              </div>
              <div className="mt-3 h-px w-10 bg-white/40" />
              <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/75">
                {book.author}
              </div>
            </div>
          </>
        )}

        {book.badge && (
          <span
            className={`absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md ${badgeStyles[book.badge]}`}
          >
            {book.badge}
          </span>
        )}

        <button
          type="button"
          aria-label={`Save ${book.title}`}
          className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-ink-700 opacity-0 backdrop-blur transition-all duration-300 hover:bg-white hover:text-rose-500 group-hover:opacity-100"
        >
          <Heart className="h-4 w-4 transition-transform duration-300 hover:scale-125 hover:animate-heartbeat" strokeWidth={1.8} />
        </button>

        <div className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="line-clamp-2 text-sm text-ink-700/80">
          {book.description}
        </p>

        <div className="mt-3 flex items-center gap-1 text-gold-600">
          <Star className="h-4 w-4 fill-current transition-transform duration-300 group-hover:rotate-[72deg] group-hover:scale-125" strokeWidth={0} />
          <span className="text-sm font-semibold text-ink-900">
            {book.rating.toFixed(1)}
          </span>
          <span className="text-xs text-ink-700/50">
            ({book.reviews.toLocaleString()})
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex items-baseline gap-2">
            {book.price === 0 ? (
              <span className="display text-xl font-semibold text-rose-600">
                Free
              </span>
            ) : (
              <>
                <span className="display text-xl font-semibold text-ink-900">
                  Rs {book.price}
                </span>
                {book.oldPrice && (
                  <span className="text-sm text-ink-700/40 line-through">
                    Rs {book.oldPrice}
                  </span>
                )}
              </>
            )}
          </div>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-ink-900 px-4 text-xs font-semibold text-cream-50 transition-all duration-300 hover:bg-brand-700 hover:scale-105"
            aria-label={`Add ${book.title} to cart`}
          >
            <ShoppingBag className="h-3.5 w-3.5" strokeWidth={2} />
            Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}
