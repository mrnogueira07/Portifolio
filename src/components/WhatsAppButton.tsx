/**
 * @file WhatsAppButton.tsx
 * @description Botão Flutuante do WhatsApp com cores oficiais da marca e botão de voltar ao topo.
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

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center gap-3">
      {/* Botão de Voltar ao Topo */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/15 shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
          aria-label={t("Voltar ao Topo", "Back to Top")}
          title={t("Voltar ao Topo", "Back to Top")}
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Botão Flutuante Oficial do WhatsApp */}
      <a
        href={personalInfo.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group p-3.5 sm:p-4 rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.5)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.8)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border border-white/20 cursor-pointer"
        aria-label="Falar no WhatsApp"
        title="Falar no WhatsApp"
      >
        <span className="absolute -inset-1 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none"></span>
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 fill-current" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
