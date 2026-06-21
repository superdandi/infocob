"use client";

import { asset } from "@/lib/asset";
import { logosClientes } from "@/data/logos-clientes";
import { useTranslation } from "@/lib/TranslationsProvider";

export default function ClientesCarousel() {
  const { t } = useTranslation();

  return (
    <section className="py-16 sm:py-20 bg-bg-secondary/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-text-muted/60 uppercase tracking-widest">
            {t("logos-clientes.title")}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          {logosClientes.map((c) => (
            <div
              key={c.nombre}
              className="w-32 h-14 sm:w-40 sm:h-18 rounded-xl glass-card flex items-center justify-center p-3 hover:scale-105 transition-transform duration-300"
            >
              <img
                src={asset(c.imagen)}
                alt={c.nombre}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
