/**
 * @file portfolio.ts
 * @description Definições de tipos e interfaces TypeScript para todo o ecossistema do Portfólio.
 * 
 * Centraliza os modelos de dados de Projetos, Depoimentos, Serviços, Estatísticas
 * e suporte ao sistema de Internacionalização (i18n).
 */

// Idiomas suportados pela aplicação
export type Language = 'pt' | 'en';

// Categorias principais de projetos no portfólio
export type ProjectCategory = 'Web' | 'Game' | 'Robotics' | 'Design' | 'VideoEdited' | 'VideoRecorded';

// Subcategorias de Design
export type DesignSubcategory = 'Banner' | 'Flyer' | 'Panfleto' | 'Post' | null;

// Estrutura de um Projeto individual
export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  subcategory?: DesignSubcategory;
  image: string;
  description: {
    pt: string;
    en: string;
  };
  tags: string[];
  link?: string;
  videoUrl?: string;
  featured?: boolean;
}

// Estrutura de um Depoimento ou Avaliação de cliente/parceiro
export interface Testimonial {
  id: number | string;
  name: string;
  role?: {
    pt: string;
    en: string;
  } | string;
  company?: string;
  text: {
    pt: string;
    en: string;
  } | string;
  avatar?: string;
  rating?: number;
  createdAt?: string;
}

// Estrutura de um Serviço ou Especialização prestada
export interface ServiceItem {
  id: string;
  iconName: string;
  title: {
    pt: string;
    en: string;
  };
  description: {
    pt: string;
    en: string;
  };
  skills: string[];
}

// Estatísticas numéricas apresentadas no Hero (Estilo Zelio)
export interface StatItem {
  id: string;
  value: string;
  label: {
    pt: string;
    en: string;
  };
}

// Modelo do formulário de contato enviado via Firebase / Firestore
export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}
