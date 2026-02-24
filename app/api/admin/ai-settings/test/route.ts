import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { model, apiKey } = body;

    if (!model || !apiKey) {
      return NextResponse.json({ error: "Model and API key are required" }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL
      || process.env.NEXTAUTH_URL
      || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://virtueism.org");

    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model,
          messages: [{ role: "user", content: "Test connection. Reply with 'OK'." }],
          max_tokens: 10,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey.trim()}`,
            "Content-Type": "application/json",
            "HTTP-Referer": appUrl,
            "X-Title": "Virtueism Admin Test",
          },
          timeout: 15_000,
        }
      );

      const content = response.data?.choices?.[0]?.message?.content || "";
      return NextResponse.json({ ok: true, content });
    } catch (error) {
      const status = axios.isAxiosError(error) ? error.response?.status : undefined;
      const data = axios.isAxiosError(error) ? error.response?.data : undefined;
      const message = axios.isAxiosError(error) ? (data?.error?.message || error.message) : "Unknown error";

      return NextResponse.json({
        ok: false,
        error: message,
        status,
        details: data
      }, { status: 200 }); // Return 200 so the frontend can handle the "failure" gracefully
    }
  } catch (error) {
    console.error("Test connection error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
