"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Search,
  ShoppingBag,
  Menu,
  LogIn,
  X,
  ArrowUpRight,
} from "lucide-react";
import DropdownMenu from "./DropdownMenu";
import MobileMenu from "./MobileMenu";
import type { Book, Category } from "@/lib/data";

type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Books", href: "/books" },
  { label: "Categories", href: "/categories", hasDropdown: true },
  { label: "Free Resources", href: "/free-resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({
  categories,
  books,
  settings = {},
}: {
  categories: Category[];
  books: Book[];
  settings?: Record<string, string>;
}) {
  const loginLabel = settings["nav.login_label"] || "Login";
  const signupLabel = settings["nav.signup_label"] || "Sign up";
  const searchPlaceholder =
    settings["nav.search_placeholder"] || "Search books, authors…";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass" : "bg-cream-50/40 backdrop-blur-md"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label="DevBooks home"
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-ink-900 text-cream-50 shadow-md shadow-ink-900/20 transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-105">
              <BookOpen className="h-5 w-5 transition-transform duration-500 group-hover:animate-wiggle" strokeWidth={2.2} />
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-gold-500 ring-2 ring-cream-50" />
            </span>
            <span className="display text-xl text-ink-900">
              Dev<span className="text-brand-700">Books</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_ITEMS.map((item) =>
              item.hasDropdown ? (
                <li key={item.label}>
                  <DropdownMenu
                    label={item.label}
                    active={isActive(item.href)}
                    categories={categories}
                  />
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="nav-link"
                    data-active={isActive(item.href) ? "true" : "false"}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <SearchBar
              books={books}
              categories={categories}
              placeholder={searchPlaceholder}
            />

            <Link
              href="/cart"
              aria-label="Cart"
              className="relative hidden h-10 w-10 items-center justify-center rounded-full text-ink-800 transition-colors hover:bg-ink-900/5 sm:inline-flex"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.8} />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-ink-900">
                3
              </span>
            </Link>

            <Link href="/login" className="btn-ghost hidden sm:inline-flex">
              <LogIn className="h-4 w-4" strokeWidth={1.8} />
              {loginLabel}
            </Link>
            <Link href="/register" className="btn-primary hidden sm:inline-flex">
              {signupLabel}
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-800 transition-colors hover:bg-ink-900/5 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            items={NAV_ITEMS}
            categories={categories}
            onClose={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function SearchBar({
  books,
  categories,
  placeholder = "Search books, authors…",
}: {
  books: Book[];
  categories: Category[];
  placeholder?: string;
}) {
  const router = useRouter();
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 1) return [];
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query, books]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setFocused(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const goToBooks = () => {
    setOpen(false);
    setQuery("");
    router.push("/books");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToBooks();
  };

  const showDropdown = open && query.trim().length >= 1;

  return (
    <div
      ref={wrapRef}
      className="relative hidden md:block"
    >
      <form
        onSubmit={onSubmit}
        className={`flex w-56 items-center gap-2 rounded-full border bg-cream-50/80 px-3 py-1.5 backdrop-blur transition-colors duration-300 ${
          focused
            ? "border-brand-500 ring-2 ring-brand-500/20"
            : "border-ink-900/10"
        }`}
      >
        <Search className="h-4 w-4 text-ink-700/50" strokeWidth={1.8} />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            setFocused(true);
            if (query) setOpen(true);
          }}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-700/40 focus:outline-none"
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="text-ink-700/50 hover:text-ink-900"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        ) : (
          <kbd className="hidden rounded border border-ink-900/10 bg-cream-100 px-1.5 py-0.5 text-[10px] font-medium text-ink-700/70 lg:inline-block">
            ⌘K
          </kbd>
        )}
      </form>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-full z-50 mt-2 w-[26rem] -translate-x-1/2 overflow-hidden rounded-2xl border border-ink-900/10 bg-cream-50/95 shadow-2xl shadow-ink-900/15 backdrop-blur-xl"
          >
            {results.length === 0 ? (
              <div className="px-5 py-6 text-center text-sm text-ink-700/60">
                No matches for{" "}
                <span className="font-semibold text-ink-900">"{query}"</span>
              </div>
            ) : (
              <>
                <div className="border-b border-ink-900/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-700/60">
                  {results.length} {results.length === 1 ? "match" : "matches"}
                </div>
                <ul className="max-h-[24rem] overflow-y-auto py-1">
                  {results.map((b) => {
                    const cat = categories.find((c) => c.slug === b.category);
                    return (
                      <li key={b.id}>
                        <Link
                          href={`/categories/${b.category}`}
                          onClick={() => {
                            setOpen(false);
                            setQuery("");
                          }}
                          className="group flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-cream-100"
                        >
                          <div className="relative h-12 w-9 flex-none overflow-hidden rounded-md shadow-sm ring-1 ring-ink-900/10">
                            {b.coverImage ? (
                              <img
                                src={b.coverImage}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div
                                className={`h-full w-full bg-gradient-to-br ${b.cover}`}
                              />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-semibold text-ink-900">
                              {b.title}
                            </div>
                            <div className="truncate text-xs text-ink-700/60">
                              {b.author} · {cat?.name}
                            </div>
                          </div>
                          <ArrowUpRight
                            className="h-3.5 w-3.5 text-ink-700/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-700"
                            strokeWidth={2}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <button
                  type="button"
                  onClick={goToBooks}
                  className="flex w-full items-center justify-between border-t border-ink-900/5 bg-cream-100/60 px-4 py-3 text-xs font-semibold text-brand-700 transition-colors hover:bg-cream-100"
                >
                  Browse all books
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
