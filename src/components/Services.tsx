/**
 * @file Services.tsx
 * @description Seção de Serviços e Especializações do Portfólio.
 * 
 * Exibe os pilares de serviços prestados por Matheus Nogueira em cards interativos.
 * Cada botão "Solicitar Orçamento" redireciona para o WhatsApp ou formulário de contato
 * com mensagem personalizada pré-preenchida.
 */

import React from 'react';
import { Code, Layout, Cpu, Video, Wrench, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { serviceItems, personalInfo } from '../data/portfolioData';
import { WhatsAppIcon } from './icons/BrandIcons';

const Services: React.FC = () => {
  const { t } = useLanguage();

  // Mapeamento dinâmico dos ícones Lucide
  const getIcon = (name: string) => {
    switch (name) {
      case 'Code': return Code;
      case 'Layout': return Layout;
      case 'Cpu': return Cpu;
      case 'Video': return Video;
      default: return Wrench;
    }
  };

  // Função para redirecionar para o WhatsApp com mensagem pré-preenchida por serviço
  const handleServiceQuote = (serviceTitle: string) => {
    const text = encodeURIComponent(`Olá Matheus! Vi seu portfólio e gostaria de um orçamento para o serviço: ${serviceTitle}`);
    const whatsappBase = personalInfo.whatsappUrl ? personalInfo.whatsappUrl.split('?')[0] : 'https://wa.me/5592981838704';
    window.open(`${whatsappBase}?text=${text}`, '_blank');
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Luz de fundo decorativa */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/20 bg-pink-500/10 text-pink-400 text-xs font-mono uppercase tracking-widest">
            <Wrench className="w-3.5 h-3.5" />
            <span>{t("Soluções & Especializações", "Solutions & Services")}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t("Como posso ", "How I can ")}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
              {t("impulsionar seu negócio", "empower your business")}
            </span>
          </h2>
        </div>

        {/* Grid de Cards de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceItems.map((service) => {
            const IconComponent = getIcon(service.iconName);
            const title = t(service.title.pt, service.title.en);

            return (
              <div
                key={service.id}
                className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:border-indigo-500/50 hover:bg-white/[0.04] transition-all duration-500 flex flex-col justify-between"
              >
                {/* Efeito Glow de Fundo no Hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-7 h-7" />
                    </div>

                    <button
                      onClick={() => handleServiceQuote(title)}
                      className="p-3 rounded-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white transition-all hover:scale-110 flex items-center gap-2 group/btn text-xs font-bold border border-[#25D366]/30 shadow-[0_0_15px_rgba(37,211,102,0.2)]"
                      title={t("Solicitar Orçamento no WhatsApp", "Request Quote on WhatsApp")}
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-current" />
                      <span className="hidden group-hover/btn:inline px-1">{t("Orçamento", "Quote")}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed font-light">
                    {t(service.description.pt, service.description.en)}
                  </p>
                </div>

                {/* Lista de Skills / Tecnologias do Serviço */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {service.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 rounded-full bg-white/5 text-[11px] font-mono text-gray-400 border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;
