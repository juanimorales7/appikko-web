"use client";

import { useState, type FormEvent } from "react";
import { services } from "@data/services";
import { t } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { LIMITS, validateContact, type ContactData } from "@/lib/contact";

const FORMSPREE = process.env.NEXT_PUBLIC_FORMSPREE_ID;

type Status = "idle" | "sending" | "sent" | "error" | "not_configured";

/**
 * Formulario de contacto. Envía:
 *  - a Formspree si está NEXT_PUBLIC_FORMSPREE_ID, o
 *  - a /api/contacto (Resend) en cualquier otro caso.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ReturnType<typeof validateContact>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: ContactData & { website: string } = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      need: String(fd.get("need") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
    };
    const errs = validateContact(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = FORMSPREE
        ? await fetch(`https://formspree.io/f/${FORMSPREE}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ ...data, _subject: `Web · ${data.need} · ${data.name}`, _replyto: data.email, _gotcha: data.website }),
          })
        : await fetch("/api/contacto", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
      if (res.status === 503) return setStatus("not_configured");
      if (!res.ok) return setStatus("error");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const msg = (k: keyof ContactData) =>
    errors[k] === "required" ? t.contact.required : errors[k] === "invalid" ? t.contact.invalidEmail : null;

  const input =
    "mt-2 w-full border border-white/25 bg-ink-2 px-4 py-3 text-base text-white placeholder:text-white/35 transition-colors focus:border-mint focus:outline-none aria-[invalid=true]:border-red-400";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={t.contact.name} error={msg("name")}>
          <input id="name" name="name" autoComplete="name" maxLength={LIMITS.name} required className={input} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
        </Field>
        <Field id="email" label={t.contact.email} error={msg("email")}>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" maxLength={LIMITS.email} required className={input} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
        </Field>
      </div>
      <Field id="need" label={t.contact.need} error={msg("need")}>
        <select id="need" name="need" required defaultValue="" className={cn(input, "appearance-none")} aria-invalid={!!errors.need} aria-describedby={errors.need ? "need-error" : undefined}>
          <option value="" disabled>
            {t.contact.needPlaceholder}
          </option>
          {services.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value={t.contact.needOther}>{t.contact.needOther}</option>
        </select>
      </Field>
      <Field id="message" label={t.contact.message} error={msg("message")}>
        <textarea id="message" name="message" rows={5} maxLength={LIMITS.message} required placeholder={t.contact.messagePlaceholder} className={cn(input, "resize-y")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
      </Field>
      {/* Campo trampa para bots: oculto para personas y lectores de pantalla */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-mint px-6 py-3.5 font-display text-sm font-semibold text-ink transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "sending" ? t.contact.sending : t.contact.send}
        </button>
        <p role="status" aria-live="polite" className={cn("text-sm", status === "sent" ? "text-mint" : "text-amber-300")}>
          {status === "sent" && t.contact.sent}
          {status === "error" && t.contact.error}
          {status === "not_configured" && t.contact.notConfigured}
        </p>
      </div>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error: string | null; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="font-display text-sm text-white/85">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
