import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/submissions
 *
 * Returns all contact form submissions stored in data/submissions.json on GitHub.
 * Protect this with a secret key in production — add SUBMISSIONS_SECRET to your
 * Vercel env vars and pass it as ?key=<secret> when calling this endpoint.
 *
 * Example: https://oryx-flame.vercel.app/api/submissions?key=your_secret_here
 */

const GITHUB_OWNER = "wxusan";
const GITHUB_REPO  = "oryx";
const GITHUB_PATH  = "data/submissions.json";

export async function GET(req: NextRequest) {
  // ── Auth guard ─────────────────────────────────────────────────────────────
  const secret = process.env.SUBMISSIONS_SECRET;
  if (secret) {
    const provided = req.nextUrl.searchParams.get("key");
    if (provided !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // ── Fetch from GitHub ──────────────────────────────────────────────────────
  const token = process.env.GITHUB_PAT;
  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_PAT not configured" },
      { status: 500 }
    );
  }

  const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_PATH}`;

  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    // Always fetch fresh — don't use the Next.js / Vercel data cache
    cache: "no-store",
  });

  if (res.status === 404) {
    // No submissions yet
    return NextResponse.json({ count: 0, submissions: [] });
  }

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch from GitHub" },
      { status: 502 }
    );
  }

  const data = await res.json() as { content: string };
  const raw  = Buffer.from(data.content, "base64").toString("utf-8");
  const submissions = JSON.parse(raw);

  return NextResponse.json({
    count: submissions.length,
    submissions,
  });
}
