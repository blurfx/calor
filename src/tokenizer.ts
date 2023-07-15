import type { ParseRule } from './types';
import { Token } from './types';

type MatchedPattern = {
  match: RegExpExecArray;
  rule: ParseRule;
};

export const tokenize = (code: string, rules: ParseRule[]): Token[] => {
  const tokens: Token[] = [];
  const cachedPattern: MatchedPattern[] = [];
  let current = 0;
  while (current < code.length) {
    let firstMatched: MatchedPattern | null = null;
    for (let i = 0; i < rules.length; i++) {
      if (cachedPattern[i] == null || cachedPattern[i].match.index! < current) {
        rules[i].pattern.lastIndex = current;
        const match = rules[i].pattern.exec(code);
        if (match == null) {
          continue;
        }
        cachedPattern[i] = {
          match,
          rule: rules[i],
        };
      }

      if (
        cachedPattern[i].match[0] &&
        (firstMatched == null ||
          cachedPattern[i].match.index! < firstMatched.match.index!)
      ) {
        firstMatched = cachedPattern[i];
      }
    }

    if (firstMatched == null) {
      break;
    }

    const pre = code.slice(current, firstMatched.match.index!);
    if (pre.length > 0) {
      tokens.push({
        kind: 'plain',
        value: pre,
      });
    }
    current = firstMatched.rule.pattern.lastIndex;
    if (firstMatched.rule.customTokenizer != null) {
      tokens.push(
        ...firstMatched.rule.customTokenizer.parse(firstMatched.match[0]),
      );
    } else {
      if (firstMatched.rule.matchHints == null) {
        const post = firstMatched.match[0];
        tokens.push({
          kind: firstMatched.rule.kind,
          value: post,
        });
      } else {
        for (let i = 1; i < firstMatched.match.length; i++) {
          if (firstMatched.match[i] != null) {
            tokens.push({
              kind: firstMatched.rule.matchHints[i - 1],
              value: firstMatched.match[i],
            });
          }
        }
      }
    }
  }
  tokens.push({
    kind: 'plain',
    value: code.slice(current),
  });
  return tokens;
};
