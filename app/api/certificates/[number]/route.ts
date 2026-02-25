import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ number: string }> }
) {
  try {
    const { number } = await params;

    if (!number) {
      return NextResponse.json({ error: "Certificate number is required" }, { status: 400 });
    }

    const [user] = await db.select({
      name: users.name,
      email: users.email,
      website: users.website,
      whatsapp: users.whatsapp,
      bio: users.bio,
      certificateNumber: users.certificateNumber,
      certificateDate: users.certificateDate,
      isReikiMaster: users.isReikiMaster
    })
    .from(users)
    .where(eq(users.certificateNumber, number))
    .limit(1);

    if (!user || !user.isReikiMaster) {
      return NextResponse.json({ error: "Certificate not found or invalid" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Certificate lookup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
