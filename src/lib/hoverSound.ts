"use client";

import { useEffect } from "react";

let ctx: AudioContext | null = null;

function play() {
  try {
    if (!ctx) ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 1200;
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.06);
  } catch {}
}

export function useHoverSound() {
  useEffect(() => {
    const sel = 'a[href], button, [data-sound]';
    const handler = () => play();
    const els = document.querySelectorAll<HTMLElement>(sel);
    els.forEach((el) => el.addEventListener("mouseenter", handler));
    const observer = new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        if (!el.dataset._sound) {
          el.dataset._sound = "1";
          el.addEventListener("mouseenter", handler);
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
}
