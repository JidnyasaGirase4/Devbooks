"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Loader2, AlertCircle, X, ImagePlus } from "lucide-react";
import { uploadMediaAction, type MediaFormState } from "@/lib/actions";

const initial: MediaFormState = {};

export default function MediaUploader() {
  const [state, formAction] = useFormState(uploadMediaAction, initial);
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);

  const onPick = (file: File | null) => {
    if (preview) URL.revokeObjectURL(preview);
    if (!file) {
      setPreview(null);
      setFilename(null);
      return;
    }
    setFilename(file.name);
    setPreview(URL.createObjectURL(file));
  };

  const reset = () => {
    if (inputRef.current) inputRef.current.value = "";
    onPick(null);
  };

  return (
    <form
      action={formAction}
      className="rounded-3xl border border-ink-900/10 bg-cream-50 p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <label
          className="group relative flex aspect-[16/10] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-ink-900/15 bg-cream-100/40 text-center transition-colors hover:border-brand-500 hover:bg-brand-50/40 lg:col-span-6"
        >
          <input
            ref={inputRef}
            name="file"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
            className="sr-only"
            onChange={(e) => onPick(e.target.files?.[0] ?? null)}
          />
          {preview ? (
            <>
              <Image
                src={preview}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-3"
                unoptimized
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  reset();
                }}
                aria-label="Clear"
                className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-cream-50 text-ink-800 shadow hover:bg-rose-600 hover:text-cream-50"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 px-6 text-ink-700/70">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                <ImagePlus className="h-5 w-5" strokeWidth={2} />
              </span>
              <div className="display text-base font-semibold text-ink-900">
                Drop an image, or click to browse
              </div>
              <p className="text-xs">PNG, JPG, WEBP, GIF or SVG · max 5 MB</p>
            </div>
          )}
        </label>

        <div className="space-y-4 lg:col-span-6">
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-700/70">
              Alt text
            </span>
            <input
              name="alt"
              placeholder="Describe what's in the image (helps accessibility & SEO)"
              className="input"
              maxLength={200}
            />
          </label>

          {filename && (
            <div className="rounded-2xl bg-ink-900/5 px-4 py-3 text-xs text-ink-700/80">
              <div className="font-semibold text-ink-900">Selected file</div>
              <div className="mt-0.5 truncate font-mono">{filename}</div>
            </div>
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

          <div className="flex items-center justify-end gap-2">
            <button type="button" onClick={reset} className="btn-outline">
              Clear
            </button>
            <SubmitButton hasFile={!!preview} />
          </div>
        </div>
      </div>
    </form>
  );
}

function SubmitButton({ hasFile }: { hasFile: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || !hasFile}
      className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Uploading…
        </>
      ) : (
        <>
          <Upload className="h-4 w-4" strokeWidth={2} />
          Upload image
        </>
      )}
    </button>
  );
}
