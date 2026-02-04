import React, { useState } from 'react';
import { ExternalLink, X, Play, ArrowRight } from 'lucide-react';
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
    <section id="projects" className="py-24 relative bg-dark scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="animate-slide-right">
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-bold font-display text-white">Meus Melhores <span className="text-primary">Trabalhos</span></h3>
          </div>
          <div className="flex gap-2 p-1 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 animate-fade-in delay-200">
            {['All', 'Web', 'Game', 'Video'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat as any)} 
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${filter === cat ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                {cat === 'All' ? 'Tudo' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className={`group relative rounded-2xl overflow-hidden glass-card flex flex-col transition-all hover:-translate-y-2 duration-300 animate-scale-in`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="h-64 overflow-hidden relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60"></div>
                <div className="absolute top-4 right-4 bg-dark/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                  {project.category}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h4 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">{project.title}</h4>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-gray-300 border border-white/5">#{tag}</span>)}
                </div>
                <button 
                  onClick={() => handleProjectClick(project)} 
                  className="w-full mt-6 py-3 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white text-sm font-bold transition-all flex items-center justify-center gap-2"
                >
                  {project.videoUrl ? <Play size={16} /> : <ExternalLink size={16} />} 
                  {project.videoUrl ? 'Ver Preview' : 'Acessar Link'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center animate-slide-up delay-300">
          <button onClick={() => navigate('/projects')} className="group flex items-center gap-2 px-8 py-3 rounded-full border border-white/10 hover:border-primary/50 text-gray-300 hover:text-white transition-all font-bold">
            Ver Galeria Completa <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
    </section>
  );
};

export default Projects;