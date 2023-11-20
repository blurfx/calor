import { ParseRule } from '../types';

const golangRules: ParseRule[] = [
  {
    kind: 'comment',
    pattern: /(\/\/.*\n?)|\/\*[^]*?\*\//g,
  },
  {
    kind: 'keyword',
    pattern:
      /\b(break|default|func|interface|select|case|defer|go|map|struct|chan|else|goto|package|switch|const|fallthrough|if|range|type|continue|for|import|return|var|iota|array|slice|pointer|function|channel|nil|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print|println|real|recover|any|bool|byte|comparable|complex128|complex64|error|float32|float64|int|int16|int32|int64|int8|rune|string|uint|uint16|uint32|uint64|uint8|uintptr)\b/g,
  },
  {
    kind: 'string',
    pattern: /`[^`]*`|"[^"\\]*(\\.[^"\\]*)*"|'[^\\]'(\\.[^\\])*/g,
  },
  {
    // decimal floating-point literal
    kind: 'number',
    pattern:
      /(?<!\S)((?:[0-9](_?[0-9])*(?:\.(?:_?[0-9]*)?)?|\.(?:_?[0-9])+)(?:[eE][+-]?(?:_?[0-9])+)?|(?:_?[0-9])+[eE][+-]?(?:_?[0-9])+)i?(?!\S)/g,
  },
  {
    // hexadecimal floating-point literal
    kind: 'number',
    pattern:
      /\b(0[xX](((?:_?[0-9a-fA-F])+\.?(_?[0-9a-fA-F])*)|(?:\.(?:_?[0-9a-fA-F])+))[pPeE][+-]?(?:_?[0-9])+)i?\b/g,
  },
  {
    kind: 'number',
    pattern:
      /\b((0|[1-9](_?[0-9])*)|(0[bB](_?[01])+)|(0[oO]?(_?[0-7])+)|(0[xX](_?[0-9a-fA-F])+))i?\b/g,
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
    kind: 'class',
    pattern: /\b[A-Z_][\w_]*\b/g,
  },
  {
    kind: 'symbol',
    pattern: /\b[a-zA-Z_][\w_]*\b/g,
  },
];

export default golangRules;
