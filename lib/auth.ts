import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { normalizeEnv } from "./utils";

export const authorize = async (credentials: Record<"email" | "password", string> | undefined) => {
  if (!credentials?.email || !credentials?.password) {
    throw new Error("Invalid credentials");
  }

  const email = credentials.email.trim().toLowerCase();
  const adminEmailEnv = normalizeEnv(process.env.ADMIN_EMAIL)?.toLowerCase();
  const adminPasswordEnv = normalizeEnv(process.env.ADMIN_PASSWORD);
  const isAdmin = !!adminEmailEnv && email === adminEmailEnv;

  console.log(`[Auth] Authorize attempt for: ${email}`);
  console.log(`[Auth] Admin check: target=${adminEmailEnv || 'MISSING'} | isAdmin=${isAdmin}`);
  console.log(`[Auth] Password check: provided_len=${credentials.password.length} | env_pass_set=${!!adminPasswordEnv} | env_pass_len=${adminPasswordEnv?.length || 0}`);

  if (isAdmin && !adminPasswordEnv) {
    console.warn(`[Auth] ADMIN_EMAIL matched but ADMIN_PASSWORD is NOT set in environment!`);
  }

  const [existingUser] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  let user = existingUser;

  const touchLastLogin = async (userId: string) => {
    await db.update(users)
      .set({ updatedAt: new Date() })
      .where(eq(users.id, userId));
  };

  // Track if we've already checked the DB password to avoid redundant bcrypt.compare calls
  let dbPasswordChecked = false;
  let dbPasswordValid = false;

  // 1. Try DB password first (important if changed via UI)
  if (user && user.password) {
    dbPasswordValid = await bcrypt.compare(credentials.password, user.password);
    dbPasswordChecked = true;

    if (dbPasswordValid) {
      console.log(`[Auth] DB password valid for ${email}`);
      // If it's the admin email, ensure role is correct
      if (isAdmin && (user.role !== "ADMIN" || user.status !== "APPROVED")) {
        const [updatedUser] = await db.update(users)
          .set({ role: "ADMIN", status: "APPROVED", updatedAt: new Date() })
          .where(eq(users.id, user.id))
          .returning();
        user = updatedUser;
      } else {
        await touchLastLogin(user.id);
      }
      // Return a clean user object to avoid cookie size issues with large base64 images
      const { password: _, image: __, ...cleanUser } = user as any;
      return cleanUser;
    }
  }

  // 2. Fallback to .env password for initial setup or override
  if (isAdmin && adminPasswordEnv && credentials.password === adminPasswordEnv) {
    console.log(`[Auth] Fallback to .env password success for admin: ${email}`);
    if (!user) {
      console.log(`[Auth] Creating new admin user in DB`);
      const [newUser] = await db.insert(users).values({
        email: email,
        password: await bcrypt.hash(adminPasswordEnv, 10),
        role: "ADMIN",
        status: "APPROVED",
      }).returning();
      user = newUser;
    } else {
      console.log(`[Auth] Updating existing user to admin with .env credentials`);
      const [updatedUser] = await db.update(users)
        .set({
          password: await bcrypt.hash(adminPasswordEnv, 10),
          role: "ADMIN",
          status: "APPROVED",
          updatedAt: new Date(),
        })
        .where(eq(users.id, user.id))
        .returning();
      user = updatedUser;
    }
    const { password: _, image: __, ...cleanUser } = user as any;
    return cleanUser;
  }

  // 3. Final failure checks
  if (isAdmin) {
    console.log(`[Auth] Admin email matched but neither DB nor .env password valid: ${email}`);
    throw new Error("Invalid password");
  }

  if (!user) {
    console.log(`[Auth] User not found: ${email}`);
    throw new Error("User not found");
  }

  if (!user.password) {
    console.log(`[Auth] No password set for user: ${email}`);
    throw new Error("Invalid credentials");
  }

  // If we already checked and it was invalid, or if we haven't checked yet (which shouldn't happen due to logic above)
  if (dbPasswordChecked && !dbPasswordValid) {
    console.log(`[Auth] Invalid password for: ${email}`);
    throw new Error("Invalid password");
  }

  // This part is mostly for completeness, normally we'd have returned or thrown by now
  const isValid = await bcrypt.compare(credentials.password, user.password);
  if (!isValid) {
    console.log(`[Auth] Invalid password for: ${email}`);
    throw new Error("Invalid password");
  }

  await touchLastLogin(user.id);

  const { password: _, image: __, ...cleanUser } = user as any;
  return cleanUser;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // On first sign-in, ensure we don't carry over any large base64 images into the JWT.
        // Browsers have a 4KB limit for cookies, and base64 images easily exceed this.
        if (typeof token.picture === 'string' && token.picture.startsWith('data:image/')) {
          console.log(`[Auth] Removing large base64 picture from JWT for ${token.email}`);
          delete token.picture;
        }
        if (typeof token.image === 'string' && token.image.startsWith('data:image/')) {
          delete token.image;
        }
      }

      const emailSource = user?.email || token.email;
      if (emailSource) {
        const email = emailSource.trim().toLowerCase();
        if (user?.email) {
          console.log(`[Auth] JWT callback: first-time population for ${email}`);
        }

        try {
          const [dbUser] = await db.select().from(users).where(eq(users.email, email)).limit(1);
          if (dbUser) {
            token.email = dbUser.email;
            token.id = dbUser.id;
            token.role = dbUser.role;
            token.status = dbUser.status;
          } else {
            console.warn(`[Auth] JWT callback: User ${email} not found in DB!`);
            delete token.id;
            delete token.role;
            delete token.status;
          }
        } catch (error) {
          console.error(`[Auth] JWT callback error for ${email}:`, error);
        }
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      try {
        const parsed = new URL(url);
        if (parsed.origin === baseUrl) {
          return url;
        }

        // Keep redirects on the current deployment origin even if callback URLs were generated with localhost.
        if (parsed.pathname.startsWith("/")) {
          return `${baseUrl}${parsed.pathname}${parsed.search}${parsed.hash}`;
        }
      } catch {
        // ignore invalid URL and fall through to baseUrl
      }

      return baseUrl;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.status = token.status as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
