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
  lastIndex: number;
  exec: (code: string) => RegExpExecArray | null;
}

export type ParseRule = {
  kind: SegmentKind;
  pattern: RegExp | CustomPattern;
  recursiveMatch?: boolean;
  matchHints?: SegmentKind[];
};

export type Token = {
  kind: SegmentKind;
  value: string;
};
