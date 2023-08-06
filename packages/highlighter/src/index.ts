import { detectLanguage, tokenize, getParseRule } from '@calor/core';
import { escapeHTML } from './utils';

export const highlight = (code: string, language?: string): string => {
  if (language == null) {
    language = detectLanguage(code);
  }
  const tokens = tokenize(code, getParseRule(language));
  const html = tokens.reduce((acc, token) => {
    acc += `<span class="calor-${token.kind}">${escapeHTML(
      token.value,
    )}</span>`;
    return acc;
  }, '');
  return `<pre class="calor-wrapper">${html}</pre>`;
};
