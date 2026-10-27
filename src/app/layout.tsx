import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "@data/site";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PuzzleProvider } from "@/components/PuzzleContext";
import { defaultLocale, t } from "@/i18n/config";
import { inter, spaceGrotesk } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: t.meta.title, template: `%s · ${site.name}` },
  description: t.meta.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: site.name,
    title: t.meta.title,
    description: t.meta.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({ children, modal }: { children: ReactNode; modal: ReactNode }) {
  return (
    <html lang={defaultLocale} className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased">
        <PuzzleProvider>
          <Header />
          <main id="contenido">{children}</main>
          <Footer />
          {modal}
        </PuzzleProvider>
      </body>
    </html>
  );
}
