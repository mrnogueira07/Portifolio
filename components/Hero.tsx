import React, { useState, useEffect } from 'react';
import { ArrowRight, PlayCircle, X, Terminal, Code, Gamepad2, Rocket, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from './ParticleBackground';

// Componente Hero - A seção de abertura do portfólio
const Hero: React.FC = () => {
  // Estado para controlar a visibilidade da Ficha Técnica (Modal)
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Efeito para bloquear o scroll da página quando o modal estiver aberto
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showModal]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-40 pb-24 lg:pt-48 lg:pb-32 overflow-x-hidden bg-transparent">
      {/* Background com partículas e efeitos de profundidade */}
      <div className="absolute inset-0 z-0 opacity-40">
        <ParticleBackground />
      </div>

      {/* Círculos de luz decorativos (blobs) com animação */}
      <div className="absolute top-20 -left-20 w-72 h-72 md:w-96 md:h-96 bg-primary/10 rounded-full blur-[120px] animate-blob"></div>
      <div className="absolute bottom-20 -right-20 w-72 h-72 md:w-96 md:h-96 bg-secondary/5 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Conteúdo de Texto e Call-to-Action */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl animate-fade-in shadow-2xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-[10px] md:text-[11px] font-black text-gray-300 tracking-[0.4em] uppercase">Engenharia Full Stack & Criatividade</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] text-white animate-slide-right delay-100 tracking-tighter">
              Transformando <br />
              suas <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-secondary animate-color-cycle">ideias</span>
            </h1>

            <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-transparent animate-scale-in delay-200 rounded-full"></div>

            <p className="text-base md:text-xl text-gray-400 max-w-lg leading-relaxed animate-slide-right delay-200 font-light">
              Unindo precisão técnica e design estratégico para criar <span className="text-white border-b border-primary/30">soluções que escalam</span> e geram autoridade real para o seu negócio.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-300">
              <button
                onClick={() => navigate('/projects')}
                className="px-8 py-4 bg-primary text-white rounded-xl font-black text-[9px] uppercase tracking-[0.2em] transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] flex items-center justify-center gap-4 group"
              >
                Ver Ecossistema <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-black text-[9px] uppercase tracking-[0.2em] transition-all hover:-translate-y-1 flex items-center justify-center gap-4 border border-white/10 backdrop-blur-sm"
              >
                Ficha Técnica
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4 animate-fade-in delay-500 opacity-30">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Código Robusto</span>
              </div>
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 text-secondary" />
                <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Entrega de Valor</span>
              </div>
            </div>
          </div>

          {/* Imagem de Perfil com efeitos visuais e borda animada */}
          <div className="relative animate-scale-in delay-200 mt-12 lg:-mt-16 flex justify-center lg:justify-end">
            <div className="relative group z-10 p-[1.5px] animate-float w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px]">
              {/* Borda Animada */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary via-secondary to-primary bg-[length:200%_200%] animate-gradient-x opacity-30 group-hover:opacity-100 transition-opacity duration-700 p-[1.5px]">
                <div className="h-full w-full bg-[#030305] rounded-[2.4rem]"></div>
              </div>

              <div className="relative z-10 rounded-[2.4rem] overflow-hidden bg-[#030305] p-2">
                <img
                  src="https://i.pinimg.com/736x/69/36/05/693605df992b0509b97671fba58051a7.jpg"
                  alt="Matheus Nogueira"
                  className="rounded-[2.2rem] w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"></div>
              </div>

              {/* Brilho de Fundo */}
              <div className="absolute -inset-10 bg-gradient-to-r from-primary/30 to-secondary/20 blur-[100px] -z-10 opacity-30 group-hover:opacity-60 transition-all duration-1000"></div>
            </div>

            {/* Card flutuante com indicação de especialidade */}
            <div className="absolute -bottom-8 -left-4 md:-left-8 z-30 glass-card p-6 rounded-[2rem] flex items-center gap-5 animate-slide-right delay-500 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10 hover:scale-105 transition-all cursor-default bg-[#030305]/95 backdrop-blur-3xl group">
              <div className="p-3.5 bg-primary/10 rounded-2xl text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] md:text-[11px] font-black text-gray-500 uppercase tracking-[0.3em] mb-1">Software Specialist</p>
                <p className="font-display font-black text-base md:text-xl text-white">Full Stack Engineering</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Ficha Técnica (Manifesto do Especialista) */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl transition-opacity duration-300" onClick={() => setShowModal(false)}></div>
          <div className="relative w-full max-w-4xl max-h-[90vh] glass-card rounded-[2.5rem] overflow-hidden animate-scale-in border border-white/10 shadow-2xl bg-[#050508]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <h2 className="text-[10px] font-black flex items-center gap-3 text-white uppercase tracking-[0.4em]"><Terminal className="text-primary w-4 h-4" /> Manifesto do Especialista</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-500 hover:text-white"><X size={20} /></button>
            </div>

            <div className="p-10 md:p-12 overflow-y-auto max-h-[calc(90vh-80px)] space-y-12 custom-scrollbar">
              {/* Cabeçalho do Perfil no Modal */}
              <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                  <img src="https://i.pinimg.com/736x/69/36/05/693605df992b0509b97671fba58051a7.jpg" className="relative w-32 h-32 rounded-2xl object-cover object-[center_30%] border border-white/10 shadow-2xl grayscale" alt="Profile" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-black mb-2 text-white tracking-tighter">Matheus Nogueira</h3>
                  <p className="text-primary font-bold text-[10px] mb-6 flex items-center justify-center md:justify-start gap-2 uppercase tracking-[0.4em]">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    Engenheiro de Software & Estrategista Digital
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed font-light max-w-2xl">
                    Especialista em criar ecossistemas digitais de alto impacto. Unifico arquitetura de software robusta, design centrado no usuário e estratégias de gamificação para desenvolver produtos que não apenas funcionam, mas dominam seus respectivos mercados.
                  </p>

                  <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-300">4+ Anos de Experiência</span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-300">50+ Projetos Entregues</span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-300">Inglês Fluente</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Seção de Habilidades Técnicas (Stack) */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] border-b border-white/5 pb-4">Stack Tecnológico</h4>
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-white">Frontend (React, Next.js, Tailwind)</span>
                        <span className="text-[10px] text-primary font-black">95%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5">
                        <div className="bg-gradient-to-r from-primary to-indigo-400 h-1.5 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-white">Backend (Node.js, Python, SQL/NoSQL)</span>
                        <span className="text-[10px] text-primary font-black">85%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5">
                        <div className="bg-gradient-to-r from-primary to-indigo-400 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-white">Game Dev (Construct 3, Unity, C#)</span>
                        <span className="text-[10px] text-secondary font-black">90%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5">
                        <div className="bg-gradient-to-r from-secondary to-pink-400 h-1.5 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-white">Audiovisual (Premiere, After Effects)</span>
                        <span className="text-[10px] text-secondary font-black">80%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5">
                        <div className="bg-gradient-to-r from-secondary to-pink-400 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Seção de Áreas de Domínio */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] border-b border-white/5 pb-4">Áreas de Domínio</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-colors group">
                      <Code className="w-5 h-5 text-gray-500 group-hover:text-primary mb-3 transition-colors" />
                      <h5 className="text-xs font-bold text-white mb-1">Engenharia Web</h5>
                      <p className="text-[10px] text-gray-500 leading-relaxed">Arquiteturas escaláveis, SPAs e APIs RESTful.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-secondary/30 transition-colors group">
                      <Gamepad2 className="w-5 h-5 text-gray-500 group-hover:text-secondary mb-3 transition-colors" />
                      <h5 className="text-xs font-bold text-white mb-1">Game Design</h5>
                      <p className="text-[10px] text-gray-500 leading-relaxed">Mecânicas imersivas e gamificação estratégica.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-indigo-400/30 transition-colors group">
                      <Terminal className="w-5 h-5 text-gray-500 group-hover:text-indigo-400 mb-3 transition-colors" />
                      <h5 className="text-xs font-bold text-white mb-1">Arquitetura</h5>
                      <p className="text-[10px] text-gray-500 leading-relaxed">Clean Code, SOLID e Design Patterns.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-pink-400/30 transition-colors group">
                      <PlayCircle className="w-5 h-5 text-gray-500 group-hover:text-pink-400 mb-3 transition-colors" />
                      <h5 className="text-xs font-bold text-white mb-1">Audiovisual</h5>
                      <p className="text-[10px] text-gray-500 leading-relaxed">Edição cinematográfica e Motion Graphics.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;