import { isTodo } from "@data/projects";

const DEV = process.env.NODE_ENV !== "production";

/**
 * Muestra un dato del archivo de proyectos. Si dice "TODO", en desarrollo se ve marcado
 * (para acordarte de completarlo) y en producción no se muestra.
 */
export function Field({ value, fallback = null }: { value: string | undefined; fallback?: React.ReactNode }) {
  if (!isTodo(value)) return <>{value}</>;
  if (DEV)
    return (
      <span className="border border-dashed border-amber-400/70 px-1 text-amber-300" title="Dato pendiente en data/">
        {value || "TODO"}
      </span>
    );
  return <>{fallback}</>;
}

/** Filtra los TODO de una lista (en producción). */
export const done = (list: string[]) => (DEV ? list : list.filter((v) => !isTodo(v)));
