import Link from "next/link";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[80dvh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <LogoMark className="h-24 w-auto text-white/80" title="" />
      <h1 className="mt-8 text-4xl font-semibold">Esta pieza no existe</h1>
      <p className="mt-3 text-mute">La página que buscás no está o cambió de lugar.</p>
      <Link href="/" className="mt-8 bg-mint px-5 py-3 font-display text-sm font-semibold text-ink">
        Volver al inicio
      </Link>
    </div>
  );
}
