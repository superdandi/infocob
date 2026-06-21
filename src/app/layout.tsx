import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import StickyCtaMobile from "@/components/StickyCtaMobile";
import HoverSound from "@/components/HoverSound";
import CircuitDrawAnimation from "@/components/CircuitDrawAnimation";
import AiChat from "@/components/AiChat";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { TranslationsProvider } from "@/lib/TranslationsProvider";
import { ChatProvider } from "@/lib/ChatContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "INFOCOB — Diseño & Desarrollo Digital",
  description:
    "Diseño de nuevos productos digitales. Desarrollo web, integración de IA, aplicaciones web y productos digitales en Talca, Chile.",
  icons: { icon: "/favicon.ico" },
  metadataBase: new URL("https://superdandi.github.io"),
  openGraph: {
    title: "INFOCOB — Diseño & Desarrollo Digital",
    description:
      "Diseño de nuevos productos digitales. Desarrollo web, IA y productos digitales en Talca, Chile.",
    type: "website",
    images: [{ url: "/infocob/images/infocob-logo.svg", width: 380, height: 280 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={cn(
        inter.variable,
        jakarta.variable,
        jetbrains.variable,
        "scroll-smooth"
      )}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#0b0d17" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("infocob-theme");var d=document.documentElement;if(t==="light"||(!t&&matchMedia("(prefers-color-scheme:light)").matches)){d.classList.add("light")}else{d.classList.add("dark")}}catch(e){document.documentElement.classList.add("dark")}})()`,
          }}
        />
      </head>
      <body className="antialiased bg-bg text-text min-h-screen flex flex-col grid-bg">
        <ThemeProvider>
          <TranslationsProvider>
            <ChatProvider>
              <Navbar />
              <CircuitDrawAnimation />
              <main className="flex-1 relative z-10 animate-fade-in">{children}</main>
              <Footer />
              <WhatsAppFloat />
              <StickyCtaMobile />
              <HoverSound />
              <AiChat />
              <Suspense fallback={null}>
                <Analytics />
              </Suspense>
              <CookieConsent />
            </ChatProvider>
          </TranslationsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
