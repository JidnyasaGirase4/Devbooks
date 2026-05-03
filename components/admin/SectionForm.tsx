"use client";

import { useFormState, useFormStatus } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Save, AlertCircle } from "lucide-react";
import Link from "next/link";
import type { SectionFormState } from "@/lib/actions";
import { getSectionMeta } from "@/lib/sections";

const initial: SectionFormState = {};

export type SectionFormDefaults = {
  is_active?: boolean;
  content?: Record<string, unknown>;
};

export default function SectionForm({
  action,
  type,
  pageSlug,
  pageTitle,
  submitLabel,
  defaults,
}: {
  action: (
    prev: SectionFormState,
    formData: FormData
  ) => Promise<SectionFormState>;
  type: string;
  pageSlug: string;
  pageTitle: string;
  submitLabel: string;
  defaults?: SectionFormDefaults;
}) {
  const [state, formAction] = useFormState(action, initial);
  const meta = getSectionMeta(type);
  const c = defaults?.content ?? {};
  const items = (c.items as unknown[]) ?? [];

  return (
    <div>
      <Link
        href={`/admin/pages/${pageSlug}/sections`}
        className="text-sm font-medium text-ink-700 hover:text-brand-700"
      >
        ← Back to {pageTitle} sections
      </Link>
      <div className="mt-3">
        <span className="eyebrow inline-flex">
          {meta?.label ?? type}
        </span>
        <h1 className="display mt-2 text-3xl font-semibold sm:text-4xl">
          {submitLabel.toLowerCase().includes("create")
            ? `New ${meta?.label ?? "section"}`
            : `Edit ${meta?.label ?? "section"}`}
        </h1>
        {meta?.description && (
          <p className="mt-1 text-sm text-ink-700/70">{meta.description}</p>
        )}
      </div>

      <form
        action={formAction}
        className="mt-8 rounded-3xl border border-ink-900/10 bg-cream-50 p-6 shadow-sm sm:p-8"
        noValidate
      >
        <input type="hidden" name="type" value={type} />

        {/* Render fields based on type */}
        {type === "hero" && (
          <Grid>
            <Field label="Eyebrow" full>
              <input name="eyebrow" defaultValue={str(c.eyebrow)} className="input" />
            </Field>
            <Field label="Title" full>
              <input required name="title" defaultValue={str(c.title)} className="input" />
            </Field>
            <Field label="Subtitle" full>
              <textarea name="subtitle" defaultValue={str(c.subtitle)} rows={3} className="input resize-none" />
            </Field>
            <Field label="Primary CTA label">
              <input name="ctaLabel" defaultValue={str(c.ctaLabel)} className="input" />
            </Field>
            <Field label="Primary CTA link">
              <input name="ctaHref" defaultValue={str(c.ctaHref)} className="input" placeholder="/books" />
            </Field>
            <Field label="Secondary CTA label">
              <input name="secondaryLabel" defaultValue={str(c.secondaryLabel)} className="input" />
            </Field>
            <Field label="Secondary CTA link">
              <input name="secondaryHref" defaultValue={str(c.secondaryHref)} className="input" />
            </Field>
          </Grid>
        )}

        {type === "stats_strip" && (
          <Grid>
            <Field
              label="Items"
              hint="A JSON array. Each item needs value + label."
              full
            >
              <textarea
                name="items_json"
                rows={10}
                defaultValue={JSON.stringify(items, null, 2) || `[
  { "value": "500+", "label": "Books" },
  { "value": "120K", "label": "Readers" },
  { "value": "4.9★", "label": "Rating" }
]`}
                className="input resize-y font-mono text-sm"
              />
            </Field>
          </Grid>
        )}

        {type === "feature_grid" && (
          <Grid>
            <Field label="Eyebrow">
              <input name="eyebrow" defaultValue={str(c.eyebrow)} className="input" />
            </Field>
            <Field label="Title">
              <input name="title" defaultValue={str(c.title)} className="input" />
            </Field>
            <Field label="Body" full>
              <textarea name="body" defaultValue={str(c.body)} rows={3} className="input resize-none" />
            </Field>
            <Field
              label="Items"
              hint='JSON array. icon = lucide name (Sparkles, BookMarked, Award, Globe, Heart, Users, Star).'
              full
            >
              <textarea
                name="items_json"
                rows={12}
                defaultValue={JSON.stringify(items, null, 2) || `[
  { "icon": "Sparkles", "title": "Feature one", "body": "What makes it great." },
  { "icon": "Heart", "title": "Feature two", "body": "What makes it great." }
]`}
                className="input resize-y font-mono text-sm"
              />
            </Field>
          </Grid>
        )}

        {type === "cta_panel" && (
          <Grid>
            <Field label="Eyebrow">
              <input name="eyebrow" defaultValue={str(c.eyebrow)} className="input" />
            </Field>
            <Field label="Title">
              <input required name="title" defaultValue={str(c.title)} className="input" />
            </Field>
            <Field label="Body" full>
              <textarea name="body" defaultValue={str(c.body)} rows={3} className="input resize-none" />
            </Field>
            <Field label="Primary CTA label">
              <input name="ctaLabel" defaultValue={str(c.ctaLabel)} className="input" />
            </Field>
            <Field label="Primary CTA link">
              <input name="ctaHref" defaultValue={str(c.ctaHref)} className="input" />
            </Field>
            <Field label="Secondary label">
              <input name="secondaryLabel" defaultValue={str(c.secondaryLabel)} className="input" />
            </Field>
            <Field label="Secondary link">
              <input name="secondaryHref" defaultValue={str(c.secondaryHref)} className="input" />
            </Field>
          </Grid>
        )}

        {type === "text_block" && (
          <Grid>
            <Field label="Eyebrow">
              <input name="eyebrow" defaultValue={str(c.eyebrow)} className="input" />
            </Field>
            <Field label="Align">
              <select name="align" defaultValue={str(c.align, "left")} className="input">
                <option value="left">Left</option>
                <option value="center">Centered</option>
              </select>
            </Field>
            <Field label="Title" full>
              <input name="title" defaultValue={str(c.title)} className="input" />
            </Field>
            <Field label="Body" full>
              <textarea name="body" defaultValue={str(c.body)} rows={6} className="input resize-y" />
            </Field>
          </Grid>
        )}

        {type === "image_block" && (
          <Grid>
            <Field label="Image URL" hint="Upload via /admin/media and paste URL." full>
              <input required name="src" defaultValue={str(c.src)} className="input" />
            </Field>
            <Field label="Alt text">
              <input name="alt" defaultValue={str(c.alt)} className="input" />
            </Field>
            <Field label="Caption">
              <input name="caption" defaultValue={str(c.caption)} className="input" />
            </Field>
          </Grid>
        )}

        {type === "quote_block" && (
          <Grid>
            <Field label="Quote" full>
              <textarea required name="quote" defaultValue={str(c.quote)} rows={4} className="input resize-none" />
            </Field>
            <Field label="Author">
              <input name="author" defaultValue={str(c.author)} className="input" />
            </Field>
            <Field label="Role">
              <input name="role" defaultValue={str(c.role)} className="input" />
            </Field>
          </Grid>
        )}

        {type === "banner_slider" && (
          <p className="rounded-2xl bg-ink-900/5 p-4 text-sm text-ink-700/80">
            This section pulls active banners from{" "}
            <Link href="/admin/banners" className="font-semibold text-brand-700">
              /admin/banners
            </Link>
            . No content fields needed.
          </p>
        )}

        {(type === "categories_grid" ||
          type === "featured_books" ||
          type === "testimonials_grid" ||
          type === "team_grid" ||
          type === "resources_grid") && (
          <Grid>
            <Field label="Eyebrow">
              <input name="eyebrow" defaultValue={str(c.eyebrow)} className="input" />
            </Field>
            <Field label="Title">
              <input name="title" defaultValue={str(c.title)} className="input" />
            </Field>
            <Field label="Subtitle" full>
              <textarea name="subtitle" defaultValue={str(c.subtitle)} rows={2} className="input resize-none" />
            </Field>
            {type === "featured_books" && (
              <Field label="How many books to show">
                <input name="limit" type="number" min={1} max={20} defaultValue={Number(c.limit) || 8} className="input" />
              </Field>
            )}
            <Field label="See-all link label">
              <input name="ctaLabel" defaultValue={str(c.ctaLabel)} className="input" />
            </Field>
            <Field label="See-all link href">
              <input name="ctaHref" defaultValue={str(c.ctaHref)} className="input" />
            </Field>
          </Grid>
        )}

        <label className="mt-6 flex items-center gap-2 text-sm text-ink-700/80">
          <input
            type="checkbox"
            name="is_active"
            defaultChecked={defaults?.is_active ?? true}
            className="h-4 w-4 rounded border-ink-900/20 text-brand-700"
          />
          Active (shown on the public page)
        </label>

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
          <Link href={`/admin/pages/${pageSlug}/sections`} className="btn-outline">
            Cancel
          </Link>
          <SubmitButton label={submitLabel} />
        </div>
      </form>
    </div>
  );
}

const str = (v: unknown, fallback = ""): string =>
  typeof v === "string" ? v : fallback;

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
}

function Field({
  label,
  hint,
  full,
  children,
}: {
  label: string;
  hint?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-700/70">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-700/60">{hint}</span>}
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
