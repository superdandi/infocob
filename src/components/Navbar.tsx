"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/portafolio", label: "Portafolio" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <svg viewBox="0 0 400 160" className="h-10 w-auto" fill="none">
              <defs>
                <linearGradient id="brandGradMob" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ba112a" />
                  <stop offset="100%" stopColor="#e01e3e" />
                </linearGradient>
              </defs>
              <g stroke="#ba112a" strokeWidth="1.5" opacity="0.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 20 L50 20 L50 40 L80 40" />
                <path d="M20 40 L40 40 L40 60 L60 60 L60 80" />
                <path d="M10 60 L30 60 L30 30 L60 30" />
                <circle cx="20" cy="20" r="3" fill="#ba112a" />
                <circle cx="80" cy="40" r="2.5" fill="#ba112a" />
                <circle cx="60" cy="80" r="2" fill="#ba112a" />
                <path d="M340 30 L370 30 L370 50 L390 50" />
                <path d="M330 50 L360 50 L360 20 L390 20" />
                <circle cx="390" cy="50" r="3" fill="#ba112a" />
                <path d="M160 140 L200 140 L200 130 L240 130 L240 140 L280 140" />
              </g>
              <text x="200" y="95" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="58" fontWeight="800" letterSpacing="5" fill="white" opacity="0.95">
                INFOCOB
              </text>
            </svg>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "text-accent bg-accent/10"
                    : "text-text-muted hover:text-text hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-text-muted hover:text-text hover:bg-white/5 transition"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg text-sm font-medium transition-all",
                  pathname === link.href
                    ? "text-accent bg-accent/10"
                    : "text-text-muted hover:text-text hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
