import { NextResponse } from "next/server";

const AUTH_COOKIE_NAMES = [
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
  "next-auth.csrf-token",
  "__Host-next-auth.csrf-token",
  "next-auth.callback-url",
  "__Secure-next-auth.callback-url",
  "authjs.session-token",
  "__Secure-authjs.session-token",
  "authjs.csrf-token",
  "__Host-authjs.csrf-token",
  "authjs.callback-url",
  "__Secure-authjs.callback-url",
];

export async function POST() {
  const response = NextResponse.json({ ok: true });

  for (const cookieName of AUTH_COOKIE_NAMES) {
    response.cookies.set({
      name: cookieName,
      value: "",
      expires: new Date(0),
      maxAge: 0,
      path: "/",
      httpOnly: cookieName.includes("session-token") || cookieName.includes("csrf-token"),
      sameSite: "lax",
      secure: cookieName.startsWith("__Secure-") || cookieName.startsWith("__Host-"),
    });
  }

  return response;
}
