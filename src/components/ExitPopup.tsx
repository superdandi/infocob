"use client";

import { useEffect, useState, useRef } from "react";
import { X, FileSearch } from "lucide-react";
import { useTranslation } from "@/lib/TranslationsProvider";
import { usePathname } from "next/navigation";

function gaTrack(action: string) {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", action);
  }
}

const STORAGE_KEY = "infocob-exit-shown";

export default function ExitPopup() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const dismissed = useRef(false);

  useEffect(() => {
    const already = localStorage.getItem(STORAGE_KEY);
    if (already) return;

    function onMouseLeave(e: MouseEvent) {
      if (dismissed.current) return;
      if (e.clientY > 0) return;
      if (visible) return;

      const form = document.querySelector("input, textarea, button");
      if (form && document.activeElement === form) return;

      setVisible(true);
      gaTrack("exit_popup_shown");
    }

    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, [visible]);

  useEffect(() => {
    dismissed.current = false;
    setVisible(false);
    setSent(false);
    setName("");
    setEmail("");
    setError("");
  }, [pathname]);

  function dismiss() {
    dismissed.current = true;
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, "1");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSending(true);
    setError("");

    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (key) {
      const fd = new FormData();
      fd.append("access_key", key);
      fd.append("subject", "Lead desde exit-intent popup INFOCOB");
      fd.append("from_name", "Exit Popup INFOCOB");
      fd.append("name", name.trim());
      fd.append("email", email.trim());
      fd.append("message", "Interesado en auditoría gratuita de sitio web");
      fd.append("botcheck", "");
      try {
        await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      } catch {
        setError("Error al enviar. Probá de nuevo.");
        setSending(false);
        return;
      }
    }

    setSent(true);
    setSending(false);
    gaTrack("exit_popup_lead");
    localStorage.setItem(STORAGE_KEY, "1");
    setTimeout(() => setVisible(false), 3000);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={dismiss}
      />
      <div className="relative glass-card max-w-md w-full p-6 sm:p-8 text-center animate-scale-in">
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 text-text-muted/40 hover:text-text-muted transition-colors"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>

        <div className="w-14 h-14 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
          <FileSearch className="w-7 h-7 text-brand" />
        </div>

        <h3 className="font-heading text-xl font-bold text-text mb-2">
          {t("exit-popup.title")}
        </h3>
        <p className="text-sm text-text-muted mb-6 leading-relaxed">
          {t("exit-popup.desc")}
        </p>

        {sent ? (
          <div className="py-4">
            <p className="text-success font-semibold text-sm">
              {t("exit-popup.sent")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder={t("exit-popup.name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-border text-text text-sm placeholder:text-text-muted/30 focus:outline-none focus:border-brand/30 focus:ring-1 focus:ring-brand/20 transition-all"
            />
            <input
              type="email"
              placeholder={t("exit-popup.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-border text-text text-sm placeholder:text-text-muted/30 focus:outline-none focus:border-brand/30 focus:ring-1 focus:ring-brand/20 transition-all"
            />
            {error && (
              <p className="text-red-400 text-xs">{error}</p>
            )}
            <button
              type="submit"
              disabled={sending}
              className="w-full px-5 py-2.5 rounded-xl bg-brand text-white text-sm font-semibold hover:bg-brand/90 transition-colors disabled:opacity-60"
            >
              {sending ? t("contacto.form-sending") : t("exit-popup.cta")}
            </button>
            <p className="text-xs text-text-muted/50">
              {t("exit-popup.privacy")}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
