import { ParseRule } from '../types';
import javascriptRules from './javascript';
import typescriptRules from './typescript';
import golangRules from './golang';

const Rules: Record<string, ParseRule[]> = {
  javascript: javascriptRules,
  typescript: typescriptRules,
  golang: golangRules,
};

export const getParseRule = (lang: string) => {
  return Rules[lang];
};
