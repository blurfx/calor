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
  | 'template_literal';

export interface CustomPattern {
  lastIndex: number;
  exec: (code: string) => RegExpExecArray | null;
}

export type ParseRule = {
  kind: SegmentKind;
  pattern: RegExp | CustomPattern;
  recursiveMatch?: boolean;
};

export type Token = {
  kind: SegmentKind;
  value: string;
};
