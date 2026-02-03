import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, Linkedin, Instagram, PlayCircle, X, Terminal, Cpu, Zap, Gamepad2, Trophy, Sparkles, Brain, Rocket, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from './ParticleBackground';

const Hero: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Prevent background scrolling when modal is open, with layout shift prevention
  useEffect(() => {
    if (showModal) {
      // Calculate scrollbar width to prevent content jump
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [showModal]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-12 lg:pb-0">
      
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* Particle System */}
        <ParticleBackground />
        
        {/* Ambient Blobs (kept for color depth, but behind particles) */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg shadow-black/5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-300">Disponível para projetos</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight drop-shadow-2xl">
              Criando o <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Futuro Digital</span> com código e arte.
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed">
              Olá, sou Matheus Nogueira. Desenvolvedor Full Stack, Criador de Jogos e Editor de Vídeo. 
              Transformo ideias complexas em experiências digitais imersivas e funcionais.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/projects')}
                className="px-8 py-4 bg-primary hover:bg-indigo-600 text-white rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 z-20 cursor-pointer"
              >
                Ver Projetos <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowModal(true)}
                className="px-8 py-4 glass-card hover:bg-white/10 text-white rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 z-20 cursor-pointer"
              >
                <PlayCircle className="w-5 h-5" /> Sobre Mim
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <span className="text-sm text-gray-500 font-medium">Siga-me:</span>
              <div className="flex gap-4">
                <a href="https://github.com/mrnogueira07" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-primary transition-colors z-20">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/matheus-nogueira1080/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-primary transition-colors z-20">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/mrnogueira07/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-primary transition-colors z-20">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Visual/Image Section */}
          <div className="relative mt-12 lg:mt-0 order-2">
            {/* Animated Border Container */}
            <div className="relative group">
              {/* The Animated Gradient Border Layer - Enhanced Colors */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-x animate-color-cycle"></div>
              
              {/* Main Image Container */}
              <div className="relative z-10 rounded-xl overflow-hidden glass-card p-1 bg-dark transition-all duration-500 hover:scale-[1.02] hover:-rotate-1 hover:shadow-2xl hover:shadow-primary/40">
                <img 
                  src="https://i.pinimg.com/736x/69/36/05/693605df992b0509b97671fba58051a7.jpg" 
                  alt="Matheus Nogueira Developer" 
                  className="rounded-lg w-full h-[400px] md:h-[600px] object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Floating Cards - Now OUTSIDE the overflow-hidden container so they don't get cut off */}
            
            {/* Card 1: Gamer/Achievement Vibe - SOLID BACKGROUND & NO CUTOFF */}
            <div className="absolute -bottom-4 -left-2 md:-bottom-12 md:-left-12 z-30 group/card">
              {/* Card Gradient Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl blur opacity-50 group-hover/card:opacity-100 transition duration-500"></div>
              
              {/* Card Content - Made SOLID bg-[#0f172a] instead of transparent */}
              <div className="relative p-4 md:p-5 rounded-2xl flex items-center gap-4 bg-[#0f172a] border border-white/10 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                <div className="relative">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-inner shadow-white/20">
                    <Gamepad2 className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded-full border-4 border-[#0f172a] shadow-sm"></div>
                </div>
                <div className="pr-2">
                  <p className="text-xs text-purple-300 font-bold uppercase tracking-wider mb-0.5">Status</p>
                  <p className="font-bold text-white text-lg md:text-xl tracking-tight">Level 24 Dev</p>
                </div>
              </div>
            </div>

            {/* Card 2: High Performance / Tech Vibe */}
            <div className="absolute top-6 -right-2 md:top-12 md:-right-10 z-20 glass-card p-4 rounded-2xl flex items-center gap-3 animate-float-delayed border border-white/10 bg-[#0f172a]/90 backdrop-blur-xl shadow-2xl shadow-black/50">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Performance</p>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-white">100%</span>
                  <span className="text-xs text-green-400">Optimized</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* About Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300" onClick={() => setShowModal(false)}></div>
          
          {/* Wrapper for the Animated Border on the Modal */}
          <div className="relative w-full max-w-5xl max-h-[90vh] group animate-fade-in">
            {/* The Animated Gradient Border Layer */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-2xl opacity-70 blur-sm animate-gradient-x"></div>
            
            {/* Actual Modal Content */}
            <div className="relative w-full h-full rounded-2xl bg-slate-900 flex flex-col overflow-hidden shadow-2xl shadow-black/50">
              
              {/* Header - Fixed */}
              <div className="flex-none flex justify-between items-center p-6 border-b border-white/10 bg-slate-900/95 backdrop-blur z-20">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                        <Terminal className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="font-display text-xl font-bold text-white">Sobre Mim</h2>
                        <p className="text-xs text-gray-400">Matheus Nogueira / Profile</p>
                    </div>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-gray-400 transition-all duration-300 group/close"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 transform group-hover/close:rotate-90 transition-transform" />
                </button>
              </div>

              {/* Scrollable Content Area - ADDED PB-24 TO FIX CUTOFF */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 pb-24 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                
                {/* Intro Section */}
                <div className="flex flex-col md:flex-row gap-8 mb-12 items-start">
                    <div className="relative flex-shrink-0">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl relative z-10">
                             <img src="https://i.pinimg.com/736x/69/36/05/693605df992b0509b97671fba58051a7.jpg" alt="Profile" className="w-full h-full object-cover object-[50%_20%]" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-primary/20 rounded-2xl -z-0 blur-xl"></div>
                    </div>
                    
                    <div>
                        <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                            Olá, eu sou o <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Matheus</span>
                        </h3>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            Aos <span className="text-white font-semibold">24 anos</span>, consolido uma trajetória de mais de cinco anos no mercado de tecnologia. Minha atuação é definida pela versatilidade, transitando com fluidez entre a <span className="text-primary font-medium">engenharia de software</span> e a <span className="text-secondary font-medium">produção audiovisual</span>.
                        </p>
                    </div>
                </div>

                {/* Grid Layout for Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    
                    {/* Card 1 */}
                    <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors group/skill">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-lg bg-indigo-500/20 text-indigo-400 group-hover/skill:bg-indigo-500 group-hover/skill:text-white transition-all">
                                <Code className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-lg text-white">Full Stack & Games</h4>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Domínio do ciclo completo de desenvolvimento. Crio sistemas robustos com React/Node e experiências imersivas em Unity/C#, focando sempre em performance e escalabilidade.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5 hover:border-secondary/30 transition-colors group/skill">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-lg bg-pink-500/20 text-pink-400 group-hover/skill:bg-pink-500 group-hover/skill:text-white transition-all">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-lg text-white">Design & Audiovisual</h4>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Minha expertise vai além do código. Com habilidades avançadas em Edição de Vídeo e UI/UX, garanto que a estética e a funcionalidade caminhem juntas em cada projeto.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-colors group/skill">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover/skill:bg-emerald-500 group-hover/skill:text-white transition-all">
                                <Brain className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-lg text-white">IA & Inovação</h4>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Formado em Ciência da Computação, utilizo Inteligência Artificial para otimizar processos e criar soluções modernas que resolvem problemas reais.
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-colors group/skill">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-lg bg-orange-500/20 text-orange-400 group-hover/skill:bg-orange-500 group-hover/skill:text-white transition-all">
                                <Cpu className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-lg text-white">Hardware & Maker</h4>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Visão "maker" integrando software e hardware (Arduino, IoT), permitindo explorar a tecnologia além das telas e criando produtos físicos interativos.
                        </p>
                    </div>
                </div>

                {/* Final Section */}
                <div className="relative rounded-2xl p-8 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 border border-white/10 rounded-2xl"></div>
                    <div className="relative z-10 text-center">
                        <div className="inline-block p-3 rounded-full bg-white/5 mb-4 border border-white/10">
                            <Rocket className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-display font-bold text-white mb-2">Visão 360º</h3>
                        <p className="text-gray-300 max-w-2xl mx-auto text-sm leading-relaxed mb-6">
                            Entendo a técnica do backend, a agilidade do frontend e o impacto visual do audiovisual. Essa combinação me permite liderar projetos com uma compreensão profunda de todas as etapas de produção.
                        </p>
                        <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-primary">
                            READY_TO_DEPLOY
                        </div>
                    </div>
                </div>

              </div>
              
              {/* Decorative Fade at bottom to smooth scrolling visual */}
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none z-20"></div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Hero;