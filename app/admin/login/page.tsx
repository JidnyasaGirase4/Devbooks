import LoginForm from "./LoginForm";
import { BookOpen, Lock } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Admin sign in — DevBooks",
};

export default function AdminLoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Decorative left panel */}
      <aside className="relative hidden overflow-hidden bg-ink-900 text-cream-50 lg:flex">
        <div className="absolute inset-0 paper opacity-25" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-700/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gold-500/25 blur-3xl" />

        <div className="relative flex flex-1 flex-col justify-between p-12">
          <Link href="/" className="inline-flex items-center gap-3 self-start">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-cream-50 text-ink-900">
              <BookOpen className="h-5 w-5" strokeWidth={2.2} />
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-gold-500 ring-2 ring-ink-900" />
            </span>
            <span className="display text-xl text-cream-50">
              Dev<span className="text-gold-400">Books</span>
            </span>
          </Link>

          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cream-100/15 bg-cream-100/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream-100/80">
              <Lock className="h-3 w-3 text-gold-300" strokeWidth={2} />
              Staff area
            </span>
            <h2 className="display mt-5 text-balance text-3xl leading-[1.1] sm:text-4xl">
              Manage the catalogue,{" "}
              <span className="italic text-gold-300">edit live.</span>
            </h2>
            <p className="mt-4 max-w-md text-cream-100/75">
              Add, update and remove services in MySQL. Public pages refresh
              instantly via Next.js server actions.
            </p>
          </div>

          <div className="text-xs text-cream-100/50">
            © {new Date().getFullYear()} DevBooks Admin
          </div>
        </div>
      </aside>

      {/* Form */}
      <section className="flex items-center justify-center bg-cream-50 p-5 sm:p-8">
        <div className="w-full max-w-md">
          <span className="eyebrow inline-flex">
            <Lock className="h-3 w-3 text-brand-700" strokeWidth={2} />
            Admin sign in
          </span>
          <h1 className="display mt-4 text-3xl text-ink-900 sm:text-4xl">
            Welcome back.
          </h1>
          <p className="mt-2 text-ink-700/80">
            Sign in with your admin credentials to manage the catalogue.
          </p>

          <LoginForm />

          <p className="mt-6 text-xs text-ink-700/60">
            Defaults during development:{" "}
            <code className="rounded bg-ink-900/5 px-1.5 py-0.5 font-mono">
              admin
            </code>{" "}
            /{" "}
            <code className="rounded bg-ink-900/5 px-1.5 py-0.5 font-mono">
              admin123
            </code>
            . Change them in{" "}
            <code className="rounded bg-ink-900/5 px-1.5 py-0.5 font-mono">
              .env.local
            </code>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
