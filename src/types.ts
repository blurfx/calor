export type SegmentKind =
  | 'plain'
  | 'string'
  | 'keyword'
  | 'number'
  | 'bool'
  | 'comment'
  | 'operator'
  | 'function';

export type ParseRule = {
  kind: SegmentKind;
  pattern: RegExp;
};
