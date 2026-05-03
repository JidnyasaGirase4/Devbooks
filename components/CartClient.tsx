"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  Truck,
  ShieldCheck,
  ChevronLeft,
  Check,
  Sparkles,
  Mail,
} from "lucide-react";
import type { Book } from "@/lib/data";

export default function CartClient({
  initialBooks,
  settings = {},
}: {
  initialBooks: Book[];
  settings?: Record<string, string>;
}) {
  const t = (key: string, fallback: string) => settings[key] || fallback;
  const [items, setItems] = useState(
    initialBooks.map((b) => ({ ...b, qty: 1 }))
  );
  const [promo, setPromo] = useState("");
  const [placed, setPlaced] = useState<null | {
    orderId: string;
    total: number;
    count: number;
  }>(null);

  const inc = (id: string) =>
    setItems((s) =>
      s.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it))
    );
  const dec = (id: string) =>
    setItems((s) =>
      s.map((it) =>
        it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it
      )
    );
  const remove = (id: string) =>
    setItems((s) => s.filter((it) => it.id !== id));

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = subtotal > 0 && subtotal < 50 ? 6 : 0;
  const total = subtotal + shipping;

  const onCheckout = () => {
    if (items.length === 0) return;
    const orderId = `DB-${Math.floor(Math.random() * 90000) + 10000}`;
    const count = items.reduce((s, it) => s + it.qty, 0);
    setPlaced({ orderId, total, count });
    setItems([]);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-ink-900/10 bg-cream-50 p-10 text-center shadow-xl shadow-ink-900/10"
        >
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gold-300/30 blur-3xl" />

          <div className="relative">
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: "backOut" }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-500/30"
            >
              <Check className="h-10 w-10" strokeWidth={2.5} />
            </motion.div>

            <span className="eyebrow mt-6 inline-flex">
              <Sparkles className="h-3 w-3 text-gold-500 animate-twinkle" />
              {t("cart.success_eyebrow", "Order placed")}
            </span>

            <h1 className="display mt-4 text-4xl text-ink-900 sm:text-5xl">
              {t("cart.success_title", "Thanks for the read!")}
            </h1>
            <p className="mx-auto mt-3 max-w-md text-ink-700/80">
              {t(
                "cart.success_body",
                "Your order is on its way. We just sent a confirmation to your inbox — check your spam if it isn't there in a minute."
              )}
            </p>

            <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3">
              <SummaryStat label="Order #" value={placed.orderId} />
              <SummaryStat
                label="Items"
                value={`${placed.count}`}
              />
              <SummaryStat
                label="Total"
                value={`Rs ${placed.total.toFixed(2)}`}
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={t("cart.success_cta_href", "/books")}
                className="btn-primary"
              >
                {t("cart.success_cta", "Keep browsing")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={() => setPlaced(null)}
                className="btn-outline"
              >
                <Mail className="h-4 w-4" strokeWidth={1.8} />
                {t("cart.success_secondary", "View receipt")}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <Link
            href="/books"
            className="inline-flex items-center gap-1 text-sm font-medium text-ink-700 hover:text-brand-700"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            {t("cart.continue_shopping", "Continue shopping")}
          </Link>
          <h1 className="display mt-3 text-3xl text-ink-900 sm:text-5xl">
            {t("cart.title", "Your cart")}
          </h1>
          <p className="mt-1 text-ink-700/70">
            {items.length === 0
              ? t("cart.empty_title", "Your bookshelf is empty for now.")
              : `${items.length} ${items.length === 1 ? "book" : "books"} ready to ship.`}
          </p>
        </div>
        <ShoppingBag className="hidden h-12 w-12 text-ink-900/15 sm:block" strokeWidth={1.5} />
      </div>

      {items.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-dashed border-ink-900/15 bg-cream-50 p-16 text-center">
          <div className="display text-2xl text-ink-900">Nothing here yet.</div>
          <p className="mt-2 text-sm text-ink-700/70">
            {t(
              "cart.empty_body",
              "Browse the library and add a few reads to get started."
            )}
          </p>
          <Link href="/books" className="btn-primary mt-6 inline-flex">
            {t("cart.empty_cta", "Browse the library")}{" "}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <ul className="space-y-4 lg:col-span-8">
            {items.map((it, i) => (
              <motion.li
                key={it.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="card grid grid-cols-[auto_1fr] items-start gap-4 p-4 sm:flex sm:items-center sm:gap-5 sm:p-5"
              >
                <div className="relative h-28 w-20 flex-none overflow-hidden rounded-xl shadow-md ring-1 ring-ink-900/10">
                  {it.coverImage ? (
                    <Image
                      src={it.coverImage}
                      alt={it.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className={`flex h-full w-full items-end bg-gradient-to-br ${it.cover} p-2 text-white`}
                    >
                      <div className="display text-[10px] font-semibold leading-tight">
                        {it.title}
                      </div>
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-700/60">
                        {it.level}
                      </div>
                      <h3 className="display mt-0.5 line-clamp-2 text-base font-semibold text-ink-900 sm:text-lg">
                        {it.title}
                      </h3>
                      <div className="text-xs text-ink-700/60">by {it.author}</div>
                    </div>
                    <div className="flex-none text-right sm:hidden">
                      <div className="display text-base font-semibold text-ink-900">
                        {it.price === 0 ? "Free" : `Rs ${(it.price * it.qty).toFixed(2)}`}
                      </div>
                      {it.oldPrice && (
                        <div className="text-[11px] text-ink-700/40 line-through">
                          Rs {(it.oldPrice * it.qty).toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-1 rounded-full bg-ink-900/5 p-1">
                      <button
                        type="button"
                        onClick={() => dec(it.id)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full text-ink-800 transition-colors hover:bg-ink-900 hover:text-cream-50"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" strokeWidth={2} />
                      </button>
                      <span className="min-w-6 text-center text-sm font-semibold">
                        {it.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => inc(it.id)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full text-ink-800 transition-colors hover:bg-ink-900 hover:text-cream-50"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(it.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-ink-700/60 transition-colors hover:text-rose-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
                      Remove
                    </button>
                  </div>
                </div>

                <div className="hidden text-right sm:block">
                  <div className="display text-xl font-semibold text-ink-900">
                    {it.price === 0 ? "Free" : `Rs ${(it.price * it.qty).toFixed(2)}`}
                  </div>
                  {it.oldPrice && (
                    <div className="text-xs text-ink-700/40 line-through">
                      Rs {(it.oldPrice * it.qty).toFixed(2)}
                    </div>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>

          <aside className="lg:col-span-4">
            <div className="card sticky top-24 overflow-hidden p-6">
              <h2 className="display text-2xl font-semibold text-ink-900">
                {t("cart.summary_title", "Order summary")}
              </h2>

              <div className="mt-5 space-y-3 text-sm">
                <Row
                  label={t("cart.subtotal_label", "Subtotal")}
                  value={`Rs ${subtotal.toFixed(2)}`}
                />
                <Row
                  label={t("cart.shipping_label", "Shipping")}
                  value={shipping === 0 ? "Free" : `Rs ${shipping.toFixed(2)}`}
                  hint={
                    subtotal < 50
                      ? t("cart.shipping_free_hint", "Free over Rs 50")
                      : undefined
                  }
                />
                <div className="my-3 h-px bg-ink-900/10" />
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-ink-700">
                    {t("cart.total_label", "Total")}
                  </span>
                  <span className="display text-2xl font-semibold text-ink-900">
                    Rs {total.toFixed(2)}
                  </span>
                </div>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-5 flex items-center gap-2 rounded-full border border-ink-900/10 bg-cream-50 px-4 py-2"
              >
                <Tag className="h-4 w-4 text-ink-700/50" strokeWidth={1.8} />
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder={t("cart.promo_placeholder", "Promo code")}
                  className="flex-1 bg-transparent text-sm text-ink-900 placeholder:text-ink-700/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="text-xs font-semibold text-brand-700 hover:text-brand-900"
                >
                  {t("cart.promo_button", "Apply")}
                </button>
              </form>

              <button
                type="button"
                onClick={onCheckout}
                className="btn-primary mt-5 w-full !py-3"
              >
                {t("cart.checkout_button", "Checkout")}
                <ArrowRight className="h-4 w-4" />
              </button>

              <ul className="mt-5 space-y-2 text-xs text-ink-700/70">
                <li className="group flex items-center gap-2">
                  <Truck className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-700" strokeWidth={1.8} />
                  {t("cart.trust1", "Worldwide shipping in 2–6 days")}
                </li>
                <li className="group flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-125 group-hover:text-brand-700" strokeWidth={1.8} />
                  {t("cart.trust2", "30-day money-back guarantee")}
                </li>
              </ul>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-700/70">
        {label}
        {hint && (
          <span className="ml-2 text-[10px] uppercase tracking-wider text-ink-700/50">
            {hint}
          </span>
        )}
      </span>
      <span className="font-semibold text-ink-900">{value}</span>
    </div>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ink-900/10 bg-cream-50 p-3 text-center">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-700/60">
        {label}
      </div>
      <div className="display mt-1 truncate text-sm font-semibold text-ink-900">
        {value}
      </div>
    </div>
  );
}
