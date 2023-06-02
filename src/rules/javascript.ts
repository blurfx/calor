import { ParseRule } from '../types';

const javascriptRules: ParseRule[] = [
  {
    kind: 'comment',
    pattern: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
  },
  {
    kind: 'keyword',
    pattern:
      /\b(await|break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|finally|for|function|if|import|in|instanceof|let|new|null|return|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/g,
  },
  {
    kind: 'string',
    pattern: /(["'])(\\[^]|(?!\1)[^\r\n\\])*\1/g,
  },
  {
    kind: 'number',
    pattern:
      /\b(0[xX][\da-fA-F_]+|0[o|O][0-7_]+|[\d_]*\.?[\d_]+([eE][+-]?[\d]+)?)\b/g,
  },
  {
    kind: 'number',
    pattern: /\b(NaN)\b/g,
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
      /[a-zA-Z$_][\w$_]*(?=\s*((\?\.)?\s*\(|=\s*(\(?[\w, {}\[\])]+\)? *=>|function\b)))/g,
  },
];

export default javascriptRules;
