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

  // Refs para o efeito 3D tilt da foto
  const cardRef = useRef<HTMLDivElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const targetRotX = useRef(0);
  const targetRotY = useRef(0);
  const currentRotX = useRef(0);
  const currentRotY = useRef(0);

  // Loop de suavização do tilt (lerp)
  const lerpTilt = useCallback(() => {
    const lerp = (a: number, b: number, factor: number) => a + (b - a) * factor;
    currentRotX.current = lerp(currentRotX.current, targetRotX.current, 0.1);
    currentRotY.current = lerp(currentRotY.current, targetRotY.current, 0.1);

    if (cardRef.current) {
      cardRef.current.style.transform =
        `perspective(1000px) rotateX(${currentRotX.current}deg) rotateY(${currentRotY.current}deg) scale3d(1.02, 1.02, 1.02)`;
    }
    animFrameRef.current = requestAnimationFrame(lerpTilt);
  }, []);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(lerpTilt);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [lerpTilt]);

  // Handlers de mouse
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    targetRotY.current = dx * 10;
    targetRotX.current = -dy * 10;
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetRotX.current = 0;
    targetRotY.current = 0;
  }, []);

  // Handlers de toque (mobile)
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (touch.clientX - cx) / (rect.width / 2);
    const dy = (touch.clientY - cy) / (rect.height / 2);
    targetRotY.current = dx * 8;
    targetRotX.current = -dy * 8;
  }, []);

  const handleTouchEnd = useCallback(() => {
    targetRotX.current = 0;
    targetRotY.current = 0;
  }, []);

  // Animação de Entrada Snappy com GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.5 } });
      tl.fromTo('.gsap-hero-badge', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4 })
        .fromTo('.gsap-hero-title', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
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

  // Cor unificada dos containers (indigo glassmorphism)
  const containerCls = 'bg-indigo-950/30 border border-indigo-500/20 backdrop-blur-xl';

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-10 flex flex-col justify-center overflow-hidden"
    >
      {/* Luzes de Fundo Sutis */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[450px] h-[450px] bg-purple-700/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* Coluna Esquerda: Badge, Título, Desc & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-4 sm:space-y-5">

            {/* Status Pill Superior */}
            <div className="gsap-hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/40 border border-indigo-500/30 backdrop-blur-md text-xs font-mono text-indigo-300 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-emerald-400 font-semibold tracking-wide">
                {t('Disponível para novos projetos', 'Available for new projects')}
              </span>
              <span className="text-indigo-500/60">•</span>
              <span className="text-indigo-200/90 font-sans font-medium">
                {t('Full Stack & Game Dev', 'Full Stack & Game Dev')}
              </span>
            </div>

            {/* Título Principal */}
            <div className="space-y-3 max-w-2xl">
              <h1 className="gsap-hero-title font-display font-black text-white tracking-tight leading-[1.08] text-3xl sm:text-5xl lg:text-[3.4rem] xl:text-[3.8rem]">
                {t('Transformando ', 'Transforming ')}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200">
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
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowEducationModal(true)}
                className="relative group px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-600 text-white font-bold text-xs sm:text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(99,102,241,0.35)] hover:shadow-[0_15px_40px_rgba(99,102,241,0.55)] border border-indigo-400/40 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover:translate-x-full duration-1000 transition-transform ease-out" />
                <div className="p-1 rounded-lg bg-indigo-500/20 text-indigo-200 group-hover:rotate-12 transition-transform">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span>{t('Carreira Escolar', 'Academic Career')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-indigo-200" />
              </motion.button>

              <div className="hidden sm:flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-indigo-950/20 border border-indigo-500/15 text-xs text-slate-400 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>{t('Engenharia de Software • IA • Jogos', 'Software Eng • AI • Games')}</span>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Card 3D Tilt da Nova Foto */}
          <div className="gsap-hero-card lg:col-span-5 flex justify-center lg:justify-end items-center">
            <div
              className="relative w-full max-w-[310px] sm:max-w-[340px] lg:max-w-[360px] cursor-pointer select-none"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ perspective: '1000px' }}
            >
              {/* Aura Externa com Glow Suave */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-indigo-500/30 via-purple-600/20 to-blue-600/20 opacity-60 blur-2xl transition-opacity duration-500 hover:opacity-85 pointer-events-none" />

              {/* Elemento que recebe o Transform 3D */}
              <div
                ref={cardRef}
                style={{
                  transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                  transition: 'box-shadow 0.4s ease',
                  willChange: 'transform',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Card Container */}
                <div className={`relative rounded-3xl ${containerCls} p-3.5 sm:p-4 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden border border-indigo-500/30`}>

                  {/* Moldura da Imagem */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-950/80 shadow-inner">
                    <img
                      src={personalInfo.avatarUrl}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover object-center transition-all duration-700 ease-out transform hover:scale-105"
                      draggable={false}
                    />

                    {/* Gradiente Escurecido na Base para Legibilidade do Badge */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060813]/95 via-[#060813]/30 to-transparent pointer-events-none" />

                    {/* Chip de Versão no Topo */}
                    <div
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5 shadow-md"
                      style={{ transform: 'translateZ(15px)' }}
                    >
                      <Terminal className="w-3 h-3 text-indigo-400" />
                      <span className="text-[10px] font-mono text-indigo-200">v2026.1</span>
                    </div>
                  </div>

                  {/* Badge Flutuante Inferior com Design Terminal */}
                  <div
                    className={`absolute bottom-6 left-6 right-6 p-3.5 rounded-2xl bg-indigo-950/80 border border-indigo-500/35 backdrop-blur-xl flex items-center justify-between shadow-2xl`}
                    style={{ transform: 'translateZ(24px)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-mono font-bold text-sm shadow-inner">
                        &gt;_
                      </div>
                      <div className="text-left">
                        <p className="text-xs sm:text-sm font-bold text-white tracking-wide leading-tight">
                          {personalInfo.name}
                        </p>
                        <p className="text-[10px] sm:text-[11px] font-mono text-indigo-300 font-medium">
                          {t(personalInfo.role.pt, personalInfo.role.en)}
                        </p>
                      </div>
                    </div>

                    {/* Status Dot */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                      </span>
                      <span className="text-[9px] font-mono text-emerald-400 font-semibold tracking-wider uppercase">Live</span>
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
              className={`gsap-hero-stat p-4 sm:p-6 rounded-2xl ${containerCls} hover:border-indigo-400/40 hover:bg-indigo-950/40 transition-all duration-300 group text-left`}
            >
              <p className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-300 group-hover:scale-105 transition-transform duration-300 origin-left">
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
                <div className="p-6 sm:p-8 border-b border-indigo-500/15 flex items-start justify-between shrink-0">
                  <div className="flex items-center gap-3 text-left">
                    <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-inner">
                      <GraduationCap className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-950/50 border border-indigo-500/20 text-indigo-300 text-[10px] font-mono mb-1.5">
                        <ShieldCheck className="w-3 h-3 text-indigo-400" />
                        <span>{t('Credenciais Oficiais • Ensino Superior', 'Official Credentials • Higher Education')}</span>
                      </div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                        {t('Formação Acadêmica & Carreira Escolar', 'Academic Background & Qualifications')}
                      </h3>
                      <p className="text-xs text-indigo-300/70 mt-0.5">
                        {t('Histórico acadêmico e especializações em Tecnologia da Informação', 'Academic degrees and specializations in Information Technology')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowEducationModal(false)}
                    className="p-2 rounded-full bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 hover:text-white transition-colors border border-indigo-500/20 cursor-pointer"
                    title={t('Fechar', 'Close')}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Conteúdo */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-left">

                  <div className={`p-5 sm:p-6 rounded-2xl ${containerCls} hover:border-indigo-400/30 transition-all space-y-3 shadow-md`}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]" />
                        <h4 className="text-lg font-bold text-white">{t('Ciência da Computação', 'Computer Science')}</h4>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-mono border border-indigo-500/20 font-medium">
                        {t('Bacharelado', "Bachelor's Degree")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span><strong>Centro Universitário Estácio do Amazonas (Estácio Amazonas)</strong></span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed pt-1 border-t border-indigo-500/10">
                      {t(
                        'Formação sólida em fundamentos de computação, engenharia de software, estruturas de dados, algoritmos, arquitetura de sistemas e inteligência artificial.',
                        'Solid education in computer science fundamentals, software engineering, data structures, algorithms, system architecture, and artificial intelligence.'
                      )}
                    </p>
                  </div>

                  <div className={`p-5 sm:p-6 rounded-2xl ${containerCls} hover:border-indigo-400/30 transition-all space-y-3 shadow-md`}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]" />
                        <h4 className="text-lg font-bold text-white">{t('Liderança, Inovação e Tecnologia', 'Leadership, Innovation & Technology')}</h4>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-mono border border-indigo-500/20 font-medium">
                        {t('Pós-Graduação Lato Sensu', 'Postgraduate Specialization')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span><strong>Faculdade Sul Mineira (Fasul Educacional)</strong></span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed pt-1 border-t border-indigo-500/10">
                      {t(
                        'Especialização estratégica voltada à gestão de projetos tecnológicos, metodologias ágeis, inovação contínua, governança e transformação digital.',
                        'Strategic specialization focused on technological project management, agile methodologies, continuous innovation, governance, and digital transformation.'
                      )}
                    </p>
                  </div>

                  {/* Competências */}
                  <div className="space-y-4 pt-2">
                    <h5 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-300 font-mono flex items-center gap-2">
                      <Award className="w-4 h-4 text-indigo-400" />
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
                        <div key={i} className={`p-4 rounded-xl ${containerCls} hover:border-indigo-400/30 transition-all space-y-1.5`}>
                          <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
                            <Icon className="w-4 h-4 text-indigo-400" />
                            <span>{t(titlePt, titleEn)}</span>
                          </div>
                          <p className="text-[11px] text-gray-400 leading-relaxed">{t(descPt, descEn)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Rodapé do Modal */}
                <div className="p-6 border-t border-indigo-500/15 flex items-center justify-between gap-4 shrink-0">
                  <a
                    href={personalInfo.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(37,211,102,0.35)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    <span>{t('Conectar via WhatsApp', 'Connect via WhatsApp')}</span>
                  </a>
                  <button
                    onClick={() => setShowEducationModal(false)}
                    className={`flex-1 py-3.5 px-4 rounded-xl ${containerCls} hover:border-indigo-400/40 text-gray-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center cursor-pointer`}
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
