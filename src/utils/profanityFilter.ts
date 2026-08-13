/**
 * @file profanityFilter.ts
 * @description Utilitário avançado de detecção e moderação de conteúdo, palavras de baixo calão, 
 * insultos, xingamentos, abusos, assédio e termos ofensivos em Português e Inglês.
 */

// Base de dados abrangente de palavras e radicais ofensivos / abusivos
const OFFENSIVE_TERMS: string[] = [
  // --- PORTUGUÊS: Xingamentos, Baixo Calão e Ofensas ---
  'arrombado', 'arrombada', 'arrombados', 'arrombadas',
  'babaca', 'babacas', 'babaquice',
  'bicha', 'bichona', 'boiola',
  'bosta', 'bostas', 'bosteiro',
  'buceta', 'bucetao', 'bucetão', 'bucetinha', 'bucetas',
  'burro', 'burra', 'burrice',
  'cabrao', 'cabrão',
  'cacete', 'cacetada',
  'cadela', 'cachorra',
  'canalha', 'canalhas',
  'caralho', 'caralhada', 'caralhudo', 'krl', 'kralho', 'kcte',
  'chavala', 'chupa', 'chupador', 'chupada',
  'chupeta', 'chupeteiro',
  'clitoris', 'cona',
  'corno', 'corna', 'cornudo', 'cornos',
  'cu', 'cú', 'cuzão', 'cuzao', 'cusão', 'cusao', 'cuzinho', 'cuzaozinho',
  'cretino', 'cretina',
  'desgraca', 'desgraça', 'desgraçado', 'desgracado', 'desgraçada', 'desgracada',
  'drogado', 'drogada',
  'escroto', 'escrota', 'escrotice', 'escrotos',
  'estupido', 'estúpido', 'estupida', 'estúpida',
  'estupro', 'estuprador', 'estuprar',
  'fardo', 'favelado', 'favelada',
  'fdp', 'fdap', 'filho da puta', 'filha da puta', 'filhos da puta', 'filhas da puta',
  'foda', 'fodar', 'fodase', 'foda-se', 'foder', 'fodendo', 'fodido', 'fodida', 'fodedor', 'fudendo', 'fudido', 'fudida', 'fuder',
  'fofoca', 'fuleiro',
  'gozo', 'gozar', 'gozada',
  'grelin', 'grelo',
  'idiota', 'idiotas', 'idiotice',
  'imbecil', 'imbecis', 'imbecilidade',
  'inferno', 'incompetente',
  'ladrao', 'ladrão', 'ladra',
  'lixo', 'lixeira', 'lesbica', 'lésbica',
  'mamar', 'mamador', 'mamada',
  'masturbar', 'masturbacao', 'masturbação',
  'merda', 'merdas', 'merdinha', 'merdoso',
  'miseravel', 'miserável',
  'moleque', 'molambo',
  'morra', 'matar', 'morte',
  'nazista', 'nazismo', 'negrinho', 'negrinha',
  'nojento', 'nojenta',
  'otario', 'otaria', 'otário', 'otária', 'otarios', 'otárias',
  'paspalho', 'palhaco', 'palhaço',
  'patife',
  'pau', 'pauzao', 'pauzão',
  'pedofilo', 'pedófilo', 'pedofilia',
  'peitinho', 'peitoes', 'peitões',
  'penis', 'pênis',
  'pica', 'picao', 'picão', 'piquinha',
  'pinto', 'pintao', 'pintão',
  'piranha', 'piranhas',
  'piroca', 'pirocudo',
  'porra', 'porrada', 'porralho', 'p0rra', 'prr',
  'prostituta', 'prostituto',
  'pqp', 'puta que pariu', 'puta que o pariu',
  'punheta', 'punheteiro',
  'puta', 'puto', 'putaria', 'putedo', 'putona', 'putinha',
  'quenga', 'kenga',
  'rabao', 'rabão', 'rabiola',
  'ranheta',
  'rapariga',
  'retardado', 'retardada',
  'safado', 'safada', 'safadeza',
  'sacanagem', 'sacana',
  'se foder', 'sifoder', 'se fode', 'se foda',
  'suicidio', 'suicídio',
  'tarado', 'tarada',
  'teta', 'tetas',
  'tmnc', 'tnc', 'tomar no cu', 'toma no cu', 'tome no cu', 'vai tomar no cu', 'vai se foder', 'vai pro inferno',
  'transar', 'transa',
  'traveco', 'travesti',
  'trouxa', 'trouxas',
  'vaca',
  'vadia', 'vadias', 'vadiagem',
  'vagabundo', 'vagabunda', 'vagabundagem',
  'veado', 'viado', 'viadagem', 'viadinho',
  'vsf', 'vtnc', 'vtmnc',
  'xereca', 'xexeca', 'xoxota', 'xana', 'xerecao', 'xerecão',

  // --- INGLÊS: Profanities, Abuse, Slurs & Insults ---
  'ass', 'asshole', 'assholes', 'arse', 'arsehole',
  'bastard', 'bastards',
  'bitch', 'bitches', 'bitching',
  'blowjob', 'bollocks', 'boner',
  'bullshit', 'bull crap',
  'cock', 'cocks', 'cocksucker',
  'crap', 'cunt', 'cunts',
  'damn', 'dick', 'dickhead', 'dildo',
  'douche', 'douchebag',
  'dumbass', 'fag', 'faggot',
  'fuck', 'fucking', 'fucked', 'fucker', 'fuckers', 'fuckoff', 'fudgepacker',
  'goddamn', 'handjob',
  'jackass', 'jerk', 'jerkoff',
  'motherfucker', 'motherfucking',
  'nigger', 'nigga', 'nazi',
  'penis', 'piss', 'pissed', 'piss off',
  'prick', 'pussy', 'pussies',
  'retard', 'retarded',
  'scumbag', 'shit', 'shitty', 'shitting', 'slut', 'sluts',
  'son of a bitch', 'twat', 'wanker', 'whore', 'whores'
];

/**
 * Normaliza o texto de forma agressiva:
 * - Converte para minúsculas
 * - Remove diacríticos e acentos
 * - Traduz leetspeak e caracteres alfanuméricos falsos
 * - Remove repetições excessivas de caracteres
 */
function advancedNormalize(text: string): {
  normalizedWithSpaces: string;
  condensedWithoutPunctuation: string;
  charReducedText: string;
} {
  if (!text) {
    return { normalizedWithSpaces: '', condensedWithoutPunctuation: '', charReducedText: '' };
  }

  // 1. Remove acentos
  let s = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // 2. Substituição profunda de leetspeak
  s = s
    .replace(/[@4]/g, 'a')
    .replace(/[3]/g, 'e')
    .replace(/[1!|]/g, 'i')
    .replace(/[0]/g, 'o')
    .replace(/[$5]/g, 's')
    .replace(/[7+]/g, 't')
    .replace(/[8]/g, 'b')
    .replace(/[9]/g, 'g')
    .replace(/[\(\[\{]/g, 'c')
    .replace(/[\*]/g, '');

  // 3. Versão com pontuação substituída por espaço
  const normalizedWithSpaces = s.replace(/[^a-z0-9\s]/g, ' ');

  // 4. Versão condensada sem nenhum caractere especial ou espaço (útil para detectar p.o.r.r.a, c_u, f-d-p)
  const condensedWithoutPunctuation = s.replace(/[^a-z0-9]/g, '');

  // 5. Versão com letras repetidas reduzidas (ex: "pooooorrrraaaa" -> "porra", "cuuuu" -> "cu")
  const charReducedText = condensedWithoutPunctuation.replace(/(.)\1{2,}/g, '$1$1');

  return {
    normalizedWithSpaces,
    condensedWithoutPunctuation,
    charReducedText
  };
}

/**
 * Verifica se o texto fornecido contém palavras de baixo calão, xingamentos, abusos ou termos desrespeitosos.
 * Retorna status booleano, lista de termos identificados e motivo sanitizado.
 */
export function checkProfanity(text: string): {
  containsProfanity: boolean;
  wordsFound: string[];
  message: string | null;
} {
  if (!text || typeof text !== 'string' || !text.trim()) {
    return { containsProfanity: false, wordsFound: [], message: null };
  }

  const { normalizedWithSpaces, condensedWithoutPunctuation, charReducedText } = advancedNormalize(text);
  const wordsInText = normalizedWithSpaces.split(/\s+/).filter(Boolean);
  const foundWords: string[] = [];

  for (const term of OFFENSIVE_TERMS) {
    const normTerm = advancedNormalize(term).condensedWithoutPunctuation;
    if (!normTerm) continue;

    // A) Se for termo composto com espaço (ex: "filho da puta", "tomar no cu", "vai se foder")
    if (term.includes(' ')) {
      const cleanTerm = advancedNormalize(term).normalizedWithSpaces.trim();
      if (
        normalizedWithSpaces.includes(cleanTerm) ||
        condensedWithoutPunctuation.includes(normTerm) ||
        charReducedText.includes(normTerm)
      ) {
        foundWords.push(term);
      }
      continue;
    }

    // B) Se for sigla ou termo muito curto (<= 3 caracteres, ex: "cu", "fdp", "tnc", "vsf", "pqp", "krl")
    if (normTerm.length <= 3) {
      // 1. Checa se é uma palavra exata no texto
      if (wordsInText.includes(normTerm)) {
        foundWords.push(term);
        continue;
      }
      // 2. Checa se aparece como sigla isolada ou delimitada (ex: "f.d.p", "c.u")
      const shortWordBoundaryRegex = new RegExp(`(^|\\s|_|-|\\.)${normTerm}($|\\s|_|-|\\.)`, 'i');
      if (shortWordBoundaryRegex.test(text.toLowerCase())) {
        foundWords.push(term);
        continue;
      }
      // 3. Checa no texto condensado para casos estritos
      if (['fdp', 'tnc', 'vsf', 'pqp', 'krl', 'vtnc', 'vtmnc', 'tmnc'].includes(normTerm)) {
        if (condensedWithoutPunctuation.includes(normTerm)) {
          foundWords.push(term);
        }
      }
      continue;
    }

    // C) Termos de 4 ou mais caracteres: checagem com limites de palavra e no texto condensado
    const wordBoundaryRegex = new RegExp(`\\b${normTerm}\\w*\\b`, 'i');
    if (
      wordBoundaryRegex.test(normalizedWithSpaces) ||
      condensedWithoutPunctuation.includes(normTerm) ||
      charReducedText.includes(normTerm)
    ) {
      foundWords.push(term);
    }
  }

  const uniqueFound = Array.from(new Set(foundWords));

  return {
    containsProfanity: uniqueFound.length > 0,
    wordsFound: uniqueFound,
    message: uniqueFound.length > 0 
      ? 'O texto contém palavras de baixo calão, termos abusivos ou linguagem imprópria.' 
      : null
  };
}

/**
 * Censura palavras ofensivas substituindo-as por asteriscos caso necessário.
 */
export function sanitizeText(text: string): string {
  if (!text) return '';
  let sanitized = text;

  for (const term of OFFENSIVE_TERMS) {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    sanitized = sanitized.replace(regex, (match) => '*'.repeat(match.length));
  }

  return sanitized;
}
