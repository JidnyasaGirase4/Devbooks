"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  BookOpen,
  Quote,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function LoginPageClient({
  settings = {},
}: {
  settings?: Record<string, string>;
}) {
  const t = (k: string, f: string) => settings[k] || f;
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "loading" }
    | { kind: "success" }
    | { kind: "error"; message: string }
  >({ kind: "idle" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status.kind === "loading" || status.kind === "success") return;

    const email = form.email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ kind: "error", message: "Please enter a valid email." });
      return;
    }
    if (form.password.length < 6) {
      setStatus({
        kind: "error",
        message: "Password must be at least 6 characters.",
      });
      return;
    }

    setStatus({ kind: "loading" });
    setTimeout(() => {
      setStatus({ kind: "success" });
      setTimeout(() => router.push("/"), 1100);
    }, 900);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex min-h-[640px] flex-col gap-8 lg:flex-row lg:items-stretch">
        {/* Decorative panel */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-ink-900 p-6 text-cream-50 sm:p-10 lg:w-5/12 lg:flex-none"
        >
          <div className="absolute inset-0 paper opacity-25" />
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-700/40 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-gold-500/25 blur-3xl" />

          <div className="relative flex h-full flex-col">
            <Link
              href="/"
              className="inline-flex items-center gap-3 self-start"
            >
              <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-cream-50 text-ink-900">
                <BookOpen className="h-5 w-5" strokeWidth={2.2} />
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-gold-500 ring-2 ring-ink-900" />
              </span>
              <span className="display text-xl text-cream-50">
                Dev<span className="text-gold-400">Books</span>
              </span>
            </Link>

            <div className="my-auto py-8">
              <Quote className="h-9 w-9 text-gold-400/60" strokeWidth={1.5} />
              <blockquote className="display mt-4 text-balance text-xl leading-snug sm:text-2xl">
                "
                {t(
                  "login.left_quote",
                  "DevBooks saves me hours of guessing what's worth reading. It's the only library I trust."
                )}
                "
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-700" />
                <div>
                  <div className="text-sm font-semibold">
                    {t("login.left_quote_author", "Maya R.")}
                  </div>
                  <div className="text-xs text-cream-100/60">
                    {t("login.left_quote_role", "Sr. Backend Engineer")}
                  </div>
                </div>
              </figcaption>
            </div>

            <div className="grid grid-cols-3 gap-3 border-t border-cream-100/10 pt-6">
              <Stat k="120K+" v="Readers" />
              <Stat k="500+" v="Books" />
              <Stat k="4.9★" v="Rating" />
            </div>
          </div>
        </motion.aside>

        {/* Form */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="relative overflow-hidden rounded-3xl border border-ink-900/10 bg-cream-50 p-6 shadow-xl shadow-ink-900/5 sm:p-10 lg:flex-1"
        >
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold-300/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-brand-300/25 blur-3xl" />

          <div className="relative mx-auto flex h-full max-w-md flex-col justify-center">
            <span className="eyebrow self-start">
              {t("login.eyebrow", "Welcome back")}
            </span>
            <h1 className="display mt-4 text-3xl text-ink-900 sm:text-4xl">
              {t("login.title", "Sign in to DevBooks.")}
            </h1>
            <p className="mt-2 text-ink-700/80">
              {t("login.subtitle_prefix", "New here?")}{" "}
              <Link
                href="/register"
                className="font-semibold text-brand-700 hover:text-brand-900"
              >
                {t("login.subtitle_link", "Create a free account →")}
              </Link>
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <Field label={t("login.username_label", "Email")}>
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-700/50"
                    strokeWidth={1.8}
                  />
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="ada@dev.com"
                    className="input pl-11"
                  />
                </div>
              </Field>

              <Field
                label={
                  <div className="flex items-center justify-between">
                    <span>{t("login.password_label", "Password")}</span>
                    <Link
                      href="#"
                      className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-700 hover:text-brand-900"
                    >
                      {t("login.forgot_link", "Forgot?")}
                    </Link>
                  </div>
                }
              >
                <div className="relative">
                  <Lock
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-700/50"
                    strokeWidth={1.8}
                  />
                  <input
                    required
                    type={show ? "text" : "password"}
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    placeholder="••••••••"
                    className="input px-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    aria-label={show ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-ink-700/60 transition-colors hover:bg-ink-900/5"
                  >
                    {show ? (
                      <EyeOff className="h-4 w-4" strokeWidth={1.8} />
                    ) : (
                      <Eye className="h-4 w-4" strokeWidth={1.8} />
                    )}
                  </button>
                </div>
              </Field>

              <label className="flex items-center gap-2 text-sm text-ink-700/80">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) =>
                    setForm({ ...form, remember: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-ink-900/20 text-brand-700 focus:ring-brand-500"
                />
                {t("login.remember_label", "Keep me signed in")}
              </label>

              <AnimatePresence>
                {status.kind === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-xl border border-rose-300/60 bg-rose-50 px-4 py-2.5 text-sm font-medium text-rose-800"
                  >
                    <AlertCircle className="h-4 w-4 flex-none" strokeWidth={2} />
                    {status.message}
                  </motion.div>
                )}
                {status.kind === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-xl border border-brand-300/60 bg-brand-50 px-4 py-2.5 text-sm font-medium text-brand-900"
                  >
                    <Check className="h-4 w-4 flex-none" strokeWidth={2.4} />
                    Signed in. Taking you home…
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={
                  status.kind === "loading" || status.kind === "success"
                }
                className="btn-primary mt-2 w-full !py-3 disabled:cursor-not-allowed disabled:opacity-80"
              >
                {status.kind === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in…
                  </>
                ) : status.kind === "success" ? (
                  <>
                    <Check className="h-4 w-4" strokeWidth={2.4} />
                    Signed in
                  </>
                ) : (
                  <>
                    {t("login.button_label", "Sign in")}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-ink-700/50">
              <span className="h-px flex-1 bg-ink-900/10" />
              {t("login.divider_text", "or continue with")}
              <span className="h-px flex-1 bg-ink-900/10" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button type="button" className="btn-outline justify-center">
                <Github className="h-4 w-4" strokeWidth={1.8} />
                GitHub
              </button>
              <button type="button" className="btn-outline justify-center">
                <span className="text-base">G</span>
                Google
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-700/70">
        {label}
      </span>
      {children}
    </label>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="display text-xl font-semibold text-cream-50">{k}</div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-cream-100/60">
        {v}
      </div>
    </div>
  );
}
