/**
 * @file Skills.tsx
 * @description Seção 'Minhas Habilidades' inspirada no Zelio.
 * 
 * Apresenta cards visuais de softwares e tecnologias com percentual de domínio,
 * incluindo Photoshop, Illustrator, Lightroom, Premiere Pro, After Effects, Construct 3, Unreal Engine e Firebase.
 */

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { FigmaIcon } from './icons/BrandIcons';

gsap.registerPlugin(ScrollTrigger);

interface SkillCardItem {
  id: string;
  name: string;
  percentage: string;
  badgeBg: string;
  badgeBorder: string;
  textColor: string;
  label: string;
  icon?: React.ReactNode;
}

const Skills: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gsap-skills-header', {
        scrollTrigger: {
          trigger: '.gsap-skills-header',
          start: 'top 85%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Lista de Habilidades exatamente solicitadas pelo usuário (Estilo Zelio)
  const skillsList: SkillCardItem[] = [
    {
      id: 'photoshop',
      name: 'Photoshop',
      label: 'PHOTOSHOP',
      percentage: '95%',
      badgeBg: 'bg-[#001e36]',
      badgeBorder: 'border-[#00a8ff]',
      textColor: 'text-[#00a8ff]',
    },
    {
      id: 'illustrator',
      name: 'Illustrator',
      label: 'ILUSTRADOR',
      percentage: '90%',
      badgeBg: 'bg-[#330000]',
      badgeBorder: 'border-[#ff9a00]',
      textColor: 'text-[#ff9a00]',
    },
    {
      id: 'lightroom',
      name: 'Lightroom',
      label: 'LIGHTROOM',
      percentage: '88%',
      badgeBg: 'bg-[#002830]',
      badgeBorder: 'border-[#31a8ff]',
      textColor: 'text-[#31a8ff]',
    },
    {
      id: 'premiere',
      name: 'Premiere Pro',
      label: 'PREMIERE PRO',
      percentage: '92%',
      badgeBg: 'bg-[#00005b]',
      badgeBorder: 'border-[#9999ff]',
      textColor: 'text-[#9999ff]',
    },
    {
      id: 'aftereffects',
      name: 'After Effects',
      label: 'AFTER EFFECTS',
      percentage: '90%',
      badgeBg: 'bg-[#00005b]',
      badgeBorder: 'border-[#d67fff]',
      textColor: 'text-[#d67fff]',
    },
    {
      id: 'figma',
      name: 'Figma',
      label: 'FIGMA',
      percentage: '96%',
      badgeBg: 'bg-[#1e1e1e]',
      badgeBorder: 'border-[#1abcfe]',
      textColor: 'text-[#1abcfe]',
      icon: <FigmaIcon className="w-8 h-8" />
    },
    {
      id: 'construct3',
      name: 'Construct 3',
      label: 'CONSTRUCT 3',
      percentage: '85%',
      badgeBg: 'bg-[#2b1020]',
      badgeBorder: 'border-[#e83e8c]',
      textColor: 'text-[#e83e8c]',
    },
    {
      id: 'unreal',
      name: 'Unreal Engine',
      label: 'UNREAL',
      percentage: '88%',
      badgeBg: 'bg-[#111111]',
      badgeBorder: 'border-[#ffffff]',
      textColor: 'text-[#ffffff]',
    },
    {
      id: 'firebase',
      name: 'Firebase',
      label: 'FIREBASE',
      percentage: '92%',
      badgeBg: 'bg-[#1c1800]',
      badgeBorder: 'border-[#ffca28]',
      textColor: 'text-[#ffca28]',
    }
  ];

  // Lista de Tecnologias / Programação Adicionais (Marquee para a direita)
  const techSkillsList = [
    { name: 'React', color: 'border-[#61dafb]/40 text-[#61dafb] bg-[#61dafb]/10' },
    { name: 'TypeScript', color: 'border-[#3178c6]/40 text-[#3178c6] bg-[#3178c6]/10' },
    { name: 'Node.js', color: 'border-[#339933]/40 text-[#339933] bg-[#339933]/10' },
    { name: 'C#', color: 'border-[#239120]/40 text-[#239120] bg-[#239120]/10' },
    { name: 'C++', color: 'border-[#00599c]/40 text-[#00599c] bg-[#00599c]/10' },
    { name: 'Python', color: 'border-[#3776ab]/40 text-[#3776ab] bg-[#3776ab]/10' },
    { name: 'Tailwind CSS', color: 'border-[#06b6d4]/40 text-[#06b6d4] bg-[#06b6d4]/10' },
    { name: 'Arduino', color: 'border-[#00979d]/40 text-[#00979d] bg-[#00979d]/10' },
  ];

  // Renderiza o badge de cada aplicativo estilo Adobe / Zelio
  const renderAppBadge = (skill: SkillCardItem) => {
    if (skill.icon) return skill.icon;

    switch (skill.id) {
      case 'photoshop':
        return <span className="font-display font-black text-2xl tracking-tighter text-[#00a8ff]">Ps</span>;
      case 'illustrator':
        return <span className="font-display font-black text-2xl tracking-tighter text-[#ff9a00]">Ai</span>;
      case 'lightroom':
        return <span className="font-display font-black text-2xl tracking-tighter text-[#31a8ff]">Lr</span>;
      case 'premiere':
        return <span className="font-display font-black text-2xl tracking-tighter text-[#9999ff]">Pr</span>;
      case 'aftereffects':
        return <span className="font-display font-black text-2xl tracking-tighter text-[#d67fff]">Ae</span>;
      case 'construct3':
        return <span className="font-display font-black text-xl tracking-tighter text-[#e83e8c]">C3</span>;
      case 'unreal':
        return <span className="font-display font-black text-xl tracking-tighter text-white">UE</span>;
      case 'firebase':
        return (
          <svg className="w-8 h-8 text-[#ffca28]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.877 15.713l1.83-11.455c.075-.467.625-.668.972-.357l3.228 2.894 2.842-5.32c.214-.401.785-.401.999 0l2.842 5.32 3.228-2.894c.347-.311.897-.11.972.357l1.83 11.455c.063.393-.11.783-.443.999l-9.5 6.25c-.328.216-.75.216-1.078 0l-9.5-6.25c-.333-.216-.506-.606-.443-.999z"/>
          </svg>
        );
      default:
        return <span className="font-bold text-lg text-white">{skill.name.substring(0, 2)}</span>;
    }
  };

  return (
    <section ref={sectionRef} id="skills" className="py-24 relative overflow-hidden bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho no Estilo Zelio com GSAP */}
        <div className="gsap-skills-header text-center space-y-4 max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
            {t("Minhas ", "My ")}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-slate-200">
              {t("Habilidades", "Skills")}
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
            {t(
              "Eu me destaco transformando problemas complexos em soluções simples, elegantes e bonitas que aumentam a satisfação do usuário.",
              "I excel at transforming complex problems into simple, elegant, and beautiful solutions that elevate user experience."
            )}
          </p>
        </div>

        {/* Marquee de Cards de Habilidades Estilo Zelio com Motion */}
        <div className="relative overflow-hidden w-full mb-12 py-4 -my-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-4">
            {[...skillsList, ...skillsList, ...skillsList].map((skill, index) => (
              <motion.div
                key={`${skill.id}-${index}`}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className="group relative p-5 rounded-2xl w-[140px] md:w-[160px] flex-shrink-0 bg-[#090e1c] border border-slate-800 hover:border-blue-500/50 hover:bg-[#0c1428] transition-colors duration-300 flex flex-col items-center justify-between min-h-[170px] shadow-sm cursor-pointer"
              >
                {/* Badge de Ícone no Topo */}
                <div className={`w-14 h-14 rounded-2xl ${skill.badgeBg} border ${skill.badgeBorder} flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300`}>
                  {renderAppBadge(skill)}
                </div>

                {/* Percentual de Domínio */}
                <p className="font-display font-black text-2xl text-white my-2 group-hover:text-blue-400 transition-colors">
                  {skill.percentage}
                </p>

                {/* Rótulo da Ferramenta */}
                <p className="text-[10px] font-mono font-bold text-slate-400 tracking-wider text-center uppercase">
                  {skill.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Marquee de Tecnologias de Programação (Correndo para a Direita) */}
        <div className="pt-8 border-t border-slate-800/80 space-y-4">
          <p className="text-xs sm:text-sm text-slate-400 font-mono text-center">
            {t("Além disso, tenho sólido conhecimento de programação e engenharia:", "Additionally, I have strong programming & engineering skills:")}
          </p>

          <div className="relative overflow-hidden w-full py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused] gap-3">
              {[...techSkillsList, ...techSkillsList, ...techSkillsList, ...techSkillsList].map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-xl border border-slate-800 bg-[#090e1c] text-xs font-mono font-medium text-slate-300 uppercase tracking-wider transition-all duration-200 hover:border-blue-500/40 hover:text-white"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
