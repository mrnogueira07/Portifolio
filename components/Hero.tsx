import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, Linkedin, Instagram, PlayCircle, X, Terminal, Code, Gamepad2, Rocket, ShieldCheck } from 'lucide-react';
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
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-24 lg:pb-32 overflow-x-hidden bg-transparent">
      <div className="absolute inset-0 z-0 opacity-40">
        <ParticleBackground />
      </div>
      
      <div className="absolute top-20 -left-20 w-72 h-72 md:w-96 md:h-96 bg-primary/10 rounded-full blur-[120px] animate-blob"></div>
      <div className="absolute bottom-20 -right-20 w-72 h-72 md:w-96 md:h-96 bg-secondary/5 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl animate-fade-in shadow-2xl">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
              </span>
              <span className="text-[9px] font-black text-gray-400 tracking-[0.4em] uppercase">Engenharia Full Stack & Criatividade</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] text-white animate-slide-right delay-100 tracking-tighter">
              Transformando suas ideias <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-secondary animate-color-cycle">em produtos digitais de valor.</span>
            </h1>
            
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-transparent animate-scale-in delay-200"></div>

            <p className="text-base md:text-lg text-gray-400 max-w-md leading-relaxed animate-slide-right delay-200 font-light">
              Unindo precisão técnica e design estratégico para criar soluções que escalam e geram autoridade real para o seu negócio.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-300">
              <button 
                onClick={() => navigate('/projects')}
                className="px-8 py-4 bg-white text-black rounded-xl font-black text-[9px] uppercase tracking-[0.2em] transition-all hover:-translate-y-1 flex items-center justify-center gap-4 shadow-2xl shadow-white/5 group"
              >
                Ver Ecossistema <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setShowModal(true)}
                className="px-8 py-4 glass-card hover:bg-white/5 text-white rounded-xl font-black text-[9px] uppercase tracking-[0.2em] transition-all hover:-translate-y-1 flex items-center justify-center gap-4 border border-white/10"
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

          <div className="relative block animate-scale-in delay-200 mt-12 lg:mt-0">
            <div className="relative group z-10 rotating-border-container p-[1px] shadow-[0_50px_100px_rgba(0,0,0,0.5)] animate-float">
              <div className="rotating-border-bg opacity-20 group-hover:opacity-60 transition-opacity duration-700"></div>
              
              <div className="relative z-10 rounded-[1.4rem] overflow-hidden bg-[#050508] p-1">
                 <img 
                  src="https://i.pinimg.com/736x/69/36/05/693605df992b0509b97671fba58051a7.jpg" 
                  alt="Matheus Nogueira" 
                  className="rounded-[1.2rem] w-full h-[400px] lg:h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-80 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"></div>
              </div>

              <div className="absolute -inset-10 bg-gradient-to-r from-primary/30 to-secondary/20 blur-[100px] -z-10 opacity-30 group-hover:opacity-50 transition-all duration-1000"></div>
            </div>
            
            <div className="absolute -bottom-6 -left-4 z-30 glass-card p-5 rounded-2xl flex items-center gap-4 animate-slide-right delay-500 shadow-2xl border border-white/10 hover:scale-105 transition-transform cursor-default bg-[#050508]/90">
              <div className="p-2.5 bg-primary/10 rounded-xl text-primary border border-primary/20">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-0.5">Software</p>
                <p className="font-bold text-sm text-white">Engenharia Full Stack</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl transition-opacity duration-300" onClick={() => setShowModal(false)}></div>
          <div className="relative w-full max-w-4xl max-h-[90vh] glass-card rounded-[2.5rem] overflow-hidden animate-scale-in border border-white/10 shadow-2xl bg-[#050508]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <h2 className="text-[10px] font-black flex items-center gap-3 text-white uppercase tracking-[0.4em]"><Terminal className="text-primary w-4 h-4" /> Manifesto do Especialista</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-500 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-10 md:p-12 overflow-y-auto max-h-[calc(90vh-80px)] space-y-12 custom-scrollbar">
              <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                  <img src="https://i.pinimg.com/736x/69/36/05/693605df992b0509b97671fba58051a7.jpg" className="relative w-32 h-32 rounded-2xl object-cover border border-white/10 shadow-2xl grayscale" alt="Profile" />
                </div>
                <div>
                  <h3 className="text-3xl font-black mb-2 text-white tracking-tighter">Matheus Nogueira</h3>
                  <p className="text-primary font-bold text-[9px] mb-6 flex items-center justify-center md:justify-start gap-2 uppercase tracking-[0.4em]">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    Estrategista Digital
                  </p>
                  <p className="text-gray-400 text-base leading-relaxed font-light max-w-xl">
                    Projeto <b>vantagens competitivas</b> através da precisão técnica. Minha missão é traduzir visões comerciais ambiciosas em ativos digitais que geram valor real.
                  </p>
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