import type { ParseRule, CustomPattern } from '../types';

class TemplateLiteralParser implements CustomPattern {
  lastIndex: number = 0;
  exec(code: string): RegExpExecArray | null {
    for (let i = this.lastIndex; i < code.length; i++) {
      if (code[i - 1] !== '\\' && code[i] === '$' && code[i + 1] === '{') {
        const index = i;
        i += 2;
        for (; i < code.length - 2; i++) {
          if (code[i] === '}') {
            break;
          }
        }
        this.lastIndex = i + 1;
        const matchArray = [] as unknown as RegExpExecArray;
        matchArray['0'] = code.slice(index, this.lastIndex);
        (matchArray as RegExpExecArray).index = index;
        (matchArray as RegExpExecArray).input = code;
        return matchArray as RegExpExecArray;
      }
    }
    return null;
  }
}

const javascriptRules: ParseRule[] = [
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
    kind: 'template_literal',
    pattern: new TemplateLiteralParser(),
    recursiveMatch: true,
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

export default javascriptRules;
