export type SegmentKind =
  | 'plain'
  | 'string'
  | 'keyword'
  | 'number'
  | 'bool'
  | 'comment'
  | 'operator'
  | 'function'
  | 'symbol'
  | 'class'
  | 'template_literal'
  | 'type';

export interface CustomPattern {
  parse(code: string): Token[];
}

export type ParseRule = {
  kind: SegmentKind;
  pattern: RegExp;
  customTokenizer?: CustomPattern;
  matchHints?: SegmentKind[];
};

export type Token = {
  kind: SegmentKind;
  value: string;
};
