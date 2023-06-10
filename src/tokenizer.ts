import type { ParseRule } from './types';
import { Token } from './types';

type MatchedPattern = {
  match: RegExpExecArray;
  kind: ParseRule['kind'];
  lastIndex: number;
  recursiveMatch?: boolean;
};

export const tokenize = (code: string, rules: ParseRule[]): Token[] => {
  const tokens: Token[] = [];
  const cachedPattern: MatchedPattern[] = [];
  const regexp = /x/g;
  regexp.exec('x');
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
          kind: rules[i].kind,
          lastIndex: rules[i].pattern.lastIndex,
          recursiveMatch: rules[i].recursiveMatch,
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
    current = firstMatched.lastIndex;
    if (firstMatched.recursiveMatch === true) {
      tokens.push(
        ...tokenize(
          firstMatched.match[0],
          rules.filter((rule) => rule.recursiveMatch !== true),
        ),
      );
    } else {
      const post = firstMatched.match[0];
      tokens.push({
        kind: firstMatched.kind,
        value: post,
      });
    }
  }
  tokens.push({
    kind: 'plain',
    value: code.slice(current),
  });
  return tokens;
};
