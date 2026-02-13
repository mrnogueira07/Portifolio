import React, { useState } from 'react';
import { Github, Linkedin, Instagram, Send, Loader2, ShieldCheck, Zap, Cpu, Sparkles } from 'lucide-react';

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
    setTimeout(() => {
      window.location.href = `mailto:matheusnog95@gmail.com?subject=Contato&body=${formState.message}`;
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#050508] scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <div className="relative rounded-[2.5rem] overflow-hidden p-10 md:p-14 bg-white/[0.01] border border-white/5 shadow-2xl animate-slide-up">
          <div className="relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5 text-primary text-[9px] font-black uppercase tracking-[0.4em] mb-6">
                <Sparkles size={10} /> Canal de Transmissão
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6 leading-tight tracking-tighter">
                Iniciar <span className="text-primary">Conexão</span>
              </h2>
              <p className="text-gray-500 text-sm md:text-base font-light max-w-md mx-auto leading-relaxed">
                Pronto para transformar sua visão em uma solução digital de alto impacto?
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input 
                  type="text" 
                  name="name"
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full bg-white/[0.01] border border-white/5 rounded-xl px-5 py-3.5 text-xs text-white focus:outline-none focus:border-primary/40 transition-all"
                  placeholder="Seu Nome"
                  required
                />
                <input 
                  type="email" 
                  name="email"
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  className="w-full bg-white/[0.01] border border-white/5 rounded-xl px-5 py-3.5 text-xs text-white focus:outline-none focus:border-primary/40 transition-all"
                  placeholder="Seu Email"
                  required
                />
              </div>
              <textarea 
                name="message"
                value={formState.message}
                onChange={(e) => setFormState({...formState, message: e.target.value})}
                rows={4}
                className="w-full bg-white/[0.01] border border-white/5 rounded-xl px-5 py-4 text-xs text-white focus:outline-none focus:border-primary/40 transition-all resize-none"
                placeholder="Briefing do Projeto"
                required
              ></textarea>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="w-full sm:w-auto px-10 py-4 bg-white text-black rounded-xl font-black text-[9px] uppercase tracking-[0.3em] transition-all hover:scale-105 active:scale-95 shadow-xl"
                >
                  Enviar Mensagem
                </button>
              </div>
            </form>

            <div className="mt-16 pt-10 border-t border-white/5 flex flex-col items-center gap-6">
              <div className="flex items-center gap-8">
                {[Github, Linkedin, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="text-gray-600 hover:text-white transition-all transform hover:scale-110">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-3 opacity-20">
                 <Zap size={10} className="text-primary" />
                 <span className="text-[8px] font-black uppercase tracking-[0.6em] text-gray-400">Desenvolvido por Matheus Nogueira</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;