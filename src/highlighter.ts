import { detectLanguage, getParseRule } from './detect';
import { tokenize } from './tokenizer';

export const highlight = (code: string, language?: string): string => {
  if (language == null) {
    language = detectLanguage(code);
  }

  const tokens = tokenize(code, getParseRule(language));
  const html = tokens.reduce((acc, token) => {
    acc += `<span class="chill-${token.kind}">${token.value}</span>`;
    return acc;
  }, '');
  return `<pre class="chill-wrapper">${html}</pre>`;
};
