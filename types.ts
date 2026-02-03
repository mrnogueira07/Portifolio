export type ProjectCategory = 'Web' | 'Game' | 'Robotics' | 'Design' | 'VideoEdited' | 'VideoRecorded';
export type DesignSubcategory = 'Banner' | 'Flyer' | 'Panfleto' | 'Post' | null;

export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  subcategory?: DesignSubcategory; // Only for Design
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
  icon: any; // Using Lucide icons
  title: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}