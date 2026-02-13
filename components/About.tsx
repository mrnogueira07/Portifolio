import React from 'react';
import { Code, Gamepad2, Video, PenTool, Trophy, Briefcase, Heart, Sparkles, Activity } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    icon: Code,
    title: "Sistemas Críticos",
    description: "Arquiteturas robustas focadas em performance extrema e escalabilidade para ecossistemas de alta demanda."
  },
  {
    icon: Gamepad2,
    title: "Mundos Imersivos",
    description: "Desenvolvimento de mecânicas que elevam o engajamento através de gamificação estratégica."
  },
  {
    icon: Video,
    title: "Storytelling Visual",
    description: "Audiovisual de alto impacto projetado para converter percepção de marca em autoridade."
  },
  {
    icon: PenTool,
    title: "UI/UX Estratégico",
    description: "Interfaces centradas na jornada cognitiva do usuário, otimizando cada ponto de contato."
  }
];

const stats = [
  { value: "4+", label: "Anos XP", icon: Trophy, color: "text-[#FFB800]", bgColor: "bg-[#FFB800]/10" },
  { value: "50+", label: "Ativos", icon: Briefcase, color: "text-[#3B82F6]", bgColor: "bg-[#3B82F6]/10" },
  { value: "20+", label: "Mundos", icon: Gamepad2, color: "text-[#A855F7]", bgColor: "bg-[#A855F7]/10" },
  { value: "100%", label: "Precisão", icon: Heart, color: "text-[#EF4444]", bgColor: "bg-[#EF4444]/10" }
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative scroll-mt-10 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5 text-primary text-[9px] font-black uppercase tracking-[0.4em] mb-6 backdrop-blur-md">
            <Sparkles size={12} /> Expertises Estratégicas
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-tight">
            Engenharia que <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Domina Mercados.</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed font-light max-w-3xl mx-auto">
            Unifico a precisão algorítmica com a sensibilidade estética para criar ativos que definem novos padrões de excelência.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group relative p-10 rounded-[2rem] bg-white/[0.01] border border-white/5 hover:border-primary/20 transition-all duration-700 hover:-translate-y-2 overflow-hidden flex flex-col h-full shadow-xl"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-all duration-500">
                  <service.icon className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white mb-4 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative rounded-[2.5rem] overflow-hidden bg-[#08080c] border border-white/[0.05] shadow-2xl animate-scale-in">
           <div className="grid grid-cols-2 md:grid-cols-4">
             {stats.map((stat, index) => (
               <div key={index} className={`p-10 md:p-14 flex flex-col items-center justify-center relative group transition-all duration-700 hover:bg-white/[0.01] ${index !== stats.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-white/[0.05]' : ''}`}>
                 
                 <div className={`mb-6 p-4 rounded-xl ${stat.bgColor} ${stat.color} transition-all duration-700 group-hover:scale-110`}>
                   <stat.icon size={24} strokeWidth={2.5} />
                 </div>
                 
                 <span className="text-4xl md:text-5xl font-display font-black text-white mb-2 tracking-tighter">
                   {stat.value}
                 </span>
                 
                 <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em] group-hover:text-gray-400 transition-colors">
                   {stat.label}
                 </span>
               </div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default About;