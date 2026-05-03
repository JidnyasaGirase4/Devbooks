"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle, Save, ChevronLeft, Users } from "lucide-react";
import type { TeamFormState } from "@/lib/actions";

const initial: TeamFormState = {};

export type TeamFormDefaults = {
  name?: string;
  role?: string | null;
  bio?: string | null;
  initials?: string | null;
  accent?: string;
  display_order?: number;
  is_active?: boolean;
};

export default function TeamForm({
  action,
  defaults,
  submitLabel = "Save",
  title,
  subtitle,
}: {
  action: (
    prev: TeamFormState,
    formData: FormData
  ) => Promise<TeamFormState>;
  defaults?: TeamFormDefaults;
  submitLabel?: string;
  title: string;
  subtitle?: string;
}) {
  const [state, formAction] = useFormState(action, initial);
  const fe = state.fieldErrors ?? {};

  return (
    <div>
      <Link
        href="/admin/team"
        className="inline-flex items-center gap-1 text-sm font-medium text-ink-700 hover:text-brand-700"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={2} />
        Back to team
      </Link>
      <div className="mt-3">
        <span className="eyebrow inline-flex">
          <Users className="h-3 w-3 text-brand-700" strokeWidth={2} />
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
          <Field label="Name" error={fe.name}>
            <input
              required
              name="name"
              defaultValue={defaults?.name ?? ""}
              className="input"
              placeholder="Aarav Kapoor"
              maxLength={120}
            />
          </Field>
          <Field label="Role" error={fe.role}>
            <input
              name="role"
              defaultValue={defaults?.role ?? ""}
              className="input"
              placeholder="Founder · Backend"
              maxLength={120}
            />
          </Field>
          <Field
            label="Initials"
            hint="2-4 chars shown on the avatar circle."
            error={fe.initials}
          >
            <input
              name="initials"
              defaultValue={defaults?.initials ?? ""}
              className="input uppercase"
              placeholder="AK"
              maxLength={4}
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
          <Field
            label="Accent gradient"
            hint="Tailwind classes for the avatar."
            error={fe.accent}
          >
            <input
              name="accent"
              defaultValue={defaults?.accent ?? "from-brand-500 to-brand-700"}
              className="input font-mono"
            />
          </Field>
          <label className="flex items-center gap-2 self-end pb-2 text-sm text-ink-700/80">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={defaults?.is_active ?? true}
              className="h-4 w-4 rounded border-ink-900/20 text-brand-700"
            />
            Active (shown on the about page)
          </label>
          <Field label="Bio" error={fe.bio} className="sm:col-span-2">
            <textarea
              name="bio"
              defaultValue={defaults?.bio ?? ""}
              rows={3}
              className="input resize-none"
              placeholder="Built distributed systems at two unicorns…"
              maxLength={500}
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
          <Link href="/admin/team" className="btn-outline">
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
