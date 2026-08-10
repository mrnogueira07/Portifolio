/**
 * @file App.tsx
 * @description Componente Raiz da Aplicação Portfólio Matheus Nogueira.
 * 
 * Orquestra os componentes da landing page (Hero, About, Skills, Services, Projects, Testimonials, Contact),
 * o sistema de Internacionalização (LanguageProvider), efeitos visuais de fundo e navegação por rotas.
 */

import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ParticleBackground from './components/ParticleBackground';

/**
 * Componente utilitário para rolar a janela para o topo ao alterar rotas
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

/**
 * Componente da Landing Page Principal
 */
const LandingPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Skills />
        <Services />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

/**
 * Componente Principal App
 */
const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen w-full text-white bg-[#060813] selection:bg-indigo-500 selection:text-white relative overflow-x-hidden font-sans">
        
        {/* Camadas Fixas de Efeitos de Fundo (Glow & Grid) */}
        <div className="fixed inset-0 bg-[#060813] -z-20"></div>
        <ParticleBackground />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.12)_0%,transparent_60%)] -z-10 pointer-events-none"></div>

        {/* Gerenciamento de Rolagem e Rotas */}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/projects" element={<LandingPage />} />
        </Routes>
      </div>
    </LanguageProvider>
  );
};

export default App;
