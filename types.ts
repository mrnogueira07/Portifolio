// Definição das categorias principais de projetos
export type ProjectCategory = 'Web' | 'Game' | 'Robotics' | 'Design' | 'VideoEdited' | 'VideoRecorded';

// Definição das subcategorias específicas para a categoria Design
export type DesignSubcategory = 'Banner' | 'Flyer' | 'Panfleto' | 'Post' | null;

// Interface que define a estrutura de um Projeto
export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  subcategory?: DesignSubcategory; // Opcional, usado apenas para a categoria Design
  image: string;
  description: string;
  tags: string[];
  link?: string;
  videoUrl?: string; // URL opcional para vídeos do YouTube ou similares
}

// Interface que define a estrutura de um Depoimento
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
}

// Interface que define a estrutura de um item de Serviço
export interface ServiceItem {
  icon: any; // Ícones provenientes da biblioteca Lucide React
  title: string;
  description: string;
}