import { ParseRule } from '../types';
import javascriptRules from './javascript';
import typescriptRules from './typescript';
import golangRules from './golang';
import cppRules from './cpp';

const Rules: Record<string, ParseRule[]> = {
  javascript: javascriptRules,
  typescript: typescriptRules,
  golang: golangRules,
  cpp: cppRules,
};

export const getParseRule = (lang: string) => {
  return Rules[lang];
};
