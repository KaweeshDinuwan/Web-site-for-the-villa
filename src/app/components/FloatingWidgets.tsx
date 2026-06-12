import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function FloatingWidgets() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {/* WhatsApp Floating Button */}
      <a
        href="#"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </a>

      {/* AI Chatbot Placeholder */}
      <div className="fixed bottom-6 right-24 z-50">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-[#0a0a0a] border border-[#D4AF37] text-[#D4AF37] w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-all"
        >
          {chatOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>

        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-20 right-0 w-80 bg-[#121212] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="bg-[#0a0a0a] p-4 border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#0a0a0a] font-bold text-xs">AI</div>
                  <div>
                    <h4 className="font-['Montserrat'] font-semibold text-white text-sm">Concierge Bot</h4>
                    <span className="text-[10px] text-[#25D366] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span> Online
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 h-64 bg-[#1a1a1a] flex flex-col justify-end font-['Montserrat'] text-sm">
                <div className="bg-[#0a0a0a] p-3 rounded-lg rounded-tl-none border border-white/5 text-white/80 self-start mb-2 max-w-[80%]">
                  Hello! How can I help you plan your luxury stay in Sri Lanka?
                </div>
              </div>
              <div className="p-3 border-t border-white/10 bg-[#0a0a0a]">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full bg-transparent text-white text-sm focus:outline-none font-['Montserrat']"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
