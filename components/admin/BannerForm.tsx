"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  AlertCircle,
  Save,
  ChevronLeft,
  GalleryHorizontal,
} from "lucide-react";
import type { BannerFormState } from "@/lib/actions";

const initial: BannerFormState = {};

export type BannerFormDefaults = {
  title?: string;
  subtitle?: string | null;
  image_url?: string | null;
  link_url?: string | null;
  link_label?: string | null;
  display_order?: number;
  is_active?: boolean;
};

export default function BannerForm({
  action,
  defaults,
  submitLabel = "Save",
  title,
  subtitle,
}: {
  action: (
    prev: BannerFormState,
    formData: FormData
  ) => Promise<BannerFormState>;
  defaults?: BannerFormDefaults;
  submitLabel?: string;
  title: string;
  subtitle?: string;
}) {
  const [state, formAction] = useFormState(action, initial);
  const [imageUrl, setImageUrl] = useState(defaults?.image_url ?? "");
  const fe = state.fieldErrors ?? {};

  return (
    <div>
      <Link
        href="/admin/banners"
        className="inline-flex items-center gap-1 text-sm font-medium text-ink-700 hover:text-brand-700"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={2} />
        Back to banners
      </Link>
      <div className="mt-3">
        <span className="eyebrow inline-flex">
          <GalleryHorizontal
            className="h-3 w-3 text-brand-700"
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
        <div className="relative grid gap-5 lg:grid-cols-2">
          <div className="space-y-5">
            <Field label="Title" error={fe.title}>
              <input
                required
                name="title"
                defaultValue={defaults?.title}
                className="input"
                placeholder="Spring 2026 collection"
                maxLength={200}
              />
            </Field>
            <Field
              label="Subtitle"
              hint="Short pitch shown under the title."
              error={fe.subtitle}
            >
              <textarea
                name="subtitle"
                defaultValue={defaults?.subtitle ?? ""}
                rows={3}
                className="input resize-none"
                maxLength={500}
              />
            </Field>
            <Field
              label="Image URL"
              hint="Paste a URL or pick from /admin/media."
              error={fe.image_url}
            >
              <input
                name="image_url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="/uploads/2026-collection.jpg"
                className="input"
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Link URL"
                hint="Where the CTA button goes."
                error={fe.link_url}
              >
                <input
                  name="link_url"
                  defaultValue={defaults?.link_url ?? ""}
                  placeholder="/books"
                  className="input"
                />
              </Field>
              <Field label="Link label" error={fe.link_label}>
                <input
                  name="link_label"
                  defaultValue={defaults?.link_label ?? ""}
                  placeholder="Browse new arrivals"
                  className="input"
                  maxLength={80}
                />
              </Field>
              <Field
                label="Display order"
                hint="Lower = first."
                error={fe.display_order}
              >
                <input
                  name="display_order"
                  type="number"
                  defaultValue={defaults?.display_order ?? 0}
                  className="input"
                  inputMode="numeric"
                />
              </Field>
              <label className="flex items-center gap-2 self-end pb-2 text-sm text-ink-700/80">
                <input
                  type="checkbox"
                  name="is_active"
                  defaultChecked={defaults?.is_active ?? true}
                  className="h-4 w-4 rounded border-ink-900/20 text-brand-700"
                />
                Active (shown on site)
              </label>
            </div>
          </div>

          <div>
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-700/70">
              Live preview
            </span>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-ink-900/10 bg-cream-100">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-ink-700/50">
                  No image yet
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-cream-50">
                <div className="display text-lg font-semibold drop-shadow">
                  {defaults?.title ?? "Banner title"}
                </div>
              </div>
            </div>
            <p className="mt-2 text-xs text-ink-700/60">
              Tip — upload your image first in{" "}
              <Link
                href="/admin/media"
                className="font-semibold text-brand-700 hover:text-brand-900"
              >
                Media
              </Link>
              , copy the URL, then paste it here.
            </p>
          </div>
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
          <Link href="/admin/banners" className="btn-outline">
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
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
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
