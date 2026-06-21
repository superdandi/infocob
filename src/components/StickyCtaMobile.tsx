"use client";

import { MessageCircle } from "lucide-react";
import { useChat } from "@/lib/ChatContext";
import { useTranslation } from "@/lib/TranslationsProvider";

export default function StickyCtaMobile() {
  const { setOpen } = useChat();
  const { t } = useTranslation();

  return (
    <button
      onClick={() => setOpen(true)}
      className="fixed bottom-6 right-6 z-50 md:hidden flex items-center gap-2 px-5 py-3 rounded-full bg-brand text-white shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/30 hover:scale-105 transition-all duration-300 animate-fade-in"
      aria-label={t("nav.chat")}
    >
      <MessageCircle size={20} />
      <span className="text-sm font-semibold">{t("nav.chat")}</span>
    </button>
  );
}
