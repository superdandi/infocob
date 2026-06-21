"use client";

import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { useTranslation } from "@/lib/TranslationsProvider";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

function getInitials(name: string): string {
  return name
    .split(/[\s]+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialAvatar({ author, photo }: { author: string; photo?: string }) {
  const initials = getInitials(author);

  if (photo) {
    return (
      <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-brand/20 ring-offset-2 ring-offset-bg shrink-0">
        <img
          src={asset(photo)}
          alt={author}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand/20 via-brand/10 to-brand/5 ring-2 ring-brand/20 ring-offset-2 ring-offset-bg flex items-center justify-center shrink-0">
      <span className="font-heading text-lg font-bold text-brand/60 select-none">
        {initials}
      </span>
    </div>
  );
}

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
          {testimonials.map((tm) => (
            <div
              key={tm.author}
              className="glass-card p-6 sm:p-8 flex flex-col items-center text-center"
            >
              <TestimonialAvatar author={tm.author} photo={tm.photo} />

              <Quote className="w-6 h-6 text-brand/20 mt-4 mb-3 shrink-0" />

              <p className="text-text-muted text-sm leading-relaxed mb-6 flex-1">
                &ldquo;{tm.quote}&rdquo;
              </p>

              <div className="border-t border-brand/10 pt-4 w-full">
                <p className="text-text text-sm font-semibold">{tm.author}</p>
                <p className="text-text-muted/60 text-xs">{tm.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
