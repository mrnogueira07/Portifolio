import React, { useState } from 'react';
import { ExternalLink, X, Play, ArrowRight, Layers, Cpu } from 'lucide-react';
import { Project } from '../types';
import { useNavigate } from 'react-router-dom';

export const projectData: Project[] = [
  {
    id: 1,
    title: "Emanuel Car - Reparos",
    category: "Web",
    image: "https://i.pinimg.com/736x/0d/15/9a/0d159a163abdbd666e03917520e66b33.jpg",
    description: "Landing Page profissional e responsiva para oficina mecânica, otimizada para SEO e conversão.",
    tags: ["React", "Next.js", "Tailwind"],
    link: "https://emanuelcarreparosautomotivos.vercel.app/"
  },
  {
    id: 2,
    title: "Tipos de Células - Jogo",
    category: "Game",
    image: "https://img.itch.zone/aW1nLzI1Mzc0NzM4LnBuZw==/315x250%23c/y3MBHd.png",
    description: "Jogo educativo desenvolvido para facilitar o aprendizado de biologia de forma interativa.",
    tags: ["Construct 3", "Educação", "Gamedev"],
    videoUrl: "https://itch.io/embed-upload/12711071?color=333333"
  },
  {
    id: 3,
    title: "Reserva Ducke - Doc",
    category: "VideoEdited",
    image: "https://img.youtube.com/vi/EjX7H9sW4iA/maxresdefault.jpg",
    description: "Produção audiovisual destacando a fauna e flora da reserva amazônica Adolfo Ducke.",
    tags: ["After Effects", "Premiere", "Sony Alpha"],
    videoUrl: "https://www.youtube.com/embed/EjX7H9sW4iA?si=N-vg8LWodmRtei7i&autoplay=1"
  },
];

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Web' | 'Game' | 'Video'>('All');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredProjects = filter === 'All' 
    ? projectData 
    : projectData.filter(p => {
        if (filter === 'Video') return p.category.includes('Video');
        return p.category === filter;
      });

  const handleProjectClick = (project: Project) => {
    if (project.link) {
      window.open(project.link, '_blank');
      return;
    }
    if (project.videoUrl) {
      setSelectedVideo(project.videoUrl);
    }
  };

  return (
    <section id="projects" className="py-24 relative bg-[#0a0f1e] scroll-mt-10 overflow-hidden">
      {/* Background Cyberpunk Grid (Mesmo do Contato) */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
      
      {/* Linha de Gradiente Superior (Divisão Inicial) */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent z-20"></div>

      {/* Orbes de Luz Neon */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="animate-slide-right">
             {/* Badge System Online Style */}
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span className="text-xs font-bold text-indigo-300 tracking-widest uppercase font-display">System Portfolio</span>
             </div>
             
            <h3 className="text-4xl md:text-5xl font-bold font-display text-white tracking-tight">
              Projetos <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-secondary animate-color-cycle">Inicializados</span>
            </h3>
          </div>
          
          {/* Filtros High-Tech */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-[#0b1221]/80 backdrop-blur-md rounded-xl border border-white/10 animate-fade-in delay-200">
            {['All', 'Web', 'Game', 'Video'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat as any)} 
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 relative overflow-hidden group ${
                  filter === cat 
                    ? 'bg-primary/20 text-primary border border-primary/50 shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span className="relative z-10">{cat === 'All' ? 'Todos' : cat}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className={`group relative rounded-[1.5rem] overflow-hidden bg-[#0b1221]/80 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 animate-scale-in flex flex-col`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              {/* Container da Imagem */}
              <div className="h-64 overflow-hidden relative border-b border-white/5 group-hover:border-primary/20 transition-colors">
                {/* Efeito de Scanline na Imagem */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(99,102,241,0.1)_50%,transparent_100%)] bg-[length:100%_4px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20"></div>
                
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100" 
                  loading="lazy"
                />
                
                <div className="absolute top-4 right-4 z-30 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider border border-white/10 shadow-lg">
                  {project.category}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col relative z-10">
                <h4 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors font-display">{project.title}</h4>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-auto mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-semibold px-2.5 py-1 rounded bg-primary/10 text-primary/80 border border-primary/20 transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <button 
                  onClick={() => handleProjectClick(project)} 
                  className="w-full py-3.5 rounded-xl bg-white/5 hover:bg-primary/20 text-white text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 border border-white/10 hover:border-primary/50 group/btn relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {project.videoUrl ? <Play size={16} className="fill-current" /> : <ExternalLink size={16} />} 
                    {project.videoUrl ? 'Executar Preview' : 'Acessar Link'}
                  </span>
                  <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center animate-slide-up delay-300">
          <button 
            onClick={() => navigate('/projects')} 
            className="group relative px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] overflow-hidden border border-white/10 bg-[#0b1221]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
            {/* Brilho Animado no Botão */}
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-shine"></div>
            
            <span className="relative flex items-center gap-3 tracking-wider uppercase text-sm">
              Acessar Database Completa 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg" onClick={() => setSelectedVideo(null)}>
          <div className="relative w-full max-w-5xl h-[80vh] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl animate-scale-in" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-red-500 transition-colors"><X /></button>
            <iframe src={selectedVideo} className="w-full h-full" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        .animate-shine {
          animation: shine 1.5s infinite linear;
        }
      `}</style>
    </section>
  );
};

export default Projects;