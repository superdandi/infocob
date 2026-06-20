"use client";

import { useEffect } from "react";
import { FolderOpen } from "lucide-react";
import PortfolioGrid from "@/components/PortfolioGrid";
import { useTranslation } from "@/lib/TranslationsProvider";

export default function PortafolioPage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("meta.portafolio");
  }, [t]);

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <FolderOpen className="w-12 h-12 text-accent/50 mx-auto mb-4" />
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text mb-4">
            {t("portfolio.title")}
          </h1>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            {t("portfolio.subtitle")}
          </p>
        </div>

        <PortfolioGrid />

        <div className="text-center mt-16 glass-card p-8">
          <h2 className="font-heading text-2xl font-semibold text-text mb-3">
            {t("portfolio.cta-title")}
          </h2>
          <p className="text-text-muted max-w-md mx-auto mb-6">
            {t("portfolio.cta-desc")}
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-bg font-semibold hover:brightness-110 transition-all duration-300"
          >
            {t("portfolio.cta-btn")}
          </a>
        </div>
      </div>
    </div>
  );
}