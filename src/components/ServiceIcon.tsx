import type { ServiceIcon as Icon } from "@data/services";

const paths: Record<Icon, string> = {
  window: "M3 5h18v14H3z M3 9h18 M6 7h1 M9 7h1",
  phone: "M7 2h10v20H7z M10 18h4",
  plug: "M9 2v5 M15 2v5 M6 7h12v4a6 6 0 0 1-12 0z M12 17v5",
  server: "M3 4h18v6H3z M3 14h18v6H3z M7 7h1 M7 17h1",
  database: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  bag: "M4 8h16l-1.5 13h-13z M9 8V6a3 3 0 0 1 6 0v2",
  cursor: "M5 3l14 7-6 2-2 6z M13 12l6 6",
  diamond: "M12 2l9 9-9 11-9-11z M3 11h18 M8 2l4 9 4-9",
  chart: "M3 21h18 M5 17l5-6 4 3 6-8 M15 6h5v5",
};

export function ServiceIcon({ icon, className }: { icon: Icon; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-5 w-5"}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      <path d={paths[icon]} />
    </svg>
  );
}
