"use client";

import { useFormState, useFormStatus } from "react-dom";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Save, AlertCircle, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import {
  updateSettingsAction,
  type SettingsFormState,
} from "@/lib/actions";
import type { Setting } from "@/lib/queries";

const initial: SettingsFormState = {};

export type GroupSection = {
  key: string;
  title: string;
  subtitle?: string;
};

export default function PageContentForm({
  pageTitle,
  pageSubtitle,
  publicHref,
  sections,
  groups,
}: {
  pageTitle: string;
  pageSubtitle?: string;
  publicHref?: string;
  sections: GroupSection[];
  groups: Record<string, Setting[]>;
}) {
  const [state, formAction] = useFormState(updateSettingsAction, initial);
  const pathname = usePathname() || "/admin/pages";
  const redirectTo = `${pathname}?status=saved`;

  // Filter to only sections that actually have settings
  const visibleSections = sections.filter((s) => groups[s.key]?.length);

  return (
    <div>
      <Link
        href="/admin/pages"
        className="inline-flex items-center gap-1 text-sm font-medium text-ink-700 hover:text-brand-700"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        All pages
      </Link>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow inline-flex">Page editor</span>
          <h1 className="display mt-2 text-3xl font-semibold sm:text-4xl">
            {pageTitle}
          </h1>
          {pageSubtitle && (
            <p className="mt-1 text-sm text-ink-700/70">{pageSubtitle}</p>
          )}
        </div>
        {publicHref && (
          <Link
            href={publicHref}
            target="_blank"
            className="btn-outline self-start text-xs"
          >
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.8} />
            View public page
          </Link>
        )}
      </div>

      <form action={formAction} className="mt-8 space-y-6">
        <input type="hidden" name="_redirect" value={redirectTo} />
        {visibleSections.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-ink-900/15 bg-cream-50 p-10 text-center text-sm text-ink-700/70">
            No editable content for this page yet.
          </div>
        ) : (
          visibleSections.map((section) => (
            <section
              key={section.key}
              className="rounded-3xl border border-ink-900/10 bg-cream-50 p-6 shadow-sm sm:p-8"
            >
              <h2 className="display text-lg font-semibold">{section.title}</h2>
              {section.subtitle && (
                <p className="text-xs text-ink-700/60">{section.subtitle}</p>
              )}
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {groups[section.key].map((s) => (
                  <SettingField key={s.key} setting={s} />
                ))}
              </div>
            </section>
          ))
        )}

        <AnimatePresence>
          {state.error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 rounded-xl border border-rose-300/60 bg-rose-50 px-4 py-2.5 text-sm font-medium text-rose-800"
            >
              <AlertCircle className="h-4 w-4 flex-none" strokeWidth={2} />
              {state.error}
            </motion.div>
          )}
        </AnimatePresence>

        {visibleSections.length > 0 && (
          <div className="flex items-center justify-end">
            <SubmitButton />
          </div>
        )}
      </form>
    </div>
  );
}

function SettingField({ setting }: { setting: Setting }) {
  const fullWidth = setting.kind === "textarea";
  const inputName = `settings[${setting.key}]`;

  return (
    <label className={`block ${fullWidth ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-700/70">
        <span>{setting.label ?? setting.key}</span>
        <code className="font-mono text-[10px] text-ink-700/40">
          {setting.key}
        </code>
      </span>
      {setting.kind === "textarea" ? (
        <textarea
          name={inputName}
          defaultValue={setting.value}
          rows={3}
          className="input resize-none"
        />
      ) : (
        <input
          name={inputName}
          type={
            setting.kind === "url"
              ? "url"
              : setting.kind === "email"
                ? "email"
                : setting.kind === "tel"
                  ? "tel"
                  : "text"
          }
          defaultValue={setting.value}
          className="input"
        />
      )}
    </label>
  );
}

function SubmitButton() {
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
          Save changes
        </>
      )}
    </button>
  );
}
