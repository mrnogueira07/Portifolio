import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Sparkles } from 'lucide-react';
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
    image: "https://instagram.fpll10-1.fna.fbcdn.net/v/t51.82787-15/639726278_18412836703126391_6691856302622686503_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=Mzg0MDUyNDUyMzk5Nzc0NDcwMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=BM0erOwIiXoQ7kNvwH9UDFK&_nc_oc=AdlVhNy6vz9_rjoMI6Lx_wEUb6lnci4gClAgV22Vplj_yh7mXtiRH9eKASH7ET3e-PY&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fpll10-1.fna&_nc_gid=maEyBIt5JLAiuWHMh1rerA&oh=00_AftA8C-Dgl8Xs7mxYLPFS3ZAzp0pTlPnNTyO77XyHOSa9A&oe=69A522B0",
    description: "Flyer de alta performance criado para campanhas de marketing visual impactante.",
    tags: ["Design Gráfico", "Marketing", "Visual ID"],
  },
];

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Web' | 'Game' | 'Video' | 'Design'>('All');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Lock scroll when modal is open
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
      return;
    }
    if (project.category === 'Design') {
      setSelectedImage(project.image);
      return;
    }
  };

  const isYoutube = (url: string) => url.includes('youtube') || url.includes('youtu.be');
  const getIframeSrc = (url: string) => isYoutube(url) ? `${url}&origin=${window.location.origin}` : url;

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group/card relative h-full rounded-[2rem] overflow-hidden bg-white/[0.01] border border-white/5 hover:border-primary/20 transition-all duration-700 flex flex-col shadow-xl"
            >
              <div className="h-56 overflow-hidden relative bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#0d0d12] opacity-90"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                <h3 className="text-2xl md:text-3xl font-display font-black text-white/50 tracking-[0.2em] uppercase z-10 group-hover/card:scale-110 group-hover/card:text-white transition-all duration-700">
                  {project.category === 'Web' ? 'Landing Page' : project.category === 'Game' ? 'Game' : project.category.includes('Video') ? 'Vídeo Edit' : project.category === 'Design' ? 'Design' : project.category}
                </h3>
                <div className="absolute top-4 right-4 z-30 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-[0.3em] border border-white/10">
                  {project.category}
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <h4 className="text-lg font-bold mb-3 text-white tracking-tight">{project.title}</h4>
                <p className="text-gray-500 text-xs mb-6 line-clamp-2 leading-relaxed font-light">{project.description}</p>
                <button
                  onClick={() => handleProjectClick(project)}
                  className="w-full py-3.5 rounded-xl bg-primary/10 hover:bg-primary text-white text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-500 flex items-center justify-center gap-3 border border-primary/20 hover:border-primary shadow-lg hover:shadow-primary/20"
                >
                  Acessar Ativo
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button
            onClick={() => navigate('/projects')}
            className="group px-8 py-4 rounded-xl font-black text-[9px] uppercase tracking-[0.4em] text-white border border-primary/30 hover:border-primary bg-primary/5 hover:bg-primary/10 transition-all flex items-center gap-4 shadow-xl"
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