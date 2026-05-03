import { ImagePlus } from "lucide-react";
import { getMedia } from "@/lib/queries";
import MediaUploader from "@/components/admin/MediaUploader";
import MediaCard from "@/components/admin/MediaCard";
import StatusBanner from "@/components/admin/StatusBanner";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Media — DevBooks Admin" };

const STATUS: Record<string, { kind: "success"; text: string }> = {
  uploaded: { kind: "success", text: "Image uploaded." },
  deleted: { kind: "success", text: "File deleted." },
};

export default async function AdminMediaPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const items = await getMedia().catch(() => []);
  const banner =
    searchParams?.status && STATUS[searchParams.status]
      ? STATUS[searchParams.status]
      : null;

  return (
    <div>
      <div>
        <span className="eyebrow inline-flex">Site CMS</span>
        <h1 className="display mt-2 text-3xl font-semibold sm:text-4xl">
          Media library
        </h1>
        <p className="mt-1 text-sm text-ink-700/70">
          Upload images here, then copy their URL into banners, books or any
          other field that needs a picture.
        </p>
      </div>

      {banner && (
        <StatusBanner kind={banner.kind} className="mt-6">
          {banner.text}
        </StatusBanner>
      )}

      <div className="mt-6">
        <MediaUploader />
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="display text-lg font-semibold">
            Library{" "}
            <span className="ml-1 align-middle text-sm text-ink-700/60">
              · {items.length}
            </span>
          </h2>
        </div>

        {items.length === 0 ? (
          <div className="mt-4 rounded-3xl border border-dashed border-ink-900/15 bg-cream-50 p-16 text-center">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink-900/5 text-ink-700/60">
              <ImagePlus className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <p className="display mt-4 text-xl font-semibold">
              No uploads yet.
            </p>
            <p className="mt-1 text-sm text-ink-700/70">
              Use the panel above to upload your first image.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {items.map((m) => (
              <MediaCard key={m.id} item={m} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
