import { ParseRule } from '../types';
import javascriptRules from './javascript';

const typescriptRules: ParseRule[] = [
  {
    kind: 'type',
    pattern:
      /\b(undefined|unknown|null|bigint|any|void|number|boolean|string|object|never|enum|unique symbol|symbol)\b/g,

    matchHints: ['type'],
  },
  {
    kind: 'keyword',
    pattern:
      /\b(as|get|set|type|namespace|infer|interface|extends|public|private|protected|implements|declare|abstract|readonly)\b/g,
  },
  ...javascriptRules,
];

export default typescriptRules;
