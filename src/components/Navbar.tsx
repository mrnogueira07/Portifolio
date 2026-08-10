/**
 * @file Navbar.tsx
 * @description Barra de Navegação Principal 100% Funcional no estilo Zelio.
 * 
 * Apresenta navegação por rolagem suave (smooth scroll) para todas as seções (Início, Sobre, Habilidades, Serviços, Projetos, Depoimentos, Contato),
 * ícones de redes sociais no topo direito, alternador de idioma e menu mobile responsivo.
 */

import React, { useState, useEffect } from 'react';
import { Globe, Menu, X, Code2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { personalInfo } from '../data/portfolioData';
import { GitHubIcon, LinkedInIcon, InstagramIcon, WhatsAppIcon, TikTokIcon } from './icons/BrandIcons';

const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitora a rolagem da página para aumentar a opacidade da barra
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rolagem suave funcional para qualquer seção por ID
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const targetId = id.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Itens do Menu de Navegação 100% Funcionais com largura fixa estabilizada
  const navItems = [
    { label: t("Início", "Home"), href: "#home", widthClass: "w-[58px] lg:w-[70px]" },
    { label: t("Habilidades", "Skills"), href: "#skills", widthClass: "w-[85px] lg:w-[100px]" },
    { label: t("Serviços", "Services"), href: "#services", widthClass: "w-[72px] lg:w-[86px]" },
    { label: t("Projetos", "Portfolio"), href: "#projects", widthClass: "w-[72px] lg:w-[90px]" },
    { label: t("Depoimentos", "Reviews"), href: "#testimonials", widthClass: "w-[96px] lg:w-[115px]" },
    { label: t("Contato", "Contact"), href: "#contact", widthClass: "w-[64px] lg:w-[78px]" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2 sm:py-3 landscape:py-2 bg-[#080a15]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
          : 'py-3 sm:py-5 landscape:py-2.5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Principal do Matheus Nogueira */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none text-left"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-pink-500 p-[1px] shadow-[0_0_15px_rgba(99,102,241,0.4)] group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0d0f1d] rounded-[11px] flex items-center justify-center">
                <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-sm sm:text-lg text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                {personalInfo.name}
              </span>
              <span className="text-[9px] sm:text-[10px] text-gray-400 font-mono uppercase tracking-widest -mt-1">
                Portfólio 2026
              </span>
            </div>
          </button>

          {/* Links de Navegação Desktop 100% Funcionais */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-white/5 border border-white/10 rounded-full px-2 lg:px-4 py-1 backdrop-blur-md">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.href)}
                className={`py-1.5 text-[11px] lg:text-xs font-medium text-gray-300 hover:text-white transition-colors hover:bg-white/10 rounded-full cursor-pointer whitespace-nowrap inline-flex items-center justify-center text-center ${item.widthClass}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Ações: Redes Sociais (Estilo Zelio), Alternador de Idioma e CTA */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            
            {/* Ícones Sociais Rápidos na Navbar */}
            <div className="hidden lg:flex items-center gap-2 border-r border-white/10 pr-4">
              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-[#25D366]/20 text-gray-400 hover:text-[#25D366] transition-colors"
                title="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
              </a>
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-[#0A66C2] transition-colors"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-[#E4405F] transition-colors"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              {personalInfo.socials.tiktok && (
                <a
                  href={personalInfo.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  title="TikTok"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Alternador de Idioma PT / EN com largura fixa estabilizada */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 lg:px-3.5 py-1.5 lg:py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] lg:text-xs font-semibold text-gray-200 transition-all hover:scale-105 active:scale-95 whitespace-nowrap min-w-[78px] lg:min-w-[90px]"
              title={t("Mudar para Inglês", "Switch to Portuguese")}
            >
              <Globe className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-indigo-400 animate-spin-slow shrink-0" />
              <span>{language === 'pt' ? 'PT-BR' : 'EN-US'}</span>
            </button>

            {/* CTA Contato Rápido com largura fixa estabilizada */}
            <button
              onClick={() => scrollToSection('contact')}
              className="px-3.5 lg:px-5 py-2 lg:py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-bold text-[11px] lg:text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 whitespace-nowrap min-w-[105px] lg:min-w-[125px] inline-flex items-center justify-center text-center"
            >
              {t("Falar Comigo", "Get in Touch")}
            </button>
          </div>

          {/* Botão Hambúrguer Mobile */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-xs text-indigo-400 font-bold"
            >
              {language.toUpperCase()}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 hover:text-white"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Dropdown Mobile 100% Funcional */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080a15]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4 animate-fade-in">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(item.href)}
              className="block w-full text-left text-sm font-semibold text-gray-300 hover:text-indigo-400 transition-colors py-2 border-b border-white/5"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-center py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider"
            >
              {t("Falar Comigo", "Get in Touch")}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
