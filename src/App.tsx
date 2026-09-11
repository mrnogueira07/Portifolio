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
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThreeBackground from './components/ThreeBackground';

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
        <About />
        <Skills />
        <Services />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

/**
 * Componente Principal App
 */
const App: React.FC = () => {
  // Garante que a página sempre inicia no topo ao recarregar
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen w-full text-white bg-[#060813] selection:bg-indigo-500 selection:text-white relative overflow-x-hidden font-sans">
        
        {/* Camadas Fixas de Efeitos de Fundo 3D WebGL (Three.js) e Gradientes */}
        <div className="fixed inset-0 bg-[#060813] -z-20"></div>
        <ThreeBackground />
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
