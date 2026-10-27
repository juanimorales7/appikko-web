import { notFound } from "next/navigation";
import { getProject, projects } from "@data/projects";
import { ProjectDetail } from "@/components/ProjectDetail";
import { ProjectModal } from "@/components/ProjectModal";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/** Al abrir un proyecto desde el sitio se ve como modal; con el link directo, como página. */
export default async function ProjectModalPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <ProjectModal title={project.name}>
      <ProjectDetail project={project} headingLevel={2} />
    </ProjectModal>
  );
}
