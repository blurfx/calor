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
  kind: Omit<SegmentKind, 'plain'>;
  pattern: RegExp | CustomPattern;
  recursiveMatch?: boolean;
};
