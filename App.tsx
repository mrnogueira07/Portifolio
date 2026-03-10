import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import WhatsAppButton from './components/WhatsAppButton';
import ProjectsPage from './components/ProjectsPage';

// Componente para rolar a página para o topo automaticamente ao mudar de rota
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Componente da Página Inicial (Landing Page) que agrupa as seções principais
const LandingPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <WhatsAppButton />
    </>
  );
};

// Componente Principal da aplicação
const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full text-white bg-[#050508]">
      {/* Elementos de fundo fixos para efeito visual (gradiente e grid) */}
      <div className="fixed inset-0 bg-[#050508] -z-20"></div>
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] -z-10 pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.08)_0%,transparent_50%)] -z-10 pointer-events-none"></div>
      <div className="fixed inset-0 bg-noise -z-10 pointer-events-none"></div>

      {/* Gerenciamento de rotas e rolagem */}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </div>
  );
};

export default App;