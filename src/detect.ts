import { Language } from './constants.ts';

const keywordWeights: Record<Language, Array<[RegExp, number]>> = {
  javascript: [
    [
      /\b(console|await|async|function|export|import|this|class|for|let|const|map|join|require)\b/g,
      10,
    ],
  ],
  typescript: [
    [
      /\b(console|await|async|function|export|import|this|class|for|let|infer|const|map|join|require|type|implements|interface|declare|namespace|unknown|bigint|any|void|number|boolean|string|object|never|enum|unique symbol|symbol)\b/g,
      10,
    ],
  ],
};

export const detectLanguage = (code: string): string => {
  const scores: Record<string, number> = {};
  for (const [lang, patterns] of Object.entries(keywordWeights)) {
    scores[lang] = 0;
    for (const [pattern, weight] of patterns) {
      const matches = [...code.matchAll(pattern)];
      if (matches) {
        scores[lang] += matches.length * weight;
      }
    }
  }

  const [lang, score] = Object.entries(scores).reduce((a, b) =>
    a[1] > b[1] ? a : b,
  );
  if (score < 10) {
    return 'text';
  }
  return lang;
};
