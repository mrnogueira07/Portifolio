/**
 * @file Navbar.tsx
 * @description Barra de Navegação Principal com espaçamento inteligente e total responsividade.
 * 
 * - Navegação suave por âncoras (#home, #about, #skills, #services, #projects, #testimonials, #contact).
 * - Totalmente adaptável de 320px (mobile ultra-compacto) a 4K.
 * - Menu mobile completo com links rápidos, redes sociais integradas e alternador de idioma.
 * - Suporte a múltiplos idiomas (PT/EN) com persistência de estado.
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

  // Monitora a rolagem da página para elevar a barra
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fecha menu mobile ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  // Itens do Menu de Navegação
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
        isScrolled || mobileMenuOpen
          ? 'py-2 sm:py-2.5 bg-[#080a15]/95 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
          : 'py-3 sm:py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
          
          {/* Logo Principal Matheus Nogueira */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 sm:gap-3 group focus:outline-none text-left shrink-0 cursor-pointer"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 p-[1px] shadow-sm group-hover:scale-105 transition-transform duration-300 shrink-0">
              <div className="w-full h-full bg-[#0d1222] rounded-[11px] flex items-center justify-center">
                <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xs sm:text-base text-white tracking-tight group-hover:text-blue-400 transition-colors leading-tight">
                {personalInfo.name}
              </span>
              <span className="text-[8px] sm:text-[10px] text-slate-400 font-mono uppercase tracking-widest leading-none mt-0.5">
                Portfólio 2026
              </span>
            </div>
          </button>

          {/* Links de Navegação Desktop (visíveis a partir de 1024px) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 bg-white/[0.03] border border-slate-800 rounded-full px-2 xl:px-3 py-1 backdrop-blur-md shrink-0">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.href)}
                className="px-2 xl:px-3.5 py-1.5 text-[11px] xl:text-xs font-medium text-slate-300 hover:text-white transition-colors hover:bg-white/10 rounded-full cursor-pointer whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Ações Desktop: Redes Sociais, Idioma e CTA */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            
            {/* Ícones Sociais (exibidos em telas >= 1200px para manter respiro) */}
            <div className="hidden xl:flex items-center gap-1 border-r border-slate-800 pr-2.5 mr-0.5">
              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-1.5 rounded-lg bg-white/5 hover:bg-[#25D366]/20 text-slate-400 hover:text-[#25D366] transition-all duration-300 hover:scale-110"
                title="WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current group-hover:rotate-6 transition-transform duration-300" />
              </a>
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-[#0A66C2] transition-colors"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={personalInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-[#E4405F] transition-colors"
                title="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              {personalInfo.socials.tiktok && (
                <a
                  href={personalInfo.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  title="TikTok"
                >
                  <TikTokIcon className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Alternador de Idioma PT / EN */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-slate-800 text-[11px] xl:text-xs font-semibold text-slate-200 transition-all hover:scale-105 active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
              title={t("Mudar para Inglês", "Switch to Portuguese")}
            >
              <Globe className="w-3 h-3 text-blue-400 animate-spin-slow shrink-0" />
              <span>{language === 'pt' ? 'PT-BR' : 'EN-US'}</span>
            </button>

            {/* CTA Contato Rápido Corporativo */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('contact')}
              className="px-3.5 xl:px-4 py-1.5 xl:py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold text-[11px] xl:text-xs uppercase tracking-wider shadow-sm hover:shadow-md border border-blue-500/30 transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t("Falar Comigo", "Get in Touch")}
            </motion.button>
          </div>

          {/* Controles Mobile (< 1024px) */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Botão de Idioma Mobile */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white/5 border border-slate-800 text-[11px] text-blue-300 font-bold hover:bg-white/10 transition-colors"
              title={t("Mudar Idioma", "Change Language")}
            >
              <Globe className="w-3 h-3 text-blue-400" />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Botão Hambúrguer Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-slate-800 text-slate-200 hover:text-white transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-blue-400" /> : <Menu className="w-5 h-5" />}
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
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-[#080d1a]/98 backdrop-blur-2xl border-b border-slate-800 px-4 sm:px-6 py-5 space-y-4 overflow-hidden shadow-2xl"
          >
            {/* Lista de Navegação Mobile */}
            <div className="grid grid-cols-1 divide-y divide-white/5">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.href)}
                  className="w-full text-left text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors py-2.5 flex items-center justify-between group cursor-pointer"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-blue-400/60 font-mono group-hover:text-blue-400 transition-colors">
                    0{index + 1}
                  </span>
                </button>
              ))}
            </div>

            {/* Redes Sociais no Mobile */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-center gap-3">
              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-[#25D366]/20 text-slate-400 hover:text-[#25D366] transition-all"
                title="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
              </a>
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-[#0A66C2] transition-colors"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-[#E4405F] transition-colors"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              {personalInfo.socials.tiktok && (
                <a
                  href={personalInfo.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  title="TikTok"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* CTA Mobile */}
            <div className="pt-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('contact')}
                className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold text-xs uppercase tracking-wider shadow-sm border border-blue-500/30 cursor-pointer"
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
