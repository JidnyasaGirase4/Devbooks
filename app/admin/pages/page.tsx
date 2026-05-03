import Link from "next/link";
import {
  Home,
  BookOpen,
  Layers,
  GraduationCap,
  Users,
  Mail,
  PanelBottom,
  ArrowRight,
  ExternalLink,
  ShoppingBag,
  LogIn,
  UserPlus,
  ShieldCheck,
  Scale,
  Navigation,
} from "lucide-react";
import StatusBanner from "@/components/admin/StatusBanner";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Pages — DevBooks Admin" };

const PAGES = [
  {
    slug: "home",
    title: "Homepage",
    subtitle: "Section builder — add, edit, reorder any section.",
    href: "/admin/pages/home/sections",
    publicHref: "/",
    icon: Home,
    gradient: "from-brand-500 to-teal-600",
    builder: true,
  },
  {
    slug: "about",
    title: "About",
    subtitle: "Section builder — full layout control.",
    href: "/admin/pages/about/sections",
    publicHref: "/about",
    icon: Users,
    gradient: "from-rose-500 to-pink-600",
    builder: true,
  },
  {
    slug: "contact",
    title: "Contact",
    subtitle: "Hero text + email/phone/hours/HQ (settings).",
    href: "/admin/pages/contact",
    publicHref: "/contact",
    icon: Mail,
    gradient: "from-cyan-500 to-sky-600",
  },
  {
    slug: "books",
    title: "Books",
    subtitle: "Library page hero text + sections.",
    href: "/admin/pages/books",
    publicHref: "/books",
    icon: BookOpen,
    gradient: "from-gold-500 to-orange-500",
  },
  {
    slug: "categories",
    title: "Categories",
    subtitle: "Categories page hero text + sections.",
    href: "/admin/pages/categories",
    publicHref: "/categories",
    icon: Layers,
    gradient: "from-emerald-500 to-green-600",
  },
  {
    slug: "free-resources",
    title: "Free Resources",
    subtitle: "Hero + newsletter card text.",
    href: "/admin/pages/free-resources",
    publicHref: "/free-resources",
    icon: GraduationCap,
    gradient: "from-purple-500 to-fuchsia-600",
  },
  {
    slug: "footer",
    title: "Footer",
    subtitle: "Description, copyright, brand & social URLs.",
    href: "/admin/pages/footer",
    publicHref: "/",
    icon: PanelBottom,
    gradient: "from-ink-700 to-ink-900",
  },
  {
    slug: "navbar",
    title: "Navbar",
    subtitle: "Login / Sign-up labels + search placeholder.",
    href: "/admin/pages/navbar",
    publicHref: "/",
    icon: Navigation,
    gradient: "from-slate-600 to-slate-800",
  },
  {
    slug: "cart",
    title: "Cart",
    subtitle: "Cart labels, summary text, success state.",
    href: "/admin/pages/cart",
    publicHref: "/cart",
    icon: ShoppingBag,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    slug: "login",
    title: "Login",
    subtitle: "Form labels, left panel quote and supporting copy.",
    href: "/admin/pages/login",
    publicHref: "/login",
    icon: LogIn,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    slug: "register",
    title: "Register",
    subtitle: "Form copy + the 3 left-panel feature pitches.",
    href: "/admin/pages/register",
    publicHref: "/register",
    icon: UserPlus,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    slug: "privacy",
    title: "Privacy policy",
    subtitle: "Hero text and full Markdown body.",
    href: "/admin/pages/privacy",
    publicHref: "/privacy-policy",
    icon: ShieldCheck,
    gradient: "from-teal-500 to-emerald-600",
  },
  {
    slug: "terms",
    title: "Terms & conditions",
    subtitle: "Hero text and full Markdown body.",
    href: "/admin/pages/terms",
    publicHref: "/terms",
    icon: Scale,
    gradient: "from-stone-600 to-stone-800",
  },
];

export default function AdminPagesIndex({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const saved = searchParams?.status === "saved";

  return (
    <div>
      <div>
        <span className="eyebrow inline-flex">Site CMS</span>
        <h1 className="display mt-2 text-3xl font-semibold sm:text-4xl">
          Pages
        </h1>
        <p className="mt-1 text-sm text-ink-700/70">
          Pick a page to edit its hero, headers and copy. Each one is its own
          focused editor.
        </p>
      </div>

      {saved && (
        <StatusBanner kind="success" className="mt-6">
          Page content saved.
        </StatusBanner>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PAGES.map((p) => {
          const Icon = p.icon;
          return (
            <Link
              key={p.slug}
              href={p.href}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-900/10 bg-cream-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${p.gradient} text-white shadow-md transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110`}
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                {p.builder && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-800">
                    Builder
                  </span>
                )}
              </div>
              <h2 className="display mt-4 text-xl font-semibold text-ink-900">
                {p.title}
              </h2>
              <p className="mt-1 text-sm text-ink-700/80">{p.subtitle}</p>

              <div className="mt-auto flex items-center justify-between pt-6">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
                  Edit
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-ink-700/60">
                  <ExternalLink className="h-3 w-3" strokeWidth={1.8} />
                  {p.publicHref}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
