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
      window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: 'smooth' });
      setIsOpen(false);
      setActiveLink(href);
    }
  };

  return (
    <nav 
      className={`fixed w-full z-[100] transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-[#0f172a]/90 backdrop-blur-md py-3 border-white/10 shadow-lg' 
          : 'bg-transparent py-6 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
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

      {/* Menu Mobile Overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-[#0f172a]/95 backdrop-blur-xl transition-all duration-500 flex flex-col items-center justify-center gap-8 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8 w-full px-8">
          {navLinks.map((link, idx) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }} 
              className={`text-3xl font-display font-bold text-white hover:text-indigo-400 transition-all transform ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {link.name}
            </a>
          ))}
          <div 
            className={`w-full max-w-xs h-px bg-white/10 my-2 transition-all duration-700 ${isOpen ? 'scale-x-100' : 'scale-x-0'}`} 
          />
          <button 
            onClick={() => scrollTo('#contact')} 
            className={`w-full max-w-xs py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl transition-all duration-500 delay-300 transform hover:scale-105 ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Falar Comigo
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;