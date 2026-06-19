"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import es from "./locales/es.json";
import en from "./locales/en.json";

type Locale = "es" | "en";
type Translations = Record<string, string>;

const dict: Record<Locale, Translations> = { es, en };

interface I18nContextValue {
  locale: Locale;
  t: (key: string, params?: Record<string, string | number>) => string;
  setLocale: (l: Locale) => void;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "es",
  t: (k) => k,
  setLocale: () => {},
});

export function useTranslation() {
  return useContext(I18nContext);
}

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "es";
  const stored = localStorage.getItem("infocob-locale") as Locale | null;
  if (stored === "es" || stored === "en") return stored;
  return navigator.language.startsWith("en") ? "en" : "es";
}

export function TranslationsProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    setLocaleState(getInitialLocale());
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("infocob-locale", l);
    document.documentElement.lang = l;
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    let val = dict[locale]?.[key];
    if (!val) {
      val = dict.es[key] ?? key;
    }
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        val = val.replace(`{${k}}`, String(v));
      }
    }
    return val;
  };

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}
