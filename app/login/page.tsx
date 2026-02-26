"use client";

import { useState, Suspense, useEffect } from "react";
import { signIn, getProviders } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const getSafeCallbackUrl = (rawCallbackUrl: string | null) => {
  if (!rawCallbackUrl) {
    return "/dashboard";
  }

  if (rawCallbackUrl.startsWith("/")) {
    return rawCallbackUrl;
  }

  if (typeof window !== "undefined") {
    const parsed = new URL(rawCallbackUrl, window.location.origin);
    const isLocalPath = parsed.origin === window.location.origin;

    if (isLocalPath) {
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
  }

  return "/dashboard";
};

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState<any>(null);
  const searchParams = useSearchParams();
  const callbackUrl = getSafeCallbackUrl(searchParams.get("callbackUrl"));
  const isAdminLogin = callbackUrl.includes("/admin");

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        callbackUrl,
        redirect: false,
      });

      if (res?.error) {
        console.error("[Auth] Login failed:", res.error);
        // Map common NextAuth error codes to user-friendly messages
        const errorMsg = res.error === "CredentialsSignin"
          ? "Invalid email or password"
          : res.error;
        setError(errorMsg);
      } else {
        const safeResultUrl = getSafeCallbackUrl(res?.url || callbackUrl);
        window.location.assign(safeResultUrl);
      }
    } catch (err) {
      setError("An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className={`max-w-md w-full space-y-8 bg-background-alt p-8 rounded-2xl border ${isAdminLogin ? 'border-accent/40 shadow-accent/10' : 'border-primary/20'} shadow-2xl transition-all duration-500`}>
        <div className="text-center">
          <h2 className="text-4xl font-serif text-accent mb-2">
            {isAdminLogin ? "Admin Sanctuary" : "Welcome Back"}
          </h2>
          <p className="text-foreground-muted font-sans">
            {isAdminLogin ? "Enter the Inner Sanctum" : "Return to your sacred training"}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground-muted mb-1">Email Address</label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-background border border-primary/30 text-foreground focus:outline-none focus:border-accent transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground-muted mb-1">Password</label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg bg-background border border-primary/30 text-foreground focus:outline-none focus:border-accent transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 bg-gradient-to-r ${isAdminLogin ? 'from-accent to-accent-light hover:from-accent-light hover:to-accent' : 'from-primary to-primary-light hover:from-primary-light hover:to-primary'} text-white rounded-lg font-semibold transition-all shadow-lg ${isAdminLogin ? 'shadow-accent/20' : 'shadow-primary/20'} disabled:opacity-50`}
            >
              {loading ? "Channelling..." : (isAdminLogin ? "Enter Sanctuary" : "Sign In")}
            </button>
          </form>

          <div className="text-center space-y-4">
            {!isAdminLogin ? (
              <>
                <p className="text-foreground-muted">
                  New to the training?{" "}
                  <Link href="/register" className="text-accent hover:text-accent-light transition-colors">
                    Join Now
                  </Link>
                </p>
                <div className="pt-2">
                  <Link href="/" className="text-sm text-foreground-muted hover:text-accent transition-colors">
                    ← Back to Home
                  </Link>
                </div>
              </>
            ) : (
              <Link href="/" className="text-sm text-foreground-muted hover:text-accent transition-colors">
                ← Return to Temple
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-accent">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
