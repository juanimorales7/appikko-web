import { projects } from "@data/projects";
import { site } from "@data/site";
import { services } from "@data/services";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { t } from "@/i18n/config";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/logo.svg`,
    description: t.meta.description,
    knowsAbout: services.map((s) => s.name),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t.services.title,
      itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name } })),
    },
    subjectOf: projects.map((p) => ({ "@type": "CreativeWork", name: p.name, url: `${site.url}/proyectos/${p.slug}` })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Hero />
      <Projects />
      <Services />
      <Process />
      <About />
      <Contact />
    </>
  );
}
