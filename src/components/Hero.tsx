/**
 * @file Hero.tsx
 * @description Seção Principal de Impacto (Hero) do Portfólio.
 * 
 * Apresenta o badge de disponibilidade ao vivo, foto em moldura neon com brilho responsivo,
 * botão de ação "Carreira Escolar" que abre um pop-up detalhando a formação
 * em Ciência da Computação na Estácio Amazonas, e contadores animados de métricas.
 */

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  GraduationCap, Sparkles, CheckCircle2, X, Code, ShieldCheck, 
  Cpu, Layers, Rocket, Brain, Award, MapPin, ArrowRight, Terminal
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { personalInfo, statItems } from '../data/portfolioData';
import { WhatsAppIcon } from './icons/BrandIcons';

/**
 * Componente para animação de contagem numérica dos contadores.
 */
const AnimatedCounter: React.FC<{ value: string }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const numericMatch = value.match(/\d+/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/, '');

  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
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

  // Trava a rolagem da página de fundo quando o pop-up estiver aberto
  useEffect(() => {
    if (showEducationModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showEducationModal]);

  return (
    <section id="home" className="relative min-h-screen landscape:min-h-0 pt-24 sm:pt-32 landscape:pt-16 pb-16 sm:pb-20 lg:pt-40 lg:pb-32 landscape:pb-12 flex flex-col justify-center overflow-hidden">
      {/* Luzes de Fundo (Glow Blobs) */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-600/15 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 landscape:grid-cols-12 lg:grid-cols-12 gap-8 landscape:gap-4 lg:gap-8 items-center">

          {/* Coluna da Esquerda: Textos, Badges & CTA (6 Colunas) */}
          <div className="landscape:col-span-6 lg:col-span-6 space-y-5 sm:space-y-8 landscape:space-y-3 text-left animate-fade-in-up">
            
            {/* Status Pill com Bolinha Verde Neon */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 backdrop-blur-xl animate-pulse-glow shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-emerald-300 tracking-wide font-mono uppercase">
                {t(personalInfo.status.pt, personalInfo.status.en)}
              </span>
            </div>

            {/* Título Principal */}
            <div className="space-y-3 sm:space-y-4 landscape:space-y-2">
              <h1 className="font-display text-3xl sm:text-6xl lg:text-7xl landscape:text-3xl font-black text-white tracking-tight leading-[1.08]">
                {t("Transformando ", "Transforming ")}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-color-cycle">
                  {t("Visões", "Visions")}
                </span> <br className="hidden sm:inline" />
                {t("em Produtos Digitais", "into Digital Products")}
              </h1>

              <p className="text-sm sm:text-lg landscape:text-xs text-gray-300 max-w-2xl leading-relaxed font-light">
                {t(personalInfo.aboutMeShort.pt, personalInfo.aboutMeShort.en)}
              </p>
            </div>

            {/* Botão Único de Ação Funcional (Carreira Escolar) */}
            <div className="pt-1 sm:pt-2">
              <button
                onClick={() => setShowEducationModal(true)}
                className="px-6 py-3.5 sm:px-8 sm:py-4.5 landscape:py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-xs sm:text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:shadow-[0_0_45px_rgba(236,72,153,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group border border-white/20"
              >
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-200 group-hover:rotate-12 transition-transform" />
                <span>{t("Carreira Escolar", "Academic Career")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Garantias Rápidas de Qualidade */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 sm:pt-4 text-[11px] sm:text-xs font-mono text-gray-400 border-t border-white/5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>{t("Código Limpo & Tipado", "Clean & Typed Code")}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-pink-400" />
                <span>{t("Design de Alta Conversão", "High Conversion Design")}</span>
              </div>
            </div>

          </div>

          {/* Coluna da Direita: Card de Perfil Estilo Zelio com Foto (6 Colunas) */}
          <div className="landscape:col-span-6 lg:col-span-6 flex justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="relative group w-full max-w-[550px] sm:max-w-[700px] lg:max-w-[680px] landscape:max-w-[400px]">
              
              {/* Moldura com gradiente animado */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-40 group-hover:opacity-100 blur-lg transition duration-1000 group-hover:duration-200"></div>

              {/* Card Container */}
              <div className="relative rounded-3xl bg-[#0b0d1b] border border-white/10 p-3 shadow-2xl overflow-hidden">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900">
                  <img
                    src={personalInfo.avatarUrl}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d1b] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                </div>

                {/* Badge Flutuante no Card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-xl border border-white/15 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{personalInfo.name}</p>
                      <p className="text-[10px] font-mono text-indigo-300">
                        {t(personalInfo.role.pt, personalInfo.role.en)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Métricas e Estatísticas Numéricas Animadas */}
        <div className="mt-10 sm:mt-20 landscape:mt-8 pt-6 sm:pt-10 landscape:pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 landscape:grid-cols-4 gap-3 sm:gap-6 landscape:gap-3">
          {statItems.map((stat, idx) => (
            <div 
              key={stat.id} 
              className="p-3.5 sm:p-6 landscape:p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/40 hover:bg-white/[0.04] transition-all duration-500 group animate-fade-in-up text-center sm:text-left"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <p className="font-display text-2xl sm:text-5xl landscape:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 group-hover:scale-110 transition-transform duration-300">
                <AnimatedCounter value={stat.value} />
              </p>
              <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-widest font-mono">
                {t(stat.label.pt, stat.label.en)}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Pop-Up Modal de Carreira Escolar / Formação Acadêmica (Renderizado via Portal para ficar acima de tudo) */}
      {showEducationModal && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in-fast">
          <div className="relative w-full max-w-3xl bg-[#0c0e1e] rounded-3xl border border-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.25)] max-h-[90vh] flex flex-col overflow-hidden animate-scale-in-fast">
            
            {/* Header Modal (Fixo no topo da caixa) */}
            <div className="p-6 sm:p-8 border-b border-white/10 flex items-start justify-between bg-[#0c0e1e] shrink-0">
              <div className="flex items-center gap-3 text-left">
                <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono mb-1">
                    <Award className="w-3 h-3" />
                    <span>{t("Graduação Concluída • Ensino Superior", "Graduated • Higher Education")}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                    {t("Carreira Escolar & Formação Acadêmica", "Academic Career & Education")}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowEducationModal(false)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                title={t("Fechar", "Close")}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo Rolável (A barra de rolagem fica contida estritamente dentro desta área) */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-left">
              {/* Banner do Curso & Faculdade */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-pink-900/40 border border-indigo-500/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-indigo-400" />
                    <span>Ciência da Computação</span>
                  </h4>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono border border-indigo-500/30">
                    Bacharelado
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                  <MapPin className="w-4 h-4 text-pink-400" />
                  <span>Formado na <strong>Faculdade Estácio do Amazonas (Estácio Amazonas)</strong></span>
                </div>
              </div>

              {/* Banner Pós-Graduação */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900/40 via-teal-900/30 to-cyan-900/40 border border-emerald-500/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-emerald-400" />
                    <span>Liderança, Inovação e Tecnologia</span>
                  </h4>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono border border-emerald-500/30">
                    Pós-Graduação
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Formado na <strong>Fasul Educacional</strong></span>
                </div>
              </div>

              {/* O que é possível fazer com esta formação */}
              <div className="space-y-4">
                <h5 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-300 font-mono flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>O que é possível desenvolver com Ciência da Computação?</span>
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/30 transition-all space-y-1">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                      <Code className="w-4 h-4" />
                      <span>Desenvolvimento de Software Escalável</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed font-light">
                      Construção de arquiteturas web completas, microsserviços, aplicações mobile e ecossistemas em nuvem para alta demanda.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all space-y-1">
                    <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                      <Brain className="w-4 h-4" />
                      <span>IA & Ciência de Dados</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed font-light">
                      Criação de algoritmos preditivos, redes neurais, inteligência artificial generativa e análise quantitativa de dados.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-pink-500/30 transition-all space-y-1">
                    <div className="flex items-center gap-2 text-pink-400 font-bold text-xs">
                      <Rocket className="w-4 h-4" />
                      <span>Engenharia de Jogos & Simulações</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed font-light">
                      Desenvolvimento de games 2D/3D interativos, física computacional e motores gráficos usando C++, C#, Unity e Unreal.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-all space-y-1">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                      <Cpu className="w-4 h-4" />
                      <span>Robótica & IoT (Sistemas Embarcados)</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed font-light">
                      Programação de hardware (Arduino, ESP32), integração de sensores e controle de dispositivos físicos em tempo real.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-amber-500/30 transition-all space-y-1">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Cibersegurança & Algoritmos</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed font-light">
                      Criptografia, segurança de dados, estruturas de dados otimizadas e resolução analítica de problemas computacionais.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-blue-500/30 transition-all space-y-1">
                    <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                      <Layers className="w-4 h-4" />
                      <span>Arquitetura de Nuvem & DevOps</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed font-light">
                      Implantação contínua (CI/CD), containers, bancos de dados relacionais/NoSQL e servidores de alto desempenho.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rodapé do Modal (Fixo na parte inferior com botões de mesmo tamanho e espaçamento) */}
            <div className="p-6 border-t border-white/10 bg-[#0c0e1e] flex items-center justify-between gap-4 shrink-0">
              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba5a] hover:to-[#0e7065] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#25D366]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center text-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Conectar via WhatsApp</span>
              </a>

              <button
                onClick={() => setShowEducationModal(false)}
                className="flex-1 py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center text-center border border-white/10"
              >
                {t("Fechar", "Close")}
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Hero;
