"use client";

import { signOut } from "next-auth/react";

/**
 * IMPORTANT: Keep logout redirects relative/current-origin.
 *
 * NextAuth callback URL cookies can occasionally retain localhost in multi-environment
 * deployments. We always complete sign-out without auto redirect, clear auth cookies,
 * then force navigation on the current window origin to prevent localhost redirects.
 */
export async function logoutToLogin() {
  try {
    await fetch("/api/auth/clear-session", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    // Continue even if cookie cleanup endpoint is temporarily unavailable.
  }

  await signOut({ redirect: false, callbackUrl: "/login" });

  if (typeof window !== "undefined") {
    window.location.assign(`${window.location.origin}/login`);
  }
}
