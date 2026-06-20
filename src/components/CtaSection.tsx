"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/TranslationsProvider";

export default function CtaSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="glass-card p-10 sm:p-16 glow-border">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-text-muted text-lg max-w-lg mx-auto mb-8">
            {t("cta.desc")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-bg font-semibold hover:brightness-110 transition-all duration-300 shadow-lg shadow-accent/20"
            >
              {t("cta.contactame")}
              <ArrowRight size={18} />
            </Link>
            <a
              href={`https://wa.me/56982864145?text=${encodeURIComponent(t("whatsapp.general"))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl glass border border-border text-text hover:bg-brand/10 hover:border-brand/20 transition-all duration-300"
            >
              <MessageCircle size={18} />
              {t("cta.whatsapp")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}