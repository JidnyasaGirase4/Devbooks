"use client";

import { useFormState, useFormStatus } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Save, AlertCircle } from "lucide-react";
import {
  updateSettingsAction,
  type SettingsFormState,
} from "@/lib/actions";
import type { Setting } from "@/lib/queries";

const initial: SettingsFormState = {};

const GROUP_LABELS: Record<string, { title: string; subtitle: string }> = {
  hero: {
    title: "Homepage hero",
    subtitle: "The big section at the top of the homepage.",
  },
  brand: { title: "Brand", subtitle: "Site name and one-line tagline." },
  contact: {
    title: "Contact info",
    subtitle: "Used on the contact page and footer.",
  },
  newsletter: {
    title: "Newsletter",
    subtitle: "Title and subtitle for the newsletter card in the footer.",
  },
  sections: {
    title: "Section toggles",
    subtitle: "Type yes/no to show or hide homepage sections.",
  },
};

export default function SettingsForm({
  groups,
}: {
  groups: Record<string, Setting[]>;
}) {
  const [state, formAction] = useFormState(updateSettingsAction, initial);

  const orderedGroupKeys = [
    "hero",
    "brand",
    "contact",
    "newsletter",
    "sections",
  ].filter((g) => groups[g]?.length);

  return (
    <form action={formAction} className="mt-8 space-y-6">
      {orderedGroupKeys.map((groupKey) => {
        const items = groups[groupKey];
        const meta = GROUP_LABELS[groupKey] ?? {
          title: groupKey,
          subtitle: "",
        };
        return (
          <section
            key={groupKey}
            className="rounded-3xl border border-ink-900/10 bg-cream-50 p-6 shadow-sm sm:p-8"
          >
            <h2 className="display text-lg font-semibold">{meta.title}</h2>
            {meta.subtitle && (
              <p className="text-xs text-ink-700/60">{meta.subtitle}</p>
            )}
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {items.map((s) => (
                <SettingField key={s.key} setting={s} />
              ))}
            </div>
          </section>
        );
      })}

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

      <div className="flex items-center justify-end">
        <SubmitButton />
      </div>
    </form>
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
          Save all settings
        </>
      )}
    </button>
  );
}
