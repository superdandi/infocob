"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getCookieConsent } from "./CookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function gtag(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag(...args);
  }
}

export function trackEvent(action: string, params?: Record<string, string | number | boolean>) {
  const consent = getCookieConsent();
  if (consent !== "accepted") return;
  gtag("event", action, params);
}

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID) return;
    if (getCookieConsent() !== "accepted") return;
    if (!document.querySelector("#ga-script")) {
      const script = document.createElement("script");
      script.id = "ga-script";
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      script.async = true;
      document.head.appendChild(script);

      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtagInit(...args: unknown[]) { (window as any).dataLayer.push(args); }
      gtagInit("js", new Date());
      gtagInit("config", GA_ID, { send_page_view: false });
    }
  }, []);

  useEffect(() => {
    if (!GA_ID) return;
    if (getCookieConsent() !== "accepted") return;
    gtag("config", GA_ID, {
      page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ""),
    });
  }, [pathname, searchParams]);

  return null;
}
