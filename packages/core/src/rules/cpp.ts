import { ParseRule } from '../types';

const cppRules: ParseRule[] = [
  {
    kind: 'comment',
    pattern: /(\/\/.*\n?)|\/\*[^]*?\*\//g,
  },
  {
    kind: 'keyword',
    pattern: /(#\s*include|ifdef|ifndef|elidef|elifndef)(\s*)(<.*>|".*")/g,
    matchHints: ['keyword', 'plain', 'string'],
  },
  {
    kind: 'keyword',
    pattern: /(#\s*(?:define|if|elif|else|endif|import|error|line))\b/g,
  },
  {
    kind: 'keyword',
    pattern:
      /\b(auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|bool|true|false|catch|class|const_cast|delete|dynamic_cast|explicit|export|friend|inline|mutable|namespace|new|operator|private|protected|public|reinterpret_cast|static_cast|template|this|throw|try|typeid|typename|using|virtual|nullptr|null|string|and|and_eq|bitand|bitor|compl|not|not_eq|or|or_eq|xor|xor_eq)\b/g,
  },
  {
    kind: 'string',
    pattern: /R"([^()\n]*)"|L?"([^"\\]*(\\.[^"\\]*)*)"/g,
  },
  {
    kind: 'number',
    pattern:
      /\b(0b[01_]+|0[0-7_]*|0x[\da-fA-F_]+|\d[\d_]*(.\d[\d_]*)?(e[\+\-]?\d[\d_]*)?)(u|ul|ull|l|ll|f|F|L)?\b/g,
  },
  {
    kind: 'class',
    pattern: /#.*(?=\n|$)/g,
  },
  {
    kind: 'operator',
    pattern: /[+\-*/%&~|^!=<>?:]+/g,
  },
  {
    kind: 'class',
    pattern: /\b[A-Z_][\w_]*\b/g,
  },
  {
    kind: 'function',
    pattern: /[a-zA-Z_][\w_]*(?=\s*\()/g,
  },
  {
    kind: 'symbol',
    pattern: /[a-zA-Z_]\w*/g,
  },
];

export default cppRules;
