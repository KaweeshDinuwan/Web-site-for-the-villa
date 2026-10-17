import { MessageCircle } from "lucide-react";

export function FloatingWidgets() {
  const whatsappUrl = `https://wa.me/94775099361?text=${encodeURIComponent("Hello Nalaka Rest, I would like to inquire about booking a stay.")}`;

  return (
    <aside aria-label="WhatsApp Host Contact" className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message Nalaka Rest on WhatsApp (+94 77 509 9361)"
        className="flex items-center gap-2 bg-[#1E3A2B] text-[#F5F2EB] hover:bg-[#15291E] px-4 py-3 rounded-full shadow-md text-xs font-semibold tracking-wide transition-colors"
      >
        <MessageCircle size={18} />
        <span className="hidden sm:inline">WhatsApp Host</span>
      </a>
    </aside>
  );
}
