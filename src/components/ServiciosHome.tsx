"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { getIcon } from "@/data/icons";
import { servicios, type Service } from "@/data/services";
import { useTranslation } from "@/lib/TranslationsProvider";

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { t } = useTranslation();
  const Icon = getIcon(service.icon);
  const title = t(`servicio-${index}-title`);
  const desc = t(`servicio-${index}-desc`);
  const msg = t("whatsapp.cotizar", { title });
  const whatsappUrl = `https://wa.me/56982864145?text=${encodeURIComponent(msg)}`;
  return (
    <div className="glass-card p-6 sm:p-8 glow-border group transition-all duration-300 hover:translate-y-[-2px] border-t-2 border-t-brand/20">
      <div className="w-12 h-12 rounded-xl bg-accent/10 group-hover:bg-brand/10 flex items-center justify-center mb-5 transition-colors duration-300">
        <Icon className="w-6 h-6 text-accent group-hover:text-brand transition-colors duration-300" />
      </div>
      <h3 className="font-heading font-semibold text-lg text-text mb-3">{title}</h3>
      <p className="text-text-muted text-sm leading-relaxed mb-4">{desc}</p>
      {service.items && (
        <ul className="space-y-2 mb-5">
          {service.items.slice(0, 3).map((_item, i) => (
            <li key={i} className="text-text-muted text-sm flex items-start gap-2">
              <span className="text-brand/60 mt-0.5">&#x2022;</span>
              {t(`servicio-${index}-item-${i}`)}
            </li>
          ))}
        </ul>
      )}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 text-accent font-medium hover:bg-accent hover:text-white transition-all duration-300 text-sm"
      >
        <MessageCircle size={14} />
        {t("servicios-home.cotizar")}
      </a>
    </div>
  );
}

export default function ServiciosHome() {
  const { t } = useTranslation();

  return (
    <section id="servicios" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text mb-4">
            {t("servicios-home.title")}
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            {t("servicios-home.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicios.slice(0, 4).map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border text-text hover:bg-white/10 transition-all duration-300 text-sm font-medium"
          >
            {t("servicios-home.ver-todos")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
