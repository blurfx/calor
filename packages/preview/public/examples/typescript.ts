/* @vite-ignore @ts-nocheck */
import { detectLanguage } from './detect';
import { tokenize } from './tokenizer';
import { getParseRule } from './rules';
import { escapeHTML } from './utils.ts';

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
