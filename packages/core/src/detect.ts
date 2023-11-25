import { Language } from './constants.ts';

const keywordWeights: Record<Language, Array<[RegExp, number]>> = {
  [Language.JavaScript]: [
    [/console\./g, 100],
    [
      /\b(await|async|function|export|import|this|class|for|let|const|map|join|require)\b/g,
      10,
    ],
  ],
  [Language.TypeScript]: [
    [/console\./g, 100],
    [
      /\b(await|async|function|export|import|this|class|for|let|infer|const|map|join|require|type|implements|interface|declare|namespace|unknown|bigint|any|void|number|boolean|string|object|never|enum|unique symbol|symbol)\b/g,
      10,
    ],
  ],
  [Language.Golang]: [[/\b(defer|go|chan|fmt|select|package)\b/g, 100]],
  [Language.C]: [
    [/#include\b|printf\s*\(|scanf\s*\(/g, 100],
    [/\b(union|typedef|struct|register|volatile|goto|sizeof)\b/g, 10],
  ],
  [Language.Cpp]: [
    [/#include\b|printf\s*\(|scanf\s*\(/g, 100],
    [
      /\b(cin|cout|template|dynamic_cast|static_cast|reinterpret_cast|const_cast|typeid|nullptr|constexpr|decltype|static_assert|noexcept|thread_local|alignas|alignof)\b/g,
      100,
    ],
    [/\b(union|typedef|struct|register|virtual|volatile|goto|sizeof)\b/g, 10],
  ],
};

export const detectLanguage = (code: string): string => {
  const scores: Record<string, number> = {};
  for (const [lang, patterns] of Object.entries(keywordWeights)) {
    scores[lang] = 0;
    for (const [pattern, weight] of patterns) {
      const matches = [...code.matchAll(pattern)];
      if (matches.length > 0) {
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
