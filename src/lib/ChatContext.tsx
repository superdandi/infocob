"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type ChatContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
  presetMessage: string | null;
  setPresetMessage: (v: string | null) => void;
};

const ChatContext = createContext<ChatContextType>({ open: false, setOpen: () => {}, presetMessage: null, setPresetMessage: () => {} });

export function ChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [presetMessage, setPresetMessage] = useState<string | null>(null);
  return <ChatContext.Provider value={{ open, setOpen, presetMessage, setPresetMessage }}>{children}</ChatContext.Provider>;
}

export function useChat() {
  return useContext(ChatContext);
}
