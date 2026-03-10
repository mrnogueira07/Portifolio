import React, { useState } from 'react';
import { Github, Linkedin, Instagram, Music2, Loader2, Send, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setStatus('sending');

    const phoneNumber = "5592981838704";
    const customMessage = `Olá Matheus! Me chamo ${formState.name}. Gostaria de conversar sobre um projeto: ${formState.message}`;
    const encodedMessage = encodeURIComponent(customMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="pt-40 pb-24 md:pt-56 md:pb-32 relative overflow-hidden bg-transparent scroll-mt-32">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Content */}
          <div className="space-y-10">
            <div className="animate-slide-right">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                DISPONÍVEL PARA PROJETOS
              </div>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[1.1] tracking-tight mb-8">
                Vamos criar <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-secondary animate-color-cycle pb-2">o extraordinário?</span>
              </h2>
              <p className="text-gray-400 text-base md:text-xl font-light max-w-lg leading-relaxed">
                Transformo visões complexas em ecossistemas digitais de alta performance. Sua próxima grande ideia merece uma engenharia de elite.
              </p>
            </div>

            <div className="flex flex-col gap-6 animate-slide-up delay-200">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-primary group-hover:border-primary/30 transition-all duration-500 group-hover:scale-110">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <p className="text-[11px] font-black text-gray-600 uppercase tracking-widest mb-1">E-mail Direto</p>
                  <p className="text-white font-bold text-sm md:text-base">matheusnog95@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                {[
                  { icon: Github, href: "https://github.com", label: "Github" },
                  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: Instagram, href: "https://www.instagram.com/mrnogueira07/", label: "Instagram" },
                  { icon: Music2, href: "https://www.tiktok.com/@mrnogueira__", label: "TikTok" }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group relative"
                    title={social.label}
                  >
                    <div className="absolute -inset-4 bg-white/0 group-hover:bg-white/[0.03] rounded-2xl transition-all duration-500"></div>
                    <social.icon size={20} className="text-gray-500 group-hover:text-white transition-all transform group-hover:scale-110 group-hover:-translate-y-1 relative z-10" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="relative animate-scale-in delay-300">
            <div className="absolute -inset-px rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
            <div className="relative rounded-[2.5rem] overflow-hidden p-8 md:p-12 bg-[#050510]/60 backdrop-blur-3xl border border-white/5 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Como devemos te chamar?</label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all placeholder:text-gray-700"
                    placeholder="Seu Nome Completo"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Para onde enviamos a resposta?</label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all placeholder:text-gray-700"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">O que você tem em mente?</label>
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    rows={4}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-5 text-sm text-white focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all resize-none placeholder:text-gray-700"
                    placeholder="Descreva brevemente seu projeto ou ideia..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-5 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_rgba(99,102,241,0.3)] disabled:opacity-50 flex items-center justify-center gap-4 group overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      PROCESSANDO...
                    </>
                  ) : status === 'success' ? (
                    "CONEXÃO INICIADA!"
                  ) : (
                    <>
                      ENVIAR PROPOSTA <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-500">
            © {new Date().getFullYear()} Matheus Nogueira • Engenharia de Elite
          </p>
          <div className="flex items-center gap-8">
            <span className="text-[8px] font-black uppercase tracking-widest">Aberto para parcerias globais</span>
            <div className="w-1 h-1 rounded-full bg-primary animate-pulse"></div>
            <span className="text-[8px] font-black uppercase tracking-widest text-primary">Status: Online</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;