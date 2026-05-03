"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Loader2, X, AlertTriangle } from "lucide-react";

export default function ConfirmDeleteButton({
  action,
  hiddenFields,
  itemLabel,
  buttonLabel = "Delete",
  size = "default",
}: {
  /** Server action that takes FormData and deletes the item */
  action: (formData: FormData) => void | Promise<void>;
  /** Form fields to send (e.g. { id: "5" } or { slug: "py-crash" }) */
  hiddenFields: Record<string, string | number>;
  /** Friendly label like "the testimonial from Maya R." */
  itemLabel: string;
  /** Trigger button text */
  buttonLabel?: string;
  size?: "default" | "small";
}) {
  const [open, setOpen] = useState(false);

  const triggerClasses =
    size === "small"
      ? "inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 text-rose-700 transition-colors hover:bg-rose-600 hover:text-cream-50"
      : "inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-600 hover:text-cream-50";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClasses}
        aria-label={buttonLabel}
        title={buttonLabel}
      >
        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.8} />
        {size !== "small" && buttonLabel}
      </button>

      <AnimatePresence>
        {open && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-ink-900/10 bg-cream-50 p-6 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-700/60 hover:bg-ink-900/5"
              >
                <X className="h-4 w-4" />
              </button>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
                <AlertTriangle className="h-5 w-5" strokeWidth={2} />
              </span>
              <h2 className="display mt-4 text-xl font-semibold">
                Delete this item?
              </h2>
              <p className="mt-1 text-sm text-ink-700/80">
                You're about to delete{" "}
                <span className="font-semibold text-ink-900">{itemLabel}</span>.
                This can't be undone.
              </p>

              <div className="mt-6 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <form action={action}>
                  {Object.entries(hiddenFields).map(([k, v]) => (
                    <input key={k} type="hidden" name={k} value={String(v)} />
                  ))}
                  <Confirm />
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function Confirm() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-5 py-2.5 text-sm font-semibold text-cream-50 shadow-md hover:-translate-y-0.5 hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-80"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Deleting…
        </>
      ) : (
        <>
          <Trash2 className="h-4 w-4" />
          Delete
        </>
      )}
    </button>
  );
}
