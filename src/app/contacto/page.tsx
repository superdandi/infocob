"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Mail, MapPin, Send } from "lucide-react";
import { useTranslation } from "@/lib/TranslationsProvider";
import LogoImage from "@/components/LogoImage";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function ContactoPage() {
  const [sent, setSent] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("meta.contacto");
  }, [t]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const message = data.get("message") as string;
    const text = `Hola INFOCOB,%0A%0ANombre: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0A${encodeURIComponent(message)}`;
    window.open(`https://wa.me/56982864145?text=${text}`, "_blank");
    setSent(true);
  }

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text mb-4">
              {t("contacto.title")}
            </h1>
            <p className="text-text-muted text-lg max-w-xl mx-auto">
              {t("contacto.subtitle")}
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-6">
            <AnimateOnScroll>
              <div className="glass-card overflow-hidden p-6 flex items-center justify-center">
                <LogoImage
                  lightSrc="/images/infocob-computacion-circuito.svg"
                  alt="INFOCOB"
                  className="h-48 sm:h-56 w-auto"
                />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="glass-card p-5">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle className="w-5 h-5 text-success" />
                  <h3 className="font-heading font-semibold text-sm text-text">{t("contacto.whatsapp")}</h3>
                </div>
                <a
                  href="https://wa.me/56982864145"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-brand transition-colors text-sm"
                >
                  +56 9 8286 4145
                </a>
                <p className="text-text-muted/60 text-xs mt-1">{t("contacto.respuesta-rapida")}</p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="glass-card p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-accent" />
                  <h3 className="font-heading font-semibold text-sm text-text">{t("contacto.email")}</h3>
                </div>
                <a
                  href="mailto:dcobosm@gmail.com"
                  className="text-text-muted hover:text-brand transition-colors text-sm"
                >
                  dcobosm@gmail.com
                </a>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="glass-card p-5">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-brand" />
                  <h3 className="font-heading font-semibold text-sm text-text">{t("contacto.ubicacion")}</h3>
                </div>
                <a
                  href="https://www.google.com/maps/dir//INFOCOB+Computaci%C3%B3n+-+Caletera+Villa+Bicentenario,+21+Ote.,+Talca,+Maule/@-35.4189312,-71.6111872,15493m/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted text-sm hover:text-brand transition-colors"
                >
                  Caletera Villa Bicentenario 21 Ote., Talca
                </a>
              </div>
            </AnimateOnScroll>
          </div>

          <div className="md:col-span-3">
            <AnimateOnScroll>
              <div className="glass-card p-6 sm:p-8">
                <h3 className="font-heading font-semibold text-lg text-text mb-6">
                  {t("contacto.form-title")}
                </h3>
                {sent ? (
                  <div className="text-center py-8">
                    <Send className="w-12 h-12 text-success mx-auto mb-4" />
                    <p className="text-text font-medium mb-2">{t("contacto.form-sent-title")}</p>
                    <p className="text-text-muted text-sm">
                      {t("contacto.form-sent-desc")}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-1.5">
                        {t("contacto.form-name")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-border text-text text-sm placeholder:text-text-muted/40 focus:outline-none focus:border-brand/30 focus:ring-1 focus:ring-brand/20 transition-all"
                        placeholder={t("contacto.form-placeholder-name")}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-1.5">
                        {t("contacto.form-email")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-border text-text text-sm placeholder:text-text-muted/40 focus:outline-none focus:border-brand/30 focus:ring-1 focus:ring-brand/20 transition-all"
                        placeholder={t("contacto.form-placeholder-email")}
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-1.5">
                        {t("contacto.form-message")}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-border text-text text-sm placeholder:text-text-muted/40 focus:outline-none focus:border-brand/30 focus:ring-1 focus:ring-brand/20 transition-all resize-none"
                        placeholder={t("contacto.form-placeholder-message")}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-bg font-semibold hover:brightness-110 transition-all duration-300 text-sm"
                    >
                      <Send size={16} />
                      {t("contacto.form-submit")}
                    </button>
                  </form>
                )}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="glass-card overflow-hidden p-2 mt-6">
                <a
                  href="https://www.google.com/maps/dir//INFOCOB+Computaci%C3%B3n+-+Caletera+Villa+Bicentenario,+21+Ote.,+Talca,+Maule/@-35.4189312,-71.6111872,15493m/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <iframe
                    src="https://maps.google.com/maps?q=-35.4118246,-71.6276807&z=15&output=embed"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación INFOCOB — Talca, Chile"
                    className="rounded-xl"
                  />
                </a>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
}