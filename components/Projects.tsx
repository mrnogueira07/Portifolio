import React, { useState } from 'react';
import { ExternalLink, Github, X, Play, Gamepad2, Eye } from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { useNavigate } from 'react-router-dom';

// Imagens otimizadas do Unsplash com parâmetros de qualidade e tamanho
export const projectData: Project[] = [
  {
    id: 1,
    title: "CANVAS AI",
    category: "Web",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600&h=400",
    description: "IA inovadora que gera roteiros completos de gamificação para o desenvolvimento de jogos.",
    tags: ["Artificial Intelligence", "React", "Automation", "Game Design"],
    // Redireciona para o WhatsApp para solicitar acesso/teste
    link: "https://wa.me/5592981838704?text=Olá, vi o CANVAS AI no seu portfolio e gostaria de solicitar acesso para testar!"
  },
  {
    id: 2,
    title: "Jogo - Tipos de Células",
    category: "Game",
    image: "https://img.itch.zone/aW1nLzI1Mzc0NzM4LnBuZw==/315x250%23c/y3MBHd.png",
    description: "Jogo educativo estilo roleta com quiz feito no Construct 3 para ensinar crianças sobre células.",
    tags: ["Construct 3", "Educativo", "Quiz"],
    videoUrl: "https://itch.io/embed-upload/12711071?color=333333"
  },
  {
    id: 3,
    title: "Musa - A Reserva Florestal Adolfo Ducke",
    category: "VideoEdited",
    image: "https://img.youtube.com/vi/EjX7H9sW4iA/maxresdefault.jpg",
    description: "Vídeo promocional cinematográfico destacando a biodiversidade e a importância da reserva.",
    tags: ["After Effects", "Premiere", "Sound Design"],
    // Removido o origin hardcoded. Será injetado dinamicamente no render.
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
        if (filter === 'Video') {
          return p.category === 'VideoEdited' || p.category === 'VideoRecorded';
        }
        return p.category === filter;
      });

  const handleProjectClick = (project: Project) => {
    if (project.link) {
      window.open(project.link, '_blank');
      return;
    }
    if (project.videoUrl) {
      setSelectedVideo(project.videoUrl);
    } else {
      console.log("Visualizar projeto:", project.title);
    }
  };

  // Helper to detect if it's the itch.io widget
  const isItchIo = selectedVideo?.includes('itch.io');
  // Helper to detect if it is the full game embed (not the small widget)
  const isItchEmbed = selectedVideo?.includes('embed-upload');
  // Helper to check if it is a Youtube video
  const isYoutube = (url: string) => url.includes('youtube') || url.includes('youtu.be');

  // Função para gerar a URL correta do iframe
  const getIframeSrc = (url: string) => {
    if (isYoutube(url)) {
      // Adiciona a origem dinamicamente para funcionar em localhost, aistudio e deploy (vercel/netlify)
      return `${url}&origin=${window.location.origin}`;
    }
    return url;
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden scroll-mt-28">
      
      {/* Top & Bottom Gradients for smooth transition */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-dark to-transparent pointer-events-none z-20"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark to-transparent pointer-events-none z-20"></div>

      {/* Mirror/Lights Background Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dark Base Layer */}
        <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-sm"></div>
        
        {/* Moving Light Blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000 opacity-60"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>

        {/* Mirror Sheen/Glass Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="font-display text-4xl font-bold mb-4">Trabalhos <span className="text-primary">Recentes</span></h2>
            <p className="text-gray-400">Uma seleção dos meus melhores projetos em diversas áreas.</p>
          </div>
          
          <div className="flex gap-2 p-1 glass-card rounded-xl overflow-hidden">
            {['All', 'Web', 'Game', 'Video'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  filter === cat 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group relative rounded-2xl overflow-hidden glass-card hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border border-white/5 flex flex-col">
              {/* Image */}
              <div className={`h-64 overflow-hidden relative ${project.category === 'Game' ? 'bg-[#1f243a]' : 'bg-dark'}`}>
                <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/0 transition-all z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="400"
                  className={`w-full h-full transform group-hover:scale-105 transition-transform duration-700 ${
                    project.category === 'Game' ? 'object-contain p-4' : 
                    project.title === 'Landing Page' ? 'object-fill' : 
                    'object-cover'
                  }`}
                />
                
                <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                  {project.category === 'VideoEdited' || project.category === 'VideoRecorded' ? 'Video' : project.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative z-20 bg-dark/90 md:bg-transparent flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => handleProjectClick(project)}
                    className="flex-1 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    {project.videoUrl ? (
                      isYoutube(project.videoUrl) ? <Play className="w-4 h-4" /> : <Eye className="w-4 h-4" />
                    ) : project.category === 'Game' ? (
                      <Gamepad2 className="w-4 h-4" />
                    ) : (
                      <ExternalLink className="w-4 h-4" />
                    )} 
                    {project.category === 'Game' ? 'Jogar Agora' : project.videoUrl ? 'Visualizar' : project.link?.includes('wa.me') ? 'Solicitar Acesso' : 'Ver Projeto'}
                  </button>
                  <button className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors">
                    <Github className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ver Mais Button */}
        <div className="mt-12 flex justify-center">
            <button 
                onClick={() => navigate('/projects')}
                className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 text-gray-300 hover:text-white transition-all font-bold tracking-wide"
            >
                Ver Portfolio Completo
            </button>
        </div>

      </div>

      {/* Video Modal (Only for items with videoUrl) */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fade-in" onClick={() => setSelectedVideo(null)}>
          <div 
            className={`relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 bg-black border border-white/10 flex flex-col ${
                isItchIo && !isItchEmbed
                ? 'w-auto max-w-full p-6 bg-[#1f243a] items-center justify-center' 
                : 'w-full max-w-6xl h-[85vh]' 
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-red-500 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe 
              src={getIframeSrc(selectedVideo)} 
              className={(isItchIo && !isItchEmbed) ? '' : 'w-full flex-1'}
              width={(isItchIo && !isItchEmbed) ? 550 : undefined}
              height={(isItchIo && !isItchEmbed) ? 165 : undefined}
              title="Project Preview" 
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; gamepad; fullscreen" 
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            
            {/* Instruction Footer for Cell Game */}
            {selectedVideo.includes('12711071') && (
                <div className="bg-[#1f243a] p-4 text-center border-t border-white/10 shrink-0">
                    <p className="text-gray-300 text-sm mb-1">É necessário criar um cadastro ou fazer login na plataforma do Itch.io para jogar.</p>
                    <p className="text-white font-bold">Senha para entrar: <span className="text-primary select-all bg-white/10 px-2 py-1 rounded">@Innyx8487</span></p>
                </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
};

export default Projects;