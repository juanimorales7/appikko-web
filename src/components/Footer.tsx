import Link from "next/link";
import { site } from "@data/site";
import { filled } from "@data/projects";
import { t } from "@/i18n/config";
import { Logo } from "./Logo";

export function Footer() {
  const socials = site.socials.filter((s) => filled(s.url));
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
        <div>
          <Link href="/" aria-label="APPIKO TECH, inicio">
            <Logo />
          </Link>
          <p className="mt-4 font-display text-sm text-mute">{t.footer.tagline}</p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-dim md:items-end">
          {socials.length > 0 && (
            <ul className="flex gap-5">
              {socials.map((s) => (
                <li key={s.name}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-mint">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <p>
            © {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
