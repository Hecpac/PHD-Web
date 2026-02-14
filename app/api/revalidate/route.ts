import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Webhook endpoint for Sanity on-demand revalidation
 *
 * Configure this URL in your Sanity project webhooks:
 * https://your-domain.com/api/revalidate?secret=YOUR_SECRET
 *
 * Environment variables required:
 * - REVALIDATE_SECRET: Secret token to authenticate webhook requests
 */
export async function POST(request: NextRequest) {
  try {
    // Validate secret token
    const secret = request.nextUrl.searchParams.get("secret");
    const expectedSecret = process.env.REVALIDATE_SECRET;

    if (!expectedSecret) {
      return NextResponse.json(
        { error: "REVALIDATE_SECRET not configured" },
        { status: 500 }
      );
    }

    if (secret !== expectedSecret) {
      return NextResponse.json(
        { error: "Invalid secret" },
        { status: 401 }
      );
    }

    // Revalidate all Sanity-tagged content
    revalidateTag("sanity");

    return NextResponse.json(
      {
        revalidated: true,
        tag: "sanity",
        now: Date.now(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}
