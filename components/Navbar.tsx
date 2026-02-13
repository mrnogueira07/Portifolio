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
    <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-6 pointer-events-none">
      <nav 
        className={`w-full max-w-5xl rounded-full transition-all duration-700 pointer-events-auto border backdrop-blur-3xl ${
          scrolled || isOpen
            ? 'bg-[#0f172a]/10 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] py-1.5' 
            : 'bg-transparent border-transparent py-4'
        }`}
      >
        <div className="px-6 flex justify-between items-center relative">
          {/* Logo */}
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }} className="flex items-center gap-3 group relative z-50">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
              <Code2 className="text-white w-4.5 h-4.5" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight text-white leading-none">
                Matheus<span className="text-indigo-400">Nogueira</span>
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
                className={`relative px-5 py-2 text-[11px] font-bold transition-all duration-300 rounded-full group overflow-hidden tracking-widest uppercase ${
                  activeLink === link.href ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                <span className={`absolute inset-0 bg-white/5 transform transition-transform duration-500 rounded-full ${
                  activeLink === link.href ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                }`}></span>
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }} 
              className="ml-4 px-7 py-2 rounded-full bg-white text-slate-950 font-black text-[10px] tracking-widest uppercase hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 active:scale-95"
            >
              CONTRATAR
            </a>
          </div>

          {/* Botão Mobile */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors relative z-50 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out px-6 ${
            isOpen ? 'max-h-[400px] opacity-100 pt-6 pb-6 mt-2' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }} 
                className={`text-sm font-display font-bold uppercase tracking-[0.2em] transition-all ${activeLink === link.href ? 'text-indigo-400' : 'text-gray-400 hover:text-white'}`}
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => scrollTo('#contact')} 
              className="w-full py-4 bg-white text-dark font-black rounded-full shadow-lg text-xs tracking-widest uppercase"
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