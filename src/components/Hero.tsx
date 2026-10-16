/**
 * @file Hero.tsx
 * @description Seção Principal de Impacto (Hero) do Portfólio de Matheus Nogueira.
 *
 * Design profissional de alto padrão (UI/UX):
 * - Hierarquia tipográfica balanceada com status pill contextual.
 * - Card 3D tilt interativo com física suave ao mouse e toque.
 * - Nova foto de perfil de alta definição em moldura executiva.
 * - CTA elegante 'Carreira Escolar' com micro-interações refinadas.
 * - Paleta visual unificada em Indigo/Slate com glassmorphism premium.
 * - Métricas de impacto integradas harmonicamente no grid.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  GraduationCap, X, Code, ShieldCheck,
  Cpu, Layers, Rocket, Brain, Award, MapPin, ArrowRight,
  Terminal, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { personalInfo, statItems } from '../data/portfolioData';
import { WhatsAppIcon } from './icons/BrandIcons';

/** Animação de contagem numérica dos contadores */
const AnimatedCounter: React.FC<{ value: string }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const numericMatch = value.match(/\d+/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/, '');

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const steps = 25;
    const stepTime = duration / steps;
    const increment = Math.max(1, targetNumber / steps);

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        setDisplayValue(targetNumber);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [targetNumber]);

  return (
    <span className="inline-block transition-transform duration-300">
      {displayValue}{suffix}
    </span>
  );
};

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [showEducationModal, setShowEducationModal] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  // Refs e Handlers para o efeito de Tilt da foto com nitidez máxima (sem blur de GPU)
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Handlers de mouse - apenas aplica transform ao interagir
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const rotX = -dy * 7;
    const rotY = dx * 7;
    cardRef.current.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
    cardRef.current.style.transition = 'transform 0.1s ease-out';
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    // Ao sair, remove o transform para garantir renderização nativa 100% nítida
    cardRef.current.style.transform = 'none';
    cardRef.current.style.transition = 'transform 0.4s ease-out';
  }, []);

  // Handlers de toque (mobile)
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (touch.clientX - cx) / (rect.width / 2);
    const dy = (touch.clientY - cy) / (rect.height / 2);
    const rotX = -dy * 5;
    const rotY = dx * 5;
    cardRef.current.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
    cardRef.current.style.transition = 'transform 0.1s ease-out';
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'none';
    cardRef.current.style.transition = 'transform 0.4s ease-out';
  }, []);

  // Animação de Entrada Snappy com GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.5 } });
      tl.fromTo('.gsap-hero-title', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo('.gsap-hero-desc', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
        .fromTo('.gsap-hero-cta', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
        .fromTo('.gsap-hero-card', { opacity: 0, scale: 0.96, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.6 }, '-=0.3')
        .fromTo('.gsap-hero-stat', { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.4 }, '-=0.3');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (showEducationModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showEducationModal]);

  // Cor unificada dos containers corporativos (Navy/Slate com borda sutil)
  const containerCls = 'bg-[#090e1c]/80 border border-slate-800 backdrop-blur-xl';

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-10 flex flex-col justify-center overflow-hidden"
    >
      {/* Luz Ambiente Sutil e Corporativa (sem exagero de neon) */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* Coluna Esquerda: Título, Desc & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-4 sm:space-y-5">

            {/* Título Principal */}
            <div className="space-y-3 max-w-2xl">
              <h1 className="gsap-hero-title font-display font-black text-white tracking-tight leading-[1.08] text-3xl sm:text-5xl lg:text-[3.4rem] xl:text-[3.8rem]">
                {t('Transformando ', 'Transforming ')}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-slate-200">
                  {t('Visões', 'Visions')}
                </span>
                <br />
                {t('em Produtos Digitais', 'into Digital Products')}
              </h1>

              <p className="gsap-hero-desc text-slate-300 text-sm sm:text-base leading-relaxed font-light max-w-xl">
                {t(personalInfo.aboutMeShort.pt, personalInfo.aboutMeShort.en)}
              </p>
            </div>

            {/* CTA Carreira Escolar & Quick Info */}
            <div className="gsap-hero-cta flex flex-wrap items-center gap-3 pt-1 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowEducationModal(true)}
                className="relative group px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-sm hover:shadow-md border border-blue-500/30 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden cursor-pointer"
              >
                <div className="p-1 rounded-lg bg-blue-500/20 text-blue-200 group-hover:rotate-12 transition-transform">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span>{t('Carreira Escolar', 'Academic Career')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-blue-200" />
              </motion.button>

              <div className="hidden sm:flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white/[0.03] border border-slate-800 text-xs text-slate-400 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>{t('Engenharia de Software • IA • Jogos', 'Software Eng • AI • Games')}</span>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Card Tilt da Foto em Moldura Corporativa */}
          <div className="gsap-hero-card lg:col-span-5 flex justify-center lg:justify-end items-center">
            <div
              className="relative w-full max-w-[310px] sm:max-w-[340px] lg:max-w-[360px] cursor-pointer select-none"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ perspective: '1000px' }}
            >
              {/* Borda Sutil Elegante (sem aura exagerada) */}
              <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-blue-500/20 via-slate-800/40 to-transparent pointer-events-none" />

              {/* Elemento do Card com Nitidez Cristalina */}
              <div
                ref={cardRef}
                className="transition-[box-shadow] duration-300"
              >
                {/* Card Container */}
                <div className={`relative rounded-3xl ${containerCls} p-3.5 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden border border-slate-800 hover:border-blue-500/40 transition-colors`}>

                  {/* Moldura da Imagem de Alta Resolução */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-950/80 shadow-inner">
                    <img
                      src={personalInfo.avatarUrl}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover object-[center_18%] transition-transform duration-500 ease-out hover:scale-[1.03]"
                      style={{ imageRendering: '-webkit-optimize-contrast' }}
                      draggable={false}
                    />

                    {/* Gradiente sutil apenas na base para contraste do badge */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060913]/95 via-[#060913]/40 to-transparent pointer-events-none" />
                  </div>

                  {/* Badge Inferior com Design Terminal Nítido */}
                  <div
                    className="absolute bottom-6 left-6 right-6 p-3.5 rounded-2xl bg-[#090e1c]/90 border border-slate-700/60 backdrop-blur-md flex items-center justify-between shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-mono font-bold text-sm shadow-inner shrink-0">
                        &gt;_
                      </div>
                      <div className="text-left">
                        <p className="text-xs sm:text-sm font-bold text-white tracking-wide leading-tight">
                          {personalInfo.name}
                        </p>
                        <p className="text-[10px] sm:text-[11px] font-mono text-blue-300 font-medium">
                          {t(personalInfo.role.pt, personalInfo.role.en)}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Métricas Animadas (Stats Ribbon) */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {statItems.map((stat) => (
            <div
              key={stat.id}
              className={`gsap-hero-stat p-4 sm:p-6 rounded-2xl ${containerCls} hover:border-blue-500/30 hover:bg-[#0c1324]/80 transition-all duration-300 group text-left`}
            >
              <p className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200 group-hover:scale-105 transition-transform duration-300 origin-left">
                <AnimatedCounter value={stat.value} />
              </p>
              <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                {t(stat.label.pt, stat.label.en)}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Modal de Carreira Escolar */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {showEducationModal && (
            <motion.div
              key="edu-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => { if (e.target === e.currentTarget) setShowEducationModal(false); }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
            >
              <motion.div
                key="edu-modal-box"
                initial={{ opacity: 0, scale: 0.9, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 320 }}
                className={`relative w-full max-w-3xl ${containerCls} rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] max-h-[90vh] flex flex-col overflow-hidden`}
              >

                {/* Header Modal */}
                <div className="p-6 sm:p-8 border-b border-slate-800 flex items-start justify-between shrink-0">
                  <div className="flex items-center gap-3 text-left">
                    <div className="p-3 rounded-2xl bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-inner">
                      <GraduationCap className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-wider text-blue-400 mb-1">
                        {t('Credenciais Oficiais • Ensino Superior', 'Official Credentials • Higher Education')}
                      </p>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                        {t('Formação Acadêmica & Carreira Escolar', 'Academic Background & Qualifications')}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {t('Histórico acadêmico e especializações em Tecnologia da Informação', 'Academic degrees and specializations in Information Technology')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowEducationModal(false)}
                    className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-700 cursor-pointer"
                    title={t('Fechar', 'Close')}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Conteúdo */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-left">

                  <div className={`p-5 sm:p-6 rounded-2xl ${containerCls} hover:border-blue-500/30 transition-all space-y-3 shadow-md`}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                        <h4 className="text-lg font-bold text-white">{t('Ciência da Computação', 'Computer Science')}</h4>
                      </div>
                      <span className="text-xs font-mono text-blue-300 font-medium">
                        {t('Bacharelado', "Bachelor's Degree")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                      <span><strong>Centro Universitário Estácio do Amazonas (Estácio Amazonas)</strong></span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-slate-800/80">
                      {t(
                        'Formação sólida em fundamentos de computação, engenharia de software, estruturas de dados, algoritmos, arquitetura de sistemas e inteligência artificial.',
                        'Solid education in computer science fundamentals, software engineering, data structures, algorithms, system architecture, and artificial intelligence.'
                      )}
                    </p>
                  </div>

                  <div className={`p-5 sm:p-6 rounded-2xl ${containerCls} hover:border-blue-500/30 transition-all space-y-3 shadow-md`}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                        <h4 className="text-lg font-bold text-white">{t('Liderança, Inovação e Tecnologia', 'Leadership, Innovation & Technology')}</h4>
                      </div>
                      <span className="text-xs font-mono text-blue-300 font-medium">
                        {t('Pós-Graduação Lato Sensu', 'Postgraduate Specialization')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                      <span><strong>Faculdade Sul Mineira (Fasul Educacional)</strong></span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-slate-800/80">
                      {t(
                        'Especialização estratégica voltada à gestão de projetos tecnológicos, metodologias ágeis, inovação contínua, governança e transformação digital.',
                        'Strategic specialization focused on technological project management, agile methodologies, continuous innovation, governance, and digital transformation.'
                      )}
                    </p>
                  </div>

                  {/* Competências */}
                  <div className="space-y-4 pt-2">
                    <h5 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-400" />
                      <span>{t('Matriz de Competências & Domínio Acadêmico', 'Core Competency & Technical Domain')}</span>
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { icon: Code, titlePt: 'Engenharia de Software & Arquitetura', titleEn: 'Software Engineering & Architecture', descPt: 'Construção de aplicações robustas, microsserviços, design patterns, clean code e sistemas escaláveis.', descEn: 'Building robust applications, microservices, design patterns, clean code, and scalable systems.' },
                        { icon: Brain, titlePt: 'Inteligência Artificial & Dados', titleEn: 'Artificial Intelligence & Data', descPt: 'Algoritmos preditivos, redes neurais, modelagem estatística e análise quantitativa de dados.', descEn: 'Predictive algorithms, neural networks, statistical modeling, and quantitative data analysis.' },
                        { icon: Rocket, titlePt: 'Engenharia de Jogos & Gráficos', titleEn: 'Game Engineering & Graphics', descPt: 'Desenvolvimento interativo 2D/3D, motores Unity/Unreal, física computacional e C#/C++.', descEn: '2D/3D interactive development, Unity/Unreal engines, computational physics, and C#/C++.' },
                        { icon: Cpu, titlePt: 'Sistemas Embarcados & IoT', titleEn: 'Embedded Systems & IoT', descPt: 'Programação de microcontroladores (ESP32/Arduino), integração de sensores e automação.', descEn: 'Microcontroller programming (ESP32/Arduino), sensor integration, and hardware automation.' },
                        { icon: ShieldCheck, titlePt: 'Segurança da Informação & Algoritmos', titleEn: 'Information Security & Algorithms', descPt: 'Criptografia aplicada, estruturas de dados otimizadas e proteção e auditoria de sistemas.', descEn: 'Applied cryptography, optimized data structures, system protection, and auditing.' },
                        { icon: Layers, titlePt: 'Cloud Computing & DevOps', titleEn: 'Cloud Computing & DevOps', descPt: 'Pipelines de CI/CD, conteinerização Docker, bancos de dados e ambientes de alta disponibilidade.', descEn: 'CI/CD pipelines, Docker containerization, databases, and high-availability cloud environments.' },
                      ].map(({ icon: Icon, titlePt, titleEn, descPt, descEn }, i) => (
                        <div key={i} className={`p-4 rounded-xl ${containerCls} hover:border-blue-500/30 transition-all space-y-1.5`}>
                          <div className="flex items-center gap-2 text-slate-200 font-bold text-xs">
                            <Icon className="w-4 h-4 text-blue-400" />
                            <span>{t(titlePt, titleEn)}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed">{t(descPt, descEn)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Rodapé do Modal */}
                <div className="p-6 border-t border-slate-800 flex items-center justify-between gap-4 shrink-0">
                  <a
                    href={personalInfo.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    <span>{t('Conectar via WhatsApp', 'Connect via WhatsApp')}</span>
                  </a>
                  <button
                    onClick={() => setShowEducationModal(false)}
                    className={`flex-1 py-3 px-4 rounded-xl ${containerCls} hover:border-slate-700 text-slate-300 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center cursor-pointer`}
                  >
                    {t('Fechar', 'Close')}
                  </button>
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

export default Hero;
