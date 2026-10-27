import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@data/projects";
import { serviceById } from "@data/services";
import { ProjectDetail } from "@/components/ProjectDetail";
import { t } from "@/i18n/config";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const description = `${p.short} Servicios: ${p.services.map((s) => serviceById[s].name).join(", ")}.`;
  return {
    title: p.name,
    description,
    alternates: { canonical: `/proyectos/${p.slug}` },
    openGraph: { type: "article", title: p.name, description, url: `/proyectos/${p.slug}` },
    twitter: { card: "summary_large_image", title: p.name, description },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <div className="mx-auto max-w-5xl px-4 pt-28 pb-20 sm:px-6 sm:pt-32">
      <Link href="/#proyectos" className="inline-flex items-center gap-2 font-display text-sm text-mute hover:text-mint">
        <span aria-hidden="true">←</span> {t.project.back}
      </Link>
      <div className="mt-8">
        <ProjectDetail project={project} />
      </div>
    </div>
  );
}
