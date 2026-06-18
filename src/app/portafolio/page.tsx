import { MessageCircle, FolderOpen } from "lucide-react";
import Link from "next/link";

export default function PortafolioPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FolderOpen className="w-16 h-16 text-accent/50 mx-auto mb-6" />
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text mb-4">
          Portafolio
        </h1>
        <p className="text-text-muted text-lg max-w-lg mx-auto mb-8">
          Esta sección se está preparando. Pronto podrás ver los proyectos
          y trabajos realizados.
        </p>
        <p className="text-text-muted text-sm mb-10 max-w-md mx-auto">
          Mientras tanto, puedes ver uno de mis proyectos más recientes:
        </p>
        <a
          href="https://superdandi.github.io/vizcoso/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border text-text hover:bg-white/10 transition-all duration-300 text-sm mb-10"
        >
          VIZCOSO Entertainment → Estudio musical
        </a>
        <div>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-bg font-semibold hover:brightness-110 transition-all duration-300"
          >
            <MessageCircle size={18} />
            Hablemos de tu proyecto
          </Link>
        </div>
      </div>
    </div>
  );
}
