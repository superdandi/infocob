"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/TranslationsProvider";
import { useChat } from "@/lib/ChatContext";
import LogoImage from "./LogoImage";
import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
import AnimationToggle from "./AnimationToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { setOpen: setChatOpen } = useChat();

  const links = [
    { href: "/servicios", label: t("nav.servicios") },
    { href: "/portafolio", label: t("nav.portafolio") },
    { href: "/auditoria", label: t("nav.auditoria") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/sobre-mi", label: t("nav.sobre-mi") },
    { href: "/contacto", label: t("nav.contacto") },
  ];

  const chatLink = { label: t("nav.chat") };

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
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:border-brand/20",
                  pathname === link.href
                    ? "text-accent bg-accent/10 border-l-2 border-brand/30"
                    : "text-text-muted hover:text-text hover:bg-white/5 border-l-2 border-transparent"
                )}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setChatOpen(true)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-text hover:bg-white/5 transition-all duration-200 border-l-2 border-transparent"
            >
              {chatLink.label}
            </button>
            <div className="ml-2 flex items-center gap-1 border-l border-border pl-2">
              <LangToggle />
              <ThemeToggle />
              <AnimationToggle />
            </div>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <LangToggle />
            <ThemeToggle />
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
                    ? "text-accent bg-accent/10 border-l-2 border-brand/30"
                    : "text-text-muted hover:text-text hover:bg-white/5 border-l-2 border-transparent"
                )}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { setOpen(false); setChatOpen(true); }}
              className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-text-muted hover:text-text hover:bg-white/5 border-l-2 border-transparent transition-all"
            >
              {chatLink.label}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
