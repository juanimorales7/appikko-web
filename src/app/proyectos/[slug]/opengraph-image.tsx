import { getProject, projects } from "@data/projects";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "Proyecto de APPIKO TECH";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  return ogImage({
    kicker: p ? `${p.type} · ${p.sector}` : "Proyecto",
    title: p?.name ?? "APPIKO TECH",
    subtitle: p?.short ?? "",
  });
}
