"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type ChatContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const ChatContext = createContext<ChatContextType>({ open: false, setOpen: () => {} });

export function ChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <ChatContext.Provider value={{ open, setOpen }}>{children}</ChatContext.Provider>;
}

export function useChat() {
  return useContext(ChatContext);
}
