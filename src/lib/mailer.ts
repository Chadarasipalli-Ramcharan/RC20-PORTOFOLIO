// ────────────────────────────────────────────────────────────────
// EMAIL DELIVERY — real browser-to-inbox sending via Web3Forms.
//
// Web3Forms is a free, backend-less form API: you POST a submission
// with a public access key and it emails you the content. No server
// to host, works from a static build.
//
// SETUP (one time):
//   1. Go to https://web3forms.com → enter ch.charan2006@gmail.com →
//      you receive an Access Key by email.
//   2. Create a file named `.env` in the project root with:
//        VITE_WEB3FORMS_KEY=your-access-key-here
//   3. Rebuild (`npm run build`). Messages + ratings now arrive in
//      your Gmail inbox.
//
// The access key is a *public* submission key (safe for client code),
// but it is still read from an environment variable so it is never
// hard-coded and can be rotated without touching source.
// ────────────────────────────────────────────────────────────────

const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {};
const WEB3FORMS_KEY = env.VITE_WEB3FORMS_KEY;

/** True once an access key is configured in `.env`. */
export function isMailerConfigured(): boolean {
  return Boolean(WEB3FORMS_KEY && WEB3FORMS_KEY.length > 10);
}

export interface MailResult {
  ok: boolean;
  error?: string;
}

/**
 * Sends a payload to the configured inbox. Returns `{ ok: true }` only
 * when Web3Forms confirms delivery — never a fake success.
 */
export async function sendMail(payload: Record<string, unknown>): Promise<MailResult> {
  if (!isMailerConfigured()) {
    return { ok: false, error: "not-configured" };
  }
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...payload }),
    });
    const data = (await res.json()) as { success?: boolean; message?: string };
    if (res.ok && data.success) return { ok: true };
    return { ok: false, error: data.message || "Delivery failed. Please try again." };
  } catch {
    return { ok: false, error: "Network error. Please check your connection and retry." };
  }
}
