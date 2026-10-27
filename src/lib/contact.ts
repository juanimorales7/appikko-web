/** Validación compartida entre el formulario (navegador) y /api/contacto (servidor). */
export type ContactData = { name: string; email: string; need: string; message: string };

export const LIMITS = { name: 120, email: 200, need: 80, message: 5000 } as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(d: Partial<ContactData>) {
  const errors: Partial<Record<keyof ContactData, "required" | "invalid">> = {};
  if (!d.name?.trim()) errors.name = "required";
  if (!d.email?.trim()) errors.email = "required";
  else if (!EMAIL.test(d.email.trim())) errors.email = "invalid";
  if (!d.need?.trim()) errors.need = "required";
  if (!d.message?.trim()) errors.message = "required";
  for (const k of Object.keys(LIMITS) as (keyof ContactData)[]) {
    if ((d[k]?.length ?? 0) > LIMITS[k]) errors[k] = "invalid";
  }
  return errors;
}
