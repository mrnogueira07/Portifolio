import React from 'react';
import { ArrowUpRight, Code2, Gamepad2, Globe2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { personalInfo } from '../data/portfolioData';

const Services: React.FC = () => {
  const { t } = useLanguage();
  const services = [
    {
      id: 'software',
      number: '01',
      icon: Code2,
      title: t('Software sob medida', 'Custom software'),
      description: t(
        'Sistemas e aplicações desenvolvidos para organizar processos, integrar serviços e atender às necessidades da sua operação.',
        'Systems and applications designed to streamline processes, integrate services, and meet the needs of your business.'
      ),
      capabilities: [
        t('Aplicações full stack', 'Full-stack applications'),
        t('APIs e integrações', 'APIs and integrations'),
        t('Automação de processos', 'Process automation'),
      ],
    },
    {
      id: 'websites',
      number: '02',
      icon: Globe2,
      title: t('Websites e plataformas', 'Websites and platforms'),
      description: t(
        'Presença digital consistente, com interfaces responsivas, navegação intuitiva e desenvolvimento alinhado à identidade da sua empresa.',
        'A cohesive digital presence with responsive interfaces, intuitive navigation, and development aligned with your company’s identity.'
      ),
      capabilities: [
        t('Websites institucionais', 'Corporate websites'),
        t('Landing pages e portais', 'Landing pages and portals'),
        t('Experiência e performance', 'User experience and performance'),
      ],
    },
    {
      id: 'games',
      number: '03',
      icon: Gamepad2,
      title: t('Jogos e experiências interativas', 'Games and interactive experiences'),
      description: t(
        'Desenvolvimento de jogos 2D e 3D, da prototipação de mecânicas à implementação de experiências interativas.',
        '2D and 3D game development, from gameplay prototyping to the implementation of interactive experiences.'
      ),
      capabilities: [
        t('Programação de gameplay', 'Gameplay programming'),
        t('Prototipação de jogos', 'Game prototyping'),
        t('Interatividade e gamificação', 'Interaction and gamification'),
      ],
    },
  ];

  return (
    <section id="services" aria-labelledby="services-title" className="section-shell relative border-y border-white/[0.05]">
      <div className="page-container">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-24">
          <div>
            <p className="section-kicker">{t('Áreas de atuação', 'Areas of expertise')}</p>
            <h2 id="services-title" className="section-title mt-5">
              {t('Tecnologia a serviço', 'Technology built around')}
              <br />
              {t('do seu projeto.', 'your project.')}
            </h2>
          </div>
          <p className="section-copy max-w-lg lg:pb-1">
            {t(
              'Três frentes de desenvolvimento, com o mesmo compromisso: clareza no processo e qualidade em cada entrega.',
              'Three areas of development with a shared commitment: a clear process and quality in every delivery.'
            )}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            const message = t(
              `Olá, Matheus. Gostaria de conversar sobre um projeto de ${service.title.toLowerCase()}.`,
              `Hello, Matheus. I would like to discuss a project involving ${service.title.toLowerCase()}.`
            );
            const quoteUrl = `${personalInfo.whatsappUrl.split('?')[0]}?text=${encodeURIComponent(message)}`;

            return (
              <article key={service.id} className="surface-card flex h-full flex-col p-7 transition-colors duration-300 hover:border-blue-500/40 sm:p-8">
                <div className="mb-9 flex items-center justify-between">
                  <Icon className="h-6 w-6 text-blue-400" strokeWidth={1.5} aria-hidden="true" />
                  <span className="font-mono text-xs tracking-wider text-slate-500" aria-hidden="true">/{service.number}</span>
                </div>
                <h3 className="font-display text-xl font-medium leading-snug tracking-tight text-white lg:min-h-[3.5rem]">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{service.description}</p>
                <ul className="mb-8 mt-7 space-y-3">
                  {service.capabilities.map((capability) => (
                    <li key={capability} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-blue-400/80" aria-hidden="true" />
                      {capability}
                    </li>
                  ))}
                </ul>
                <a
                  href={quoteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(`Conversar sobre ${service.title.toLowerCase()} pelo WhatsApp`, `Discuss ${service.title.toLowerCase()} on WhatsApp`)}
                  className="mt-auto flex items-center justify-between gap-3 border-t border-slate-800/80 pt-6 text-sm font-medium text-slate-200 transition-colors hover:text-blue-400"
                >
                  {t('Conversar sobre o projeto', 'Discuss your project')}
                  <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
