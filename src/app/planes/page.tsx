"use client";

import { useEffect } from "react";
import { Check, X, MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { planes, type Plan } from "@/data/plans";
import { useTranslation } from "@/lib/TranslationsProvider";
import { useChat } from "@/lib/ChatContext";
import AnimateOnScroll from "@/components/AnimateOnScroll";

function gaTrack(action: string, p?: Record<string, string | number | boolean>) {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", action, p);
  }
}

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

function PlanCard({ plan }: { plan: Plan }) {
  const { t } = useTranslation();
  const { setOpen } = useChat();

  return (
    <div
      className={`glass-card p-6 sm:p-8 flex flex-col relative ${
        plan.popular ? "ring-2 ring-accent scale-[1.02] sm:scale-105" : ""
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-bg text-[10px] font-bold uppercase tracking-wider shadow-lg">
          {t("planes.popular")}
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-heading text-xl font-bold text-text mb-1">{plan.name}</h3>
        <p className="text-xs text-text-muted">{plan.idealFor}</p>
      </div>

      <div className="mb-6">
        <div className="font-heading text-3xl font-extrabold text-text">
          {formatPrice(plan.priceMin)}
          <span className="text-lg text-text-muted font-normal"> - {formatPrice(plan.priceMax)}</span>
        </div>
        <div className="text-xs text-text-muted mt-1">
          {t("planes.entrega")}: {plan.delivery}
        </div>
      </div>

      <div className="space-y-2.5 mb-8 flex-1">
        {plan.features.map((f, i) => (
          <div key={i} className="flex items-start gap-2.5">
            {f.included ? (
              <Check size={14} className="text-accent shrink-0 mt-0.5" />
            ) : (
              <X size={14} className="text-text-muted/40 shrink-0 mt-0.5" />
            )}
            <span className={`text-sm leading-snug ${f.included ? "text-text" : "text-text-muted/40"}`}>
              {f.text}
            </span>
          </div>
        ))}
      </div>

      <div className="mb-6 p-3 rounded-xl bg-white/[0.03] border border-border/40">
        <div className="text-xs text-text-muted">{t("planes.mantenimiento")}</div>
        <div className="text-sm font-bold text-text">{formatPrice(plan.maintenance)}/mes</div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => { setOpen(true); gaTrack("plan_chat_cta", { plan: plan.id }); }}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent text-bg font-semibold hover:brightness-110 transition-all duration-300 text-sm"
        >
          <Sparkles size={15} />
          {t("planes.cta-chat")}
        </button>
        <a
          href={`https://wa.me/56982864145?text=${encodeURIComponent("Hola Daniel, quiero cotizar el plan " + plan.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl glass border border-border text-text hover:bg-white/10 transition-all duration-300 text-sm"
        >
          <MessageCircle size={15} />
          {t("planes.cta-whatsapp")}
        </a>
      </div>
    </div>
  );
}

export default function PlanesPage() {
  const { t } = useTranslation();
  const { setOpen } = useChat();

  useEffect(() => {
    document.title = "INFOCOB — Planes";
  }, [t]);

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-text-muted mb-6">
              <Sparkles size={12} className="text-accent" />
              {t("planes.badge")}
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text mb-4">
              {t("planes.title")}
            </h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              {t("planes.subtitle")}
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start max-w-5xl mx-auto">
          {planes.map((plan) => (
            <AnimateOnScroll key={plan.id}>
              <PlanCard plan={plan} />
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll>
          <div className="text-center mt-16 glass-card p-8 sm:p-10 max-w-2xl mx-auto">
            <h2 className="font-heading text-xl font-bold text-text mb-3">
              {t("planes.no-encuentras")}
            </h2>
            <p className="text-text-muted text-sm mb-6 max-w-lg mx-auto">
              {t("planes.no-encuentras-desc")}
            </p>
            <button
              onClick={() => { setOpen(true); gaTrack("planes_personalizado_cta"); }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-bg font-semibold hover:brightness-110 transition-all duration-300 text-sm"
            >
              {t("planes.cta-personalizado")}
              <ArrowRight size={16} />
            </button>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
