import Link from "next/link";
import { ChevronLeft, Scale } from "lucide-react";
import MarkdownLite from "@/components/MarkdownLite";
import { getSettingsMap } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Terms and Conditions — DevBooks",
};

export default async function TermsPage() {
  const settings = await getSettingsMap().catch(() => ({}));
  const t = (k: string, f: string) => settings[k] || f;

  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-900/8 bg-cream-100/60">
        <div className="absolute inset-0 paper opacity-30" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-300/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-200/50 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-ink-700 hover:text-brand-700"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            Back to home
          </Link>
          <span className="eyebrow mt-6 inline-flex">
            <Scale className="h-3 w-3 text-gold-600" strokeWidth={2} />
            {t("terms.eyebrow", "Legal")}
          </span>
          <h1 className="display mt-4 text-3xl text-ink-900 sm:text-5xl lg:text-6xl">
            {t("terms.title", "Terms & conditions")}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-ink-700/80">
            {t(
              "terms.subtitle",
              "The agreement between you and DevBooks when you use our library and shop."
            )}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ink-700/60">
            {t("terms.last_updated", "Last updated · 1 May 2026")}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <MarkdownLite source={settings["terms.body"] || DEFAULT_TERMS} />

        <div className="mt-12 rounded-3xl border border-ink-900/10 bg-cream-100/60 p-6 text-sm text-ink-700/80">
          {t(
            "terms.contact_text",
            "Need to talk to us? Email hello@devbooks.io or use the contact form."
          )}
        </div>
      </article>
    </div>
  );
}

const DEFAULT_TERMS = `## 1. Accepting these terms

By using DevBooks you agree to these terms.

## 2. Your account

You are responsible for keeping your password confidential.`;
