import Link from "next/link";
import { ChevronLeft, ShieldCheck } from "lucide-react";
import MarkdownLite from "@/components/MarkdownLite";
import { getSettingsMap } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Privacy Policy — DevBooks",
};

export default async function PrivacyPolicyPage() {
  const settings = await getSettingsMap().catch(() => ({}));
  const t = (k: string, f: string) => settings[k] || f;

  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-900/8 bg-cream-100/60">
        <div className="absolute inset-0 paper opacity-30" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-200/50 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gold-300/40 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-ink-700 hover:text-brand-700"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            Back to home
          </Link>
          <span className="eyebrow mt-6 inline-flex">
            <ShieldCheck className="h-3 w-3 text-brand-700" strokeWidth={2} />
            {t("privacy.eyebrow", "Legal")}
          </span>
          <h1 className="display mt-4 text-3xl text-ink-900 sm:text-5xl lg:text-6xl">
            {t("privacy.title", "Privacy policy")}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-ink-700/80">
            {t(
              "privacy.subtitle",
              "How we collect, use, and protect your information when you use DevBooks."
            )}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ink-700/60">
            {t("privacy.last_updated", "Last updated · 1 May 2026")}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <MarkdownLite source={settings["privacy.body"] || DEFAULT_PRIVACY} />

        <div className="mt-12 rounded-3xl border border-ink-900/10 bg-cream-100/60 p-6 text-sm text-ink-700/80">
          {t(
            "privacy.contact_text",
            "Questions? Reach the team at privacy@devbooks.io or visit our contact page."
          )}
        </div>
      </article>
    </div>
  );
}

const DEFAULT_PRIVACY = `## 1. Who we are

DevBooks is a curated programming book library.

## 2. What we collect

- Account info, order details, usage data, cookies.

## 3. How we use it

- To fulfil your orders and personalise your library.

## 4. Your rights

You can download or delete your data anytime — write to privacy@devbooks.io.`;
