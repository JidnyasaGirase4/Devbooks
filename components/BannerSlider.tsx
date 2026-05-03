"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Banner } from "@/lib/queries";

const ROTATE_MS = 6000;

export default function BannerSlider({ banners }: { banners: Banner[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || banners.length <= 1) return;
    const t = setTimeout(
      () => setIndex((i) => (i + 1) % banners.length),
      ROTATE_MS
    );
    return () => clearTimeout(t);
  }, [index, paused, banners.length]);

  if (banners.length === 0) return null;

  const current = banners[index];
  const next = () => setIndex((i) => (i + 1) % banners.length);
  const prev = () => setIndex((i) => (i - 1 + banners.length) % banners.length);

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-ink-900/10 shadow-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[16/9] sm:aspect-[21/9]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {current.image_url && (
              <Image
                src={current.image_url}
                alt={current.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
                unoptimized={!current.image_url.startsWith("/")}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-ink-900/85 via-ink-900/50 to-ink-900/10" />
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20">
              <motion.div
                key={`text-${current.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="max-w-2xl text-cream-50"
              >
                <h2 className="display text-3xl leading-[1.1] sm:text-5xl">
                  {current.title}
                </h2>
                {current.subtitle && (
                  <p className="mt-3 max-w-xl text-base text-cream-100/85 sm:text-lg">
                    {current.subtitle}
                  </p>
                )}
                {current.link_url && current.link_label && (
                  <Link
                    href={current.link_url}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream-50 px-5 py-2.5 text-sm font-semibold text-ink-900 transition-transform hover:-translate-y-0.5"
                  >
                    {current.link_label}
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {banners.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream-50/80 text-ink-900 backdrop-blur transition-colors hover:bg-cream-50"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream-50/80 text-ink-900 backdrop-blur transition-colors hover:bg-cream-50"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {banners.map((b, i) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 bg-cream-50"
                    : "w-2 bg-cream-50/50 hover:bg-cream-50/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
