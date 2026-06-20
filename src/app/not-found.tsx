"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { useTranslation } from "@/lib/TranslationsProvider";

export default function NotFound() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = "INFOCOB — 404";
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="glass-card p-10 sm:p-16">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <span className="font-heading text-5xl font-extrabold text-accent">404</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-text mb-4">
            {t("not-found.title")}
          </h1>
          <p className="text-text-muted text-sm leading-relaxed mb-4">
            {t("not-found.desc")}
          </p>
          <p className="text-text-muted/60 text-xs mb-8">
            {t("not-found.desc2")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-bg font-medium hover:brightness-110 transition-all duration-300 text-sm"
            >
              <Home size={16} />
              {t("not-found.volver")}
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border text-text hover:bg-white/10 transition-all duration-300 text-sm"
            >
              <ArrowLeft size={16} />
              {t("not-found.contacto")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}