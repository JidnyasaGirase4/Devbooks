"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  ArrowUpRight,
  Mail,
  Send,
  Sparkles,
} from "lucide-react";
import type { Category } from "@/lib/data";

const NEWSLETTER_COVERS = [
  {
    label: "Issue 184",
    title: "Production Patterns",
    gradient: "from-brand-600 to-teal-700",
    wrapper: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-10deg] z-20",
    size: "h-48 w-36",
    titleSize: "text-[18px]",
  },
  {
    label: "Free chapter",
    title: "System Design",
    gradient: "from-gold-500 to-orange-600",
    wrapper: "right-2 top-4 rotate-[8deg] z-10",
    size: "h-44 w-32",
    titleSize: "text-[15px]",
  },
  {
    label: "Bestseller",
    title: "Modern CSS",
    gradient: "from-rose-500 to-pink-700",
    wrapper: "-bottom-1 left-2 rotate-[-3deg] z-10",
    size: "h-40 w-28",
    titleSize: "text-[14px]",
  },
];

export default function Footer({
  categories,
  settings = {},
}: {
  categories: Category[];
  settings?: Record<string, string>;
}) {
  const description =
    settings["footer.description"] ||
    "A modern library of programming books — curated, reviewed, and built for developers who care about their craft.";
  const copyright =
    settings["footer.copyright"] || "Crafted for readers who code.";
  const newsletterTitle =
    settings["newsletter.title"] ||
    "A new book every Friday, straight to your inbox.";
  const newsletterSubtitle =
    settings["newsletter.subtitle"] ||
    "Join 42,000+ developers receiving curated programming reads every week. Free chapters always included.";
  const brandName = settings["brand.name"] || "DevBooks";
  const socials = [
    { Icon: Twitter, href: settings["footer.social_twitter"] || "#" },
    { Icon: Github, href: settings["footer.social_github"] || "#" },
    { Icon: Linkedin, href: settings["footer.social_linkedin"] || "#" },
    { Icon: Youtube, href: settings["footer.social_youtube"] || "#" },
  ];
  return (
    <footer className="relative overflow-hidden bg-ink-900 text-cream-100">
      <div className="absolute inset-0 paper opacity-20" />
      <div className="absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand-700/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pt-14 pb-8 sm:px-6 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-16 overflow-hidden rounded-[2rem] border border-ink-900/10 bg-cream-50 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
        >
          <div className="absolute inset-0 paper opacity-40" />
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-gold-300 to-gold-500 opacity-30 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-gradient-to-tr from-brand-400 to-brand-600 opacity-25 blur-3xl" />

          <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-10 lg:p-12">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-700/15 bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-800">
                <Sparkles className="h-3 w-3 text-gold-600" strokeWidth={2} />
                The Friday Read
              </span>
              <h2 className="display mt-4 text-3xl leading-[1.1] text-ink-900 sm:text-4xl lg:text-5xl">
                {newsletterTitle}
              </h2>
              <p className="mt-3 max-w-md text-ink-700/80">
                {newsletterSubtitle}
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-5 flex max-w-md flex-col gap-2 sm:flex-row sm:items-center"
              >
                <div className="flex flex-1 items-center gap-2 rounded-full border border-ink-900/10 bg-cream-50 px-5 py-3 shadow-sm">
                  <Mail className="h-4 w-4 text-ink-700/50" strokeWidth={1.8} />
                  <input
                    type="email"
                    placeholder="you@dev.com"
                    className="flex-1 bg-transparent text-sm text-ink-900 placeholder:text-ink-700/40 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-cream-50 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lg"
                >
                  Subscribe
                  <Send
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </button>
              </form>

              <div className="mt-4 flex items-center gap-3 text-xs text-ink-700/60">
                <div className="flex -space-x-2">
                  {[
                    "from-brand-500 to-brand-700",
                    "from-gold-500 to-gold-700",
                    "from-rose-400 to-pink-600",
                  ].map((g, i) => (
                    <div
                      key={i}
                      className={`h-6 w-6 rounded-full border-2 border-cream-50 bg-gradient-to-br ${g}`}
                    />
                  ))}
                </div>
                <span>No spam. Unsubscribe in one click.</span>
              </div>
            </div>

            <div className="relative hidden lg:col-span-5 lg:block">
              <div className="relative mx-auto h-60 w-full max-w-sm">
                {NEWSLETTER_COVERS.map((c, i) => (
                  <div
                    key={c.title}
                    className={`absolute ${c.wrapper}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7, y: 24 }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                        y: [0, -8, 0],
                      }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{
                        opacity: { duration: 0.5, delay: 0.15 + i * 0.12 },
                        scale: {
                          duration: 0.6,
                          delay: 0.15 + i * 0.12,
                          ease: [0.22, 1, 0.36, 1],
                        },
                        y: {
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.9 + i * 0.7,
                        },
                      }}
                      whileHover={{
                        scale: 1.07,
                        y: -10,
                        transition: { duration: 0.35, ease: "easeOut" },
                      }}
                      className={`relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br ${c.gradient} ${c.size} cursor-pointer p-4 text-cream-50 shadow-2xl shadow-ink-900/35`}
                    >
                      <div className="absolute inset-y-0 left-0 w-1.5 bg-black/25" />
                      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/20 blur-2xl" />

                      <motion.div
                        initial={{ opacity: 0, x: -6 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.45 + i * 0.12, duration: 0.4 }}
                        className="display text-[9px] uppercase tracking-[0.18em] text-cream-50/85"
                      >
                        {c.label}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.55 + i * 0.12, duration: 0.5 }}
                        className={`display mt-1.5 ${c.titleSize} font-semibold leading-[1.15]`}
                      >
                        {c.title}
                      </motion.div>

                      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    </motion.div>
                  </div>
                ))}

                <motion.div
                  initial={{ opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.85, duration: 0.45, ease: "backOut" }}
                  whileHover={{ scale: 1.08 }}
                  className="absolute right-0 top-0 z-30 inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gold-400 shadow-lg"
                >
                  <motion.span
                    animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="h-1.5 w-1.5 rounded-full bg-gold-400"
                  />
                  Live
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-10 border-t border-cream-100/10 pt-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" className="group flex items-center gap-2.5">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-cream-50 text-ink-900">
                <BookOpen className="h-5 w-5 group-hover:animate-wiggle" strokeWidth={2.2} />
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-gold-500 ring-2 ring-ink-900" />
              </span>
              <span className="display text-xl text-cream-50">
                Dev<span className="text-gold-400">Books</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-100/70">
              {description}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label="social"
                  target={href !== "#" ? "_blank" : undefined}
                  rel={href !== "#" ? "noopener noreferrer" : undefined}
                  className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream-100/15 text-cream-100/70 transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/10 hover:text-gold-300 hover:-translate-y-0.5 hover:rotate-[-8deg]"
                >
                  <Icon
                    className="h-4 w-4 transition-transform duration-300 group-hover:scale-125"
                    strokeWidth={1.8}
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:col-span-8">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-cream-100/50">
                Explore
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-cream-100/80">
                <li>
                  <FooterLink href="/books">All books</FooterLink>
                </li>
                <li>
                  <FooterLink href="/categories">Categories</FooterLink>
                </li>
                <li>
                  <FooterLink href="/free-resources">Free resources</FooterLink>
                </li>
                <li>
                  <FooterLink href="/about">About us</FooterLink>
                </li>
                <li>
                  <FooterLink href="/contact">Contact</FooterLink>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-cream-100/50">
                Categories
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-cream-100/80">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <FooterLink href={`/categories/${c.slug}`}>
                      {c.name} Books
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-cream-100/10 pt-6 text-xs text-cream-100/50 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {brandName}. {copyright}
          </span>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="transition-colors hover:text-gold-300">
              Privacy policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-gold-300">
              Terms and conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 transition-colors hover:text-gold-300"
    >
      {children}
      <ArrowUpRight
        className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
        strokeWidth={2}
      />
    </Link>
  );
}
