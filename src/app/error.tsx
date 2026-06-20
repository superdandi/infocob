"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-6">
          <span className="font-heading text-4xl font-extrabold text-brand">!</span>
        </div>
        <h1 className="font-heading text-2xl font-bold text-text mb-4">
          Algo salió mal
        </h1>
        <p className="text-text-muted text-sm mb-8">
          Ocurrió un error inesperado. Podés intentar de nuevo o volver al inicio.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-bg font-medium hover:brightness-110 transition-all text-sm"
          >
            Intentar de nuevo
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border text-text hover:bg-white/10 transition-all text-sm"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
