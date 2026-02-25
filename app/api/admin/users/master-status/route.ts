import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { randomBytes } from "crypto";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, isReikiMaster } = await req.json();

    if (!userId || typeof isReikiMaster !== "boolean") {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const [existingUser] = await db.select().from(users).where(eq(users.id, userId)).limit(1);

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let certificateNumber = existingUser.certificateNumber;
    let certificateDate = existingUser.certificateDate;

    if (isReikiMaster && !certificateNumber) {
      // Generate certificate number: VH-YYYY-RANDOM
      const year = new Date().getFullYear();
      const randomPart = randomBytes(3).toString("hex").toUpperCase();
      certificateNumber = `VH-${year}-${randomPart}`;
      certificateDate = new Date();
    }

    const [updatedUser] = await db.update(users)
      .set({
        isReikiMaster,
        certificateNumber: isReikiMaster ? certificateNumber : existingUser.certificateNumber,
        certificateDate: isReikiMaster ? certificateDate : existingUser.certificateDate,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Master status update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
