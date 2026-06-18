import { ArrowRight, Globe, Brain, Package, Lightbulb } from "lucide-react";
import Link from "next/link";
import { getIcon } from "@/data/icons";
import { servicios, type Service } from "@/data/services";

function ServiceCard({ service }: { service: Service }) {
  const Icon = getIcon(service.icon);
  return (
    <div className="glass-card p-6 sm:p-8 glow-border group transition-all duration-300 hover:translate-y-[-2px]">
      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
        <Icon className="w-6 h-6 text-accent" />
      </div>
      <h3 className="font-heading font-semibold text-lg text-text mb-3">{service.title}</h3>
      <p className="text-text-muted text-sm leading-relaxed mb-4">{service.description}</p>
      {service.items && (
        <ul className="space-y-2 mb-5">
          {service.items.map((item) => (
            <li key={item} className="text-text-muted text-sm flex items-start gap-2">
              <span className="text-accent mt-0.5">&#x2022;</span>
              {item}
            </li>
          ))}
        </ul>
      )}
      <Link
        href="/contacto"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-white transition-colors"
      >
        Cotizar proyecto
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}

export default function ServiciosHome() {
  return (
    <section id="servicios" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text mb-4">
            Servicios
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Soluciones digitales completas para tu negocio, desde la idea hasta el producto final.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicios.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border text-text hover:bg-white/10 transition-all duration-300 text-sm font-medium"
          >
            Ver todos los servicios
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
