"use client";

import { useState } from "react";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Loader2,
  X,
  AlertTriangle,
  Copy,
  Check,
} from "lucide-react";
import { deleteMediaAction } from "@/lib/actions";
import type { Media } from "@/lib/queries";

export default function MediaCard({ item }: { item: Media }) {
  const [copied, setCopied] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(item.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const sizeKb = item.size_bytes
    ? `${(item.size_bytes / 1024).toFixed(0)} KB`
    : "—";

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-2xl border border-ink-900/10 bg-cream-50 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
        <div className="relative aspect-[4/3] bg-cream-100">
          <Image
            src={item.url}
            alt={item.alt ?? ""}
            fill
            sizes="(max-width: 768px) 50vw, 200px"
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-3">
          <div className="min-w-0">
            <div className="truncate text-xs font-semibold text-ink-900">
              {item.filename}
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-700/60">
              {sizeKb}
              {item.mime_type ? ` · ${item.mime_type.split("/")[1]}` : ""}
            </div>
          </div>
          <div className="mt-auto flex items-center gap-1">
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex flex-1 items-center justify-center gap-1 rounded-full bg-ink-900/5 px-2 py-1 text-[11px] font-semibold text-ink-800 transition-colors hover:bg-ink-900 hover:text-cream-50"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" strokeWidth={2.4} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" strokeWidth={2} />
                  Copy URL
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setConfirm(true)}
              aria-label="Delete"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 text-rose-700 transition-colors hover:bg-rose-600 hover:text-cream-50"
            >
              <Trash2 className="h-3 w-3" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </article>

      <AnimatePresence>
        {confirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirm(false)}
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
                aria-label="Close"
                onClick={() => setConfirm(false)}
                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-700/60 hover:bg-ink-900/5"
              >
                <X className="h-4 w-4" />
              </button>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
                <AlertTriangle className="h-5 w-5" strokeWidth={2} />
              </span>
              <h2 className="display mt-4 text-xl font-semibold">
                Delete this file?
              </h2>
              <p className="mt-1 text-sm text-ink-700/80">
                <span className="font-semibold text-ink-900">
                  {item.filename}
                </span>{" "}
                will be removed from disk. Anything pointing at this URL will
                stop loading.
              </p>
              <div className="mt-6 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setConfirm(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <form action={deleteMediaAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <ConfirmButton />
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function ConfirmButton() {
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
          Delete file
        </>
      )}
    </button>
  );
}
