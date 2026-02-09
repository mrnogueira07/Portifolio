export type ProjectCategory = 'Web' | 'Game' | 'Robotics' | 'Design' | 'VideoEdited' | 'VideoRecorded';
export type DesignSubcategory = 'Banner' | 'Flyer' | 'Panfleto' | 'Post' | null;

export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  subcategory?: DesignSubcategory; // Apenas para Design
  image: string;
  description: string;
  tags: string[];
  link?: string;
  videoUrl?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}

export interface ServiceItem {
  icon: any; // Usando ícones Lucide
  title: string;
  description: string;
}