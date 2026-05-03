"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  AlertCircle,
  Save,
  ChevronLeft,
  GraduationCap,
} from "lucide-react";
import type { ResourceFormState } from "@/lib/actions";
import type { Category } from "@/lib/data";

const initial: ResourceFormState = {};

export type ResourceFormDefaults = {
  title?: string;
  description?: string | null;
  type?: "PDF" | "Cheatsheet" | "Course" | "Video";
  category_slug?: string | null;
  href?: string | null;
  display_order?: number;
  is_active?: boolean;
};

export default function ResourceForm({
  action,
  defaults,
  categories,
  submitLabel = "Save",
  title,
  subtitle,
}: {
  action: (
    prev: ResourceFormState,
    formData: FormData
  ) => Promise<ResourceFormState>;
  defaults?: ResourceFormDefaults;
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
        href="/admin/resources"
        className="inline-flex items-center gap-1 text-sm font-medium text-ink-700 hover:text-brand-700"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={2} />
        Back to resources
      </Link>
      <div className="mt-3">
        <span className="eyebrow inline-flex">
          <GraduationCap className="h-3 w-3 text-brand-700" strokeWidth={2} />
          {submitLabel.toLowerCase().includes("create") ? "New" : "Editing"}
        </span>
        <h1 className="display mt-2 text-3xl font-semibold sm:text-4xl">
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-ink-700/70">{subtitle}</p>}
      </div>

      <form
        action={formAction}
        className="mt-8 rounded-3xl border border-ink-900/10 bg-cream-50 p-6 shadow-sm sm:p-8"
        noValidate
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Title" error={fe.title} full>
            <input
              required
              name="title"
              defaultValue={defaults?.title ?? ""}
              className="input"
              placeholder="React Hooks Reference Card"
              maxLength={200}
            />
          </Field>
          <Field label="Type" error={fe.type}>
            <select
              name="type"
              defaultValue={defaults?.type ?? "PDF"}
              className="input"
            >
              <option>PDF</option>
              <option>Cheatsheet</option>
              <option>Course</option>
              <option>Video</option>
            </select>
          </Field>
          <Field label="Category" error={fe.category_slug}>
            <select
              name="category_slug"
              defaultValue={defaults?.category_slug ?? ""}
              className="input"
            >
              <option value="">No category</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.emoji} {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Link / URL" error={fe.href}>
            <input
              name="href"
              defaultValue={defaults?.href ?? ""}
              className="input"
              placeholder="https://… or /uploads/file.pdf"
            />
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
          <Field label="Description" error={fe.description} full>
            <textarea
              name="description"
              defaultValue={defaults?.description ?? ""}
              rows={3}
              className="input resize-none"
              maxLength={500}
            />
          </Field>
          <label className="flex items-center gap-2 text-sm text-ink-700/80 sm:col-span-2">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={defaults?.is_active ?? true}
              className="h-4 w-4 rounded border-ink-900/20 text-brand-700"
            />
            Active (shown on /free-resources)
          </label>
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
          <Link href="/admin/resources" className="btn-outline">
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
