// Admin PIN verification — server only.
// The PIN lives exclusively in process.env.ADMIN_PIN and is never returned
// in any response body or logged anywhere.

interface AttemptRecord {
  count: number;
  lockedUntil: number;
}

// Module-level map — persists across requests within the same server process.
const attempts = new Map<string, AttemptRecord>();

const MAX_ATTEMPTS = 3;
const LOCKOUT_SECONDS = 60;

function getClientIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const now = Date.now();

  // Check lockout
  const record = attempts.get(ip);
  if (record && record.lockedUntil > now) {
    const retryAfter = Math.ceil((record.lockedUntil - now) / 1000);
    return Response.json(
      { success: false, locked: true, retryAfter },
      { status: 429 }
    );
  }

  let body: { pin?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ success: false }, { status: 400 });
  }

  const { pin } = body;

  if (!pin || pin.length !== 4) {
    return Response.json({ success: false }, { status: 400 });
  }

  const correct = process.env.ADMIN_PIN;

  if (pin === correct) {
    // Clear any attempt record on success
    attempts.delete(ip);
    return Response.json({ success: true }, { status: 200 });
  }

  // Wrong PIN — increment attempt counter
  const current = attempts.get(ip) ?? { count: 0, lockedUntil: 0 };
  const newCount = current.count + 1;

  if (newCount >= MAX_ATTEMPTS) {
    attempts.set(ip, { count: newCount, lockedUntil: now + LOCKOUT_SECONDS * 1000 });
    return Response.json(
      { success: false, locked: true, retryAfter: LOCKOUT_SECONDS },
      { status: 429 }
    );
  }

  attempts.set(ip, { count: newCount, lockedUntil: 0 });
  return Response.json({ success: false }, { status: 401 });
}
