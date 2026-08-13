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

          </div>

          {/* Coluna da Direita: Card de Perfil Estilo Zelio com Foto (6 Colunas) */}
          <div className="landscape:col-span-6 lg:col-span-6 flex justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="relative group w-full max-w-[550px] sm:max-w-[700px] lg:max-w-[680px] landscape:max-w-[400px]">
              
              {/* Moldura com gradiente animado ultra-suave */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 group-hover:opacity-80 blur-xl transition-all duration-700 ease-out"></div>

              {/* Card Container */}
              <div className="relative rounded-3xl bg-[#0b0d1b] border border-white/10 p-3 shadow-2xl overflow-hidden transition-all duration-500 group-hover:border-indigo-500/40">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900">
                  <img
                    src={personalInfo.avatarUrl}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d1b] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700"></div>
                </div>

                {/* Badge Flutuante no Card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/70 backdrop-blur-xl border border-white/15 flex items-center justify-between shadow-lg transition-all duration-500 group-hover:border-indigo-400/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white tracking-wide">{personalInfo.name}</p>
                      <p className="text-[10px] font-mono text-indigo-300 font-medium">
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

      {/* Pop-Up Modal de Carreira Escolar / Formação Acadêmica (Formal, Elegante e Organizado) */}
      {showEducationModal && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in-fast">
          <div className="relative w-full max-w-3xl bg-[#0a0d18] rounded-3xl border border-slate-700/60 shadow-[0_20px_60px_rgba(0,0,0,0.9)] max-h-[90vh] flex flex-col overflow-hidden animate-scale-in-fast">
            
            {/* Header Modal Formal */}
            <div className="p-6 sm:p-8 border-b border-slate-800 flex items-start justify-between bg-[#0a0d18] shrink-0">
              <div className="flex items-center gap-3 text-left">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-inner">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-[10px] font-mono mb-1.5">
                    <ShieldCheck className="w-3 h-3 text-indigo-400" />
                    <span>{t("Credenciais Oficiais • Ensino Superior", "Official Credentials • Higher Education")}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                    {t("Formação Acadêmica & Carreira Escolar", "Academic Background & Qualifications")}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {t("Histórico acadêmico e especializações em Tecnologia da Informação", "Academic degrees and specializations in Information Technology")}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowEducationModal(false)}
                className="p-2 rounded-full bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700/50"
                title={t("Fechar", "Close")}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo Rolável Formal */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-left">
              
              {/* Card de Graduação (Bacharelado) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all space-y-3 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]"></div>
                    <h4 className="text-lg font-bold text-white">
                      {t("Ciência da Computação", "Computer Science")}
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-mono border border-indigo-500/20 font-medium">
                    {t("Bacharelado", "Bachelor's Degree")}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span><strong>Centro Universitário Estácio do Amazonas (Estácio Amazonas)</strong></span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-slate-800/80">
                  {t(
                    "Formação sólida em fundamentos de computação, engenharia de software, estruturas de dados, algoritmos, arquitetura de sistemas e inteligência artificial.",
                    "Solid education in computer science fundamentals, software engineering, data structures, algorithms, system architecture, and artificial intelligence."
                  )}
                </p>
              </div>

              {/* Card de Pós-Graduação */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all space-y-3 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]"></div>
                    <h4 className="text-lg font-bold text-white">
                      {t("Liderança, Inovação e Tecnologia", "Leadership, Innovation & Technology")}
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-mono border border-indigo-500/20 font-medium">
                    {t("Pós-Graduação Lato Sensu", "Postgraduate Specialization")}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span><strong>Faculdade Sul Mineira (Fasul Educacional)</strong></span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-slate-800/80">
                  {t(
                    "Especialização estratégica voltada à gestão de projetos tecnológicos, metodologias ágeis, inovação contínua, governança e transformação digital.",
                    "Strategic specialization focused on technological project management, agile methodologies, continuous innovation, governance, and digital transformation."
                  )}
                </p>
              </div>

              {/* Matriz de Competências Técnico-Científicas */}
              <div className="space-y-4 pt-2">
                <h5 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-400" />
                  <span>{t("Matriz de Competências & Domínio Acadêmico", "Core Competency & Technical Domain")}</span>
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/70 transition-all space-y-1.5">
                    <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
                      <Code className="w-4 h-4 text-indigo-400" />
                      <span>{t("Engenharia de Software & Arquitetura", "Software Engineering & Architecture")}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {t("Construção de aplicações robustas, microsserviços, design patterns, clean code e sistemas escaláveis.", "Building robust applications, microservices, design patterns, clean code, and scalable systems.")}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/70 transition-all space-y-1.5">
                    <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
                      <Brain className="w-4 h-4 text-indigo-400" />
                      <span>{t("Inteligência Artificial & Dados", "Artificial Intelligence & Data")}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {t("Algoritmos preditivos, redes neurais, modelagem estatística e análise quantitativa de dados.", "Predictive algorithms, neural networks, statistical modeling, and quantitative data analysis.")}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/70 transition-all space-y-1.5">
                    <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
                      <Rocket className="w-4 h-4 text-indigo-400" />
                      <span>{t("Engenharia de Jogos & Gráficos", "Game Engineering & Graphics")}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {t("Desenvolvimento interativo 2D/3D, motores Unity/Unreal, física computacional e C#/C++.", "2D/3D interactive development, Unity/Unreal engines, computational physics, and C#/C++.")}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/70 transition-all space-y-1.5">
                    <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
                      <Cpu className="w-4 h-4 text-indigo-400" />
                      <span>{t("Sistemas Embarcados & IoT", "Embedded Systems & IoT")}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {t("Programação de microcontroladores (ESP32/Arduino), integração de sensores e automação.", "Microcontroller programming (ESP32/Arduino), sensor integration, and hardware automation.")}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/70 transition-all space-y-1.5">
                    <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
                      <ShieldCheck className="w-4 h-4 text-indigo-400" />
                      <span>{t("Segurança da Informação & Algoritmos", "Information Security & Algorithms")}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {t("Criptografia aplicada, estruturas de dados otimizadas e proteção e auditoria de sistemas.", "Applied cryptography, optimized data structures, system protection, and auditing.")}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/70 transition-all space-y-1.5">
                    <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
                      <Layers className="w-4 h-4 text-indigo-400" />
                      <span>{t("Cloud Computing & DevOps", "Cloud Computing & DevOps")}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {t("Pipelines de CI/CD, conteinerização Docker, bancos de dados e ambientes de alta disponibilidade.", "CI/CD pipelines, Docker containerization, databases, and high-availability cloud environments.")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rodapé do Modal com Botões Formalizados e Suaves */}
            <div className="p-6 border-t border-slate-800 bg-[#0a0d18] flex items-center justify-between gap-4 shrink-0">
              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(37,211,102,0.35)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center text-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>{t("Conectar via WhatsApp", "Connect via WhatsApp")}</span>
              </a>

              <button
                onClick={() => setShowEducationModal(false)}
                className="flex-1 py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center text-center border border-slate-700"
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
