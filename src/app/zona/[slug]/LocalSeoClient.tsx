"use client";

import { useEffect } from "react";
import { MessageCircle, Sparkles, ChevronDown, CheckCircle } from "lucide-react";
import { type LocalSeoPage } from "@/data/seo-local";
import { useChat } from "@/lib/ChatContext";
import { useTranslation } from "@/lib/TranslationsProvider";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function LocalSeoClient({ page }: { page: LocalSeoPage }) {
  const { t } = useTranslation();
  const { setOpen } = useChat();

  useEffect(() => {
    document.title = page.metaTitle;
  }, [page.metaTitle]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "INFOCOB Computación",
    description: page.metaDesc,
    url: `https://superdandi.github.io/infocob/zona/${page.slug}`,
    telephone: "+56982864145",
    email: "dcobosm@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Talca",
      addressRegion: "Maule",
      addressCountry: "CL",
    },
    areaServed: ["Talca", "Región del Maule", "Chile"],
    priceRange: "$250.000 - $1.200.000",
    foundingDate: "2008",
    founder: { "@type": "Person", name: "Daniel Cobos" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-text-muted mb-6">
                <CheckCircle size={12} className="text-accent" />
                INFOCOB — Desde 2008 en Talca, Chile
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text mb-4">
                {page.h1}
              </h1>
              <p className="text-text-muted text-lg max-w-2xl mx-auto">
                {page.heroDesc}
              </p>
            </div>
          </AnimateOnScroll>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-bg font-semibold hover:brightness-110 transition-all duration-300 shadow-lg shadow-accent/20"
            >
              <Sparkles size={18} />
              {t("planes.cta-chat")}
            </button>
            <a
              href={`https://wa.me/56982864145?text=${encodeURIComponent("Hola Daniel, vi la página de " + page.keyword + " y quiero cotizar")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl glass border border-border text-text hover:bg-white/10 transition-all duration-300"
            >
              <MessageCircle size={18} />
              {t("contacto.form-enviar-whatsapp")}
            </a>
          </div>

          {page.sections.map((section, i) => (
            <AnimateOnScroll key={i}>
              <div className="glass-card p-8 sm:p-10 mb-8">
                <h2 className="font-heading text-2xl font-bold text-text mb-6">
                  {section.title}
                </h2>
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-text-muted leading-relaxed mb-4 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            </AnimateOnScroll>
          ))}

          <AnimateOnScroll>
            <div className="glass-card p-8 sm:p-10 mb-8">
              <h2 className="font-heading text-2xl font-bold text-text mb-6">
                Preguntas frecuentes
              </h2>
              <div className="space-y-4">
                {page.faqs.map((faq, i) => (
                  <details key={i} className="group border border-border/40 rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer text-text font-medium text-sm hover:bg-white/[0.02] transition-colors">
                      {faq.q}
                      <ChevronDown size={16} className="text-text-muted shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-5 pb-4 text-text-muted text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="text-center glass-card p-8 sm:p-10">
              <h2 className="font-heading text-xl font-bold text-text mb-3">
                ¿Listo para empezar?
              </h2>
              <p className="text-text-muted text-sm mb-6 max-w-lg mx-auto">
                Conversemos sin compromiso. Te ayudo a elegir el plan ideal para tu proyecto.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-bg font-semibold hover:brightness-110 transition-all duration-300 text-sm"
                >
                  <Sparkles size={16} />
                  {t("planes.cta-chat")}
                </button>
                <a
                  href={`https://wa.me/56982864145?text=${encodeURIComponent("Hola Daniel, quiero información sobre " + page.keyword)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border text-text hover:bg-white/10 transition-all duration-300 text-sm"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </>
  );
}
