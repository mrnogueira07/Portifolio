import React, { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';

const navLinks = [
  { name: 'Início', href: '#home' },
  { name: 'Sobre', href: '#about' },
  { name: 'Projetos', href: '#projects' },
  { name: 'Contato', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Lógica simples para detectar seção ativa
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

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      window.scrollTo({ top: (el as HTMLElement).offsetTop - 100, behavior: 'smooth' });
      setIsOpen(false);
      setActiveLink(href);
    }
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-[100] flex justify-center px-4 md:px-6 pointer-events-none">
      <nav 
        className={`w-full max-w-7xl rounded-2xl transition-all duration-500 pointer-events-auto ${
          scrolled || isOpen
            ? 'bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 shadow-2xl py-2 md:py-3' 
            : 'bg-transparent border border-transparent py-4'
        }`}
      >
        <div className="px-4 md:px-6 flex justify-between items-center relative">
          {/* Logo */}
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }} className="flex items-center gap-3 group relative z-50">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <Code2 className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl tracking-tight text-white leading-none">
                Matheus<span className="text-indigo-500">Nogueira</span>
              </span>
              <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mt-1 transform translate-y-1 group-hover:translate-y-0">
                Portfolio
              </span>
            </div>
          </a>

          {/* Links Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }} 
                className={`relative px-4 py-2 text-sm font-bold transition-all duration-300 rounded-lg group overflow-hidden ${
                  activeLink === link.href ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {/* Fundo animado no hover/active */}
                <span className={`absolute inset-0 bg-white/5 transform transition-transform duration-300 origin-left ${
                  activeLink === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }} 
              className="ml-6 px-6 py-2.5 rounded-full bg-white text-slate-900 font-extrabold text-xs hover:scale-105 hover:bg-indigo-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              ME CONTRATE
            </a>
          </div>

          {/* Botão Mobile */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors relative z-50 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menu Mobile */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-[400px] opacity-100 pt-4 border-t border-white/5 mt-2' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col items-center gap-4 px-6 pb-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }} 
                className={`text-lg font-display font-bold hover:text-indigo-400 transition-all ${activeLink === link.href ? 'text-white' : 'text-gray-400'}`}
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => scrollTo('#contact')} 
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg mt-2"
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