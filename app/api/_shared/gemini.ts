// app/api/_shared/gemini.ts

export async function callGemini(
  message: string,
  systemInstruction: string,
  fallback: (msg: string) => string,
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return fallback(message);

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const delays = [500, 1000, 2000];

  for (let i = 0; i <= delays.length; i++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
        }),
      });

      if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);

      const data: unknown = await res.json();
      const anyData = data as Record<string, unknown>;
      const candidates = anyData?.candidates as Array<Record<string, unknown>> | undefined;
      const content = candidates?.[0]?.content as Record<string, unknown> | undefined;
      const parts = content?.parts as Array<Record<string, unknown>> | undefined;

      const text =
        parts?.[0]?.text ??
        parts?.map((p) => p?.text).join("") ??
        "";

      const out = String(text ?? "").trim();
      return out || fallback(message);
    } catch {
      if (i === delays.length) return fallback(message);
      await new Promise((r) => setTimeout(r, delays[i]));
    } finally {
      clearTimeout(timeout);
    }
  }

  return fallback(message);
}
