import { Mail, Phone, MessageSquare } from "lucide-react";

export function Contact() {
  return (
    <section className="py-24 bg-[#121212] text-[#F9F6F0]" id="contact">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">

          <div className="lg:w-1/2">
            <h4 className="text-[#D4AF37] font-['Montserrat'] tracking-widest uppercase text-sm mb-4">Get in Touch</h4>
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] mb-8">Ready to book <br />your escape?</h2>
            <p className="font-['Montserrat'] text-white/60 mb-12 max-w-md leading-relaxed">
              Our concierge team is available 24/7 to assist with your reservation, special requests, or any inquiries you might have.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#D4AF37] transition-colors">
                  <Phone className="text-[#D4AF37]" size={24} />
                </div>
                <div>
                  <p className="font-['Montserrat'] text-sm text-white/50 mb-1 uppercase tracking-wider">Call Us</p>
                  <p className="font-['Playfair_Display'] text-xl">+94 77 509 9361</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#D4AF37] transition-colors">
                  <Mail className="text-[#D4AF37]" size={24} />
                </div>
                <div>
                  <p className="font-['Montserrat'] text-sm text-white/50 mb-1 uppercase tracking-wider">Email</p>
                  <p className="font-['Montserrat'] text-lg">reservations@villa.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center border border-[#25D366]/30 group-hover:border-[#25D366] transition-colors cursor-pointer">
                  <MessageSquare className="text-[#25D366]" size={24} />
                </div>
                <div className="cursor-pointer">
                  <p className="font-['Montserrat'] text-sm text-white/50 mb-1 uppercase tracking-wider">WhatsApp</p>
                  <p className="font-['Montserrat'] text-lg hover:text-[#25D366] transition-colors">Chat with Concierge</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-1/2">
            <form className="bg-[#0a0a0a] p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl">
              <h3 className="font-['Playfair_Display'] text-2xl mb-8">Send an Inquiry</h3>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-['Montserrat'] text-sm text-white/60">First Name</label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-[#D4AF37] text-[#F9F6F0] font-['Montserrat'] transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-['Montserrat'] text-sm text-white/60">Last Name</label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-[#D4AF37] text-[#F9F6F0] font-['Montserrat'] transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-['Montserrat'] text-sm text-white/60">Email Address</label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-[#D4AF37] text-[#F9F6F0] font-['Montserrat'] transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-['Montserrat'] text-sm text-white/60">Message</label>
                  <textarea
                    rows={4}
                    className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-[#D4AF37] text-[#F9F6F0] font-['Montserrat'] transition-colors resize-none"
                    placeholder="Tell us about your plans..."
                  />
                </div>

                <button
                  type="button"
                  className="w-full bg-[#D4AF37] text-[#0a0a0a] py-4 rounded-lg font-['Montserrat'] font-bold tracking-widest uppercase text-sm hover:bg-[#F9F6F0] transition-colors mt-4"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
