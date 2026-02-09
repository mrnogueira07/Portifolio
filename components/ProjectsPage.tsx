import React, { useState } from 'react';
import { ExternalLink, Github, ArrowLeft, Bot, Palette, Video, Code, Gamepad2, Camera, Play, X, Eye, Clapperboard } from 'lucide-react';
import { Project, ProjectCategory, DesignSubcategory } from '../types';
import Contact from './Contact';
import { useNavigate } from 'react-router-dom';

// Conjunto de dados estendido especificamente para a página de portfólio completo
const allProjects: Project[] = [
  // WEB
  {
    id: 99,
    title: "CANVAS AI",
    category: "Web",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600&h=400",
    description: "IA inovadora que gera roteiros completos e gamificação para o desenvolvimento de jogos.",
    tags: ["Artificial Intelligence", "React", "Automation", "Game Design"],
    link: "https://wa.me/5592981838704?text=Olá, vi o CANVAS AI no seu portfolio e gostaria de solicitar acesso para testar!"
  },
  {
    id: 1,
    title: "Landing Page",
    category: "Web",
    image: "https://i.pinimg.com/736x/0d/15/9a/0d159a163abdbd666e03917520e66b33.jpg",
    description: "Site institucional moderno e responsivo para oficina de reparos automotivos.",
    tags: ["React", "Next.js", "Tailwind", "Vercel"],
    videoUrl: "https://emanuelcarreparosautomotivos.vercel.app/"
  },
  
  // GAMES
  {
    id: 3,
    title: "Jogo - Tipos de Células",
    category: "Game",
    image: "https://img.itch.zone/aW1nLzI1Mzc0NzM4LnBuZw==/315x250%23c/y3MBHd.png",
    description: "Jogo educativo estilo roleta com quiz feito no Construct 3 para ensinar crianças sobre células.",
    tags: ["Construct 3", "Educativo", "Quiz"],
    videoUrl: "https://itch.io/embed-upload/12711071?color=333333"
  },

  // VIDEOS
  {
    id: 7,
    title: "Musa - A Reserva Florestal Adolfo Ducke",
    category: "VideoRecorded",
    image: "https://img.youtube.com/vi/EjX7H9sW4iA/maxresdefault.jpg",
    description: "Vídeo promocional cinematográfico destacando a biodiversidade e a importância da reserva.",
    tags: ["Sony Alpha", "Premiere", "Sound Design"],
    videoUrl: "https://www.youtube.com/embed/EjX7H9sW4iA?si=N-vg8LWodmRtei7i&autoplay=1"
  },

  // DESIGN
  {
    id: 8,
    title: "Campanha Black Friday",
    category: "Design",
    subcategory: "Banner",
    image: "https://images.unsplash.com/photo-1629904853716-6c0c4c000f07?auto=format&fit=crop&q=80&w=600&h=400",
    description: "Conjunto de banners digitais para e-commerce de eletrônicos.",
    tags: ["Photoshop", "Digital Marketing"],
  },
];

const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState<ProjectCategory>('Web');
  const [designSubFilter, setDesignSubFilter] = useState<DesignSubcategory | 'All'>('All');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const navigate = useNavigate();

  const categories: { id: ProjectCategory; label: string; icon: any }[] = [
    { id: 'Web', label: 'Desenv. Web', icon: Code },
    { id: 'Game', label: 'Games', icon: Gamepad2 },
    { id: 'Robotics', label: 'Robótica', icon: Bot },
    { id: 'Design', label: 'Design', icon: Palette },
    { id: 'VideoEdited', label: 'Vídeos Editados', icon: Video },
    { id: 'VideoRecorded', label: 'Vídeos Gravados', icon: Camera },
  ];

  const designSubs: { id: DesignSubcategory | 'All'; label: string }[] = [
    { id: 'All', label: 'Todos' },
    { id: 'Banner', label: 'Banners' },
    { id: 'Flyer', label: 'Flyers' },
    { id: 'Panfleto', label: 'Panfletos' },
    { id: 'Post', label: 'Social Media' },
  ];

  const filteredProjects = allProjects.filter(p => {
    if (filter === 'Robotics' || filter === 'VideoEdited') return false;
    if (p.category !== filter) return false;
    if (filter === 'Design' && designSubFilter !== 'All' && p.subcategory !== designSubFilter) return false;
    return true;
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

  const isYoutube = (url: string) => url.includes('youtube') || url.includes('youtu.be');
  const getIframeSrc = (url: string) => isYoutube(url) ? `${url}&origin=${window.location.origin}` : url;
  const isUnderDevelopment = filter === 'Robotics' || filter === 'VideoEdited' || filter === 'Design';

  return (
    <div className="relative min-h-screen bg-dark">
      {/* Camada de Fundo Radial Espelhada e Animada */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Canto Espelhado 1: Superior-Esquerdo Primário */}
        <div className="absolute top-[-15%] left-[-15%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px] animate-blob"></div>
        
        {/* Canto Espelhado 2: Inferior-Direito Primário (Espelhado ao 1) */}
        <div className="absolute bottom-[-15%] right-[-15%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px] animate-blob delay-700"></div>
        
        {/* Canto Espelhado 3: Superior-Direito Secundário */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/15 blur-[100px] animate-blob delay-1000"></div>
        
        {/* Canto Espelhado 4: Inferior-Esquerdo Secundário (Espelhado ao 3) */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/15 blur-[100px] animate-blob delay-500"></div>
        
        {/* Acento Central */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] rounded-full bg-indigo-400/5 blur-[150px] animate-pulse"></div>
      </div>

      <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
        <button 
            onClick={() => navigate('/')} 
            className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group animate-slide-right"
        >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Voltar para o Início
        </button>

        <div className="mb-12 animate-slide-up">
          <h1 className="font-display text-5xl font-bold mb-4">Portfolio <span className="text-primary">Completo</span></h1>
          <p className="text-gray-400 text-lg">Explore a diversidade criativa e técnica em cada projeto.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap gap-3 mb-8 animate-slide-up delay-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilter(cat.id);
                setDesignSubFilter('All');
              }}
              className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold transition-all duration-300 border ${
                filter === cat.id 
                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/25 scale-105' 
                : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:border-white/10 hover:text-white'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        {filter === 'Design' && !isUnderDevelopment && (
           <div className="flex flex-wrap gap-2 mb-8 animate-fade-in p-2 bg-white/5 rounded-lg w-fit">
             {designSubs.map((sub) => (
               <button
                 key={sub.id as string}
                 onClick={() => setDesignSubFilter(sub.id)}
                 className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                   designSubFilter === sub.id
                   ? 'bg-secondary text-white'
                   : 'text-gray-400 hover:text-white hover:bg-white/10'
                 }`}
               >
                 {sub.label}
               </button>
             ))}
           </div>
        )}

        <div className="min-h-[400px]">
          {isUnderDevelopment ? (
            <div className="w-full h-96 flex flex-col items-center justify-center glass-card rounded-2xl animate-scale-in border border-dashed border-white/20">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                {filter === 'Robotics' ? (
                  <Bot className="w-10 h-10 text-primary" />
                ) : filter === 'Design' ? (
                  <Palette className="w-10 h-10 text-primary" />
                ) : (
                  <Clapperboard className="w-10 h-10 text-primary" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center px-4">Área em Desenvolvimento</h3>
              <p className="text-gray-400 max-w-md text-center px-6">
                {filter === 'Robotics' 
                  ? "Estou trabalhando em projetos incríveis de robótica com Arduino e IoT. Em breve novidades por aqui!"
                  : filter === 'Design'
                  ? "Meu portfolio de design está sendo curado para exibir as melhores peças. Volte em breve!"
                  : "Estou preparando um showreel com minhas melhores edições e motion graphics. Em breve novidades por aqui!"
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 animate-fade-in">
              {filteredProjects.map((project, idx) => (
                <div 
                  key={project.id} 
                  className="group relative rounded-2xl overflow-hidden glass-card hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 flex flex-col animate-scale-in"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className={`h-64 overflow-hidden relative ${project.category === 'Game' ? 'bg-[#1f243a]' : 'bg-gray-900'}`}>
                    <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/0 transition-all z-10 pointer-events-none"></div>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      loading="lazy"
                      className="w-full h-full transform group-hover:scale-105 transition-transform duration-700 object-contain"
                    />
                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                       <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                        {project.category}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 relative z-20 bg-dark/90 md:bg-transparent flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">#{tag}</span>
                      ))}
                    </div>
                    <button 
                      onClick={() => handleProjectClick(project)}
                      className="flex-1 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-colors flex items-center justify-center gap-2"
                    >
                      {project.videoUrl ? <Play className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />} 
                      {project.videoUrl ? 'Ver Projeto' : project.link?.includes('wa.me') ? 'Solicitar Acesso' : 'Detalhes'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Contact />

      {/* Modal de Vídeo */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fade-in" onClick={() => setSelectedVideo(null)}>
          <div 
            className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 bg-black border border-white/10 w-full max-w-6xl h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-red-500 transition-colors">
              <X className="w-6 h-6" />
            </button>
            <iframe src={getIframeSrc(selectedVideo)} className="w-full flex-1" frameBorder="0" allowFullScreen></iframe>
            {selectedVideo.includes('12711071') && (
                <div className="bg-[#1f243a] p-4 text-center border-t border-white/10 shrink-0">
                    <p className="text-gray-300 text-sm mb-1">É necessário criar um cadastro ou login para jogar.</p>
                    <p className="text-white font-bold">Senha para entrar: <span className="text-primary select-all bg-white/10 px-2 py-1 rounded">@Innyx8487</span></p>
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;