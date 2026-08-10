/**
 * @file About.tsx
 * @description Seção 'Sobre Mim' do Portfólio.
 * 
 * Apresenta a trajetória profissional de Matheus Nogueira, seus pilares técnicos
 * e o ecossistema de ferramentas e habilidades dominadas.
 */

import React from 'react';
import { User, Cpu, Code, Palette, Rocket, GraduationCap, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { personalInfo } from '../data/portfolioData';

const About: React.FC = () => {
  const { t } = useLanguage();

  // Categorias de Habilidades Técnicas
  const skillCategories = [
    {
      title: t("Desenvolvimento Software", "Software Development"),
      icon: Code,
      skills: ["React", "TypeScript", "Node.js", "Python", "Tailwind CSS", "Next.js", "REST APIs", "Git"]
    },
    {
      title: t("Design & Audiovisual", "Design & Audiovisual"),
      icon: Palette,
      skills: ["Figma", "Photoshop", "Illustrator", "Premiere Pro", "After Effects", "UI/UX", "Branding"]
    },
    {
      title: t("Robótica & Hardware", "Robotics & Hardware"),
      icon: Cpu,
      skills: ["Arduino", "ESP32", "C++", "C#", "Sistemas Embarcados", "IoT", "Sensores"]
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
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
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl space-y-6">
              <h3 className="font-display text-2xl font-bold text-white flex items-center gap-3">
                <Rocket className="w-6 h-6 text-indigo-400" />
                <span>{t("Quem é Matheus Nogueira?", "Who is Matheus Nogueira?")}</span>
              </h3>

              <p className="text-gray-300 leading-relaxed font-light">
                {t(personalInfo.aboutMeDetailed.pt, personalInfo.aboutMeDetailed.en)}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3 text-indigo-400 font-bold text-sm mb-1">
                    <GraduationCap className="w-5 h-5" />
                    <span>{t("Formação Sólida", "Solid Education")}</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {t("Foco contínuo em Arquitetura de Software e Inovação.", "Continuous focus on Software Architecture & Innovation.")}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3 text-pink-400 font-bold text-sm mb-1">
                    <Award className="w-5 h-5" />
                    <span>{t("Compromisso", "Commitment")}</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {t("Entregas de alto valor com foco na satisfação real do cliente.", "High-value deliverables focused on real client satisfaction.")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Habilidades Técnicas Categorizadas (5 Colunas) */}
          <div className="lg:col-span-5 space-y-6">
            {skillCategories.map((cat, index) => {
              const IconComponent = cat.icon;
              return (
                <div key={index} className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:border-indigo-500/40 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="font-display font-bold text-white text-base">{cat.title}</h4>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 font-mono transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
