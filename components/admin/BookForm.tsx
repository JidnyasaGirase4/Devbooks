"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  AlertCircle,
  Save,
  ChevronLeft,
  Sparkles,
  IndianRupee,
} from "lucide-react";
import type { BookFormState } from "@/lib/actions";
import type { Category } from "@/lib/data";

const initial: BookFormState = {};

export type BookFormDefaults = {
  slug?: string;
  title?: string;
  author?: string;
  category?: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  price?: number;
  oldPrice?: number;
  rating?: number;
  reviews?: number;
  cover?: string;
  coverImage?: string;
  badge?: "Bestseller" | "New" | "Free";
  description?: string;
  display_order?: number;
};

export default function BookForm({
  action,
  defaults,
  categories,
  submitLabel = "Save",
  title,
  subtitle,
}: {
  action: (
    prev: BookFormState,
    formData: FormData
  ) => Promise<BookFormState>;
  defaults?: BookFormDefaults;
  categories: Category[];
  submitLabel?: string;
  title: string;
  subtitle?: string;
}) {
  const [state, formAction] = useFormState(action, initial);
  const fe = state.fieldErrors ?? {};

  return (
    <div>
      <Link
        href="/admin/books"
        className="inline-flex items-center gap-1 text-sm font-medium text-ink-700 hover:text-brand-700"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={2} />
        Back to books
      </Link>
      <div className="mt-3">
        <span className="eyebrow inline-flex">
          <Sparkles
            className="h-3 w-3 text-gold-500 animate-twinkle"
            strokeWidth={2}
          />
          {submitLabel.toLowerCase().includes("create") ? "New" : "Editing"}
        </span>
        <h1 className="display mt-2 text-3xl font-semibold sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-ink-700/70">{subtitle}</p>
        )}
      </div>

      <form
        action={formAction}
        className="relative mt-8 overflow-hidden rounded-3xl border border-ink-900/10 bg-cream-50 p-6 shadow-sm sm:p-8"
        noValidate
      >
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-300/15 blur-3xl" />

        <div className="relative space-y-8">
          <Section title="Basics">
            <Grid>
              <Field label="Slug" hint="Used in URLs." error={fe.slug}>
                <input
                  required
                  name="slug"
                  defaultValue={defaults?.slug}
                  className="input font-mono lowercase"
                  placeholder="py-crash"
                  maxLength={60}
                />
              </Field>
              <Field label="Title" error={fe.title}>
                <input
                  required
                  name="title"
                  defaultValue={defaults?.title}
                  className="input"
                  placeholder="The Python Book"
                  maxLength={200}
                />
              </Field>
              <Field label="Author" error={fe.author}>
                <input
                  required
                  name="author"
                  defaultValue={defaults?.author}
                  className="input"
                  placeholder="Eric Matthes"
                  maxLength={120}
                />
              </Field>
              <Field label="Category" error={fe.category_slug}>
                <select
                  required
                  name="category_slug"
                  defaultValue={defaults?.category ?? ""}
                  className="input"
                >
                  <option value="" disabled>
                    Choose a category…
                  </option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.emoji} {c.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Level" error={fe.level}>
                <select
                  name="level"
                  defaultValue={defaults?.level ?? "Beginner"}
                  className="input"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </Field>
              <Field label="Display order" error={fe.display_order}>
                <input
                  name="display_order"
                  type="number"
                  defaultValue={defaults?.display_order ?? 0}
                  className="input"
                  inputMode="numeric"
                />
              </Field>
            </Grid>
          </Section>

          <Section title="Pricing">
            <Grid>
              <Field label="Price (Rs)" error={fe.price}>
                <div className="relative">
                  <IndianRupee
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-700/50"
                    strokeWidth={1.8}
                  />
                  <input
                    required
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    defaultValue={defaults?.price ?? 0}
                    className="input pl-11"
                    inputMode="decimal"
                  />
                </div>
              </Field>
              <Field
                label="Old price (Rs)"
                hint="Optional — shows as strikethrough."
                error={fe.old_price}
              >
                <div className="relative">
                  <IndianRupee
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-700/50"
                    strokeWidth={1.8}
                  />
                  <input
                    name="old_price"
                    type="number"
                    step="0.01"
                    min="0"
                    defaultValue={defaults?.oldPrice ?? ""}
                    className="input pl-11"
                    inputMode="decimal"
                  />
                </div>
              </Field>
              <Field label="Rating (0–5)" error={fe.rating}>
                <input
                  name="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  defaultValue={defaults?.rating ?? 0}
                  className="input"
                  inputMode="decimal"
                />
              </Field>
              <Field label="Reviews count" error={fe.reviews}>
                <input
                  name="reviews"
                  type="number"
                  min="0"
                  defaultValue={defaults?.reviews ?? 0}
                  className="input"
                  inputMode="numeric"
                />
              </Field>
              <Field label="Badge" error={fe.badge}>
                <select
                  name="badge"
                  defaultValue={defaults?.badge ?? ""}
                  className="input"
                >
                  <option value="">No badge</option>
                  <option>Bestseller</option>
                  <option>New</option>
                  <option>Free</option>
                </select>
              </Field>
            </Grid>
          </Section>

          <Section title="Cover & description">
            <Grid>
              <Field
                label="Cover gradient"
                hint="Tailwind classes — used as fallback if no image."
                error={fe.cover}
                full
              >
                <input
                  name="cover"
                  defaultValue={defaults?.cover ?? ""}
                  className="input font-mono"
                  placeholder="from-emerald-600 to-teal-700"
                />
              </Field>
              <Field
                label="Cover image URL"
                hint="Local path like /books/py-crash.jpg or remote URL."
                error={fe.cover_image}
                full
              >
                <input
                  name="cover_image"
                  defaultValue={defaults?.coverImage ?? ""}
                  className="input"
                  placeholder="/books/py-crash.jpg"
                />
              </Field>
              <Field label="Description" error={fe.description} full>
                <textarea
                  name="description"
                  defaultValue={defaults?.description ?? ""}
                  rows={4}
                  className="input resize-none"
                  maxLength={1000}
                />
              </Field>
            </Grid>
          </Section>
        </div>

        <AnimatePresence>
          {state.error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 flex items-center gap-2 rounded-xl border border-rose-300/60 bg-rose-50 px-4 py-2.5 text-sm font-medium text-rose-800"
            >
              <AlertCircle className="h-4 w-4 flex-none" strokeWidth={2} />
              {state.error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-end gap-2">
          <Link href="/admin/books" className="btn-outline">
            Cancel
          </Link>
          <SubmitButton label={submitLabel} />
        </div>
      </form>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-700/60">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
}

function Field({
  label,
  hint,
  error,
  full,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-700/70">
        {label}
      </span>
      {children}
      {error ? (
        <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-rose-700">
          <AlertCircle className="h-3 w-3" strokeWidth={2} />
          {error}
        </span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-ink-700/60">{hint}</span>
      ) : null}
    </label>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary disabled:cursor-not-allowed disabled:opacity-80"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving…
        </>
      ) : (
        <>
          <Save className="h-4 w-4" strokeWidth={2} />
          {label}
        </>
      )}
    </button>
  );
}
