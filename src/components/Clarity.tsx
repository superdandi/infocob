"use client";

import { useEffect } from "react";

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "xapdenc02k";

export default function Clarity() {
  useEffect(() => {
    if (!CLARITY_ID) return;
    if (typeof window === "undefined") return;
    try {
      if (localStorage.getItem("infocob-cookies") !== "accepted") return;
    } catch {
      return;
    }
    if ((window as any).clarity) return;
    if (document.querySelector("#clarity-script")) return;

    const script = document.createElement("script");
    script.id = "clarity-script";
    script.async = true;
    script.textContent = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${CLARITY_ID}");`;
    document.head.appendChild(script);
  }, []);

  return null;
}
