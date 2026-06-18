import { Clock, Target, Eye, Heart } from "lucide-react";
import Link from "next/link";

export default function SobreMiPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-text-muted mb-6">
            <span className="w-2 h-2 rounded-full bg-brand" />
            INFOCOB — Desde 2008
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text mb-4">
            Sobre mí
          </h1>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Daniel Cobos Mansilla — Técnico en sistemas informáticos, desarrollador web
            y creador de productos digitales.
          </p>
        </div>

        <div className="glass-card p-8 sm:p-10 mb-10">
          <h2 className="font-heading text-2xl font-bold text-text mb-4 flex items-center gap-3">
            <Clock className="w-6 h-6 text-brand" />
            Historia
          </h2>
          <p className="text-text-muted leading-relaxed mb-4">
            INFOCOB Computación nace con el afán de entregar servicios informáticos
            de una manera integral, personalizada y en terreno, abriendo sus puertas
            al público el <strong className="text-text">12 de noviembre de 2008</strong>.
            Con dicho espíritu y compromiso, INFOCOB entrega calidad y cercanía por
            un precio accesible a la ciudad de Talca.
          </p>
          <p className="text-text-muted leading-relaxed">
            En nuestro tiempo de vida, hemos colaborado en el desarrollo de
            análisis y programación de software para clientes especializados;
            creación, diseño, desarrollo y mantención de sitios web para empresas
            y particulares; desarrollo de aplicaciones multimedia y servicio
            técnico a usuarios y empresas. Hoy, enfocados en el diseño de nuevos
            productos digitales, desarrollo web moderno e integración de
            inteligencia artificial.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="glass-card p-6 text-center">
            <Target className="w-8 h-8 text-accent mx-auto mb-3" />
            <h3 className="font-heading font-semibold text-text mb-2">Misión</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Ofrecer una alternativa económica y competente en la entrega de
              soluciones técnico-computacionales e informáticas, donde el trato
              personalizado con el cliente es el elemento diferenciador.
            </p>
          </div>
          <div className="glass-card p-6 text-center">
            <Eye className="w-8 h-8 text-accent mx-auto mb-3" />
            <h3 className="font-heading font-semibold text-text mb-2">Visión</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Ser un referente competitivo y original frente al desarrollo de
              servicios digitales, ampliando el espectro de diseño, desarrollo
              web y productos digitales con responsabilidad ecológica y social.
            </p>
          </div>
          <div className="glass-card p-6 text-center">
            <Heart className="w-8 h-8 text-brand mx-auto mb-3" />
            <h3 className="font-heading font-semibold text-text mb-2">Valores</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Integridad, responsabilidad social y economía. Ofrecer opciones,
              acercar la tecnología a las personas y estar orientado al cliente.
            </p>
          </div>
        </div>

        <div className="glass-card p-8 sm:p-10 text-center">
          <p className="text-text-muted text-lg mb-6">
            ¿Tienes un proyecto en mente? Hablemos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-bg font-semibold hover:brightness-110 transition-all duration-300"
            >
              Contacto
            </Link>
            <a
              href="https://wa.me/56982864145"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl glass border border-border text-text hover:bg-white/10 transition-all duration-300"
            >
              +56 9 8286 4145
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
