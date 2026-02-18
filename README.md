# Virtueism.org + Reiki Training (Unified App)

This repository now contains the **new Virtueism.org website landing experience** and the **full Reiki Training platform** in a single Next.js application.

You can run everything from one app with:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## What is included

- **Public landing website** for Virtueism.org at `/`
- **7-day Reiki Training system** with registration, login, progress, quiz, dashboard, and teachings
- **Admin sanctuary** for approvals, settings, and memory controls
- **Mya AI chat** integration inside the same app
- **Single codebase + single runtime** for website + training

## Tech stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- NextAuth
- Drizzle ORM + SQLite

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```

The startup script initializes core environment defaults when missing (`DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`).

## Environment variables

Create a `.env` file in the project root and define at least:

```env
# Google OAuth (optional if using credential login only)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Admin Access
ADMIN_EMAIL="admin@virtuehearts.org"
ADMIN_PASSWORD="InitialAdminPassword123!"

# AI Assistant
OPENROUTER_API_KEY="your-openrouter-api-key"
```

## Routes you will use most

- `/` → Virtueism.org landing page
- `/register` → begin Reiki training
- `/login` → returning students/admin
- `/dashboard` → student training progress
- `/teachings` → spiritual teachings
- `/mya-chat` → AI guidance chat
- `/admin` → admin sanctuary

## Vision roadmap (next integrations)

Planned next steps include:

- WhatsApp-connected operations
- Mya as a subscription AI assistant
- Image generation workflows through `fal.ai`

## Contact

- Phone: `647-781-8371`
- Location: Scarborough, Ontario (GTA outcall available)
- Website: https://virtueism.org

---
Blessings of peace, Baba Virtuehearts.
