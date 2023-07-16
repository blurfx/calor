import { ParseRule } from '../types';

export const golangRule: ParseRule[] = [
  {
    kind: 'comment',
    pattern: /(\/\/.*\n?)|\/\*[^]*?\*\//g,
  },
  {
    kind: 'keyword',
    pattern:
      /\b(break|default|func|interface|select|case|defer|go|map|struct|chan|else|goto|package|switch|const|fallthrough|if|range|type|continue|for|import|return|var|iota)\b/g,
  },
  {
    kind: 'string',
    pattern: /`[^`]*`|"[^"\\]*(\\.[^"\\]*)*"|'[^\\]'(\\.[^\\])*/g,
  },
  {
    // decimal floating-point literal
    kind: 'number',
    pattern:
      /(?<!\S)((?:[0-9](_?[0-9])*(?:\.(?:_?[0-9]*)?)?|\.(?:_?[0-9])+)(?:[eE][+-]?(?:_?[0-9])+)?|(?:_?[0-9])+[eE][+-]?(?:_?[0-9])+)(?!\S)/g,
  },
  {
    // hexadecimal floating-point literal
    kind: 'number',
    pattern:
      /\b(0[xX](((?:_?[0-9a-fA-F])+\.?(_?[0-9a-fA-F])*)|(?:\.(?:_?[0-9a-fA-F])+))[pPeE][+-]?(?:_?[0-9])+)\b/g,
  },
  {
    kind: 'number',
    pattern:
      /\b((0|[1-9](_?[0-9])*)|(0[bB](_?[01])+)|(0[oO]?(_?[0-7])+)|(0[xX](_?[0-9a-fA-F])+))\b/g,
  },
  {
    kind: 'operator',
    pattern: /[+\-*/%&|^!=<>:]+/g,
  },
  {
    kind: 'bool',
    pattern: /\b(true|false)\b/g,
  },
  {
    kind: 'symbol',
    pattern: /\b[a-zA-Z$_][\w$_]*\b/g,
  },
];
