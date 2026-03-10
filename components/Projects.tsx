import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { useNavigate } from 'react-router-dom';

// Dados dos projetos em destaque para a página inicial
export const projectData: Project[] = [
  {
    id: 1,
    title: "Emanuel Car - Reparos",
    category: "Web",
    image: "https://i.pinimg.com/736x/0d/15/9a/0d159a163abdbd666e03917520e66b33.jpg",
    description: "Landing Page profissional de alta conversão, otimizada para SEO e performance mobile.",
    tags: ["React", "Next.js", "Tailwind"],
    link: "https://emanuelcar.vercel.app/"
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
  {
    id: 10,
    title: "Flyer Promocional",
    category: "Design",
    image: "https://i.pinimg.com/736x/c4/ed/de/c4eddecbd46cc89eb7e21ebb36c2da14.jpg",
    description: "Flyer de alta performance criado para campanhas de marketing visual impactante.",
    tags: ["Design Gráfico", "Marketing", "Visual ID"],
  },
];

// Componente Projetos - Vitrine de trabalhos destacados
const Projects: React.FC = () => {
  // Estado para filtragem por categoria
  const [filter, setFilter] = useState<'All' | 'Web' | 'Game' | 'Video' | 'Design'>('All');
  // Estado para armazenar o vídeo selecionado para o modal de reprodução
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  // Estado para armazenar a imagem selecionada para o modal de visualização (Design)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Bloqueia a rolagem do fundo quando um modal está aberto
  useEffect(() => {
    if (selectedVideo || selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedVideo, selectedImage]);

  // Aplica o filtro selecionado aos projetos exibidos
  const filteredProjects = filter === 'All'
    ? projectData
    : projectData.filter(p => {
      if (filter === 'Video') return p.category.includes('Video');
      return p.category === filter;
    });

  // Função para lidar com cliques nos cards de projeto (abre link, vídeo ou imagem)
  const handleProjectClick = (project: Project) => {
    if (project.link) {
      window.open(project.link, '_blank');
      return;
    }
    if (project.videoUrl) {
      setSelectedVideo(project.videoUrl);
      return;
    }
    if (project.category === 'Design') {
      setSelectedImage(project.image);
      return;
    }
  };

  // Verifica se a URL de vídeo pertence ao YouTube
  const isYoutube = (url: string) => url.includes('youtube') || url.includes('youtu.be');
  const getIframeSrc = (url: string) => isYoutube(url) ? `${url}&origin=${window.location.origin}` : url;

  return (
    <section id="projects" className="pt-32 pb-24 md:pt-48 md:pb-32 relative bg-transparent scroll-mt-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabeçalho e Botões de Filtro */}
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
            {['All', 'Web', 'Game', 'Video', 'Design'].map((cat) => (
              <button
                key={cat}
                onClick={() => { setFilter(cat as any); }}
                className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] transition-all ${filter === cat
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-gray-500 hover:text-white'
                  }`}
              >
                {cat === 'All' ? 'Todos' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grade de Exibição dos Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredProjects.map((project, i) => (
            <div
              key={project.id}
              style={{ animationDelay: `${i * 100}ms` }}
              className="group/card relative h-full rounded-[2.5rem] overflow-hidden bg-[#050510]/40 backdrop-blur-3xl border border-white/5 hover:border-primary/30 transition-all duration-700 flex flex-col shadow-2xl animate-slide-up"
            >
              {/* Image Container with Zoom */}
              <div className="h-64 overflow-hidden relative cursor-pointer" onClick={() => handleProjectClick(project)}>
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent opacity-80 group-hover/card:opacity-40 transition-opacity duration-700"></div>
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6 z-30">
                  <div className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-[9px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-2 group-hover/card:bg-primary group-hover/card:border-primary transition-all duration-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover/card:bg-white animate-pulse"></div>
                    {project.category}
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 md:p-10 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/5 text-[8px] font-black text-gray-500 uppercase tracking-widest group-hover/card:text-primary group-hover/card:border-primary/20 transition-all duration-500">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h4 className="text-xl md:text-2xl font-display font-black mb-4 text-white tracking-tight group-hover/card:text-primary transition-colors duration-500">
                  {project.title}
                </h4>
                
                <p className="text-gray-500 text-xs md:text-sm mb-10 line-clamp-3 leading-relaxed font-light">
                  {project.description}
                </p>
                
                <button
                  onClick={() => handleProjectClick(project)}
                  className="mt-auto w-full py-4 rounded-2xl bg-white/[0.03] hover:bg-primary text-white text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-700 flex items-center justify-center gap-4 border border-white/10 hover:border-primary shadow-xl group/btn"
                >
                  ACESSAR ATIVO 
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-500" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Botão para Navegação até a Página Completa de Projetos */}
        <div className="mt-32 flex justify-center pb-20">
          <button
            onClick={() => navigate('/projects')}
            className="group relative overflow-hidden rounded-full p-[2px] transition-all duration-500 hover:scale-105 active:scale-95"
          >
            {/* Glow Animado de Borda */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-gradient-x" />
            
            {/* Conteúdo do Botão */}
            <div className="relative flex items-center gap-6 bg-[#050510] hover:bg-transparent px-12 py-5 rounded-full transition-all duration-500 whitespace-nowrap">
              {/* Efeito Shimmer */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-[1500ms]" />
              </div>

              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-white">
                Explorar Repositório Completo
              </span>
              
              <div className="relative flex items-center">
                <ArrowRight size={18} className="text-white group-hover:translate-x-3 transition-transform duration-500 ease-out" />
                <Sparkles 
                  size={16} 
                  className="absolute -right-8 -top-5 text-yellow-400 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500 animate-pulse" 
                />
              </div>
            </div>

            {/* Brilho Exterior (Outer Glow) */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
          </button>
        </div>
      </div>

      {/* Modal de Reprodução de Vídeo */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl" onClick={() => setSelectedVideo(null)}>
          <div className="relative w-full max-w-5xl h-[80vh] rounded-[2rem] overflow-hidden bg-black border border-white/10 animate-scale-in" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedVideo(null)} className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/5 text-white hover:bg-red-500 transition-all"><X size={18} /></button>
            <iframe
              src={getIframeSrc(selectedVideo)}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        </div>
      )}

      {/* Modal de Visualização de Imagem (Design) */}
      {selectedImage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-3xl animate-fade-in-fast" onClick={() => setSelectedImage(null)}>
          <div
            className="relative rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] bg-black border border-white/10 w-fit max-w-[90%] md:max-w-xl flex flex-col animate-scale-in-fast"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-dark/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Preview Design</span>
              </div>
              <button onClick={() => setSelectedImage(null)} className="p-2 rounded-full bg-white/5 text-white hover:bg-red-500 hover:scale-110 transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2">
              <img
                src={selectedImage}
                alt="Full Preview"
                className="w-full h-auto rounded-xl object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;