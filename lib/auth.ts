import "server-only";
import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "cb_admin";
const ONE_WEEK = 60 * 60 * 24 * 7; // seconds

const SECRET = () =>
  process.env.ADMIN_SECRET ||
  "please-change-this-to-a-long-random-string-in-production";

const sign = (payload: string) =>
  crypto.createHmac("sha256", SECRET()).update(payload).digest("hex");

export function makeSessionToken(): string {
  // payload = issuedAt:expiresAt
  const issued = Date.now();
  const expires = issued + ONE_WEEK * 1000;
  const payload = `${issued}:${expires}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token?: string | null): boolean {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = sign(payload);
  if (sig.length !== expected.length) return false;
  try {
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected)))
      return false;
  } catch {
    return false;
  }
  const [, expiresStr] = payload.split(":");
  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;
  return true;
}

export function setAdminCookie(): void {
  cookies().set({
    name: COOKIE_NAME,
    value: makeSessionToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_WEEK,
  });
}

export function clearAdminCookie(): void {
  cookies().set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export function isAdmin(): boolean {
  const c = cookies().get(COOKIE_NAME);
  return verifySessionToken(c?.value);
}

export function checkCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME || "admin";
  const expectedPass = process.env.ADMIN_PASSWORD || "admin123";
  return (
    username === expectedUser &&
    password.length === expectedPass.length &&
    crypto.timingSafeEqual(Buffer.from(password), Buffer.from(expectedPass))
  );
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
