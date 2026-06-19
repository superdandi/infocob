"use client";

import { Clock, Target, Eye, Heart } from "lucide-react";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { useTranslation } from "@/lib/TranslationsProvider";

export default function SobreMiPage() {
  const { t } = useTranslation();

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-text-muted mb-6">
            <span className="w-2 h-2 rounded-full bg-brand" />
            {t("sobre-mi.badge")}
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text mb-4">
            {t("sobre-mi.title")}
          </h1>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            {t("sobre-mi.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="glass-card overflow-hidden">
            <div className="aspect-[3/2] overflow-hidden">
              <img
                src={asset("/images/DC.jpg")}
                alt="Daniel Cobos"
                className="w-full h-full object-cover object-left"
              />
            </div>
            <div className="p-5">
              <h2 className="font-heading font-bold text-text text-lg">Daniel Cobos</h2>
              <p className="text-text-muted text-sm">
                {t("sobre-mi.desc-cargo")}
              </p>
              <p className="text-text-muted/60 text-xs mt-2">
                {t("sobre-mi.desc-local")}
              </p>
            </div>
          </div>
          <div className="md:col-span-2 glass-card p-8 sm:p-10">
            <h2 className="font-heading text-2xl font-bold text-text mb-4 flex items-center gap-3">
              <Clock className="w-6 h-6 text-brand" />
              {t("sobre-mi.historia")}
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              {t("sobre-mi.historia-p1")}
            </p>
            <p className="text-text-muted leading-relaxed">
              {t("sobre-mi.historia-p2")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="glass-card p-6 text-center">
            <Target className="w-8 h-8 text-accent mx-auto mb-3" />
            <h3 className="font-heading font-semibold text-text mb-2">{t("sobre-mi.mision")}</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {t("sobre-mi.mision-desc")}
            </p>
          </div>
          <div className="glass-card p-6 text-center">
            <Eye className="w-8 h-8 text-accent mx-auto mb-3" />
            <h3 className="font-heading font-semibold text-text mb-2">{t("sobre-mi.vision")}</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {t("sobre-mi.vision-desc")}
            </p>
          </div>
          <div className="glass-card p-6 text-center">
            <Heart className="w-8 h-8 text-brand mx-auto mb-3" />
            <h3 className="font-heading font-semibold text-text mb-2">{t("sobre-mi.valores")}</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {t("sobre-mi.valores-desc")}
            </p>
          </div>
        </div>

        <div className="glass-card p-8 sm:p-10 text-center">
          <p className="text-text-muted text-lg mb-6">
            {t("sobre-mi.cta")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-bg font-semibold hover:brightness-110 transition-all duration-300"
            >
              {t("sobre-mi.cta-contacto")}
            </Link>
            <a
              href="https://wa.me/56982864145"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl glass border border-border text-text hover:bg-white/10 transition-all duration-300"
            >
              +56 9 8286 4145
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
