import type { ParseRule, CustomPattern, Token } from '../types';
import { deepCopy } from '../utils';
import { tokenize } from '../tokenizer';

class TemplateLiteralParser implements CustomPattern {
  #parseRules: ParseRule[];
  constructor(parseRules: ParseRule[]) {
    this.#parseRules = parseRules;
  }
  parse(code: string): Token[] {
    const tokens: Token[] = [];
    let lastIndex = 0;
    for (let i = lastIndex; i < code.length; i++) {
      if (code[i - 1] !== '\\' && code[i] === '$' && code[i + 1] === '{') {
        const index = i;
        i += 2;
        for (; i < code.length - 1; i++) {
          if (code[i] === '}') {
            break;
          }
        }
        tokens.push({
          kind: 'string',
          value: code.slice(lastIndex, index),
        });
        lastIndex = i + 1;
        tokens.push(
          ...tokenize(code.slice(index, lastIndex), this.#parseRules),
        );
      }
    }
    tokens.push({
      kind: 'string',
      value: code.slice(lastIndex),
    });
    return tokens;
  }
}

export const javascriptBaseRule: ParseRule[] = [
  {
    kind: 'comment',
    pattern: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
  },
  {
    kind: 'class',
    pattern: /\b(class)(\s+)([a-zA-Z$_][\w$_]*)/g,
    matchHints: ['keyword', 'plain', 'class'],
  },
  {
    kind: 'keyword',
    pattern:
      /\b(await|break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|finally|for|function|if|import|in|instanceof|let|new|null|return|static|super|switch|this|throw|try|typeof|var|void|while|with|yield|of)\b/g,
  },
  {
    kind: 'string',
    pattern: /(["'])(\\[^]|(?!\1)[^\r\n\\])*\1/g,
  },
  {
    kind: 'number',
    pattern:
      /\b(0[xX][\da-fA-F_]+|0[o|O][0-7_]+|[\d_]*\.?[\d_]+([eE][+-]?[\d]+)?|NaN)\b/g,
  },
  {
    kind: 'operator',
    pattern: /[+\-*/%&~|^!=<>?:]+/g,
  },
  {
    kind: 'bool',
    pattern: /\b(true|false)\b/g,
  },
  {
    kind: 'function',
    pattern:
      /(?!function\b)\b[a-zA-Z$_][\w$_]*(?=\s*((\?\.)?\s*\(|=\s*(\(?[\w, {}\[\])]+\)? *=>|function\b)))/g,
  },
  {
    kind: 'class',
    pattern: /\b[A-Z$_][\w$_]*\b/g,
  },
  {
    kind: 'symbol',
    pattern: /\b[a-zA-Z$_][\w$_]*\b/g,
  },
];

const javascriptRules = [...deepCopy(javascriptBaseRule)];

javascriptRules.push({
  kind: 'template_literal',
  pattern: /(`)(\\[^]|(?!\1)[^\r\n\\])*\1/g,
  customTokenizer: new TemplateLiteralParser(deepCopy(javascriptRules)),
});

export default javascriptRules;
