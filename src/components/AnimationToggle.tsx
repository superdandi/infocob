"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

type MotionState = "auto" | "disabled" | "enabled";

export default function AnimationToggle() {
  const [motion, setMotion] = useState<MotionState>("auto");

  useEffect(() => {
    const stored = localStorage.getItem("infocob-motion") as MotionState | null;
    if (stored === "disabled" || stored === "enabled") {
      setMotion(stored);
      document.documentElement.setAttribute("data-motion", stored);
    }
  }, []);

  function toggle() {
    const cycle: MotionState[] = ["auto", "disabled", "enabled"];
    const next = cycle[(cycle.indexOf(motion) + 1) % cycle.length];
    setMotion(next);
    if (next === "auto") {
      localStorage.removeItem("infocob-motion");
      document.documentElement.removeAttribute("data-motion");
    } else {
      localStorage.setItem("infocob-motion", next);
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
          ? "Animaciones forzadas — haz clic para auto"
          : "Animaciones automáticas — haz clic para desactivar"
      }
    >
      <Sparkles
        size={18}
        className={motion === "disabled" ? "opacity-30" : motion === "enabled" ? "" : ""}
      />
    </button>
  );
}
