/**
 * @file WhatsAppButton.tsx
 * @description Botão Flutuante do WhatsApp com animação fluida e botão de voltar ao topo.
 */

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { personalInfo } from '../data/portfolioData';
import { WhatsAppIcon } from './icons/BrandIcons';

const WhatsAppButton: React.FC = () => {
  const { t } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      {/* Botão de Voltar ao Topo (Aparece suavemente ao rolar) */}
      <button
        onClick={scrollToTop}
        className={`p-3 rounded-full bg-[#090e1c]/90 hover:bg-[#0f172a] backdrop-blur-xl text-slate-300 hover:text-white border border-slate-700/60 shadow-lg transition-all duration-300 cursor-pointer pointer-events-auto flex items-center justify-center group ${
          showScrollTop
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
        }`}
        aria-label={t("Voltar ao Topo", "Back to Top")}
        title={t("Voltar ao Topo", "Back to Top")}
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
      </button>

      {/* Botão Flutuante Principal do WhatsApp com Estilo Corporativo e Elegante */}
      <a
        href={personalInfo.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-3 p-3.5 sm:p-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer pointer-events-auto border border-emerald-400/40 shadow-lg shadow-black/40 hover:shadow-xl"
        aria-label={t("Conversar no WhatsApp", "Chat on WhatsApp")}
        title={t("Conversar no WhatsApp", "Chat on WhatsApp")}
      >
        {/* Tooltip expandível suave no hover */}
        <span className="hidden sm:inline-block max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-out text-xs font-semibold text-white tracking-wide pr-0 group-hover:pr-1 font-sans">
          {t("Conversar no WhatsApp", "Chat on WhatsApp")}
        </span>

        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 fill-current group-hover:scale-105 transition-transform duration-300 shrink-0" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
