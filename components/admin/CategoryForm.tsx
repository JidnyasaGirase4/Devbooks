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
} from "lucide-react";
import type { CategoryFormState } from "@/lib/actions";

const initial: CategoryFormState = {};

export type CategoryFormDefaults = {
  slug?: string;
  name?: string;
  tagline?: string | null;
  description?: string | null;
  emoji?: string | null;
  image?: string | null;
  accent?: string | null;
  count?: number;
  display_order?: number;
};

export default function CategoryForm({
  action,
  defaults,
  submitLabel = "Save",
  title,
  subtitle,
}: {
  action: (
    prev: CategoryFormState,
    formData: FormData
  ) => Promise<CategoryFormState>;
  defaults?: CategoryFormDefaults;
  submitLabel?: string;
  title: string;
  subtitle?: string;
}) {
  const [state, formAction] = useFormState(action, initial);
  const fieldErrors = state.fieldErrors ?? {};

  return (
    <div>
      <Link
        href="/admin/categories"
        className="inline-flex items-center gap-1 text-sm font-medium text-ink-700 hover:text-brand-700"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={2} />
        Back to categories
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
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-300/20 blur-3xl" />
        <div className="relative grid gap-5 sm:grid-cols-2">
          <Field
            label="Slug"
            hint="Used in /categories/[slug] URLs."
            error={fieldErrors.slug}
          >
            <input
              required
              name="slug"
              defaultValue={defaults?.slug}
              placeholder="python"
              className="input font-mono lowercase"
              maxLength={50}
            />
          </Field>

          <Field label="Name" error={fieldErrors.name}>
            <input
              required
              name="name"
              defaultValue={defaults?.name}
              placeholder="Python"
              className="input"
              maxLength={100}
            />
          </Field>

          <Field label="Tagline" hint="One short line." error={fieldErrors.tagline}>
            <input
              name="tagline"
              defaultValue={defaults?.tagline ?? ""}
              placeholder="From basics to ML & data science"
              className="input"
              maxLength={200}
            />
          </Field>

          <Field
            label="Emoji"
            hint="Single character/emoji shown on cards."
            error={fieldErrors.emoji}
          >
            <input
              name="emoji"
              defaultValue={defaults?.emoji ?? ""}
              placeholder="🐍"
              className="input"
              maxLength={4}
            />
          </Field>

          <Field
            label="Display order"
            hint="Lower = first."
            error={fieldErrors.display_order}
          >
            <input
              name="display_order"
              type="number"
              defaultValue={defaults?.display_order ?? 0}
              className="input"
              inputMode="numeric"
            />
          </Field>

          <Field
            label="Book count (display)"
            hint="Shown as label on category cards."
            error={fieldErrors.count}
          >
            <input
              name="count"
              type="number"
              min="0"
              defaultValue={defaults?.count ?? 0}
              className="input"
              inputMode="numeric"
            />
          </Field>

          <Field
            label="Accent gradient"
            hint="Tailwind classes, e.g. from-emerald-500 to-teal-600"
            error={fieldErrors.accent}
            className="sm:col-span-2"
          >
            <input
              name="accent"
              defaultValue={defaults?.accent ?? ""}
              placeholder="from-emerald-500 to-teal-600"
              className="input font-mono"
            />
          </Field>

          <Field
            label="Hero image URL"
            hint="Unsplash or local /image path."
            error={fieldErrors.image}
            className="sm:col-span-2"
          >
            <input
              name="image"
              type="url"
              defaultValue={defaults?.image ?? ""}
              placeholder="https://images.unsplash.com/…"
              className="input"
            />
          </Field>

          <Field
            label="Description"
            error={fieldErrors.description}
            className="sm:col-span-2"
          >
            <textarea
              name="description"
              defaultValue={defaults?.description ?? ""}
              rows={4}
              placeholder="Master Python from first script to production…"
              className="input resize-none"
              maxLength={1000}
            />
          </Field>
        </div>

        <AnimatePresence>
          {state.error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 flex items-center gap-2 rounded-xl border border-rose-300/60 bg-rose-50 px-4 py-2.5 text-sm font-medium text-rose-800"
            >
              <AlertCircle className="h-4 w-4 flex-none" strokeWidth={2} />
              {state.error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-end gap-2">
          <Link href="/admin/categories" className="btn-outline">
            Cancel
          </Link>
          <SubmitButton label={submitLabel} />
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  hint,
  error,
  className = "",
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
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
