import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, Linkedin, Instagram, PlayCircle, X, Terminal, Code, Gamepad2, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from './ParticleBackground';

const Hero: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Bloqueia a rolagem do corpo da página quando o modal está aberto
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showModal]);

  return (
    // Adicionado overflow-hidden para prevenir scroll lateral causado pelos blobs
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 lg:pb-0 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
        {/* Blobs de fundo ajustados para não causar overflow horizontal */}
        <div className="absolute top-20 -left-20 w-72 h-72 md:w-96 md:h-96 bg-primary/20 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-20 -right-20 w-72 h-72 md:w-96 md:h-96 bg-secondary/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Coluna de Texto */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md animate-fade-in shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold text-gray-200 tracking-wide uppercase">Disponível para novos projetos</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight text-white animate-slide-right delay-100">
              Desenvolvendo <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-secondary animate-color-cycle">Experiências</span> Digitais Únicas.
            </h1>
            
            {/* Linha Divisória com Gradiente */}
            <div className="w-full max-w-lg h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scale-in delay-200"></div>

            <p className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed animate-slide-right delay-200">
              Sou Matheus Nogueira, 24 anos. Especialista em Desenvolvimento Full Stack, Software e Games. Criando o futuro um pixel por vez.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-300">
              <button 
                onClick={() => navigate('/projects')}
                className="px-8 py-4 bg-primary hover:bg-indigo-600 text-white rounded-xl font-bold transition-all hover:-translate-y-1 flex items-center justify-center gap-3 shadow-xl shadow-primary/25 border border-primary/50"
              >
                Ver Portfolio <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowModal(true)}
                className="px-8 py-4 glass-card hover:bg-white/10 text-white rounded-xl font-bold transition-all hover:-translate-y-1 flex items-center justify-center gap-3 border border-white/10 hover:border-white/30"
              >
                <PlayCircle className="w-5 h-5" /> Sobre Mim
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 animate-fade-in delay-500">
              <div className="flex gap-4">
                <a href="https://github.com/mrnogueira07" target="_blank" className="p-3 rounded-xl bg-white/5 hover:bg-white/10 hover:text-primary transition-all border border-white/5 hover:border-white/20 hover:scale-110">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/matheus-nogueira1080/" target="_blank" className="p-3 rounded-xl bg-white/5 hover:bg-white/10 hover:text-primary transition-all border border-white/5 hover:border-white/20 hover:scale-110">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/mrnogueira07/" target="_blank" className="p-3 rounded-xl bg-white/5 hover:bg-white/10 hover:text-primary transition-all border border-white/5 hover:border-white/20 hover:scale-110">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Coluna da Imagem */}
          <div className="relative block animate-scale-in delay-200 mt-8 lg:mt-0">
            {/* Foto Card com Borda Radial Circulante */}
            <div className="relative group z-10 rotating-border-container p-[2px] shadow-2xl animate-float">
              {/* Efeito de borda mágica circulante */}
              <div className="rotating-border-bg opacity-60 group-hover:opacity-100 group-hover:duration-[1.5s] transition-opacity duration-700"></div>
              
              <div className="relative z-10 rounded-[1.4rem] overflow-hidden glass-card p-1 bg-dark">
                 <img 
                  src="https://i.pinimg.com/736x/69/36/05/693605df992b0509b97671fba58051a7.jpg" 
                  alt="Matheus Nogueira" 
                  className="rounded-[1.2rem] w-full h-[400px] lg:h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-[1.02]"
                />
                
                {/* Brilho interno suave */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-40 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none"></div>
              </div>

              {/* Aura de fundo */}
              <div className="absolute -inset-8 bg-gradient-to-r from-primary/30 to-secondary/30 blur-[80px] -z-10 group-hover:from-primary/40 group-hover:to-secondary/40 transition-all duration-1000 opacity-50 group-hover:opacity-100"></div>
            </div>
            
            {/* Cartões de Informação Flutuantes */}
            <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 z-30 glass-card p-3 md:p-5 rounded-2xl flex items-center gap-3 md:gap-4 animate-slide-right delay-500 shadow-2xl border border-white/20 hover:scale-110 transition-transform cursor-default backdrop-blur-xl bg-[#0f172a]/80">
              <div className="p-2 md:p-3.5 bg-primary/20 rounded-xl text-primary ring-1 ring-primary/30">
                <Code className="w-5 h-5 md:w-7 md:h-7" />
              </div>
              <div>
                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-tighter">Web Expert</p>
                <p className="font-bold text-sm md:text-lg text-white">Full Stack</p>
              </div>
            </div>

            <div className="absolute top-4 -right-4 md:top-10 md:-right-8 z-30 glass-card p-3 md:p-5 rounded-2xl flex items-center gap-3 md:gap-4 animate-slide-left delay-500 shadow-2xl border border-white/20 hover:scale-110 transition-transform cursor-default backdrop-blur-xl bg-[#0f172a]/80">
              <div className="p-2 md:p-3.5 bg-secondary/20 rounded-xl text-secondary ring-1 ring-secondary/30">
                <Gamepad2 className="w-5 h-5 md:w-7 md:h-7" />
              </div>
              <div>
                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-tighter">Game Dev</p>
                <p className="font-bold text-sm md:text-lg text-white">Unity & Unreal</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Perfil */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-lg transition-opacity duration-300" onClick={() => setShowModal(false)}></div>
          <div className="relative w-full max-w-4xl max-h-[90vh] glass-card rounded-3xl overflow-hidden animate-scale-in border border-white/10 shadow-2xl bg-[#0f172a]">
            <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center bg-[#1e293b]/50">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-white"><Terminal className="text-primary w-6 h-6" /> Perfil Profissional</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white hover:rotate-90 duration-300"><X size={24} /></button>
            </div>
            <div className="p-8 md:p-12 overflow-y-auto max-h-[calc(90vh-90px)] space-y-10 custom-scrollbar">
              <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
                <div className="relative shrink-0 group">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/40 transition-all duration-500"></div>
                  <img src="https://i.pinimg.com/736x/69/36/05/693605df992b0509b97671fba58051a7.jpg" className="relative w-40 h-40 rounded-3xl object-cover border-2 border-primary/30 shadow-2xl" alt="Profile" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-4xl font-extrabold mb-3 text-white">Matheus Nogueira</h3>
                  <p className="text-primary font-bold text-lg mb-5 flex items-center justify-center md:justify-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    Level 24 Developer • Manaus, AM
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed font-medium">
                    Especialista em construir pontes entre o design e a tecnologia. Com sólida base em Ciência da Computação, atuo no desenvolvimento de sistemas web escaláveis e na criação de jogos independentes que unem mecânicas envolventes com visuais polidos.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#1e293b]/50 p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-colors group">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="p-3 bg-primary/20 rounded-2xl text-primary group-hover:scale-110 transition-transform"><Code /></div>
                    <h4 className="font-bold text-xl text-white">Web & Software</h4>
                  </div>
                  <ul className="text-gray-400 space-y-3 font-medium">
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Frontend: React, Next.js, Tailwind</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Backend: Node.js, Express, PostgreSQL</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Infra: Docker, Git, Vercel/AWS</li>
                  </ul>
                </div>
                <div className="bg-[#1e293b]/50 p-8 rounded-3xl border border-white/5 hover:border-secondary/20 transition-colors group">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="p-3 bg-secondary/20 rounded-2xl text-secondary group-hover:scale-110 transition-transform"><Gamepad2 /></div>
                    <h4 className="font-bold text-xl text-white">Game Development</h4>
                  </div>
                  <ul className="text-gray-400 space-y-3 font-medium">
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Engine: Unity, Unreal & Construct 3</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Linguagem: C#, C++, TypeScript</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Arte: Aseprite, Figma, Photoshop</li>
                  </ul>
                </div>
              </div>

              <div className="p-8 bg-gradient-to-r from-primary/10 via-[#1e293b] to-secondary/10 rounded-3xl border border-white/10 text-center relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-white to-secondary opacity-50"></div>
                <Rocket className="w-10 h-10 mx-auto mb-5 text-white animate-bounce" />
                <h4 className="font-extrabold text-2xl mb-3 uppercase tracking-wider text-white">Foco Total em Resultados</h4>
                <p className="text-gray-400 text-lg">Entrego não apenas código, mas produtos que resolvem problemas reais e proporcionam experiências memoráveis.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;