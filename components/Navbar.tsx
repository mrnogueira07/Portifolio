import React, { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';

const navLinks = [
  { name: 'Início', href: '#home' },
  { name: 'Sobre', href: '#about' },
  { name: 'Projetos', href: '#projects' },
  { name: 'Depoimentos', href: '#testimonials' },
  { name: 'Contato', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section logic
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out border-b ${scrolled ? 'bg-slate-900/60 backdrop-blur-xl py-4 border-white/5 shadow-lg shadow-black/5' : 'bg-transparent py-6 border-transparent shadow-none'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a 
              href="#home" 
              onClick={(e) => scrollToSection(e, '#home')}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="p-2 bg-gradient-to-tr from-primary to-secondary rounded-lg group-hover:rotate-12 transition-transform">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-wide">Matheus <span className="text-primary">Nogueira</span></span>
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`font-medium transition-colors relative cursor-pointer ${
                  activeSection === link.href.substring(1) 
                    ? 'text-white after:w-full' 
                    : 'text-gray-300 hover:text-white after:w-0 hover:after:w-full'
                } after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-primary after:transition-all duration-300`}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="px-5 py-2.5 rounded-full bg-white text-dark font-bold hover:bg-gray-200 transition-all transform hover:scale-105 cursor-pointer"
            >
              Contrate-me
            </a>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full glass-card transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`block px-3 py-3 rounded-md text-base font-medium cursor-pointer ${
                activeSection === link.href.substring(1)
                  ? 'text-white bg-white/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;