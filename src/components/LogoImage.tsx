"use client";

import { useTheme } from "@/lib/ThemeProvider";
import { asset } from "@/lib/asset";

interface LogoImageProps {
  lightSrc: string;
  alt: string;
  className?: string;
}

export default function LogoImage({ lightSrc, alt, className }: LogoImageProps) {
  const { theme } = useTheme();

  const darkSrc = lightSrc.replace(/\.svg$/, "-dark.svg");
  const src = theme === "dark" ? darkSrc : lightSrc;

  return <img src={asset(src)} alt={alt} className={className} />;
}
