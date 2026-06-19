import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-secondary/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-text-muted mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
          Desde 2008 en Talca, Chile
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6 animate-fade-up">
          <span className="text-accent">inteligencia artificial</span>
          <br />
          <span className="text-text">aplicada al diseño de</span>
          <br />
          <span className="text-text">nuevos productos digitales</span>
        </h1>

        <p className="max-w-2xl mx-auto text-text-muted text-lg sm:text-xl leading-relaxed mb-10 animate-fade-up">
          Desarrollo web moderno, integración de inteligencia artificial y
          productos digitales a medida para potenciar tu negocio.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-bg font-semibold hover:brightness-110 transition-all duration-300 shadow-lg shadow-accent/20"
          >
            Ver servicios
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl glass border border-border text-text hover:bg-white/10 transition-all duration-300"
          >
            Contáctame
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto animate-fade-up">
          {[
            { value: "17+", label: "años", color: "text-accent" },
            { value: "45+", label: "proyectos", color: "text-accent" },
            { value: "2008", label: "desde", color: "text-brand" },
            { value: "Talca", label: "Chile", color: "text-accent" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card py-4 px-3 text-center">
              <div className={cn("font-heading text-2xl font-bold", stat.color)}>{stat.value}</div>
              <div className="text-xs text-text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
