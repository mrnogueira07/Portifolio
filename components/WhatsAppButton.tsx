import React from 'react';
import { Phone } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  return (
    <a 
      href="https://wa.me/5592981838704" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Conversar no WhatsApp"
    >
      <div className="relative flex items-center justify-center w-16 h-16">
        {/* Efeito de Onda (Ping) */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40 animate-ping"></span>
        
        {/* Efeito de Pulso Fundo */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-20 animate-pulse"></span>
        
        {/* Botão Principal com Ícone Vectorial */}
        <div className="relative w-16 h-16 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] border-2 border-white/20 transition-transform duration-300 group-hover:scale-110 z-10 bg-[#25D366] flex items-center justify-center overflow-hidden">
          {/* Custom WhatsApp-like Icon using Lucide */}
          <Phone className="w-8 h-8 text-white fill-white" />
          
          {/* Glossy Effect */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 rounded-t-full pointer-events-none"></div>
        </div>
      </div>
      
      {/* Tooltip on hover */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white text-gray-900 text-sm font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none shadow-xl z-20">
        Fale comigo!
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white transform rotate-45"></div>
      </div>
    </a>
  );
};

export default WhatsAppButton;