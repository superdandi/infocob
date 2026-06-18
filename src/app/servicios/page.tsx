import { ArrowRight, MessageCircle, Globe, Brain, Package, Lightbulb } from "lucide-react";
import { getIcon } from "@/data/icons";
import { servicios } from "@/data/services";

function IconDisplay({ name }: { name: string }) {
  const Icon = getIcon(name);
  return <Icon className="w-5 h-5 text-accent" />;
}

export default function ServiciosPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text mb-4">
            Servicios
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Soluciones digitales completas: desde el diseño y desarrollo web hasta la
            integración de inteligencia artificial y productos digitales a medida.
          </p>
        </div>

        <div className="space-y-16">
          {servicios.map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <div
                key={service.title}
                className="glass-card p-8 sm:p-10 grid grid-cols-1 md:grid-cols-5 gap-8"
              >
                <div className="md:col-span-2">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-text mb-3">
                    {service.title}
                  </h2>
                  <p className="text-text-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="md:col-span-3">
                  <h3 className="text-sm font-semibold text-text mb-4 uppercase tracking-wider">
                    Incluye
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.items?.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-border/50"
                      >
                        <span className="text-accent mt-0.5 shrink-0">&#x2713;</span>
                        <span className="text-text-muted text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/56982864145?text=Hola%20INFOCOB%2C%20quiero%20cotizar%20${encodeURIComponent(service.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-accent text-bg font-medium hover:brightness-110 transition-all duration-300 text-sm"
                  >
                    <MessageCircle size={16} />
                    Cotizar {service.title.toLowerCase()}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 glass-card p-8 sm:p-10 text-center">
          <h2 className="font-heading text-2xl font-bold text-text mb-3">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-text-muted mb-6 max-w-lg mx-auto">
            Cada proyecto es único. Conversemos tu idea y te propongo la mejor solución.
          </p>
          <a
            href="https://wa.me/56982864145?text=Hola%20INFOCOB%2C%20tengo%20una%20idea%20que%20quiero%20desarrollar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl glass border border-border text-text hover:bg-white/10 transition-all duration-300"
          >
            <MessageCircle size={18} />
            Hablemos de tu proyecto
          </a>
        </div>
      </div>
    </div>
  );
}
