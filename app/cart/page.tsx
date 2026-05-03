import CartClient from "@/components/CartClient";
import { getFeaturedBooks, getSettingsMap } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Your Cart — DevBooks",
};

export default async function CartPage() {
  const [initialBooks, settings] = await Promise.all([
    getFeaturedBooks(3).catch(() => []),
    getSettingsMap().catch(() => ({})),
  ]);

  return <CartClient initialBooks={initialBooks} settings={settings} />;
}
