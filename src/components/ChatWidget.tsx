"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    $crisp: unknown[];
    CRISP_WEBSITE_ID: string | undefined;
  }
}

const WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

export default function ChatWidget() {
  useEffect(() => {
    if (!WEBSITE_ID || window.$crisp) return;

    window.$crisp = [];
    window.CRISP_WEBSITE_ID = WEBSITE_ID;

    const script = document.createElement("script");
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return null;
}
