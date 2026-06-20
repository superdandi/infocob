"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/TranslationsProvider";
import LogoImage from "./LogoImage";
import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
import AnimationToggle from "./AnimationToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const links = [
    { href: "/servicios", label: t("nav.servicios") },
    { href: "/portafolio", label: t("nav.portafolio") },
    { href: "/sobre-mi", label: t("nav.sobre-mi") },
    { href: "/contacto", label: t("nav.contacto") },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="nav-logo">
              <LogoImage
                lightSrc="/images/infocob-solo.svg"
                alt="INFOCOB"
                className="h-7 w-auto"
              />
            </div>
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
            <div className="ml-2 flex items-center gap-1 border-l border-border pl-2">
              <ThemeToggle />
              <LangToggle />
              <AnimationToggle />
            </div>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <LangToggle />
            <AnimationToggle />
            <button
              className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-white/5 transition"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
