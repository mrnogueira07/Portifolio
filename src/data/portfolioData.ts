/**
 * @file portfolioData.ts
 * @description Centralização de Dados e Conteúdos do Portfólio de Matheus Nogueira.
 * 
 * Contém informações do perfil, estatísticas de impacto, serviços prestados,
 * mostruário de projetos e depoimentos de clientes com suporte total a PT-BR e EN-US.
 */

import { Project, Testimonial, ServiceItem, StatItem } from '../types/portfolio';

// Informações Pessoais e de Contato do Matheus Nogueira
export const personalInfo = {
  name: "Matheus Nogueira",
  role: {
    pt: "Desenvolvedor Full Stack & Game Dev",
    en: "Full Stack Developer & Game Dev"
  },
  tagline: {
    pt: "Desenvolvimento Full Stack, Criatividade & Inovação",
    en: "Full Stack Development, Creativity & Innovation"
  },
  headline: {
    pt: "Criando produtos digitais de alta performance e experiências memoráveis",
    en: "Building high-performance digital products and memorable experiences"
  },
  aboutMeShort: {
    pt: "Unindo precisão técnica em desenvolvimento de software com arquitetura moderna, automação e jogos interativos para transformar conceitos visionários em produtos de alto desempenho.",
    en: "Combining technical precision in software development with modern architecture, automation, and interactive games to transform visionary concepts into high-performance products."
  },
  aboutMeDetailed: {
    pt: "Com sólida bagagem em ecossistemas de tecnologia modernos (React, TypeScript, Node.js, Python e C#), atuo na construção de plataformas web robustas, jogos interativos, sistemas embarcados e soluções digitais que geram impacto real e resultados mensuráveis.",
    en: "With a solid background in modern tech ecosystems (React, TypeScript, Node.js, Python, and C#), I build robust web platforms, interactive games, embedded systems, and digital solutions that generate real impact and measurable results."
  },
  status: {
    pt: "Disponível para novos projetos e consultorias",
    en: "Available for new projects & consulting"
  },
  location: "São Paulo / Brasil",
  email: "matheusnogueira.dev@gmail.com",
  phone: "+55 (92) 98183-8704",
  whatsappUrl: "https://wa.me/5592981838704?text=Olá%20Matheus,%20vi%20seu%20portfólio%20e%20gostaria%20de%20conversar!",
  avatarUrl: "/projects/foto-matheus-nogueira.jpg",
  socials: {
    github: "https://github.com/mrnogueira07",
    linkedin: "https://linkedin.com",
    instagram: "https://www.instagram.com/mrnogueira07/",
    tiktok: "https://www.tiktok.com/@mrnogueira__"
  }
};

// Estatísticas Chave (Hero Section inspirada no Zelio)
export const statItems: StatItem[] = [
  {
    id: "exp",
    value: "4+",
    label: {
      pt: "Anos de Experiência",
      en: "Years Experience"
    }
  },
  {
    id: "projects",
    value: "35+",
    label: {
      pt: "Projetos Concluídos",
      en: "Projects Completed"
    }
  },
  {
    id: "clients",
    value: "20+",
    label: {
      pt: "Clientes Satisfeitos",
      en: "Happy Clients"
    }
  },
  {
    id: "tech",
    value: "15+",
    label: {
      pt: "Tecnologias Dominadas",
      en: "Technologies Mastered"
    }
  }
];

// Serviços & Especializações
export const serviceItems: ServiceItem[] = [
  {
    id: "web-dev",
    iconName: "Code",
    title: {
      pt: "Desenvolvimento Web Full Stack",
      en: "Full Stack Web Development"
    },
    description: {
      pt: "Aplicações web modernas, velozes e escaláveis utilizando React, Next.js, TypeScript, Tailwind CSS e integração nativa com Firebase e APIs REST.",
      en: "Modern, ultra-fast, and scalable web applications built with React, Next.js, TypeScript, Tailwind CSS, and seamless Firebase & REST API integration."
    },
    skills: ["React", "TypeScript", "Node.js", "Firebase", "Tailwind CSS"]
  },
  {
    id: "ui-design",
    iconName: "Layout",
    title: {
      pt: "UI/UX & Design Gráfico",
      en: "UI/UX & Graphic Design"
    },
    description: {
      pt: "Criação de interfaces intuitivas, protótipos de alta fidelidade no Figma e materiais publicitários de alto impacto visual (flyers, banners e posts).",
      en: "Crafting intuitive user interfaces, high-fidelity Figma prototypes, and high-impact visual marketing assets (flyers, banners, and social posts)."
    },
    skills: ["Figma", "Photoshop", "Illustrator", "Branding", "UI/UX Design"]
  },
  {
    id: "robotics",
    iconName: "Cpu",
    title: {
      pt: "Robótica & Sistemas Embarcados",
      en: "Robotics & Embedded Systems"
    },
    description: {
      pt: "Desenvolvimento de protótipos mecatrônicos, integração com sensores, programação microcontrolada (Arduino/ESP32) e lógica de automação.",
      en: "Development of mechatronic prototypes, sensor integration, microcontroller programming (Arduino/ESP32), and custom automation logic."
    },
    skills: ["Arduino", "ESP32", "C++", "C#", "Sistemas Embarcados"]
  },
  {
    id: "video-motion",
    iconName: "Video",
    title: {
      pt: "Edição de Vídeo & Motion",
      en: "Video Editing & Motion Design"
    },
    description: {
      pt: "Produção e pós-produção audiovisual, montagem dinâmica, correção de cor, sound design e efeitos visuais orientados para alta engajamento nas redes.",
      en: "Audiovisual production and post-production, dynamic editing, color grading, sound design, and visual effects built for social media engagement."
    },
    skills: ["Premiere Pro", "After Effects", "Davinci Resolve", "Sound Design"]
  }
];

// Mostruário Completo de Projetos Reais de Matheus Nogueira
export const projectsData: Project[] = [
  {
    id: 7,
    title: "Portal Parintins",
    category: "Web",
    image: "/projects/capa-portal-parintins.png",
    description: {
      pt: "Desenvolvimento do Portal Parintins, um portal completo de notícias, dicas e guia de conteúdo cultural.",
      en: "Development of Portal Parintins, a complete news portal, tips, and cultural content guide."
    },
    tags: ["Web Design", "Notícias", "Portal"],
    link: "https://www.portalparintins.com.br/",
    featured: true
  },
  {
    id: 8,
    title: "Clube Michel Silva BJJ",
    category: "Web",
    image: "/projects/banner-jiu-jitsu.png",
    description: {
      pt: "Website desenvolvido para o Clube Michel Silva de Jiu-Jitsu, com informações sobre turmas, horários e estrutura do clube.",
      en: "Website developed for Michel Silva BJJ Club, featuring information about classes, schedules, and club facilities."
    },
    tags: ["Web Design", "Esportes", "Landing Page"],
    link: "https://clube-michel-silva-bjj.vercel.app/",
    featured: true
  },
  {
    id: 9,
    title: "Emanuel Car - Landing Page",
    category: "Web",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    description: {
      pt: "Landing page automotiva moderna desenvolvida para a Emanuel Car, com apresentação de veículos, serviços e canal direto de atendimento.",
      en: "Modern automotive landing page developed for Emanuel Car, showcasing vehicles, services, and direct customer contact."
    },
    tags: ["Web Design", "Automotivo", "Landing Page"],
    link: "https://emanuelcar.vercel.app/",
    featured: true
  }
];

// Depoimentos de Clientes e Parceiros (Sem fotos de pessoas)
export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Carlos Eduardo",
    role: {
      pt: "Diretor de Tecnologia",
      en: "CTO & Co-founder"
    },
    company: "NextGen Software",
    text: {
      pt: "O Matheus entregou a plataforma da nossa empresa no prazo recorde com um nível de refinamento estético e qualidade de código impressionantes. Recomendo de olhos fechados!",
      en: "Matheus delivered our company platform in record time with an impressive level of visual polish and code quality. Highly recommended!"
    }
  },
  {
    id: 2,
    name: "Juliana Mendes",
    role: {
      pt: "Gerente de Marketing",
      en: "Marketing Manager"
    },
    company: "Lumina Digital",
    text: {
      pt: "A combinação do conhecimento técnico com o olhar de design do Matheus elevou o padrão da nossa marca. Nossos projetos de mídia visual tiveram um salto incrível de engajamento.",
      en: "Matheus's combination of technical proficiency and design eye elevated our brand. Our visual marketing projects saw an incredible boost in engagement."
    }
  },
  {
    id: 3,
    name: "Roberto Silva",
    role: {
      pt: "Engenheiro Chefe",
      en: "Lead Automation Engineer"
    },
    company: "RoboSystems Lab",
    text: {
      pt: "Trabalhar com o Matheus no projeto de prototipagem em ESP32 foi excelente. Rápido na solução de problemas de lógica e comunicação embarcada.",
      en: "Working with Matheus on our ESP32 prototyping project was fantastic. Fast problem solver in embedded communication and logic."
    }
  }
];
