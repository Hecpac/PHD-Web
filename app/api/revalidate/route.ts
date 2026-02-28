import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Webhook endpoint for Sanity on-demand revalidation
 *
 * Configure this URL in your Sanity project webhooks:
 * POST https://your-domain.com/api/revalidate
 * Header: Authorization: Bearer YOUR_SECRET
 *
 * Environment variables required:
 * - REVALIDATE_SECRET: Secret token to authenticate webhook requests
 */
export async function POST(request: NextRequest) {
  try {
    const expectedSecret = process.env.REVALIDATE_SECRET;

    if (!expectedSecret) {
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    // Accept token from Authorization header (preferred) or query param (legacy)
    const authHeader = request.headers.get("authorization");
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
    const secret = bearerToken ?? request.nextUrl.searchParams.get("secret");

    if (secret !== expectedSecret) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    revalidateTag("sanity", "max");

    return NextResponse.json(
      { revalidated: true, tag: "sanity", now: Date.now() },
      { status: 200 },
    );
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
