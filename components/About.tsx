import React from 'react';
import { Code, Gamepad2, Video, PenTool, Trophy, Briefcase, Heart, Sparkles } from 'lucide-react';
import { ServiceItem } from '../types';

// Lista de serviços/especialidades oferecidas
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

// Dados estatísticos para exibição no componente
const stats = [
  { value: "4+", label: "Anos XP", icon: Trophy, color: "text-[#FFB800]", bgColor: "bg-[#FFB800]/10" },
  { value: "50+", label: "Ativos", icon: Briefcase, color: "text-[#3B82F6]", bgColor: "bg-[#3B82F6]/10" },
  { value: "20+", label: "Mundos", icon: Gamepad2, color: "text-[#A855F7]", bgColor: "bg-[#A855F7]/10" },
  { value: "100%", label: "Precisão", icon: Heart, color: "text-[#EF4444]", bgColor: "bg-[#EF4444]/10" }
];

// Componente Sobre (About) que detalha as expertises e estatísticas
const About: React.FC = () => {
  return (
    <section id="about" className="pt-32 pb-24 md:pt-48 md:pb-32 relative bg-transparent scroll-mt-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Cabeçalho da Seção */}
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

        {/* Grade de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-10 rounded-[2rem] bg-white/[0.01] border border-white/5 hover:border-primary/30 transition-all duration-700 hover:-translate-y-2 overflow-hidden flex flex-col h-full shadow-2xl backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-all duration-500 group-hover:scale-110">
                  <service.icon className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white mb-4 tracking-tight group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light group-hover:text-gray-400 transition-colors">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Painel de Estatísticas - Glassmorphism Grid */}
        <div className="relative rounded-[3rem] overflow-hidden bg-[#050510]/60 backdrop-blur-3xl border border-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.5)] animate-scale-in">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`
                  p-8 md:p-14 flex flex-col items-center justify-center relative group transition-all duration-700 hover:bg-white/[0.03]
                  ${index % 2 === 0 ? 'border-r border-white/5' : ''}
                  ${index < 2 ? 'border-b border-white/5' : ''}
                  md:border-b-0 md:border-r md:last:border-r-0
                `}
              >
                {/* Efeito de Brilho Interno no Hover */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className={`mb-6 p-4 rounded-2xl ${stat.bgColor} ${stat.color} transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 shadow-2xl`}>
                  <stat.icon size={28} strokeWidth={2.5} />
                </div>

                <div className="text-center relative">
                  <span className="text-4xl md:text-6xl font-display font-black text-white mb-2 tracking-tighter block group-hover:scale-110 transition-transform duration-700">
                    {stat.value}
                  </span>

                  <span className="text-[9px] md:text-[11px] font-black text-gray-500 uppercase tracking-[0.4em] group-hover:text-primary transition-colors duration-500">
                    {stat.label}
                  </span>
                </div>
                
                {/* Dot Indicador */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-all duration-700 scale-0 group-hover:scale-100"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;