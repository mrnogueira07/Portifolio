import React, { useState, useEffect } from 'react';
import { ExternalLink, X, Play, ArrowRight, Monitor, Gamepad2, LayoutGrid, List, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { useNavigate } from 'react-router-dom';

export const projectData: Project[] = [
  {
    id: 1,
    title: "Emanuel Car - Reparos",
    category: "Web",
    image: "https://i.pinimg.com/736x/0d/15/9a/0d159a163abdbd666e03917520e66b33.jpg",
    description: "Landing Page profissional de alta conversão, otimizada para SEO e performance mobile.",
    tags: ["React", "Next.js", "Tailwind"],
    link: "https://emanuelcarreparosautomotivos.vercel.app/"
  },
  {
    id: 2,
    title: "Tipos de Células - Jogo",
    category: "Game",
    image: "https://img.itch.zone/aW1nLzI1Mzc0NzM4LnBuZw==/315x250%23c/y3MBHd.png",
    description: "Experiência gamificada para o setor educacional, focada em aprendizado interativo.",
    tags: ["Construct 3", "Educação", "Gamedev"],
    videoUrl: "https://itch.io/embed-upload/12711071?color=333333"
  },
  {
    id: 3,
    title: "Reserva Ducke - Doc",
    category: "VideoEdited",
    image: "https://img.youtube.com/vi/EjX7H9sW4iA/maxresdefault.jpg",
    description: "Produção documental com tratamento visual cinematográfico e Sound Design imersivo.",
    tags: ["After Effects", "Premiere", "Sony Alpha"],
    videoUrl: "https://www.youtube.com/embed/EjX7H9sW4iA?si=N-vg8LWodmRtei7i&autoplay=1"
  },
];

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Web' | 'Game' | 'Video'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const navigate = useNavigate();

  const filteredProjects = filter === 'All' 
    ? projectData 
    : projectData.filter(p => {
        if (filter === 'Video') return p.category.includes('Video');
        return p.category === filter;
      });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerPage(3);
      else if (window.innerWidth >= 768) setItemsPerPage(2);
      else setItemsPerPage(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <section id="projects" className="py-24 relative bg-transparent scroll-mt-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="animate-slide-right">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5 backdrop-blur-md mb-4">
                <Sparkles size={10} className="text-primary" />
                <span className="text-[8px] font-black text-gray-500 tracking-[0.4em] uppercase">Showcase</span>
             </div>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">
              Nexus <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Projetos</span>
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-1.5 p-1 bg-white/[0.02] rounded-xl border border-white/5">
            {['All', 'Web', 'Game', 'Video'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => { setFilter(cat as any); setCurrentIndex(0); }} 
                className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] transition-all ${
                  filter === cat 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {cat === 'All' ? 'Todos' : cat}
              </button>
            ))}
          </div>
        </div>

        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="group/card relative h-full rounded-[2rem] overflow-hidden bg-white/[0.01] border border-white/5 hover:border-primary/20 transition-all duration-700 flex flex-col shadow-xl"
              >
                <div className="h-56 overflow-hidden relative">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover/card:scale-105 transition-transform duration-1000 grayscale-[30%] group-hover/card:grayscale-0" />
                  <div className="absolute top-4 right-4 z-30 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-[0.3em] border border-white/10">
                    {project.category}
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <h4 className="text-lg font-bold mb-3 text-white tracking-tight">{project.title}</h4>
                  <p className="text-gray-500 text-xs mb-6 line-clamp-2 leading-relaxed font-light">{project.description}</p>
                  <button 
                    onClick={() => handleProjectClick(project)} 
                    className="w-full py-3.5 rounded-xl bg-white/[0.02] hover:bg-white/10 text-white text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-500 flex items-center justify-center gap-3 border border-white/5"
                  >
                    Acessar Ativo
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <button 
            onClick={() => navigate('/projects')} 
            className="group px-8 py-4 rounded-xl font-black text-[9px] uppercase tracking-[0.4em] text-white border border-white/5 hover:border-primary/50 bg-white/[0.01] transition-all flex items-center gap-4"
          >
            Explorar Repositório Completo
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl" onClick={() => setSelectedVideo(null)}>
          <div className="relative w-full max-w-5xl h-[80vh] rounded-[2rem] overflow-hidden bg-black border border-white/10 animate-scale-in" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedVideo(null)} className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/5 text-white hover:bg-red-500 transition-all"><X size={18} /></button>
            <iframe src={selectedVideo} className="w-full h-full" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;