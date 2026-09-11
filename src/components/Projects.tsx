/**
 * @file Projects.tsx
 * @description Seção de Mostruário de Projetos com animações de layout fluidas (motion.dev),
 * transição suave de categorias, modais com AnimatePresence e GSAP ScrollTrigger.
 */

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FolderGit2, ExternalLink, Play, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types/portfolio';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeIframeUrl, setActiveIframeUrl] = useState<string | null>(null);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // GSAP ScrollTrigger para o cabeçalho
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gsap-projects-header', {
        scrollTrigger: {
          trigger: '.gsap-projects-header',
          start: 'top 85%',
        },
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Impede rolagem da página quando algum modal estiver aberto
  useEffect(() => {
    if (activeIframeUrl || activeVideoUrl || selectedProjectDetails) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeIframeUrl, activeVideoUrl, selectedProjectDetails]);

  // Lista de filtros de categoria
  const categories = [
    { key: 'All', label: t("Todos", "All") },
    { key: 'Web', label: t("Web App", "Web App") },
    { key: 'Game', label: t("Games", "Games") },
    { key: '3DModel', label: t("Modelagem 3D", "3D Modeling") },
    { key: 'Design', label: t("Design", "Design") },
    { key: 'VideoEdited', label: t("Vídeo", "Video") }
  ];

  // Filtra a lista de projetos de acordo com a seleção atual
  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section ref={sectionRef} id="projects" className="py-24 relative overflow-hidden bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Seção com GSAP */}
        <div className="gsap-projects-header text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 text-xs font-mono uppercase tracking-widest">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>{t("Ecossistema & Trabalhos", "Ecosystem & Portfolio")}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t("Projetos em ", "Projects in ")}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              {t("Destaque", "Focus")}
            </span>
          </h2>
        </div>

        {/* Barra de Filtros de Categoria com Layout Animado Motion */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <motion.button
                key={cat.key}
                layout
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat.key)}
                className={`relative px-5 py-2.5 rounded-xl font-bold text-xs transition-colors duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Grid de Cards com Reordenação Fluida (layout motion) */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, type: 'spring', bounce: 0.15 }}
                whileHover={{ y: -8 }}
                className="group rounded-3xl bg-white/[0.02] border border-white/10 overflow-hidden hover:border-indigo-500/50 transition-colors duration-300 flex flex-col justify-between"
              >
                {/* Imagem do Projeto com Overlay de Ação */}
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f1d] via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                  {/* Badge de Categoria */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-indigo-300 uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>

                  {/* Botões de Ação sobre o Card */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-sm">
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedProjectDetails(project)}
                      className="p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white shadow-lg"
                      title={t("Ver Detalhes", "View Details")}
                    >
                      <Info className="w-5 h-5" />
                    </motion.button>

                    {project.videoUrl && (
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setActiveVideoUrl(project.videoUrl || null)}
                        className="p-3.5 rounded-full bg-pink-600 text-white shadow-lg"
                        title={t("Assistir Vídeo", "Watch Video")}
                      >
                        <Play className="w-5 h-5 fill-current" />
                      </motion.button>
                    )}

                    {project.link && (
                      <motion.a
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-full bg-indigo-600 text-white shadow-lg flex items-center justify-center"
                        title={t("Acessar Projeto", "Open Project")}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Informações do Card */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => setSelectedProjectDetails(project)}
                      className="font-display font-bold text-xl text-white group-hover:text-indigo-300 transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs text-gray-400 leading-relaxed font-light line-clamp-2">
                      {t(project.description.pt, project.description.en)}
                    </p>
                  </div>

                  {/* Tags de Tecnologias & Botão Detalhes */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] font-mono text-gray-400 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedProjectDetails(project)}
                      className="text-xs font-mono font-bold text-indigo-400 hover:text-pink-400 transition-colors"
                    >
                      {t("Detalhes →", "Details →")}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Modais Renderizados via Portal com AnimatePresence */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {/* Modal de Detalhes do Projeto */}
          {selectedProjectDetails && (
            <motion.div
              key="details-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedProjectDetails(null);
              }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            >
              <motion.div
                key="details-modal-box"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 320 }}
                className="relative w-full max-w-2xl bg-[#0c0e1e] rounded-3xl border border-white/15 p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono">
                    {selectedProjectDetails.category}
                  </span>
                  <button
                    onClick={() => setSelectedProjectDetails(null)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <h3 className="font-display font-black text-2xl text-white">
                    {selectedProjectDetails.title}
                  </h3>
                  <div className="rounded-2xl overflow-hidden aspect-video bg-slate-900">
                    <img
                      src={selectedProjectDetails.image}
                      alt={selectedProjectDetails.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed font-light">
                    {t(selectedProjectDetails.description.pt, selectedProjectDetails.description.en)}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {selectedProjectDetails.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-lg bg-white/5 text-xs font-mono text-indigo-300 border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  {selectedProjectDetails.link && (
                    <motion.a
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      href={selectedProjectDetails.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
                    >
                      <span>{t("Acessar Projeto", "Open Project")}</span>
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedProjectDetails(null)}
                    className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-xs uppercase transition-colors"
                  >
                    {t("Fechar", "Close")}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Modal de Vídeo Promocional */}
          {activeVideoUrl && (
            <motion.div
              key="video-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                if (e.target === e.currentTarget) setActiveVideoUrl(null);
              }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            >
              <motion.div
                key="video-modal-box"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 320 }}
                className="relative w-full max-w-4xl bg-[#0d0f1d] rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                  <span className="text-sm font-bold text-white">Demonstração em Vídeo</span>
                  <button
                    onClick={() => setActiveVideoUrl(null)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="aspect-video w-full bg-black">
                  <iframe
                    src={activeVideoUrl.replace('watch?v=', 'embed/')}
                    title="Demonstração do Projeto"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Modal de Projeto (Iframe Pop-up Responsivo) */}
          {activeIframeUrl && (
            <motion.div
              key="iframe-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xl"
            >
              <motion.div
                key="iframe-modal-box"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 320 }}
                className="relative w-full max-w-7xl h-[95vh] sm:h-[90vh] bg-white rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col border border-white/20"
              >
                {/* Barra Superior Estilo macOS/Browser Premium */}
                <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 bg-gradient-to-r from-[#0d0f1d] to-[#1a1c2e] border-b border-indigo-500/20 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1.5 hidden sm:flex">
                      <div className="w-3 h-3 rounded-full bg-red-500/90 shadow-inner"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/90 shadow-inner"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/90 shadow-inner"></div>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-gray-200 flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-indigo-400" />
                      {t("Visualização de Projeto", "Project Preview")}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a 
                      href={activeIframeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[10px] sm:text-xs font-bold text-indigo-300 hover:text-white transition-colors bg-indigo-500/20 hover:bg-indigo-500/40 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-indigo-500/30"
                      title="Abrir em nova guia"
                    >
                      {t("Nova Guia", "New Tab")}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <button
                      onClick={() => setActiveIframeUrl(null)}
                      className="p-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors group border border-red-500/20"
                      title="Fechar"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 w-full bg-white relative">
                  <iframe
                    src={activeIframeUrl}
                    title="Pré-visualização do Projeto"
                    className="w-full h-full border-0 absolute inset-0 bg-white"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default Projects;
