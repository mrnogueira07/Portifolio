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

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

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

const App: React.FC = () => {
  return (
    <div className="min-h-screen text-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e1b4b] via-[#0f172a] to-[#000000]">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </div>
  );
};

export default App;