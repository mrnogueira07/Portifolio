/**
 * @file Navbar.tsx
 * @description Barra de Navegação Principal com espaçamento inteligente e responsivo.
 * 
 * - Navegação suave por âncoras (#home, #about, #skills, #services, #projects, #testimonials, #contact).
 * - Espaçamentos auto-ajustáveis sem sobreposição de textos ou ícones.
 * - Suporte a múltiplos idiomas e menu mobile com AnimatePresence.
 */

import React, { useState, useEffect } from 'react';
import { Globe, Menu, X, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

  // Itens do Menu de Navegação (largura dinâmica natural para não truncar nem sobrepor)
  const navItems = [
    { label: t("Início", "Home"), href: "#home" },
    { label: t("Sobre", "About"), href: "#about" },
    { label: t("Habilidades", "Skills"), href: "#skills" },
    { label: t("Serviços", "Services"), href: "#services" },
    { label: t("Projetos", "Portfolio"), href: "#projects" },
    { label: t("Depoimentos", "Reviews"), href: "#testimonials" },
    { label: t("Contato", "Contact"), href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2 sm:py-2.5 bg-[#080a15]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
          : 'py-3 sm:py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 lg:gap-6">
          
          {/* Logo Principal do Matheus Nogueira */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none text-left shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-pink-500 p-[1px] shadow-[0_0_15px_rgba(99,102,241,0.4)] group-hover:scale-105 transition-transform duration-300 shrink-0">
              <div className="w-full h-full bg-[#0d0f1d] rounded-[11px] flex items-center justify-center">
                <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-sm sm:text-base text-white tracking-tight group-hover:text-indigo-400 transition-colors leading-snug">
                {personalInfo.name}
              </span>
              <span className="text-[9px] sm:text-[10px] text-gray-400 font-mono uppercase tracking-widest leading-none mt-0.5">
                Portfólio 2026
              </span>
            </div>
          </button>

          {/* Links de Navegação Desktop com espaçamento respirável */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1 backdrop-blur-md shrink-0">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.href)}
                className="px-2.5 xl:px-3.5 py-1.5 text-xs font-medium text-gray-300 hover:text-white transition-colors hover:bg-white/10 rounded-full cursor-pointer whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Ações: Redes Sociais, Alternador de Idioma e CTA */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3.5 shrink-0">
            
            {/* Ícones Sociais (Exibidos a partir de telas xl para não espremer o menu) */}
            <div className="hidden xl:flex items-center gap-1.5 border-r border-white/10 pr-3.5 mr-0.5">
              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2 rounded-xl bg-white/5 hover:bg-[#25D366]/20 text-gray-400 hover:text-[#25D366] transition-all duration-300 hover:scale-110"
                title="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current group-hover:rotate-6 transition-transform duration-300" />
              </a>
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-[#0A66C2] transition-colors"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-[#E4405F] transition-colors"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              {personalInfo.socials.tiktok && (
                <a
                  href={personalInfo.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  title="TikTok"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Alternador de Idioma PT / EN */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 transition-all hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
              title={t("Mudar para Inglês", "Switch to Portuguese")}
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400 animate-spin-slow shrink-0" />
              <span>{language === 'pt' ? 'PT-BR' : 'EN-US'}</span>
            </button>

            {/* CTA Contato Rápido */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all duration-300 whitespace-nowrap shrink-0"
            >
              {t("Falar Comigo", "Get in Touch")}
            </motion.button>
          </div>

          {/* Botão Hambúrguer Mobile (< lg) */}
          <div className="flex lg:hidden items-center gap-2.5">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-indigo-400 font-bold"
            >
              {language.toUpperCase()}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 hover:text-white transition-colors"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Menu Dropdown Mobile com AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav-dropdown"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="lg:hidden bg-[#080a15]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-3 overflow-hidden shadow-2xl"
          >
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left text-sm font-semibold text-gray-300 hover:text-indigo-400 transition-colors py-2 border-b border-white/5"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('contact')}
                className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg"
              >
                {t("Falar Comigo", "Get in Touch")}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
