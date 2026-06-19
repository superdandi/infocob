"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="glass-card p-10 sm:p-16">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <span className="font-heading text-5xl font-extrabold text-accent">404</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-text mb-4">
            Página no encontrada
          </h1>
          <p className="text-text-muted text-sm leading-relaxed mb-4">
            La página que buscas no existe, fue movida o está fuera de servicio.
          </p>
          <p className="text-text-muted/60 text-xs mb-8">
            Si crees que esto es un error, contáctame por WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-bg font-medium hover:brightness-110 transition-all duration-300 text-sm"
            >
              <Home size={16} />
              Volver al inicio
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border text-text hover:bg-white/10 transition-all duration-300 text-sm"
            >
              <ArrowLeft size={16} />
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
