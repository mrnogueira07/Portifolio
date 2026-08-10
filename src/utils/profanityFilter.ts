/**
 * @file profanityFilter.ts
 * @description Utilitário de detecção e filtragem de palavras e termos ofensivos em Português e Inglês.
 */

// Lista de palavras e radicais ofensivos em PT-BR e EN
const OFFENSIVE_WORDS: string[] = [
  // Português - Termos de baixo calão e insultos
  'arrombado', 'arrombada', 'babaca', 'bosta', 'buceta', 'bucetao', 'cabrão',
  'cacete', 'caralho', 'caralhada', 'chupa', 'corno', 'corna', 'cu', 'cú', 'cusão',
  'cuzao', 'cuzão', 'desgraça', 'desgraca', 'escroto', 'escrota', 'fdp', 'fdap',
  'foda', 'fodar', 'fodase', 'foda-se', 'foder', 'filho da puta', 'filha da puta',
  'fofoca', 'imbecil', 'idiota', 'lixo', 'mamar', 'merda', 'otario', 'otaria',
  'otário', 'otária', 'pau', 'pica', 'picão', 'pinto', 'piranha', 'porra',
  'puta', 'puto', 'putaria', 'rapariga', 'sifoder', 'se foder', 'tnc', 'tomar no cu',
  'viado', 'viadagem', 'vsf', 'vagabundo', 'vagabunda',

  // Inglês - English Profanities
  'asshole', 'bastard', 'bitch', 'bullshit', 'cock', 'cunt', 'dick',
  'fuck', 'fucking', 'fucker', 'motherfucker', 'nigger', 'pussy', 'shit',
  'slut', 'whore'
];

/**
 * Normaliza o texto removendo acentos, caracteres especiais extras, 
 * pontuações e substituindo números/símbolos comuns de leetspeak (@ -> a, 0 -> o, 3 -> e, 1 -> i, 5 -> s, $ -> s).
 */
function normalizeText(text: string): string {
  let normalized = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Remove acentos

  // Mapeamento de leetspeak comum
  normalized = normalized
    .replace(/@/g, 'a')
    .replace(/\$/g, 's')
    .replace(/0/g, 'o')
    .replace(/1/g, 'i')
    .replace(/!/g, 'i')
    .replace(/3/g, 'e')
    .replace(/5/g, 's')
    .replace(/7/g, 't');

  return normalized;
}

/**
 * Verifica se o texto fornecido contém palavras ou expressões ofensivas.
 * Retorna um objeto indicando se contém e a lista de palavras detectadas.
 */
export function checkProfanity(text: string): { containsProfanity: boolean; wordsFound: string[] } {
  if (!text || typeof text !== 'string') {
    return { containsProfanity: false, wordsFound: [] };
  }

  const rawNormalized = normalizeText(text);
  
  // Substitui pontuações repetidas por espaço para isolar palavras
  const cleanText = rawNormalized.replace(/[^a-z0-9\s]/g, ' ');
  const wordsInText = cleanText.split(/\s+/).filter(Boolean);

  const foundWords: string[] = [];

  for (const offensive of OFFENSIVE_WORDS) {
    const normalizedOffensive = normalizeText(offensive);

    // Se o termo ofensivo for uma palavra composta (ex: "filho da puta" ou "tomar no cu")
    if (normalizedOffensive.includes(' ')) {
      if (rawNormalized.includes(normalizedOffensive)) {
        foundWords.push(offensive);
      }
      continue;
    }

    // Se for uma sigla curta (ex: tnc, fdp, vsf), verificar correspondência exata de palavra
    if (normalizedOffensive.length <= 3) {
      if (wordsInText.includes(normalizedOffensive)) {
        foundWords.push(offensive);
      }
      continue;
    }

    // Para palavras maiores, verificar se ela existe como palavra completa ou subpalavra relevante
    const wordRegex = new RegExp(`\\b${normalizedOffensive}\\w*\\b`, 'i');
    if (wordRegex.test(cleanText) || rawNormalized.includes(normalizedOffensive)) {
      foundWords.push(offensive);
    }
  }

  return {
    containsProfanity: foundWords.length > 0,
    wordsFound: Array.from(new Set(foundWords))
  };
}
