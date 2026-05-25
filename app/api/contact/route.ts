import { NextRequest, NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID   = process.env.TELEGRAM_CHAT_ID;

// ---------------------------------------------------------------------------
// GitHub JSON storage – appends each submission to data/submissions.json
// in the repo so you have a persistent CRM-ready file to migrate to a DB.
// Requires: GITHUB_PAT env var (a fine-grained PAT with Contents read+write
// on the wxusan/oryx repo).
// ---------------------------------------------------------------------------
const GITHUB_OWNER = "wxusan";
const GITHUB_REPO  = "oryx";
const GITHUB_PATH  = "data/submissions.json";

interface Submission {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  telegram?: string;
  service: string;
  message?: string;
}

async function saveSubmission(submission: Submission): Promise<void> {
  const token = process.env.GITHUB_PAT;
  if (!token) {
    console.warn("[oryx/contact] GITHUB_PAT not set – skipping JSON persistence");
    return;
  }

  const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_PATH}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };

  // 1 – fetch the current file (if it exists) so we can get its SHA
  let existingList: Submission[] = [];
  let sha: string | undefined;

  const getRes = await fetch(apiUrl, { headers });
  if (getRes.ok) {
    const data = await getRes.json() as { sha: string; content: string };
    sha = data.sha;
    try {
      const raw = Buffer.from(data.content, "base64").toString("utf-8");
      existingList = JSON.parse(raw) as Submission[];
    } catch {
      existingList = [];
    }
  }

  // 2 – prepend so newest is first
  const updated = [submission, ...existingList];

  // 3 – write back
  const body: Record<string, unknown> = {
    message: `feat(submissions): add entry ${submission.id}`,
    content: Buffer.from(JSON.stringify(updated, null, 2)).toString("base64"),
    branch: "main",
  };
  if (sha) body.sha = sha;

  const putRes = await fetch(apiUrl, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });

  if (!putRes.ok) {
    const err = await putRes.text();
    console.error("[oryx/contact] GitHub write failed:", err);
  }
}

// ---------------------------------------------------------------------------
// POST /api/contact
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error("[oryx/contact] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set in Vercel env vars!");
    return NextResponse.json(
      { error: "Bot not configured — add TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in Vercel → Settings → Environment Variables" },
      { status: 500 }
    );
  }

  const { name, phone, telegram, service, message } = await req.json();

  if (!name?.trim() || !phone?.trim() || !service?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // ── 1. Build a unique submission record ───────────────────────────────────
  const submission: Submission = {
    id:        `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    name:      name.trim(),
    phone:     phone.trim(),
    telegram:  telegram?.trim() || undefined,
    service:   service.trim(),
    message:   message?.trim() || undefined,
  };

  // ── 2. Send Telegram message ──────────────────────────────────────────────
  const text = [
    `🔔 *NEW INQUIRY — ORYX*`,
    ``,
    `🆔 *ID:* \`${submission.id}\``,
    `🕐 *Time:* ${new Date(submission.createdAt).toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" })} (UZT)`,
    ``,
    `👤 *Name:* ${submission.name}`,
    `📞 *Phone:* ${submission.phone}`,
    submission.telegram ? `💬 *Telegram:* ${submission.telegram}` : "",
    `💼 *Service:* ${submission.service}`,
    submission.message ? `\n📝 *Message:*\n${submission.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const tgRes = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "Markdown" }),
    }
  );

  if (!tgRes.ok) {
    const err = await tgRes.json();
    console.error("[oryx/contact] Telegram API error:", err);
    return NextResponse.json({ error: "Failed to send to Telegram" }, { status: 502 });
  }

  // ── 3. Persist to GitHub JSON (non-blocking – don't fail the request) ─────
  saveSubmission(submission).catch((e) =>
    console.error("[oryx/contact] GitHub save error:", e)
  );

  return NextResponse.json({ ok: true, id: submission.id });
}
