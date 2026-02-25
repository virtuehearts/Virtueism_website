import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [user] = await db.select().from(users).where(eq(users.id, session.user.id)).limit(1);

    if (!user || !user.isReikiMaster) {
      return NextResponse.json({ error: "Only Reiki Masters can update practitioner info" }, { status: 403 });
    }

    const { website, whatsapp, bio } = await req.json();

    const [updatedUser] = await db.update(users)
      .set({
        website,
        whatsapp,
        bio,
        updatedAt: new Date()
      })
      .where(eq(users.id, session.user.id))
      .returning();

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Practitioner info update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [user] = await db.select().from(users).where(eq(users.id, session.user.id)).limit(1);

    if (!user || !user.isReikiMaster) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json({
      website: user.website,
      whatsapp: user.whatsapp,
      bio: user.bio,
      certificateNumber: user.certificateNumber,
      certificateDate: user.certificateDate
    });
  } catch (error) {
    console.error("Practitioner info fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
