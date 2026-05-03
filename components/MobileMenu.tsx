"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  X,
  ChevronDown,
  Search,
  ShoppingBag,
  LogIn,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import type { Category } from "@/lib/data";

type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

const panelVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { x: "100%", transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
};

const listVariants = {
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export default function MobileMenu({
  items,
  categories,
  onClose,
}: {
  items: NavItem[];
  categories: Category[];
  onClose: () => void;
}) {
  const [catOpen, setCatOpen] = useState(false);

  return (
    <div
      className="fixed inset-0 z-[60] lg:hidden"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm"
      />

      <motion.aside
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-cream-50 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-ink-900/10 px-5 py-4">
          <Link href="/" onClick={onClose} className="group flex items-center gap-2.5">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-ink-900 text-cream-50 shadow-md">
              <BookOpen className="h-5 w-5 group-hover:animate-wiggle" strokeWidth={2.2} />
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-gold-500 ring-2 ring-cream-50" />
            </span>
            <span className="display text-xl text-ink-900">
              Dev<span className="text-brand-700">Books</span>
            </span>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-800 transition-all duration-300 hover:bg-ink-900/5 hover:rotate-90"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-ink-900/10 px-5 py-4">
          <div className="flex items-center gap-2 rounded-full border border-ink-900/10 bg-cream-100 px-4 py-2.5">
            <Search className="h-4 w-4 text-ink-700/50" strokeWidth={1.8} />
            <input
              type="search"
              placeholder="Search books, authors…"
              className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-700/40 focus:outline-none"
            />
          </div>
        </div>

        <motion.ul
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 overflow-y-auto px-3 py-3"
        >
          {items.map((item) =>
            item.hasDropdown ? (
              <motion.li key={item.label} variants={itemVariants}>
                <button
                  type="button"
                  onClick={() => setCatOpen((v) => !v)}
                  aria-expanded={catOpen}
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-base font-medium text-ink-900 transition-colors hover:bg-cream-100"
                >
                  {item.label}
                  <ChevronDown
                    className={`h-4 w-4 text-ink-700/60 transition-transform duration-300 ${
                      catOpen ? "rotate-180" : "rotate-0"
                    }`}
                    strokeWidth={1.8}
                  />
                </button>
                <motion.ul
                  initial={false}
                  animate={{
                    height: catOpen ? "auto" : 0,
                    opacity: catOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden pl-3"
                >
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/categories/${c.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-700 transition-colors hover:bg-cream-100 hover:text-brand-700"
                      >
                        <span className="text-base">{c.emoji}</span>
                        {c.name} Books
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/categories"
                      onClick={onClose}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-brand-700 hover:bg-cream-100"
                    >
                      Browse all categories
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                    </Link>
                  </li>
                </motion.ul>
              </motion.li>
            ) : (
              <motion.li key={item.label} variants={itemVariants}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-2xl px-4 py-3 text-base font-medium text-ink-900 transition-colors hover:bg-cream-100 hover:text-brand-700"
                >
                  {item.label}
                </Link>
              </motion.li>
            )
          )}
        </motion.ul>

        <div className="space-y-3 border-t border-ink-900/10 px-5 py-4">
          <Link
            href="/cart"
            onClick={onClose}
            className="flex items-center justify-between rounded-2xl bg-cream-100 px-4 py-3 text-sm font-medium text-ink-900 transition-colors hover:bg-cream-200"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" strokeWidth={1.8} />
              Your cart
            </span>
            <span className="rounded-full bg-gold-500 px-2 py-0.5 text-xs font-bold text-ink-900">
              3
            </span>
          </Link>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/login" onClick={onClose} className="btn-outline">
              <LogIn className="h-4 w-4" strokeWidth={1.8} />
              Login
            </Link>
            <Link href="/register" onClick={onClose} className="btn-primary">
              Sign up
            </Link>
          </div>
        </div>
      </motion.aside>
    </div>
  );
}
