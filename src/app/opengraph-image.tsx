import { ogImage, ogSize } from "@/lib/og";

export const alt = "APPIKO TECH · Cada proyecto, una pieza.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    kicker: "Estudio de desarrollo",
    title: "Cada proyecto, una pieza.",
    subtitle: "Webs, apps propias, APIs, servidores, marca y marketing.",
  });
}
