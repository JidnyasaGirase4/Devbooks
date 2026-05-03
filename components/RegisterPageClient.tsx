"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  BookOpen,
  Check,
  Sparkles,
  BookMarked,
  Heart,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function RegisterPageClient({
  settings = {},
}: {
  settings?: Record<string, string>;
}) {
  const t = (k: string, f: string) => settings[k] || f;
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "loading" }
    | { kind: "success" }
    | { kind: "error"; message: string }
  >({ kind: "idle" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status.kind === "loading" || status.kind === "success") return;

    const name = form.name.trim();
    const email = form.email.trim();
    if (name.length < 2) {
      setStatus({ kind: "error", message: "Please enter your name." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ kind: "error", message: "Please enter a valid email." });
      return;
    }
    if (form.password.length < 8) {
      setStatus({
        kind: "error",
        message: "Password must be at least 8 characters.",
      });
      return;
    }
    if (!form.terms) {
      setStatus({
        kind: "error",
        message: "Please accept the Terms to continue.",
      });
      return;
    }

    setStatus({ kind: "loading" });
    setTimeout(() => {
      setStatus({ kind: "success" });
      setTimeout(() => router.push("/"), 1300);
    }, 1000);
  };

  const strength =
    form.password.length === 0
      ? 0
      : form.password.length < 6
        ? 1
        : form.password.length < 10
          ? 2
          : 3;
  const strengthLabel = ["", "Weak", "Okay", "Strong"][strength];
  const strengthColor = ["bg-ink-900/10", "bg-rose-500", "bg-gold-500", "bg-brand-600"][strength];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex min-h-[680px] flex-col gap-8 lg:flex-row lg:items-stretch">
        {/* Decorative panel */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-ink-900 p-6 text-cream-50 sm:p-10 lg:w-5/12 lg:flex-none"
        >
          <div className="absolute inset-0 paper opacity-25" />
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold-500/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-brand-400/40 blur-3xl" />

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
              <span className="inline-flex items-center gap-2 rounded-full border border-cream-100/15 bg-cream-100/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream-100/80">
                <Sparkles className="h-3 w-3 text-gold-300 animate-twinkle" strokeWidth={2} />
                {t("register.left_eyebrow", "Free forever")}
              </span>
              <h2 className="display mt-4 text-balance text-2xl leading-[1.15] sm:text-3xl">
                {t(
                  "register.left_title",
                  "Join 120,000+ developers building their bookshelf."
                )}
              </h2>

              <ul className="mt-8 space-y-4">
                {[
                  {
                    icon: BookMarked,
                    title: t("register.left_feature1_title", "Curated library"),
                    body: t(
                      "register.left_feature1_body",
                      "Every book is hand-picked by working engineers."
                    ),
                  },
                  {
                    icon: Sparkles,
                    title: t("register.left_feature2_title", "Free chapters"),
                    body: t(
                      "register.left_feature2_body",
                      "Preview before you buy — always."
                    ),
                  },
                  {
                    icon: Heart,
                    title: t(
                      "register.left_feature3_title",
                      "Friday newsletter"
                    ),
                    body: t(
                      "register.left_feature3_body",
                      "A new book recommendation every week."
                    ),
                  },
                ].map((p) => {
                  const Icon = p.icon;
                  return (
                    <li key={p.title} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-gold-400/20 text-gold-300">
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-cream-50">
                          {p.title}
                        </div>
                        <div className="text-xs text-cream-100/70">
                          {p.body}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-t border-cream-100/10 pt-6 text-xs text-cream-100/60">
              <Link
                href="/login"
                className="font-semibold text-gold-300 hover:text-gold-200"
              >
                {t(
                  "register.left_signin_text",
                  "Already have an account? Sign in instead →"
                )}
              </Link>
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
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-300/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-gold-300/30 blur-3xl" />

          <div className="relative mx-auto flex h-full max-w-md flex-col justify-center">
            <span className="eyebrow self-start">
              {t("register.eyebrow", "Create account")}
            </span>
            <h1 className="display mt-4 text-3xl text-ink-900 sm:text-4xl">
              {t("register.title", "Start your shelf.")}
            </h1>
            <p className="mt-2 text-ink-700/80">
              {t("register.subtitle", "Free forever. No credit card required.")}
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <Field label={t("register.name_label", "Your name")}>
                <div className="relative">
                  <User
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-700/50"
                    strokeWidth={1.8}
                  />
                  <input
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    placeholder="Ada Lovelace"
                    className="input pl-11"
                  />
                </div>
              </Field>

              <Field label={t("register.email_label", "Email")}>
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

              <Field label={t("register.password_label", "Password")}>
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
                    placeholder="At least 8 characters"
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
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-900/10">
                    <div
                      className={`h-full transition-all duration-300 ${strengthColor}`}
                      style={{ width: `${(strength / 3) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-700/60">
                    {strengthLabel || "—"}
                  </span>
                </div>
              </Field>

              <label className="flex items-start gap-2 text-sm text-ink-700/80">
                <input
                  required
                  type="checkbox"
                  checked={form.terms}
                  onChange={(e) =>
                    setForm({ ...form, terms: e.target.checked })
                  }
                  className="mt-0.5 h-4 w-4 rounded border-ink-900/20 text-brand-700 focus:ring-brand-500"
                />
                <span>
                  {t(
                    "register.terms_text",
                    "I agree to the Terms of Service & Privacy Policy."
                  )}
                </span>
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
                    Welcome aboard! Setting up your shelf…
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
                    Creating account…
                  </>
                ) : status.kind === "success" ? (
                  <>
                    <Check className="h-4 w-4" strokeWidth={2.4} />
                    Account created
                  </>
                ) : (
                  <>
                    {t("register.button_label", "Create free account")}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-ink-700/50">
              <span className="h-px flex-1 bg-ink-900/10" />
              or sign up with
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
