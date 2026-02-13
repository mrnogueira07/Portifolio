import React from 'react';
import { Code, Gamepad2, Video, PenTool, Trophy, Briefcase, Heart, Sparkles, Zap, Cpu, Activity } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    icon: Code,
    title: "Full Stack Dev",
    description: "Arquitetura de software robusta, APIs escaláveis e interfaces reativas com React, Node.js e tecnologias modernas."
  },
  {
    icon: Gamepad2,
    title: "Game Design",
    description: "Desenvolvimento de mecânicas imersivas e jogabilidade polida em Unity (C#) e Unreal Engine para PC e Mobile."
  },
  {
    icon: Video,
    title: "Audiovisual",
    description: "Edição cinematográfica, motion graphics avançado e color grading profissional para produções de alto impacto."
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    description: "Prototipagem de interfaces centradas no usuário, focando em usabilidade, acessibilidade e estética premium."
  }
];

const stats = [
  { value: "4+", label: "Anos de XP", icon: Trophy, color: "text-amber-400" },
  { value: "50+", label: "Projetos", icon: Briefcase, color: "text-blue-400" },
  { value: "20+", label: "Jogos", icon: Gamepad2, color: "text-purple-400" },
  { value: "100%", label: "Satisfação", icon: Heart, color: "text-red-400" }
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 relative scroll-mt-10 overflow-hidden bg-[#0a0f1e]">
       {/* Background Cyberpunk Grid */}
       <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
      
       {/* Orbes de Luz Neon (Posicionamento Inverso para contraste) */}
       <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
       <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho Compacto */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 animate-slide-up">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-md">
              <Sparkles size={12} /> Habilidades & Expertise
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Transformando <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-400 animate-color-cycle">Lógica</span> em Arte Digital.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Combinando engenharia de software precisa com design criativo para construir ecossistemas digitais completos, desde o backend até a experiência visual final.
            </p>
          </div>
          
          {/* Badge Decorativa */}
          <div className="hidden md:flex items-center gap-3 px-5 py-3 rounded-xl bg-[#0f172a]/50 border border-white/10 backdrop-blur-md">
             <div className="relative">
               <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute opacity-75"></div>
               <div className="w-3 h-3 bg-green-500 rounded-full relative"></div>
             </div>
             <span className="text-sm font-bold text-gray-300">Open to Work</span>
          </div>
        </div>

        {/* Grid de Serviços - Layout Bento/Premium */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group relative p-6 rounded-2xl bg-[#0b1221]/60 backdrop-blur-md border border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 overflow-hidden flex flex-col justify-between h-full"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradiente de Fundo no Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300 shadow-lg">
                  <service.icon className="w-6 h-6 text-gray-300 group-hover:text-primary transition-colors" />
                </div>
                
                <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-white/5 pl-3 group-hover:border-primary/30 transition-colors">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Barra de Status (Stats) Estilo HUD */}
        <div className="relative rounded-2xl overflow-hidden bg-[#0b1221]/40 backdrop-blur-xl border border-white/10 animate-scale-in delay-200">
           {/* Linha de Scan decorativa */}
           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
             {stats.map((stat, index) => (
               <div key={index} className="p-6 md:p-8 flex flex-col items-center justify-center relative group hover:bg-white/5 transition-colors">
                 <div className={`mb-3 p-3 rounded-full bg-white/5 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                   <stat.icon size={24} />
                 </div>
                 <span className="text-3xl md:text-4xl font-display font-bold text-white mb-1 tracking-tight">
                   {stat.value}
                 </span>
                 <span className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                   {stat.label}
                 </span>
               </div>
             ))}
           </div>
           
           {/* Detalhes de Interface */}
           <div className="absolute bottom-2 right-4 flex items-center gap-2 opacity-30">
              <Activity size={14} className="text-primary animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest font-mono text-primary">System Optimal</span>
           </div>
        </div>
        
      </div>
    </section>
  );
};

export default About;