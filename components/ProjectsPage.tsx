import React, { useState, useEffect } from 'react';
import { ExternalLink, ArrowLeft, Bot, Palette, Video, Code, Gamepad2, Camera, Play, X, Clapperboard, Sparkles, Layout, Monitor } from 'lucide-react';
import { Project, ProjectCategory, DesignSubcategory } from '../types';
import Contact from './Contact';
import { useNavigate } from 'react-router-dom';

// Data specifically for the full portfolio
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
    title: "Emanuel Car LP",
    category: "Web",
    image: "https://i.pinimg.com/736x/0d/15/9a/0d159a163abdbd666e03917520e66b33.jpg",
    description: "Site institucional moderno e responsivo para oficina de reparos automotivos.",
    tags: ["React", "Next.js", "Tailwind", "Vercel"],
    videoUrl: "https://emanuelcarreparosautomotivos.vercel.app/"
  },
  
  // GAMES
  {
    id: 3,
    title: "Tipos de Células",
    category: "Game",
    image: "https://img.itch.zone/aW1nLzI1Mzc0NzM4LnBuZw==/315x250%23c/y3MBHd.png",
    description: "Jogo educativo estilo roleta com quiz feito no Construct 3 para ensinar crianças sobre células.",
    tags: ["Construct 3", "Educativo", "Quiz"],
    videoUrl: "https://itch.io/embed-upload/12711071?color=333333"
  },

  // VIDEOS
  {
    id: 7,
    title: "Musa - Reserva Adolfo Ducke",
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
    { id: 'Web', label: 'Web', icon: Code },
    { id: 'Game', label: 'Games', icon: Gamepad2 },
    { id: 'Robotics', label: 'Robótica', icon: Bot },
    { id: 'Design', label: 'Design', icon: Palette },
    { id: 'VideoEdited', label: 'Motion', icon: Video },
    { id: 'VideoRecorded', label: 'Filmagem', icon: Camera },
  ];

  const designSubs: { id: DesignSubcategory | 'All'; label: string }[] = [
    { id: 'All', label: 'Todos' },
    { id: 'Banner', label: 'Banners' },
    { id: 'Flyer', label: 'Flyers' },
    { id: 'Panfleto', label: 'Panfletos' },
    { id: 'Post', label: 'Social' },
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
  const isUnderDevelopment = filter === 'Robotics' || filter === 'VideoEdited' || (filter === 'Design' && filteredProjects.length === 0);

  return (
    <div className="relative min-h-screen bg-dark overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Premium Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0f]"></div>
        <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-primary/10 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[160px] animate-pulse delay-700"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      </div>

      <div className="relative z-10 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
        
        {/* Header Section */}
        <div className="mb-16">
          <button 
              onClick={() => navigate('/')} 
              className="mb-10 flex items-center gap-2.5 text-gray-400 hover:text-white transition-all group px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md w-fit hover:border-white/20 active:scale-95"
          >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
              <span className="text-xs font-bold uppercase tracking-widest">Retornar</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-slide-up">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                <Sparkles size={12} /> Database Visual
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-black tracking-tight text-white leading-tight">
                Nexus <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Portfolio</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl font-light">
                Um diretório completo de soluções digitais, desde sistemas escaláveis até experiências imersivas em games e audiovisual.
              </p>
            </div>
            
            <div className="hidden md:flex items-center gap-3 px-6 py-4 rounded-2xl glass-card border-white/10">
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-dark bg-gray-800 flex items-center justify-center text-[10px] font-bold">
                      {i === 1 ? 'UI' : i === 2 ? 'UX' : 'DEV'}
                    </div>
                  ))}
               </div>
               <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
               <div>
                  <p className="text-xs font-bold text-white uppercase tracking-tighter">Stack Ativa</p>
                  <p className="text-[10px] text-gray-500 font-medium">React • Unity • A.E</p>
               </div>
            </div>
          </div>
        </div>
        
        {/* Category Selector - High End Segmented Control */}
        <div className="relative z-20 mb-12 p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-wrap gap-1.5 animate-slide-up delay-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilter(cat.id);
                setDesignSubFilter('All');
              }}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-sm font-bold transition-all duration-500 relative overflow-hidden group ${
                filter === cat.id 
                ? 'bg-primary text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <cat.icon className={`w-4 h-4 transition-transform duration-500 ${filter === cat.id ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className="tracking-tight">{cat.label}</span>
              {filter === cat.id && (
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
              )}
            </button>
          ))}
        </div>

        {/* Design Sub-filters with animated transition */}
        {filter === 'Design' && !isUnderDevelopment && (
           <div className="flex flex-wrap gap-2 mb-10 animate-fade-in p-1 bg-white/5 rounded-xl border border-white/5 w-fit mx-auto">
             {designSubs.map((sub) => (
               <button
                 key={sub.id as string}
                 onClick={() => setDesignSubFilter(sub.id)}
                 className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                   designSubFilter === sub.id
                   ? 'bg-white text-dark shadow-lg'
                   : 'text-gray-400 hover:text-white hover:bg-white/5'
                 }`}
               >
                 {sub.label}
               </button>
             ))}
           </div>
        )}

        <div className="min-h-[500px]">
          {isUnderDevelopment ? (
            <div className="w-full py-32 flex flex-col items-center justify-center glass-card rounded-[2.5rem] border-dashed border-white/10 animate-scale-in group">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-primary/10 to-white/5 rounded-3xl border border-white/10 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                  {filter === 'Robotics' ? (
                    <Bot className="w-12 h-12 text-primary" />
                  ) : filter === 'Design' ? (
                    <Palette className="w-12 h-12 text-primary" />
                  ) : (
                    <Clapperboard className="w-12 h-12 text-primary" />
                  )}
                </div>
              </div>
              <h3 className="text-3xl font-display font-black text-white mb-4 tracking-tight">Setor em <span className="text-primary">Expansão</span></h3>
              <p className="text-gray-400 max-w-lg text-center px-10 leading-relaxed font-light">
                {filter === 'Robotics' 
                  ? "Engenharia de hardware e automação IoT. Atualmente consolidando documentação de protótipos em Arduino e ESP32."
                  : filter === 'Design'
                  ? "Brand identity e interfaces centradas no usuário. A curadoria final das peças está em processamento."
                  : "Storytelling visual e pós-produção avançada. Em breve, novos showreels estarão disponíveis para visualização."
                }
              </p>
              <div className="mt-10 flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.3em] animate-pulse">
                <Layout size={12} /> Syncing Data...
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24 animate-fade-in">
              {filteredProjects.map((project, idx) => (
                <div 
                  key={project.id} 
                  className="group relative rounded-[2rem] overflow-hidden bg-[#0d0d12] border border-white/5 hover:border-primary/50 transition-all duration-500 flex flex-col shadow-2xl hover:shadow-primary/10"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Card Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="h-72 overflow-hidden relative border-b border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-transparent to-transparent z-10 opacity-60"></div>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                    />
                    
                    {/* Badge Overlay */}
                    <div className="absolute top-6 left-6 z-20">
                       <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-[9px] font-black text-white uppercase tracking-widest shadow-xl">
                        {project.category === 'Web' ? <Monitor size={10} /> : <Gamepad2 size={10} />}
                        {project.category}
                      </div>
                    </div>

                    {/* Quick Action Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                          onClick={() => handleProjectClick(project)}
                          className="w-16 h-16 rounded-full bg-white text-dark flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500"
                        >
                          {project.videoUrl ? <Play fill="currentColor" className="ml-1" /> : <ExternalLink />}
                        </button>
                    </div>
                  </div>

                  <div className="p-8 relative z-20 flex-1 flex flex-col">
                    <h3 className="text-2xl font-display font-bold mb-3 text-white group-hover:text-primary transition-colors leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed font-light">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/5 transition-colors group-hover:border-primary/20 group-hover:text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action Banner - Compacted Version */}
        <div className="relative rounded-[2rem] overflow-hidden p-8 lg:py-12 lg:px-14 bg-gradient-to-br from-[#12121a] to-[#0a0a0f] border border-white/10 text-center animate-slide-up shadow-2xl">
           <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
           <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-display font-black text-white mb-4 leading-tight">
                Interessado em levar sua marca ao <span className="text-primary">Próximo Nível?</span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base mb-8 font-light max-w-lg mx-auto">
                Estou pronto para transformar sua visão em uma solução digital de alto impacto. Vamos conversar sobre o seu próximo grande projeto.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <button 
                   onClick={() => { const el = document.getElementById('contact'); if(el) el.scrollIntoView({ behavior: 'smooth' }); }}
                   className="w-full sm:w-auto px-8 py-3.5 bg-white text-dark rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-white/5"
                 >
                   Iniciar Transmissão
                 </button>
                 <a 
                   href="https://wa.me/5592981838704" 
                   target="_blank" 
                   className="w-full sm:w-auto px-8 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
                 >
                   WhatsApp Direto
                 </a>
              </div>
           </div>
        </div>
      </div>
      
      <div id="contact">
        <Contact />
      </div>

      {/* Cinematic Video Overlay */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-3xl animate-fade-in" onClick={() => setSelectedVideo(null)}>
          <div 
            className="relative rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] bg-black border border-white/10 w-full max-w-7xl h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-10 py-6 border-b border-white/10 bg-dark/50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Live Feedback</span>
                </div>
                <button onClick={() => setSelectedVideo(null)} className="p-3 rounded-full bg-white/5 text-white hover:bg-red-500 hover:scale-110 transition-all">
                  <X className="w-5 h-5" />
                </button>
            </div>
            
            <iframe 
              src={getIframeSrc(selectedVideo)} 
              className="w-full flex-1" 
              frameBorder="0" 
              allowFullScreen 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
            
            {selectedVideo.includes('12711071') && (
                <div className="bg-[#0d0d12] px-10 py-8 text-center border-t border-white/10 shrink-0">
                    <p className="text-gray-500 text-xs font-medium mb-3">Ambiente protegido. Requer credenciais Itch.io se solicitado.</p>
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary/10 border border-primary/20">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">Master Password:</span>
                      <span className="text-white font-mono font-bold tracking-wider select-all">@Innyx8487</span>
                    </div>
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;