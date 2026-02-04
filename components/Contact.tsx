import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Instagram, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

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
    <section id="contact" className="py-24 scroll-mt-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
           <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Contato</span>
           <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
             Vamos Construir o <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Extraordinário</span>
           </h2>
        </div>

        <div className="relative animate-scale-in delay-100">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-[2.5rem] blur opacity-30"></div>
          
          <div className="relative bg-[#0f172a]/90 backdrop-blur-2xl rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 p-10 md:p-12 flex flex-col justify-between animate-slide-right delay-200">
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">Informações</h3>
                  <div className="space-y-6 mt-8">
                    <a href="mailto:matheusnog95@gmail.com" className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-all">
                      <Mail className="text-primary" />
                      <p className="text-white font-semibold">matheusnog95@gmail.com</p>
                    </a>
                    <a href="https://wa.me/5592981838704" target="_blank" className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-all">
                      <Phone className="text-green-500" />
                      <p className="text-white font-semibold">(92) 98183-8704</p>
                    </a>
                  </div>
                </div>
                <div className="flex gap-3 mt-12">
                  <a href="https://github.com/mrnogueira07" target="_blank" className="p-3 rounded-lg bg-white/5 hover:bg-black transition-all">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/matheus-nogueira1080/" target="_blank" className="p-3 rounded-lg bg-white/5 hover:bg-blue-600 transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-3 p-10 md:p-12 bg-white/[0.02] animate-slide-left delay-300">
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <input 
                    type="text" 
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="block w-full px-4 py-4 bg-transparent border-2 border-white/10 rounded-xl text-white focus:border-primary transition-all"
                    placeholder="Seu Nome"
                    required
                  />
                  <input 
                    type="email" 
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="block w-full px-4 py-4 bg-transparent border-2 border-white/10 rounded-xl text-white focus:border-primary transition-all"
                    placeholder="Seu Email"
                    required
                  />
                  <textarea 
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={4}
                    className="block w-full px-4 py-4 bg-transparent border-2 border-white/10 rounded-xl text-white focus:border-primary transition-all resize-none"
                    placeholder="Sua Mensagem"
                    required
                  ></textarea>

                  <button 
                    type="submit" 
                    className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-bold text-white shadow-lg transition-all hover:scale-[1.01]"
                  >
                    {status === 'sending' ? <Loader2 className="animate-spin mx-auto" /> : 'Enviar Mensagem'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;