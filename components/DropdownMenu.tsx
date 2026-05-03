"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Code2,
  Coffee,
  FileCode,
  Globe2,
  Atom,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import type { Category } from "@/lib/data";

const ICON_BY_SLUG: Record<
  string,
  React.ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  python: Code2,
  java: Coffee,
  javascript: FileCode,
  "html-css": Globe2,
  react: Atom,
};

export default function DropdownMenu({
  label,
  active = false,
  categories,
}: {
  label: string;
  active?: boolean;
  categories: Category[];
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
      cancelClose();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="nav-link gap-1"
        data-active={open || active ? "true" : "false"}
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          strokeWidth={1.8}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-full z-50 mt-3 w-[28rem] -translate-x-1/2"
          >
            <div className="absolute -top-3 h-3 w-full" />

            <div className="overflow-hidden rounded-3xl border border-ink-900/8 bg-cream-50/95 p-2 shadow-2xl shadow-ink-900/15 backdrop-blur-xl">
              <ul className="grid gap-1">
                {categories.map((cat, i) => {
                  const Icon = ICON_BY_SLUG[cat.slug] ?? BookOpen;
                  return (
                    <motion.li
                      key={cat.slug}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 * i, duration: 0.25 }}
                    >
                      <Link
                        href={`/categories/${cat.slug}`}
                        role="menuitem"
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-3 rounded-2xl px-3 py-3 transition-all duration-300 hover:bg-cream-100"
                      >
                        <span
                          className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-to-br ${cat.accent} text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                        >
                          <Icon className="h-4 w-4" strokeWidth={2} />
                        </span>
                        <span className="flex flex-1 flex-col">
                          <span className="text-sm font-semibold text-ink-900">
                            {cat.name} Books
                          </span>
                          <span className="text-xs text-ink-700/70">
                            {cat.tagline}
                          </span>
                        </span>
                        <ArrowRight
                          className="h-4 w-4 text-ink-700/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-700"
                          strokeWidth={2}
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-2 flex items-center justify-between rounded-2xl bg-gradient-to-r from-brand-700 to-brand-800 px-4 py-3 text-cream-50">
                <span className="text-xs font-medium">
                  Browse the full library
                </span>
                <Link
                  href="/categories"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-gold-300 hover:text-gold-200"
                >
                  See all <ArrowRight className="h-3 w-3" strokeWidth={2.2} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
