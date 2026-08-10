/**
 * @file LanguageContext.tsx
 * @description Contexto e Hook customizado de Internacionalização (i18n).
 * 
 * Permite alternar dinamicamente entre Português (Brasil) e Inglês (EUA)
 * em toda a aplicação, salvando a preferência do usuário no localStorage.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types/portfolio';

// Interface das propriedades expostas pelo contexto de idioma
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (ptText: string, enText: string) => string;
}

// Criação do contexto com valores padrão
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Props do provedor de idioma
interface LanguageProviderProps {
  children: ReactNode;
}

/**
 * Componente Provider que envolve a aplicação e disponibiliza o estado do idioma.
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Inicializa o idioma a partir do localStorage ou padrão 'pt'
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('portfolio_lang') as Language;
      if (savedLang === 'pt' || savedLang === 'en') {
        return savedLang;
      }
    }
    return 'pt';
  });

  // Atualiza o atributo lang do HTML e persiste no localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_lang', language);
      document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en-US';
    }
  }, [language]);

  // Função para definir o idioma diretamente
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Função alternadora simples (PT <-> EN)
  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'pt' ? 'en' : 'pt'));
  };

  // Função utilitária para selecionar a tradução de acordo com o idioma ativo
  const t = (ptText: string, enText: string): string => {
    return language === 'pt' ? ptText : enText;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Hook customizado useLanguage para consumir as funcionalidades de idioma
 * em qualquer componente React de forma limpa e segura.
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage deve ser utilizado dentro de um LanguageProvider');
  }
  return context;
};
