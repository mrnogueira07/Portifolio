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
    
    // Construct Mailto Link for functional contact
    const subject = encodeURIComponent(`Contato via Portfolio: ${formState.name}`);
    const body = encodeURIComponent(`Nome: ${formState.name}\nEmail: ${formState.email}\n\nMensagem:\n${formState.message}`);
    const mailtoLink = `mailto:matheusnog95@gmail.com?subject=${subject}&body=${body}`;

    // Simulate "sending" feeling then open mail client
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
      
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
           <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Contato</span>
           <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
             Vamos Construir o <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Extraordinário</span>
           </h2>
           <p className="text-gray-400 max-w-2xl mx-auto text-lg">
             Tem um projeto em mente ou apenas quer dar um oi? Estou pronto para transformar suas ideias em realidade digital.
           </p>
        </div>

        <div className="relative">
          {/* Main Card Container with Premium Border Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-[2.5rem] blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
          
          <div className="relative bg-[#0f172a]/90 backdrop-blur-2xl rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              
              {/* Left Side: Contact Info (2/5 width) */}
              <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 p-10 md:p-12 flex flex-col justify-between relative overflow-hidden">
                {/* Decorative Texture */}
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-display font-bold text-white mb-2">Informações de Contato</h3>
                  <p className="text-gray-400 mb-10 text-sm">Entre em contato via formulário, email ou WhatsApp.</p>

                  <div className="space-y-6">
                    {/* Contact Item 1 */}
                    <a href="mailto:matheusnog95@gmail.com" className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 font-medium mb-1">Email</p>
                        <p className="text-white font-semibold group-hover:text-primary transition-colors">matheusnog95@gmail.com</p>
                      </div>
                    </a>

                    {/* Contact Item 2 */}
                    <a href="https://wa.me/5592981838704" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
                      <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform duration-300">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 font-medium mb-1">WhatsApp</p>
                        <p className="text-white font-semibold group-hover:text-green-400 transition-colors">(92) 98183-8704</p>
                      </div>
                    </a>

                    {/* Contact Item 3 */}
                    <div className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
                      <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 font-medium mb-1">Localização</p>
                        <p className="text-white font-semibold">Manaus, AM - Brasil</p>
                        <p className="text-xs text-gray-500 mt-1">Disponível para trabalho remoto mundial</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Socials Bottom */}
                <div className="relative z-10 mt-12">
                  <p className="text-sm text-gray-400 mb-4 font-medium">Siga-me nas redes</p>
                  <div className="flex gap-3">
                    <a href="https://github.com/mrnogueira07" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-white/5 hover:bg-black text-gray-300 hover:text-white border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="https://www.linkedin.com/in/matheus-nogueira1080/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-white/5 hover:bg-[#0077b5] text-gray-300 hover:text-white border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="https://www.instagram.com/mrnogueira07/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-white/5 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-500 text-gray-300 hover:text-white border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1">
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side: Form (3/5 width) */}
              <div className="lg:col-span-3 p-10 md:p-12 bg-white/[0.02] relative">
                
                {status === 'success' ? (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm animate-fade-in rounded-r-2xl">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Redirecionando...</h3>
                    <p className="text-gray-400 text-center max-w-xs">Seu cliente de email será aberto para finalizar o envio.</p>
                  </div>
                ) : null}

                <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
                  
                  {/* Name Input */}
                  <div className="relative group">
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="block w-full px-4 py-4 bg-transparent border-2 border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-primary focus:ring-0 peer transition-all"
                      placeholder="Seu Nome"
                      required
                    />
                    <label 
                      htmlFor="name" 
                      className="absolute left-4 top-4 text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-slate-900 peer-focus:px-2 peer-focus:ml-[-8px] cursor-text bg-slate-900 px-2 -ml-2 text-xs"
                    >
                      Seu Nome
                    </label>
                  </div>

                  {/* Email Input */}
                  <div className="relative group">
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="block w-full px-4 py-4 bg-transparent border-2 border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-primary focus:ring-0 peer transition-all"
                      placeholder="Seu Email"
                      required
                    />
                    <label 
                      htmlFor="email" 
                      className="absolute left-4 top-4 text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-slate-900 peer-focus:px-2 peer-focus:ml-[-8px] cursor-text bg-slate-900 px-2 -ml-2 text-xs"
                    >
                      Seu Email
                    </label>
                  </div>

                  {/* Message Input */}
                  <div className="relative group">
                    <textarea 
                      id="message" 
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={5}
                      className="block w-full px-4 py-4 bg-transparent border-2 border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-primary focus:ring-0 peer transition-all resize-none"
                      placeholder="Sua Mensagem"
                      required
                    ></textarea>
                    <label 
                      htmlFor="message" 
                      className="absolute left-4 top-4 text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-slate-900 peer-focus:px-2 peer-focus:ml-[-8px] cursor-text bg-slate-900 px-2 -ml-2 text-xs"
                    >
                      Conte sobre seu projeto...
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={status === 'sending'}
                    className="w-full py-4 relative overflow-hidden group bg-gradient-to-r from-primary to-secondary rounded-xl font-bold text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    
                    <span className="relative flex items-center justify-center gap-2">
                      {status === 'sending' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        <>
                          Enviar Mensagem <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>

                </form>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-center items-center text-gray-500 text-sm border-t border-white/5 pt-8">
           <p>&copy; {new Date().getFullYear()} Matheus Nogueira. Todos os direitos reservados.</p>
        </div>

      </div>
    </section>
  );
};

export default Contact;