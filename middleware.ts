import { NextResponse, type NextRequest } from "next/server";

// Edge-runtime safe HMAC verification (Web Crypto API).
// Mirrors lib/auth.ts but uses crypto.subtle so it works in middleware.

const COOKIE_NAME = "cb_admin";

const enc = new TextEncoder();

async function hmacHex(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function verifyToken(token?: string): Promise<boolean> {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const secret =
    process.env.ADMIN_SECRET ||
    "please-change-this-to-a-long-random-string-in-production";
  const expected = await hmacHex(secret, payload);
  if (sig.length !== expected.length) return false;
  // Constant-time-ish compare
  let mismatch = 0;
  for (let i = 0; i < sig.length; i++)
    mismatch |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  if (mismatch !== 0) return false;
  const [, expiresStr] = payload.split(":");
  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;
  return true;
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Login page is open; everything else under /admin requires a session.
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = req.cookies.get(COOKIE_NAME)?.value;
  const ok = await verifyToken(token);
  if (ok) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = `?next=${encodeURIComponent(pathname + search)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
