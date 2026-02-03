import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, Linkedin, Instagram, PlayCircle, X, Terminal, Code, Gamepad2, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from './ParticleBackground';

const Hero: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showModal]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-12 lg:pb-0">
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-300">Disponível para novos projetos</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight text-white">
              Desenvolvendo <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Experiências</span> Digitais de Alto Nível.
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed">
              Sou Matheus Nogueira, 24 anos. Especialista em Desenvolvimento Web Full Stack, Engenharia de Software e Game Design. Transformo linhas de código em soluções impactantes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/projects')}
                className="px-8 py-4 bg-primary hover:bg-indigo-600 text-white rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
              >
                Ver Portfolio <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowModal(true)}
                className="px-8 py-4 glass-card hover:bg-white/10 text-white rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-5 h-5" /> Sobre Mim
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex gap-4">
                <a href="https://github.com/mrnogueira07" target="_blank" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-primary transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/matheus-nogueira1080/" target="_blank" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-primary transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/mrnogueira07/" target="_blank" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-primary transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative z-10 rounded-xl overflow-hidden glass-card p-2 bg-dark">
                <img 
                  src="https://i.pinimg.com/736x/69/36/05/693605df992b0509b97671fba58051a7.jpg" 
                  alt="Matheus Nogueira" 
                  className="rounded-lg w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
            
            {/* Overlay Cards */}
            <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-xl flex items-center gap-4 animate-float">
              <div className="p-3 bg-primary/20 rounded-lg text-primary">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Full Stack</p>
                <p className="font-bold">React & Node</p>
              </div>
            </div>

            <div className="absolute top-10 -right-6 glass-card p-4 rounded-xl flex items-center gap-4 animate-float animation-delay-2000">
              <div className="p-3 bg-secondary/20 rounded-lg text-secondary">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Game Dev</p>
                <p className="font-bold">Unity & C#</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowModal(false)}></div>
          <div className="relative w-full max-w-4xl max-h-[90vh] glass-card rounded-2xl overflow-hidden animate-fade-in border border-white/10">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-dark/50">
              <h2 className="text-2xl font-bold flex items-center gap-2"><Terminal className="text-primary" /> Perfil Profissional</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X /></button>
            </div>
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-80px)] space-y-8">
              <div className="flex flex-col md:flex-row gap-8">
                <img src="https://i.pinimg.com/736x/69/36/05/693605df992b0509b97671fba58051a7.jpg" className="w-32 h-32 rounded-2xl object-cover border-2 border-primary/30" />
                <div>
                  <h3 className="text-3xl font-bold mb-2">Matheus Nogueira</h3>
                  <p className="text-primary font-medium mb-4">Level 24 Developer • Manaus, AM</p>
                  <p className="text-gray-300 leading-relaxed">
                    Especialista em construir pontes entre o design e a tecnologia. Com sólida base em Ciência da Computação, atuo no desenvolvimento de sistemas web escaláveis e na criação de jogos independentes que unem mecânicas divertidas com visual polido.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                  <h4 className="font-bold text-lg mb-3 flex items-center gap-2"><Code className="text-primary" /> Web & Software</h4>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>• Frontend: React, Next.js, Tailwind CSS</li>
                    <li>• Backend: Node.js, Express, PostgreSQL</li>
                    <li>• Ferramentas: Docker, Git, Vercel</li>
                  </ul>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                  <h4 className="font-bold text-lg mb-3 flex items-center gap-2"><Gamepad2 className="text-secondary" /> Game Development</h4>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>• Engine: Unity 3D/2D, Construct 3</li>
                    <li>• Linguagem: C#, Javascript</li>
                    <li>• Assets: Aseprite, Blender (Básico)</li>
                  </ul>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-white/5 text-center">
                <Rocket className="w-8 h-8 mx-auto mb-4 text-white animate-bounce" />
                <h4 className="font-bold text-xl mb-2">Foco em Resultados</h4>
                <p className="text-gray-400">Entrego não apenas código, mas produtos que resolvem problemas reais e encantam usuários.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;