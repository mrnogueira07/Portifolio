/**
 * @file Projects.tsx
 * @description Seção de Mostruário de Projetos do Portfólio.
 * 
 * Permite filtrar projetos por categorias, visualizar modals de detalhes completos,
 * acessar os repositórios/links ao vivo e assistir a vídeos explicativos.
 */

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FolderGit2, ExternalLink, Play, X, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types/portfolio';

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeIframeUrl, setActiveIframeUrl] = useState<string | null>(null);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState<Project | null>(null);

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
    { key: 'Robotics', label: t("Robótica", "Robotics") },
    { key: 'Design', label: t("Design", "Design") },
    { key: 'VideoEdited', label: t("Vídeo", "Video") }
  ];

  // Filtra a lista de projetos de acordo com a seleção atual
  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
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

        {/* Barra de Filtros de Categoria */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all duration-300 ${
                selectedCategory === cat.key
                  ? 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid de Cards de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: Project) => (
            <div
              key={project.id}
              className="group rounded-3xl bg-white/[0.02] border border-white/10 overflow-hidden hover:border-indigo-500/50 transition-all duration-500 flex flex-col justify-between"
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
                  <button
                    onClick={() => setSelectedProjectDetails(project)}
                    className="p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white shadow-lg hover:scale-110 transition-transform"
                    title={t("Ver Detalhes", "View Details")}
                  >
                    <Info className="w-5 h-5" />
                  </button>

                  {project.videoUrl && (
                    <button
                      onClick={() => setActiveVideoUrl(project.videoUrl || null)}
                      className="p-3.5 rounded-full bg-pink-600 text-white shadow-lg hover:scale-110 transition-transform"
                      title={t("Assistir Vídeo", "Watch Video")}
                    >
                      <Play className="w-5 h-5 fill-current" />
                    </button>
                  )}

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-full bg-indigo-600 text-white shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
                      title={t("Acessar Projeto", "Open Project")}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
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
            </div>
          ))}
        </div>

      </div>

      {/* Modais Renderizados via Portal para ficar acima da Navbar z-50 */}
      {typeof document !== 'undefined' && createPortal(
        <>
          {/* Modal de Detalhes do Projeto */}
          {selectedProjectDetails && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-zoom-in">
              <div className="relative w-full max-w-2xl bg-[#0c0e1e] rounded-3xl border border-white/15 p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono">
                    {selectedProjectDetails.category}
                  </span>
                  <button
                    onClick={() => setSelectedProjectDetails(null)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
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
                    <a
                      href={selectedProjectDetails.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                    >
                      <span>{t("Acessar Projeto", "Open Project")}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedProjectDetails(null)}
                    className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-xs uppercase"
                  >
                    {t("Fechar", "Close")}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal de Vídeo Promocional */}
          {activeVideoUrl && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-zoom-in">
              <div className="relative w-full max-w-4xl bg-[#0d0f1d] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                  <span className="text-sm font-bold text-white">Demonstração em Vídeo</span>
                  <button
                    onClick={() => setActiveVideoUrl(null)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
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
              </div>
            </div>
          )}

          {/* Modal de Projeto (Iframe Pop-up Responsivo) */}
          {activeIframeUrl && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-white/5 backdrop-blur-xl backdrop-saturate-200 animate-zoom-in">
              <div className="relative w-full max-w-7xl h-[95vh] sm:h-[90vh] bg-white rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col border border-white/20">
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
              </div>
            </div>
          )}
        </>,
        document.body
      )}
    </section>
  );
};

export default Projects;
