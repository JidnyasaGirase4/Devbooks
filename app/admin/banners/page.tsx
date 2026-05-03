import Link from "next/link";
import Image from "next/image";
import { Plus, Edit3, Eye, EyeOff } from "lucide-react";
import { getBanners } from "@/lib/queries";
import DeleteBannerButton from "@/components/admin/DeleteBannerButton";
import StatusBanner from "@/components/admin/StatusBanner";
import { toggleBannerAction } from "@/lib/actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Banners — DevBooks Admin" };

const STATUS: Record<string, { kind: "success"; text: string }> = {
  added: { kind: "success", text: "Banner created." },
  updated: { kind: "success", text: "Banner updated." },
  deleted: { kind: "success", text: "Banner deleted." },
  toggled: { kind: "success", text: "Banner visibility toggled." },
};

export default async function AdminBannersPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const banners = await getBanners().catch(() => []);
  const banner =
    searchParams?.status && STATUS[searchParams.status]
      ? STATUS[searchParams.status]
      : null;

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="eyebrow inline-flex">Site CMS</span>
          <h1 className="display mt-2 text-3xl font-semibold sm:text-4xl">
            Banners
          </h1>
          <p className="mt-1 text-sm text-ink-700/70">
            Slides shown on the homepage banner. Toggle the eye icon to show or
            hide a banner without deleting it.
          </p>
        </div>
        <Link href="/admin/banners/add" className="btn-primary">
          <Plus className="h-4 w-4" />
          Add banner
        </Link>
      </div>

      {banner && (
        <StatusBanner kind={banner.kind} className="mt-6">
          {banner.text}
        </StatusBanner>
      )}

      {banners.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-ink-900/15 bg-cream-50 p-16 text-center">
          <div className="display text-2xl text-ink-900">No banners yet.</div>
          <Link href="/admin/banners/add" className="btn-primary mt-6 inline-flex">
            <Plus className="h-4 w-4" />
            Add banner
          </Link>
        </div>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {banners.map((b) => (
            <li
              key={b.id}
              className={`group relative overflow-hidden rounded-3xl border bg-cream-50 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                b.is_active ? "border-ink-900/10" : "border-rose-200 opacity-80"
              }`}
            >
              <div className="relative aspect-[16/10] bg-cream-100">
                {b.image_url ? (
                  <Image
                    src={b.image_url}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-ink-700/50">
                    No image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent" />
                <span
                  className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    b.is_active
                      ? "bg-brand-500/90 text-white"
                      : "bg-ink-900/60 text-cream-100"
                  }`}
                >
                  {b.is_active ? "Live" : "Hidden"}
                </span>
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-cream-50/90 px-2.5 py-1 text-[10px] font-semibold text-ink-700">
                  Order {b.display_order}
                </span>
                <div className="absolute bottom-3 left-4 right-4 text-cream-50">
                  <div className="display text-base font-semibold drop-shadow line-clamp-1">
                    {b.title}
                  </div>
                  {b.subtitle && (
                    <div className="line-clamp-1 text-xs text-cream-100/85 drop-shadow">
                      {b.subtitle}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 p-4">
                <div className="min-w-0 text-xs text-ink-700/70">
                  {b.link_url ? (
                    <span className="truncate">
                      → <span className="font-mono">{b.link_url}</span>
                    </span>
                  ) : (
                    <span className="italic">No link</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <form action={toggleBannerAction}>
                    <input type="hidden" name="id" value={b.id} />
                    <button
                      type="submit"
                      title={b.is_active ? "Hide" : "Show"}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink-900/5 text-ink-800 transition-colors hover:bg-ink-900 hover:text-cream-50"
                    >
                      {b.is_active ? (
                        <EyeOff className="h-3.5 w-3.5" strokeWidth={1.8} />
                      ) : (
                        <Eye className="h-3.5 w-3.5" strokeWidth={1.8} />
                      )}
                    </button>
                  </form>
                  <Link
                    href={`/admin/banners/edit/${b.id}`}
                    className="inline-flex items-center gap-1 rounded-full bg-ink-900/5 px-2.5 py-1 text-xs font-semibold text-ink-800 hover:bg-ink-900 hover:text-cream-50"
                  >
                    <Edit3 className="h-3 w-3" strokeWidth={1.8} />
                    Edit
                  </Link>
                  <DeleteBannerButton id={b.id} title={b.title} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
