import { ParseRule } from '../types';
import javascriptRules from './javascript';
import typescriptRules from './typescript';

const Rules: Record<string, ParseRule[]> = {
  javascript: javascriptRules,
  typescript: typescriptRules,
};

export const getParseRule = (lang: string) => {
  return Rules[lang];
};
