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

    const user = await db.query.users.findFirst({
      where: (users, { eq, or }) => or(
        eq(users.certificateNumber, number),
        eq(users.certificateNumberLevel1, number),
        eq(users.certificateNumberLevel2, number),
        eq(users.certificateNumberAllure, number)
      ),
      with: {
        intake: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: "Certificate not found or invalid" }, { status: 404 });
    }

    let type = "";
    let date = null;
    let certNum = "";

    if (user.certificateNumber === number) {
      type = "MASTER";
      date = user.certificateDate;
      certNum = user.certificateNumber || "";
    } else if (user.certificateNumberLevel1 === number) {
      type = "LEVEL1";
      date = user.certificateDateLevel1;
      certNum = user.certificateNumberLevel1 || "";
    } else if (user.certificateNumberLevel2 === number) {
      type = "LEVEL2";
      date = user.certificateDateLevel2;
      certNum = user.certificateNumberLevel2 || "";
    } else if (user.certificateNumberAllure === number) {
      type = "ALLURE";
      date = user.certificateDateAllure;
      certNum = user.certificateNumberAllure || "";
    }

    const displayName = (user.intake?.firstName && user.intake?.lastName)
      ? `${user.intake.firstName} ${user.intake.lastName}`
      : user.name;

    return NextResponse.json({
      name: displayName,
      email: user.email,
      website: user.website,
      whatsapp: user.whatsapp,
      bio: user.bio,
      certificateNumber: certNum,
      certificateDate: date,
      type
    });
  } catch (error) {
    console.error("Certificate lookup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
