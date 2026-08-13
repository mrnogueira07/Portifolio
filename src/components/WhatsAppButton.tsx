/**
 * @file WhatsAppButton.tsx
 * @description Botão Flutuante de Voltar ao Topo.
 */

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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

  if (!showScrollTop) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center gap-3">
      {/* Botão de Voltar ao Topo */}
      <button
        onClick={scrollToTop}
        className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/15 shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
        aria-label={t("Voltar ao Topo", "Back to Top")}
        title={t("Voltar ao Topo", "Back to Top")}
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};

export default WhatsAppButton;
