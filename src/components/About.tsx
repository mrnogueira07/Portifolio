/**
 * @file About.tsx
 * @description Seção 'Sobre Mim' do Portfólio com animações de Scroll GSAP e micro-interações Motion.
 * 
 * Apresenta a trajetória profissional de Matheus Nogueira, seus pilares técnicos
 * e o ecossistema de ferramentas e habilidades dominadas.
 */

import React, { useEffect, useRef } from 'react';
import { User, Gamepad2, Code, Palette, Rocket, GraduationCap, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { personalInfo } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação de revelação de cabeçalho via ScrollTrigger
      gsap.from('.gsap-about-header', {
        scrollTrigger: {
          trigger: '.gsap-about-header',
          start: 'top 85%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Animação do card de biografia
      gsap.from('.gsap-about-bio', {
        scrollTrigger: {
          trigger: '.gsap-about-bio',
          start: 'top 80%',
        },
        opacity: 0,
        x: -30,
        duration: 0.85,
        ease: 'power3.out',
      });

      // Animação das categorias de skills com stagger
      gsap.from('.gsap-about-card', {
        scrollTrigger: {
          trigger: '.gsap-about-card-container',
          start: 'top 80%',
        },
        opacity: 0,
        x: 30,
        stagger: 0.18,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Categorias de Habilidades Técnicas
  const skillCategories = [
    {
      title: t("Desenvolvimento Software", "Software Development"),
      icon: Code,
      skills: ["React", "TypeScript", "Node.js", "Python", "Tailwind CSS", "Next.js", "REST APIs", "Git"]
    },
    {
      title: t("Design Gráfico & Modelagem 3D", "Graphic Design & 3D Modeling"),
      icon: Palette,
      skills: ["Blender", "Figma", "Photoshop", "Illustrator", "Premiere Pro", "After Effects", "UI/UX", "Branding"]
    },
    {
      title: t("Desenvolvimento de Jogos 2D & 3D", "2D & 3D Game Development"),
      icon: Gamepad2,
      skills: ["Unity", "Godot", "C#", "Blender", "Jogos 2D/3D", "Física de Jogos", "Game Design"]
    }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-24 relative overflow-hidden bg-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Cabeçalho da Seção com GSAP */}
        <div className="gsap-about-header text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 text-xs font-mono uppercase tracking-widest">
            <User className="w-3.5 h-3.5" />
            <span>{t("Trajetória & Filosofia", "Background & Philosophy")}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t("Engenharia com foco em ", "Engineering with focus on ")}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
              {t("excelência e entrega", "excellence & delivery")}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Biografia Detalhada (7 Colunas) */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="gsap-about-bio p-8 rounded-3xl bg-indigo-950/25 border border-indigo-500/20 backdrop-blur-xl space-y-6 shadow-2xl hover:border-indigo-400/40 transition-colors"
            >
              <h3 className="font-display text-2xl font-bold text-white flex items-center gap-3">
                <Rocket className="w-6 h-6 text-indigo-400" />
                <span>{t("Quem é Matheus Nogueira?", "Who is Matheus Nogueira?")}</span>
              </h3>

              <p className="text-gray-300 leading-relaxed font-light">
                {t(personalInfo.aboutMeDetailed.pt, personalInfo.aboutMeDetailed.en)}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/15"
                >
                  <div className="flex items-center gap-3 text-indigo-400 font-bold text-sm mb-1">
                    <GraduationCap className="w-5 h-5" />
                    <span>{t("Formação Sólida", "Solid Education")}</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {t("Foco contínuo em Arquitetura de Software e Inovação.", "Continuous focus on Software Architecture & Innovation.")}
                  </p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/15"
                >
                  <div className="flex items-center gap-3 text-pink-400 font-bold text-sm mb-1">
                    <Award className="w-5 h-5" />
                    <span>{t("Compromisso", "Commitment")}</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {t("Entregas de alto valor com foco na satisfação real do cliente.", "High-value deliverables focused on real client satisfaction.")}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Habilidades Técnicas Categorizadas (5 Colunas) */}
          <div className="gsap-about-card-container lg:col-span-5 space-y-6">
            {skillCategories.map((cat, index) => {
              const IconComponent = cat.icon;
              return (
                <motion.div 
                  key={index} 
                  whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(99,102,241,0.15)' }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="gsap-about-card p-6 rounded-3xl bg-indigo-950/25 border border-indigo-500/20 backdrop-blur-xl hover:border-indigo-400/40 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="font-display font-bold text-white text-base">{cat.title}</h4>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => (
                      <motion.span
                        key={sIdx}
                        whileHover={{ scale: 1.08, borderColor: 'rgba(99,102,241,0.6)' }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/40 border border-indigo-500/20 text-xs text-indigo-200 font-mono cursor-pointer select-none transition-colors"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
