import { ImageResponse } from "next/og";
import { FACETS, GREEN, GREEN_LINES, STROKE, VIEW, outlinePath, toPath } from "./logo";

export const ogSize = { width: 1200, height: 630 };

const logoSvg = () =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW.w} ${VIEW.h}">` +
  `<g fill="none" stroke="#fff" stroke-width="${STROKE}" stroke-linejoin="miter" stroke-miterlimit="10">` +
  FACETS.map((f) => `<path d="${outlinePath(f.points, f.openEdge)}"/>`).join("") +
  `</g><g fill="none" stroke="${GREEN}" stroke-width="${STROKE}">` +
  GREEN_LINES.map((l) => `<path d="${toPath(l, false)}"/>`).join("") +
  `</g></svg>`;

export const logoDataUri = () => `data:image/svg+xml;base64,${Buffer.from(logoSvg()).toString("base64")}`;

/** Imagen para compartir (Open Graph): la A + título + bajada. */
export function ogImage({ kicker, title, subtitle }: { kicker: string; title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#050505",
          color: "#fff",
          padding: "72px",
          position: "relative",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "62%" }}>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: GREEN }}>{kicker.toUpperCase()}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>{title}</div>
            <div style={{ marginTop: 24, fontSize: 30, color: "#a3a8a5", lineHeight: 1.3 }}>{subtitle}</div>
          </div>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 8 }}>
            APPIKO<span style={{ color: GREEN, marginLeft: 12 }}>TECH</span>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoDataUri()} width={420} height={350} style={{ position: "absolute", right: 72, top: 140 }} alt="" />
      </div>
    ),
    ogSize,
  );
}
