/**
 * @file Footer.tsx
 * @description Rodapé Principal do Portfólio de Matheus Nogueira.
 * 
 * Exibe os direitos autorais, links de navegação rápida e botão de rolagem até o topo.
 */

import React from 'react';
import { personalInfo } from '../data/portfolioData';

const Footer: React.FC = () => {

  return (
    <footer className="py-12 border-t border-white/10 relative z-10 bg-[#080914]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6">
          

          {/* Direitos Autorais e Mensagem */}
          <p className="text-xs text-gray-400 text-center font-mono">
            <span>© {new Date().getFullYear()} {personalInfo.name}.</span>
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
