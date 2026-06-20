"use client";

import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { useTranslation } from "@/lib/TranslationsProvider";

export default function TestimonialsSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 sm:py-28 bg-bg-secondary/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text mb-4">
            {t("testimonios.title")}
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            {t("testimonios.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="glass-card p-6 sm:p-8 flex flex-col border-l-2 border-l-brand/20"
            >
              <Quote className="w-8 h-8 text-brand/30 mb-4 shrink-0" />
              <p className="text-text-muted text-sm leading-relaxed mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-brand/10 pt-4">
                <p className="text-text text-sm font-semibold">{t.author}</p>
                <p className="text-text-muted/60 text-xs">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
