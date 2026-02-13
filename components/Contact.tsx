import React, { useState } from 'react';
import { Mail, Phone, Github, Linkedin, Send, Cpu, Globe, MapPin, Loader2, Zap } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setStatus('sending');
    const subject = encodeURIComponent(`Contato via Portfolio: ${formState.name}`);
    const body = encodeURIComponent(`Nome: ${formState.name}\nEmail: ${formState.email}\n\nMensagem:\n${formState.message}`);
    const mailtoLink = `mailto:matheusnog95@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailtoLink;
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 scroll-mt-28 relative overflow-hidden bg-[#0a0f1e]">
      {/* Background Cyberpunk Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
      
      {/* Orbes de Luz Neon */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-900/10 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-bold text-cyan-300 tracking-widest uppercase font-display">System Online</span>
           </div>
           
           <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
             Iniciar <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-primary to-purple-500 animate-color-cycle">Conexão</span>
           </h2>
           <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
             Transforme ideias abstratas em realidade digital. Envie um sinal e vamos codificar o futuro.
           </p>
        </div>

        <div className="relative animate-scale-in delay-100 max-w-6xl mx-auto">
          {/* Borda Brilhante do Container */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-[2rem] opacity-70 blur-sm"></div>
          
          <div className="relative bg-[#0b1221]/90 backdrop-blur-3xl rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
            
            {/* Coluna da Esquerda: Info Holográfica */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-10 md:p-14 flex flex-col justify-between relative overflow-hidden group">
              {/* Efeito de Scanline decorativo */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(6,182,212,0.05)_50%,transparent_100%)] bg-[length:100%_4px] pointer-events-none opacity-50"></div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-3">
                  <Cpu className="text-cyan-400" /> Dados de Contato
                </h3>
                <p className="text-gray-400 text-sm mb-10 border-l-2 border-cyan-500/50 pl-4">
                  Canais de comunicação seguros e diretos.
                </p>

                <div className="space-y-6">
                  <a href="mailto:matheusnog95@gmail.com" className="group/link flex items-center gap-5 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/50 hover:bg-cyan-950/20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cyan-400/10 translate-x-[-100%] group-hover/link:translate-x-[100%] transition-transform duration-700"></div>
                    <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400 group-hover/link:text-cyan-300 group-hover/link:scale-110 transition-all">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-cyan-500/70 font-bold uppercase tracking-wider mb-0.5">Email</p>
                      <p className="text-white font-medium">matheusnog95@gmail.com</p>
                    </div>
                  </a>

                  <a href="https://wa.me/5592981838704" target="_blank" className="group/link flex items-center gap-5 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-green-500/50 hover:bg-green-950/20 transition-all duration-300 relative overflow-hidden">
                     <div className="absolute inset-0 bg-green-400/10 translate-x-[-100%] group-hover/link:translate-x-[100%] transition-transform duration-700"></div>
                    <div className="p-3 bg-green-500/10 rounded-lg text-green-400 group-hover/link:text-green-300 group-hover/link:scale-110 transition-all">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-green-500/70 font-bold uppercase tracking-wider mb-0.5">WhatsApp</p>
                      <p className="text-white font-medium">(92) 98183-8704</p>
                    </div>
                  </a>
                  
                   <div className="flex items-center gap-5 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-purple-500/70 font-bold uppercase tracking-wider mb-0.5">Localização Base</p>
                      <p className="text-white font-medium">Manaus, AM - Brasil</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-12">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-bold">Redes Sociais</p>
                <div className="flex gap-4">
                  <a href="https://github.com/mrnogueira07" target="_blank" className="p-4 rounded-2xl bg-[#0f172a] border border-white/10 hover:border-white/30 text-white hover:text-white hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="https://www.linkedin.com/in/matheus-nogueira1080/" target="_blank" className="p-4 rounded-2xl bg-[#0a66c2]/10 border border-[#0a66c2]/30 text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white hover:scale-110 hover:shadow-[0_0_15px_rgba(10,102,194,0.4)] transition-all duration-300">
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Coluna da Direita: Formulário Terminal */}
            <div className="lg:col-span-7 p-10 md:p-14 bg-white/[0.01] relative">
              <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
                <div className="group">
                  <label className={`block text-xs font-bold uppercase tracking-widest mb-2 transition-colors ${activeField === 'name' ? 'text-primary' : 'text-gray-500'}`}>Nome de Identificação</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      onFocus={() => setActiveField('name')}
                      onBlur={() => setActiveField(null)}
                      className="block w-full px-5 py-4 bg-[#0f172a]/80 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-300"
                      placeholder="Ex: Tony Stark"
                      required
                    />
                    <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-500 ${activeField === 'name' ? 'w-full' : 'w-0'}`}></div>
                  </div>
                </div>

                <div className="group">
                  <label className={`block text-xs font-bold uppercase tracking-widest mb-2 transition-colors ${activeField === 'email' ? 'text-secondary' : 'text-gray-500'}`}>Email de Retorno</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      onFocus={() => setActiveField('email')}
                      onBlur={() => setActiveField(null)}
                      className="block w-full px-5 py-4 bg-[#0f172a]/80 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary focus:shadow-[0_0_20px_rgba(236,72,153,0.2)] transition-all duration-300"
                      placeholder="Ex: stark@avengers.com"
                      required
                    />
                     <div className={`absolute bottom-0 left-0 h-[2px] bg-secondary transition-all duration-500 ${activeField === 'email' ? 'w-full' : 'w-0'}`}></div>
                  </div>
                </div>

                <div className="group">
                  <label className={`block text-xs font-bold uppercase tracking-widest mb-2 transition-colors ${activeField === 'message' ? 'text-cyan-400' : 'text-gray-500'}`}>Transmissão de Dados</label>
                  <div className="relative">
                    <textarea 
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => setActiveField('message')}
                      onBlur={() => setActiveField(null)}
                      rows={4}
                      className="block w-full px-5 py-4 bg-[#0f172a]/80 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 resize-none"
                      placeholder="Descreva seu projeto ou ideia..."
                      required
                    ></textarea>
                    <div className={`absolute bottom-0 left-0 h-[2px] bg-cyan-400 transition-all duration-500 ${activeField === 'message' ? 'w-full' : 'w-0'}`}></div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="w-full py-5 rounded-xl font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] relative overflow-hidden group border border-white/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transition-all duration-300 group-hover:opacity-90"></div>
                  {/* Brilho Animado no Botão */}
                  <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-shine"></div>
                  
                  <span className="relative flex items-center justify-center gap-3 tracking-wider uppercase text-sm">
                    {status === 'sending' ? (
                      <><Loader2 className="animate-spin w-5 h-5" /> Enviando Dados...</>
                    ) : status === 'success' ? (
                      <><span className="text-green-300">Transmissão Completa</span></>
                    ) : (
                      <><Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Inicializar Envio</>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        .animate-shine {
          animation: shine 1.5s infinite linear;
        }
      `}</style>
    </section>
  );
};

export default Contact;