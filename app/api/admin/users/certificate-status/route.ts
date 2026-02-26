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

    const { userId, level, status } = await req.json();

    if (!userId || !level || typeof status !== "boolean") {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const [existingUser] = await db.select().from(users).where(eq(users.id, userId)).limit(1);

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let updateObj: any = { updatedAt: new Date() };
    const year = new Date().getFullYear();
    const randomPart = () => randomBytes(3).toString("hex").toUpperCase();

    switch (level) {
      case 'LEVEL1':
        updateObj.isReikiLevel1 = status;
        if (status && !existingUser.certificateNumberLevel1) {
          updateObj.certificateNumberLevel1 = `VH-L1-${year}-${randomPart()}`;
          updateObj.certificateDateLevel1 = new Date();
        }
        break;
      case 'LEVEL2':
        updateObj.isReikiLevel2 = status;
        if (status && !existingUser.certificateNumberLevel2) {
          updateObj.certificateNumberLevel2 = `VH-L2-${year}-${randomPart()}`;
          updateObj.certificateDateLevel2 = new Date();
        }
        break;
      case 'MASTER':
        updateObj.isReikiMaster = status;
        if (status && !existingUser.certificateNumber) {
          updateObj.certificateNumber = `VH-M-${year}-${randomPart()}`;
          updateObj.certificateDate = new Date();
        }
        break;
      case 'ALLURE':
        updateObj.isAllureReiki = status;
        if (status && !existingUser.certificateNumberAllure) {
          updateObj.certificateNumberAllure = `VH-A-${year}-${randomPart()}`;
          updateObj.certificateDateAllure = new Date();
        }
        break;
      default:
        return NextResponse.json({ error: "Invalid level" }, { status: 400 });
    }

    const [updatedUser] = await db.update(users)
      .set(updateObj)
      .where(eq(users.id, userId))
      .returning();

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Certificate status update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
