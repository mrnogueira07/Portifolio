import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { personalInfo } from '../data/portfolioData';

const About: React.FC = () => {
  const { t } = useLanguage();
  const principles = [
    {
      number: '01',
      title: t('Entender o contexto', 'Understand the context'),
      description: t(
        'Objetivos, público e requisitos orientam as decisões de produto desde o início.',
        'Business goals, audiences, and requirements guide product decisions from the outset.'
      ),
    },
    {
      number: '02',
      title: t('Desenvolver com critério', 'Build with purpose'),
      description: t(
        'Código organizado, interfaces claras e atenção à performance em cada etapa.',
        'Well-structured code, clear interfaces, and careful attention to performance at every stage.'
      ),
    },
    {
      number: '03',
      title: t('Validar e evoluir', 'Validate and improve'),
      description: t(
        'Testes, revisão e comunicação objetiva para conduzir a entrega e a evolução do projeto.',
        'Testing, review, and clear communication support delivery and the continued evolution of the project.'
      ),
    },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="section-shell relative">
      <div className="page-container">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <div>
            <p className="section-kicker">{t('Sobre o desenvolvedor', 'About the developer')}</p>
            <h2 id="about-title" className="section-title mt-5 max-w-xl">
              {t('Visão de produto.', 'Product thinking.')}
              <br />
              <span className="text-slate-400">{t('Precisão na execução.', 'Precision in execution.')}</span>
            </h2>
            <div className="section-copy mt-7 max-w-xl space-y-5">
              <p>
                {t(
                  `Sou ${personalInfo.name}, desenvolvedor com atuação em software, websites e jogos. Minha trajetória reúne programação e criação de interfaces para transformar requisitos em experiências digitais funcionais.`,
                  `I am ${personalInfo.name}, a developer working across software, websites, and games. My background brings together programming and interface design to turn requirements into functional digital experiences.`
                )}
              </p>
              <p>
                {t(
                  'Combino decisões técnicas com atenção à experiência de uso, à manutenção do código e aos objetivos de cada projeto.',
                  'I combine technical decisions with a focus on usability, code maintainability, and the objectives of each project.'
                )}
              </p>
            </div>
            <a href="#projects" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300">
              {t('Conheça os projetos', 'Explore the projects')}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="lg:pt-2">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              {t('Princípios de trabalho', 'Working principles')}
            </p>
            <ol className="divide-y divide-slate-800/80">
              {principles.map((principle) => (
                <li key={principle.number} className="flex gap-5 py-7 sm:gap-7">
                  <span className="pt-1 font-mono text-xs text-blue-400" aria-hidden="true">{principle.number}</span>
                  <div>
                    <h3 className="font-display text-lg font-medium text-slate-100">{principle.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">{principle.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
