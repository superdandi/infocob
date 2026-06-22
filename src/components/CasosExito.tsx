"use client";

import { Quote, ExternalLink } from "lucide-react";
import { casosExito } from "@/data/casos-exito";
import { useTranslation } from "@/lib/TranslationsProvider";
import Link from "next/link";

export default function CasosExito() {
  const { t } = useTranslation();

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-brand mb-3">
            {t("casos-exito.badge")}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text mb-4">
            {t("casos-exito.title")}
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            {t("casos-exito.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {casosExito.map((caso) => (
            <div
              key={caso.id}
              className="glass-card p-6 sm:p-8 flex flex-col"
            >
              <div className="mb-5">
                <p className="text-xs text-brand font-semibold uppercase tracking-wider mb-1">
                  {caso.rubro}
                </p>
                <h3 className="font-heading text-xl font-bold text-text">
                  {caso.client}
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {caso.metricas.map((m) => (
                  <div key={m.label} className="text-center">
                    <p className="text-lg sm:text-xl font-bold text-brand truncate">
                      {m.valor}
                    </p>
                    <p className="text-[10px] sm:text-xs text-text-muted leading-tight mt-0.5">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 text-sm text-text-muted flex-1">
                <div>
                  <p className="font-semibold text-text text-xs uppercase tracking-wider mb-1">
                    {t("casos-exito.desafio")}
                  </p>
                  <p>{caso.desafio}</p>
                </div>
                <div>
                  <p className="font-semibold text-text text-xs uppercase tracking-wider mb-1">
                    {t("casos-exito.solucion")}
                  </p>
                  <p>{caso.solucion}</p>
                </div>
                <div>
                  <p className="font-semibold text-text text-xs uppercase tracking-wider mb-1">
                    {t("casos-exito.resultados")}
                  </p>
                  <ul className="list-disc list-inside space-y-0.5">
                    {caso.resultados.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-brand/10 pt-4 mb-4">
                <Quote className="w-5 h-5 text-brand/30 mb-2" />
                <p className="text-sm text-text-muted italic leading-relaxed mb-2">
                  &ldquo;{caso.testimonio}&rdquo;
                </p>
                <p className="text-xs font-semibold text-text">{caso.testimonioAutor}</p>
                <p className="text-xs text-text-muted/60">{caso.testimonioCargo}</p>
              </div>

              <a
                href={`https://${caso.sitio}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand/80 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {caso.sitio}
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/portafolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-text transition-colors border border-text-muted/30 hover:border-text/50 rounded-full px-6 py-3"
          >
            {t("casos-exito.ver-mas")}
          </Link>
        </div>
      </div>
    </section>
  );
}
