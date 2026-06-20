"use client";

import { useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { getIcon } from "@/data/icons";
import { servicios } from "@/data/services";
import { useTranslation } from "@/lib/TranslationsProvider";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function ServiciosPage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("meta.servicios");
  }, [t]);

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text mb-4">
              {t("servicios.title")}
            </h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              {t("servicios.subtitle")}
            </p>
          </div>
        </AnimateOnScroll>

        <div className="space-y-16">
          {servicios.map((service, i) => {
            const Icon = getIcon(service.icon);
            const title = t(`servicio-${i}-title`);
            const desc = t(`servicio-${i}-desc`);
            return (
              <AnimateOnScroll key={service.title}>
                <div
                  className="glass-card p-8 sm:p-10 grid grid-cols-1 md:grid-cols-5 gap-8 border-t-2 border-t-brand/20 group"
                >
                  <div className="md:col-span-2">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 group-hover:bg-brand/10 flex items-center justify-center mb-5 transition-colors duration-300">
                      <Icon className="w-7 h-7 text-accent group-hover:text-brand transition-colors duration-300" />
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-text mb-3">
                      {title}
                    </h2>
                    <p className="text-text-muted leading-relaxed">
                      {desc}
                    </p>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-sm font-semibold text-text mb-4 uppercase tracking-wider">
                      {t("servicios.incluye")}
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.items?.map((_item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-border/50"
                        >
                          <span className="text-brand/60 mt-0.5 shrink-0">&#x2713;</span>
                          <span className="text-text-muted text-sm">{t(`servicio-${i}-item-${idx}`)}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`https://wa.me/56982864145?text=${encodeURIComponent(t("whatsapp.cotizar", { title }))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-accent text-bg font-medium hover:brightness-110 transition-all duration-300 text-sm"
                    >
                      <MessageCircle size={16} />
                      {t("servicios.cotizar", { title: title.toLowerCase() })}
                    </a>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        <hr className="section-divider my-16" />

        <AnimateOnScroll>
          <div className="mt-16 glass-card p-8 sm:p-10 text-center">
            <h2 className="font-heading text-2xl font-bold text-text mb-3">
              {t("servicios.no-encuentras")}
            </h2>
            <p className="text-text-muted mb-6 max-w-lg mx-auto">
              {t("servicios.no-encuentras-desc")}
            </p>
            <a
              href={`https://wa.me/56982864145?text=${encodeURIComponent(t("whatsapp.idea"))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl glass border border-border text-text hover:bg-brand/10 hover:border-brand/20 transition-all duration-300"
            >
              <MessageCircle size={18} />
              {t("servicios.hablemos")}
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
}