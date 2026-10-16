import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, ImageIcon, Play, X } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { projectsData } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types/portfolio';

function getVideoEmbedUrl(value: string): string | null {
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, '');
    const id = host === 'youtu.be'
      ? url.pathname.slice(1)
      : ['youtube.com', 'm.youtube.com', 'youtube-nocookie.com'].includes(host)
        ? (url.searchParams.get('v') || url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1])
        : null;
    return id && /^[\w-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>('All');
  const [modal, setModal] = useState<{ project: Project; video: boolean } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!modal || !dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [modal]);

  const categoryLabels: Record<ProjectCategory, string> = {
    Web: t('Websites e aplicações', 'Websites & applications'),
    Game: t('Jogos', 'Games'),
    '3DModel': t('Modelagem 3D', '3D modeling'),
    Design: t('Design', 'Design'),
    VideoEdited: t('Produção audiovisual', 'Video production'),
    VideoRecorded: t('Captação de vídeo', 'Video recording'),
  };
  const categories = (Object.keys(categoryLabels) as ProjectCategory[])
    .filter(category => projectsData.some(project => project.category === category));
  const filteredProjects = projectsData.filter(project => selectedCategory === 'All' || project.category === selectedCategory);
  const embedUrl = modal?.video && modal.project.videoUrl ? getVideoEmbedUrl(modal.project.videoUrl) : null;

  return (
    <section id="projects" className="section-shell relative" aria-labelledby="projects-heading">
      <div className="page-container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="section-kicker">{t('Portfólio', 'Portfolio')}</p>
            <h2 id="projects-heading" className="section-title mt-4">{t('Projetos selecionados.', 'Selected projects.')}</h2>
            <p className="section-copy mt-5 max-w-xl">{t(
              'Uma seleção de projetos que conecta desenvolvimento, experiência de uso e identidade digital.',
              'A selection of projects connecting development, user experience, and digital identity.',
            )}</p>
          </div>
          <span className="text-xs font-mono tracking-wider text-slate-400">{String(projectsData.length).padStart(2, '0')} {t('PROJETOS', 'PROJECTS')}</span>
        </div>

        <div className="my-9 flex flex-wrap gap-2" role="group" aria-label={t('Filtrar projetos por área', 'Filter projects by discipline')}>
          {(['All', ...categories] as const).map(category => (
            <button
              type="button"
              key={category}
              aria-pressed={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-5 py-2.5 text-sm transition-colors ${selectedCategory === category ? 'border-blue-500/50 bg-blue-500/15 text-blue-100 font-medium' : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-white'}`}
            >
              {category === 'All' ? t('Todos os projetos', 'All projects') : categoryLabels[category]}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">{filteredProjects.length} {t('projetos exibidos', 'projects displayed')}</p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map(project => (
            <motion.article
              key={project.id}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="surface-card group flex min-w-0 flex-col overflow-hidden"
            >
              <button type="button" onClick={() => setModal({ project, video: false })} className="relative block aspect-[16/10] w-full overflow-hidden bg-[#0d1424] text-slate-500" aria-label={`${t('Ver detalhes de', 'View details of')} ${project.title}`}>
                <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true"><ImageIcon className="h-9 w-9" /></span>
                <img src={project.image} alt="" loading="lazy" decoding="async" className="relative h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.025]" onError={event => { event.currentTarget.style.visibility = 'hidden'; }} />
                <span className="absolute inset-0 bg-gradient-to-t from-[#060913]/60 to-transparent" aria-hidden="true" />
              </button>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold leading-snug text-white">
                  <button type="button" className="text-left transition-colors hover:text-blue-400" onClick={() => setModal({ project, video: false })}>{project.title}</button>
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{t(project.description.pt, project.description.en)}</p>
                <div className="mb-6 mt-5 flex flex-wrap gap-2">{project.tags.slice(0, 3).map(tag => <span key={tag} className="tech-tag">{tag}</span>)}</div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-5">
                  <button type="button" onClick={() => setModal({ project, video: false })} className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 transition-colors hover:text-white">{t('Ver projeto', 'View project')}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></button>
                  <div className="flex items-center gap-4">
                    {project.videoUrl && <button type="button" onClick={() => setModal({ project, video: true })} className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300" aria-label={`${t('Assistir demonstração de', 'Watch a demonstration of')} ${project.title}`}><Play className="h-3.5 w-3.5" aria-hidden="true" />{t('Vídeo', 'Video')}</button>}
                    {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300" aria-label={`${t('Acessar', 'Open')} ${project.title} (${t('nova aba', 'new tab')})`}>{t('Visitar site', 'Visit website')}<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {modal && createPortal(
        <dialog
          ref={dialogRef}
          aria-labelledby="project-dialog-title"
          onCancel={() => setModal(null)}
          onClose={() => setModal(null)}
          onClick={event => {
            if (event.target !== event.currentTarget) return;
            const rect = event.currentTarget.getBoundingClientRect();
            if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setModal(null);
          }}
          className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-2xl border border-slate-700/80 bg-[#090e1c] p-0 text-white shadow-2xl backdrop:bg-[#030611]/85 backdrop:backdrop-blur-sm"
        >
          <div className="flex items-center justify-between gap-4 border-b border-slate-800 px-6 py-4">
            <p className="text-xs font-medium tracking-wide text-blue-400">{modal.video ? t('Demonstração do projeto', 'Project demonstration') : categoryLabels[modal.project.category]}</p>
            <button type="button" autoFocus onClick={() => setModal(null)} aria-label={t('Fechar detalhes do projeto', 'Close project details')} className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"><X className="h-5 w-5" /></button>
          </div>
          <div className="space-y-6 p-6 sm:p-8">
            <h3 id="project-dialog-title" className="font-display text-2xl font-semibold">{modal.project.title}</h3>
            {modal.video && embedUrl ? (
              <div className="aspect-video overflow-hidden rounded-xl bg-black"><iframe src={embedUrl} title={`${t('Demonstração de', 'Demonstration of')} ${modal.project.title}`} className="h-full w-full border-0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
            ) : (
              <div className="overflow-hidden rounded-xl bg-slate-900"><img src={modal.project.image} alt={modal.project.title} className="max-h-80 w-full object-contain" /></div>
            )}
            <p className="text-sm leading-7 text-slate-300">{t(modal.project.description.pt, modal.project.description.en)}</p>
            <div className="flex flex-wrap gap-2">{modal.project.tags.map(tag => <span className="tech-tag" key={tag}>{tag}</span>)}</div>
            <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
              {modal.project.link && <a href={modal.project.link} target="_blank" rel="noopener noreferrer" className="button-primary">{t('Acessar projeto', 'Open project')}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>}
              {modal.project.videoUrl && <a href={modal.project.videoUrl} target="_blank" rel="noopener noreferrer" className="button-secondary"><Play className="h-4 w-4" aria-hidden="true" />{t('Abrir demonstração', 'Open demonstration')}</a>}
            </div>
          </div>
        </dialog>, document.body,
      )}
    </section>
  );
};

export default Projects;
