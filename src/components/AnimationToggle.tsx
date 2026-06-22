"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

type MotionState = "auto" | "disabled" | "enabled";

export default function AnimationToggle() {
  const [motion, setMotion] = useState<MotionState>("auto");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("infocob-motion") as MotionState | null;
      if (stored === "disabled" || stored === "enabled") {
        setMotion(stored);
        document.documentElement.setAttribute("data-motion", stored);
        return;
      }
    } catch {}
    setMotion("enabled");
    document.documentElement.setAttribute("data-motion", "enabled");
  }, []);

  function toggle() {
    const cycle: MotionState[] = ["enabled", "disabled", "auto"];
    const idx = motion === "auto" ? 2 : motion === "disabled" ? 1 : 0;
    const next = cycle[(idx + 1) % cycle.length];
    setMotion(next);
    try {
      if (next === "auto") {
        localStorage.removeItem("infocob-motion");
      } else {
        localStorage.setItem("infocob-motion", next);
      }
    } catch {}
    if (next === "auto") {
      document.documentElement.removeAttribute("data-motion");
    } else {
      document.documentElement.setAttribute("data-motion", next);
    }
  }

  return (
    <button
      onClick={toggle}
      className={`p-2 rounded-lg transition-all duration-200 ${
        motion === "disabled"
          ? "text-text-muted/30 hover:text-text-muted hover:bg-white/5"
          : "text-accent hover:text-accent/80 hover:bg-accent/10"
      }`}
      aria-label={
        motion === "disabled"
          ? "Activar animaciones"
          : motion === "enabled"
          ? "Restaurar animaciones automáticas"
          : "Desactivar animaciones"
      }
      title={
        motion === "disabled"
          ? "Animaciones desactivadas — haz clic para activar"
          : motion === "enabled"
          ? "Animaciones forzadas — haz clic para desactivar"
          : "Animaciones automáticas — haz clic para forzar encendido"
      }
    >
      <Sparkles
        size={18}
        className={motion === "disabled" ? "opacity-30" : ""}
      />
    </button>
  );
}
