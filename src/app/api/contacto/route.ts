import { NextResponse } from "next/server";
import { validateContact, type ContactData } from "@/lib/contact";

/**
 * Envío del formulario de contacto con Resend (https://resend.com).
 * Variables (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY, CONTACT_TO (tu casilla), CONTACT_FROM (remitente verificado en Resend).
 * Si no están, responde 503 y el formulario muestra el aviso de "no conectado".
 */

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Límite simple por IP (en memoria; alcanza para frenar abusos básicos en serverless).
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM || "Appiko Web <onboarding@resend.dev>";
  if (!key || !to) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  let body: Partial<ContactData> & { website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: los bots completan el campo oculto "website".
  if (body.website) return NextResponse.json({ ok: true });

  const errors = validateContact(body);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, error: "invalid", errors }, { status: 400 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  const d = body as ContactData;
  const html = `
    <h2>Nuevo mensaje desde la web</h2>
    <p><b>Nombre:</b> ${escape(d.name)}</p>
    <p><b>Email:</b> ${escape(d.email)}</p>
    <p><b>Necesita:</b> ${escape(d.need)}</p>
    <p><b>Mensaje:</b></p>
    <p style="white-space:pre-wrap">${escape(d.message)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: d.email.trim(),
      subject: `Web · ${d.need} · ${d.name}`.slice(0, 150),
      html,
      text: `Nombre: ${d.name}\nEmail: ${d.email}\nNecesita: ${d.need}\n\n${d.message}`,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
