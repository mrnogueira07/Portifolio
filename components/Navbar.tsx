import React, { useState, useEffect } from 'react';
import { Code2 } from 'lucide-react';

// Definição dos links de navegação da barra superior
const navLinks = [
  { name: 'Início', href: '#home' },
  { name: 'Sobre', href: '#about' },
  { name: 'Projetos', href: '#projects' },
  { name: 'Contato', href: '#contact' },
];

// Componente Navbar - Barra de navegação responsiva e dinâmica
const Navbar: React.FC = () => {
  // Estado para verificar se a página foi rolada (mudar estilo da navbar)
  const [scrolled, setScrolled] = useState(false);
  // Estado para controlar a abertura do menu mobile
  const [isOpen, setIsOpen] = useState(false);
  // Estado para rastrear qual link está ativo no momento (baseado na rolagem)
  const [activeLink, setActiveLink] = useState('#home');

  // Efeito para gerenciar a rolagem e atualizar estados da navbar
  useEffect(() => {
    const handleScroll = () => {
      // Ativa efeito de "blur" e fundo escuro após 20px de rolagem
      setScrolled(window.scrollY > 20);

      // Lógica para detectar qual seção está visível na tela
      const sections = navLinks.map(link => document.querySelector(link.href));
      const scrollPos = window.scrollY + 100;

      sections.forEach((section) => {
        if (section instanceof HTMLElement) {
          if (section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
            setActiveLink(`#${section.id}`);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Função para realizar scroll suave até a seção desejada
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      window.scrollTo({ top: (el as HTMLElement).offsetTop - 100, behavior: 'smooth' });
      setIsOpen(false);
      setActiveLink(href);
    }
  };

  return (
    <div className="fixed top-0 md:top-6 left-0 right-0 z-[100] flex justify-center px-0 md:px-6 pointer-events-none">
      <nav
        className={`w-full max-w-5xl transition-all duration-700 pointer-events-auto border-b md:border backdrop-blur-3xl md:rounded-3xl overflow-hidden ${scrolled || isOpen
            ? 'bg-[#030305]/90 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] py-3 md:py-2'
            : 'bg-transparent border-transparent py-6 md:py-4'
          }`}
      >
        <div className="px-5 md:px-8 flex justify-between items-center relative h-full">
          {/* Logo / Nome do Portfólio */}
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }} className="flex items-center gap-4 group relative z-50">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg group-hover:bg-primary/40 transition-all duration-500"></div>
              <div className="relative w-full h-full bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                <Code2 className="text-white w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col shrink-0">
              <span className="font-display font-black text-xs md:text-base tracking-tighter text-white uppercase leading-none">
                Matheus <span className="text-primary">Nogueira</span>
              </span>
              <span className="text-[10px] md:text-[11px] font-black text-gray-500 uppercase tracking-[0.3em] mt-1.5 whitespace-nowrap">Full Stack Engineer</span>
            </div>
          </a>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className={`relative px-5 py-2.5 text-[10px] font-black transition-all duration-500 rounded-xl tracking-[0.2em] uppercase group ${activeLink === link.href ? 'text-white' : 'text-gray-500 hover:text-white'
                  }`}
              >
                {activeLink === link.href && (
                  <div className="absolute inset-0 bg-white/5 rounded-xl border border-white/5 animate-fade-in"></div>
                )}
                <span className="relative z-10">{link.name}</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary group-hover:w-4 transition-all duration-500"></div>
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              className="ml-6 px-8 py-3 rounded-xl bg-primary text-white font-black text-[10px] tracking-[0.2em] uppercase hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all active:scale-95 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
              <span className="relative z-10">PROJETAR</span>
            </a>
          </div>

          {/* Botão Hambúrguer para Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-3 hover:bg-white/5 rounded-xl transition-all relative z-50 group"
            aria-label="Toggle Menu"
          >
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-4 h-0.5 bg-white transition-all duration-300 ml-auto ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>

        {/* Menu Mobile Expandível */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-700 ease-in-out px-6 ${isOpen ? 'max-h-[500px] opacity-100 pt-10 pb-12 mt-4' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`text-xl font-black uppercase tracking-[0.3em] transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${activeLink === link.href ? 'text-white' : 'text-gray-600 hover:text-white'}`}
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => scrollTo('#contact')}
              style={{ transitionDelay: `${navLinks.length * 100}ms` }}
              className={`w-full py-5 bg-primary text-white font-black rounded-2xl text-xs tracking-[0.4em] uppercase shadow-[0_10px_30px_rgba(99,102,241,0.2)] transition-all duration-700 ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
            >
              Falar Comigo
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;