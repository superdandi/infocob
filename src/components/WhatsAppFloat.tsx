import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/56982864145?text=Hola%20INFOCOB%2C%20quiero%20cotizar%20un%20proyecto"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-success text-white shadow-lg shadow-success/25 hover:scale-110 hover:shadow-xl hover:shadow-success/30 transition-all duration-300 animate-fade-in"
      aria-label="WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
