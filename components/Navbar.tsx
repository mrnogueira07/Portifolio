import React, { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';

const navLinks = [
  { name: 'Início', href: '#home' },
  { name: 'Sobre', href: '#about' },
  { name: 'Projetos', href: '#projects' },
  { name: 'Contato', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
        className={`w-full max-w-5xl rounded-3xl transition-all duration-700 pointer-events-auto border backdrop-blur-3xl ${
          scrolled || isOpen
            ? 'bg-[#050508]/60 border-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.6)] py-2' 
            : 'bg-transparent border-transparent py-4'
        }`}
      >
        <div className="px-6 flex justify-between items-center relative">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }} className="flex items-center gap-3 group relative z-50">
            <div className="w-8 h-8 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-all duration-500">
              <Code2 className="text-white w-4 h-4" />
            </div>
            <span className="font-display font-black text-base tracking-tighter text-white uppercase">
              Matheus <span className="text-gray-500 group-hover:text-primary transition-colors">Nogueira</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }} 
                className={`px-4 py-2 text-[10px] font-black transition-all duration-300 rounded-xl tracking-[0.2em] uppercase ${
                  activeLink === link.href ? 'text-white bg-white/5' : 'text-gray-600 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }} 
              className="ml-4 px-6 py-2 rounded-xl bg-white text-dark font-black text-[9px] tracking-[0.2em] uppercase hover:scale-105 transition-all active:scale-95 shadow-xl"
            >
              PROJETAR
            </a>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-gray-400 p-2 hover:bg-white/5 rounded-xl transition-colors relative z-50"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 px-6 ${
            isOpen ? 'max-h-[400px] opacity-100 pt-6 pb-6 mt-2' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }} 
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeLink === link.href ? 'text-primary' : 'text-gray-600 hover:text-white'}`}
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => scrollTo('#contact')} 
              className="w-full py-4 bg-white/[0.03] border border-white/5 text-white font-black rounded-2xl text-[10px] tracking-[0.3em] uppercase"
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