"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export function getCookieConsent(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("infocob-cookies");
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("infocob-cookies");
    if (!saved) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem("infocob-cookies", "accepted");
    setVisible(false);
    window.location.reload();
  }

  function reject() {
    localStorage.setItem("infocob-cookies", "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6">
      <div className="max-w-3xl mx-auto rounded-2xl shadow-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-border/80 sm:border-border/40 bg-white/95 dark:bg-[#0f172a]/90 sm:bg-white/85 sm:dark:bg-card backdrop-blur-md">
        <p className="text-sm text-text-muted flex-1 leading-relaxed">
          Usamos cookies de Google Analytics para entender cómo se usa el sitio y mejorar.
          No recolectamos datos personales. Podés aceptar o rechazar.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={reject}
            className="px-4 py-2 text-xs font-medium text-text-muted hover:text-text transition-colors rounded-lg border border-border hover:border-text-muted/30"
          >
            Rechazar
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-xs font-medium text-white bg-brand hover:bg-brand/90 transition-colors rounded-lg"
          >
            Aceptar
          </button>
        </div>
        <button
          onClick={reject}
          className="absolute top-3 right-3 sm:relative sm:top-auto sm:right-auto text-text-muted/40 hover:text-text-muted transition-colors"
          aria-label="Cerrar"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
