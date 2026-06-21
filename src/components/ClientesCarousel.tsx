"use client";

import { asset } from "@/lib/asset";
import { logosClientes } from "@/data/logos-clientes";
import { useTranslation } from "@/lib/TranslationsProvider";

function getInitials(name: string): string {
  return name
    .split(/[\s]+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function LogoCard({ nombre, imagen }: { nombre: string; imagen?: string }) {
  if (imagen) {
    return (
      <div className="w-36 h-16 sm:w-44 sm:h-20 rounded-xl overflow-hidden glass-card flex items-center justify-center p-3 shrink-0">
        <img
          src={asset(imagen)}
          alt={nombre}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className="w-36 h-16 sm:w-44 sm:h-20 rounded-xl glass-card flex items-center justify-center p-3 shrink-0">
      <span className="font-heading text-sm font-bold text-text/40 select-none">
        {nombre}
      </span>
    </div>
  );
}

export default function ClientesCarousel() {
  const { t } = useTranslation();

  const duplicated = [...logosClientes, ...logosClientes, ...logosClientes];

  return (
    <section className="py-16 sm:py-20 bg-bg-secondary/80 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-text-muted/60 uppercase tracking-widest">
            {t("logos-clientes.title")}
          </p>
        </div>

        <div className="relative">
          <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused]">
            {duplicated.map((c, i) => (
              <LogoCard key={`${c.nombre}-${i}`} nombre={c.nombre} imagen={c.imagen} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
