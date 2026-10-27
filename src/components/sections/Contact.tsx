import { filled } from "@data/projects";
import { site } from "@data/site";
import { t } from "@/i18n/config";
import { ContactForm } from "../ContactForm";
import { Field } from "../Todo";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  const wa = filled(site.whatsapp);
  const email = filled(site.email);
  const socials = site.socials;
  return (
    <section id="contacto" className="border-t border-white/10 py-20 sm:py-28" aria-labelledby="contacto-titulo">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:px-8">
        <div>
          <SectionHeading id="contacto-titulo" kicker={t.contact.kicker} title={t.contact.title} lead={t.contact.lead} />
          <div className="mt-10 space-y-6">
            {wa ? (
              <a
                href={`https://wa.me/${wa}?text=${encodeURIComponent(site.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-mint px-5 py-3.5 font-display text-sm font-semibold text-mint transition-colors hover:bg-mint hover:text-ink"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
                </svg>
                {t.contact.whatsapp}
              </a>
            ) : (
              <p className="text-sm text-dim">
                WhatsApp: <Field value={site.whatsapp} />
              </p>
            )}
            <div className="space-y-2 text-sm">
              <p className="text-mute">
                Email:{" "}
                {email ? (
                  <a href={`mailto:${email}`} className="text-white underline underline-offset-4 hover:text-mint">
                    {email}
                  </a>
                ) : (
                  <Field value={site.email} fallback="—" />
                )}
              </p>
              <p className="text-mute">{site.location}</p>
            </div>
            <div>
              <p className="font-display text-xs uppercase tracking-[0.2em] text-dim">{t.contact.socials}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {socials.map((s) =>
                  filled(s.url) ? (
                    <li key={s.name}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block border border-white/25 px-3 py-1.5 text-sm transition-colors hover:border-mint hover:text-mint"
                      >
                        {s.name}
                      </a>
                    </li>
                  ) : process.env.NODE_ENV !== "production" ? (
                    <li key={s.name} className="text-sm text-dim">
                      {s.name}: <Field value={s.url} />
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
