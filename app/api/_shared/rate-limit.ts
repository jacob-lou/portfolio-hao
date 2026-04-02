// app/api/_shared/rate-limit.ts

const RATE_DEFAULTS = { windowMs: 60_000, max: 12 };

type Hit = { count: number; resetAt: number };
const ipHits = new Map<string, Hit>();

export function getClientIp(req: Request): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  const xr = req.headers.get("x-real-ip");
  if (xr) return xr.trim();
  return "unknown";
}

export function checkRateLimit(
  req: Request,
  opts?: { windowMs?: number; max?: number },
): { ok: true } | { ok: false; retryAfterMs: number } {
  const { windowMs, max } = { ...RATE_DEFAULTS, ...opts };
  const ip = getClientIp(req);
  const now = Date.now();
  const cur = ipHits.get(ip);

  if (!cur || now > cur.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (cur.count >= max) {
    return { ok: false, retryAfterMs: cur.resetAt - now };
  }

  cur.count += 1;
  ipHits.set(ip, cur);
  return { ok: true };
}
