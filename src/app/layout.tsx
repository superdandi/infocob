import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

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
  other: { "theme-color": "#0b0d17" },
  openGraph: {
    title: "INFOCOB — Diseño & Desarrollo Digital",
    description:
      "Diseño de nuevos productos digitales. Desarrollo web, IA y productos digitales en Talca, Chile.",
    type: "website",
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
        "scroll-smooth dark"
      )}
    >
      <body className="antialiased bg-bg text-text min-h-screen flex flex-col grid-bg">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
