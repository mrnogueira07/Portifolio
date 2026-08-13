/**
 * @file BrandIcons.tsx
 * @description Ícones Oficiais de Marcas (WhatsApp, GitHub, LinkedIn, Instagram, YouTube, Figma, Unity, Arduino, etc.).
 * 
 * Contém vetores SVG fiéis às marcas com suas cores originais e estilos adaptáveis.
 */

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

// Ícone Oficial do WhatsApp com as cores e proporções exatas da marca
export const WhatsAppIcon: React.FC<IconProps> = ({ className = "w-6 h-6", color }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={color ? { color } : undefined}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.426h-.008a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Ícone Oficial do GitHub
export const GitHubIcon: React.FC<IconProps> = ({ className = "w-6 h-6", color }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={{ color: color || 'currentColor' }}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

// Ícone Oficial do LinkedIn com azul característico
export const LinkedInIcon: React.FC<IconProps> = ({ className = "w-6 h-6", color }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={{ color: color || 'currentColor' }}
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

// Ícone Oficial do Instagram com gradiente de cor
export const InstagramIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// Ícone Oficial do YouTube com o vermelho característico
export const YouTubeIcon: React.FC<IconProps> = ({ className = "w-6 h-6", color }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={{ color: color || '#FF0000' }}
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

// Ícone Oficial do TikTok com efeito cromático autêntico (Cyan, Magenta & White)
export const TikTokIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Camada Ciano Neon (#25F4EE) */}
    <path
      d="M19.321 6.562a5.122 5.122 0 0 1-3.585-3.528h-2.91v12.274a3.18 3.18 0 0 1-3.176 3.175 3.18 3.18 0 0 1-3.177-3.175 3.18 3.18 0 0 1 3.177-3.176c.307 0 .604.045.884.128V9.123a6.29 6.29 0 0 0-.884-.063 6.31 6.31 0 0 0-6.31 6.31 6.31 6.31 0 0 0 6.31 6.31 6.31 6.31 0 0 0 6.31-6.31V7.954a8.214 8.214 0 0 0 4.195 1.517V6.634a5.13 5.13 0 0 1-.834-.072z"
      fill="#25F4EE"
      transform="translate(-0.5, -0.5)"
    />
    {/* Camada Rosa/Vermelho Neon (#FE2C55) */}
    <path
      d="M19.321 6.562a5.122 5.122 0 0 1-3.585-3.528h-2.91v12.274a3.18 3.18 0 0 1-3.176 3.175 3.18 3.18 0 0 1-3.177-3.175 3.18 3.18 0 0 1 3.177-3.176c.307 0 .604.045.884.128V9.123a6.29 6.29 0 0 0-.884-.063 6.31 6.31 0 0 0-6.31 6.31 6.31 6.31 0 0 0 6.31 6.31 6.31 6.31 0 0 0 6.31-6.31V7.954a8.214 8.214 0 0 0 4.195 1.517V6.634a5.13 5.13 0 0 1-.834-.072z"
      fill="#FE2C55"
      transform="translate(0.5, 0.5)"
    />
    {/* Camada Branca Central Oficial */}
    <path
      d="M19.321 6.562a5.122 5.122 0 0 1-3.585-3.528h-2.91v12.274a3.18 3.18 0 0 1-3.176 3.175 3.18 3.18 0 0 1-3.177-3.175 3.18 3.18 0 0 1 3.177-3.176c.307 0 .604.045.884.128V9.123a6.29 6.29 0 0 0-.884-.063 6.31 6.31 0 0 0-6.31 6.31 6.31 6.31 0 0 0 6.31 6.31 6.31 6.31 0 0 0 6.31-6.31V7.954a8.214 8.214 0 0 0 4.195 1.517V6.634a5.13 5.13 0 0 1-.834-.072z"
      fill="#FFFFFF"
    />
  </svg>
);

// Ícone do Figma
export const FigmaIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 38 57" fill="none" className={className}>
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
  </svg>
);
