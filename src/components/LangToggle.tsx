"use client";

import { Globe } from "lucide-react";
import { useTranslation } from "@/lib/TranslationsProvider";

export default function LangToggle() {
  const { locale, setLocale } = useTranslation();

  const next = locale === "es" ? "en" : "es";

  return (
    <button
      onClick={() => setLocale(next)}
      className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium text-text-muted hover:text-text hover:bg-white/5 transition"
      aria-label={next === "en" ? "Switch to English" : "Cambiar a español"}
    >
      <Globe size={14} />
      {locale === "es" ? "EN" : "ES"}
    </button>
  );
}
