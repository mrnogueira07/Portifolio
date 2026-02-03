import React from 'react';
import { Code, Gamepad2, Video, PenTool, Trophy, Briefcase, Heart, Rocket } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    icon: Code,
    title: "Web Development",
    description: "Sites modernos, SPAs reativas e aplicações escaláveis usando React, Node.js e Tailwind."
  },
  {
    icon: Gamepad2,
    title: "Game Design",
    description: "Criação de mecânicas, level design e programação em C# e Unity para jogos 2D/3D."
  },
  {
    icon: Video,
    title: "Edição de Vídeo",
    description: "Cortes dinâmicos, color grading e motion graphics para YouTube e Publicidade."
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    description: "Interfaces intuitivas e belas focadas na melhor experiência do usuário."
  }
];

const stats = [
  { value: "4+", label: "Anos de Experiência", icon: Trophy, color: "from-blue-400 to-indigo-500" },
  { value: "50+", label: "Projetos Entregues", icon: Briefcase, color: "from-pink-400 to-rose-500" },
  { value: "20+", label: "Jogos Publicados", icon: Gamepad2, color: "from-purple-400 to-violet-500" },
  { value: "100%", label: "Clientes Satisfeitos", icon: Heart, color: "from-green-400 to-emerald-500" }
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative scroll-mt-28">
      {/* Top Gradient Divider */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-dark to-transparent pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Minha <span className="text-secondary">Expertise</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Combinando lógica de programação com criatividade artística para entregar resultados únicos.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {services.map((service, index) => (
            <div key={index} className="glass-card p-8 rounded-2xl hover:bg-white/5 transition-all duration-300 hover:-translate-y-2 group border border-white/5 hover:border-white/10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:from-primary group-hover:to-secondary transition-all shadow-inner shadow-white/10">
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Modernized Stats Section */}
        <div className="relative group">
          {/* Background Glow Animation */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 animate-gradient-x"></div>
          
          <div className="relative glass-card rounded-3xl p-8 md:p-12 border border-white/10 overflow-hidden bg-[#0f172a]/80 backdrop-blur-xl">
            {/* Decorative Blobs inside card */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 relative z-10">
              {stats.map((stat, index) => (
                <div key={index} className="relative flex flex-col items-center justify-center text-center group/item">
                  
                  {/* Background Icon (Watermark effect) */}
                  <div className="absolute opacity-0 group-hover/item:opacity-5 transition-opacity duration-500 transform scale-150 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <stat.icon size={100} />
                  </div>

                  {/* Number */}
                  <div className={`text-5xl md:text-6xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-b ${stat.color} mb-2 transform transition-transform duration-300 group-hover/item:scale-110`}>
                    {stat.value}
                  </div>

                  {/* Label */}
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-[0.2em] group-hover/item:text-white transition-colors duration-300">
                    {stat.label}
                  </p>

                  {/* Mobile Divider (only for odd items visually, but handled via CSS grid logic mostly) */}
                  {/* Desktop Divider - Right Border except last item */}
                  {index !== stats.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent translate-x-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;