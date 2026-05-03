"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  ExternalLink,
  BookOpen,
  Library,
  Layers,
  Image as ImageIcon,
  GalleryHorizontal,
  Quote,
  Users,
  GraduationCap,
  FileText,
} from "lucide-react";
import { logoutAction } from "@/lib/actions";

const NAV: Array<{
  group?: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  exact?: boolean;
}> = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { group: "Catalog", label: "Categories", href: "/admin/categories", icon: Layers },
  { label: "Books", href: "/admin/books", icon: Library },
  { label: "Resources", href: "/admin/resources", icon: GraduationCap },
  { group: "Pages", label: "Page content", href: "/admin/pages", icon: FileText },
  { label: "Banners", href: "/admin/banners", icon: GalleryHorizontal },
  { label: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Media", href: "/admin/media", icon: ImageIcon },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="min-h-screen bg-cream-100/50 text-ink-900">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-ink-900/10 bg-cream-50/80 px-4 backdrop-blur lg:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink-900 text-cream-50">
            <BookOpen className="h-4 w-4" strokeWidth={2.2} />
          </span>
          <span className="display text-base font-semibold">DevBooks Admin</span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-800 hover:bg-ink-900/5"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      <div className="flex">
        {/* Sidebar — desktop */}
        <aside className="hidden w-64 flex-none border-r border-ink-900/10 bg-cream-50 lg:block">
          <SidebarContent isActive={isActive} />
        </aside>

        {/* Sidebar — mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="absolute left-0 top-0 h-full w-72 bg-cream-50 shadow-2xl">
              <SidebarContent
                isActive={isActive}
                onNavigate={() => setMobileOpen(false)}
              />
            </aside>
          </div>
        )}

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Topbar — desktop */}
          <header className="sticky top-0 z-20 hidden h-16 items-center justify-between border-b border-ink-900/10 bg-cream-50/70 px-8 backdrop-blur lg:flex">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-700/70">
              Admin Panel
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                target="_blank"
                className="btn-outline !py-1.5 !px-3 text-xs"
              >
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.8} />
                View site
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink-900/5 px-3 py-1.5 text-xs font-semibold text-ink-800 transition-colors hover:bg-ink-900 hover:text-cream-50"
                >
                  <LogOut className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Sign out
                </button>
              </form>
            </div>
          </header>

          <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

function SidebarContent({
  isActive,
  onNavigate,
}: {
  isActive: (href: string, exact?: boolean) => boolean;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <Link
        href="/admin"
        onClick={onNavigate}
        className="flex items-center gap-3 border-b border-ink-900/10 px-6 py-5"
      >
        <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-ink-900 text-cream-50 shadow-md">
          <BookOpen className="h-5 w-5" strokeWidth={2.2} />
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-gold-500 ring-2 ring-cream-50" />
        </span>
        <div>
          <div className="display text-lg font-semibold">
            Dev<span className="text-brand-700">Books</span>
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-700/60">
            Admin Console
          </div>
        </div>
      </Link>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);
            return (
              <li key={item.href}>
                {item.group && (
                  <div className="mt-3 px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-700/50">
                    {item.group}
                  </div>
                )}
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-ink-900 text-cream-50 shadow-md"
                      : "text-ink-800 hover:bg-ink-900/5"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 transition-transform group-hover:scale-110 ${active ? "" : "text-ink-700/70"}`}
                    strokeWidth={1.8}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-ink-900/10 p-4 lg:hidden">
        <form action={logoutAction}>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-ink-900 px-3 py-2 text-xs font-semibold text-cream-50"
          >
            <LogOut className="h-3.5 w-3.5" strokeWidth={1.8} />
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
