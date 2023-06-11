import { describe, it, expect } from 'vitest';
import { tokenize } from '../../src/tokenizer';
import javascriptRules from '../../src/rules/javascript';
import { highlight } from '../../src/highlighter';

describe('javascript tokenizer', () => {
  it('can tokenize comment', () => {
    const tokens = tokenize(
      `
        // this is comment
        const str = "// not comment";
        /*
          this is multiline comment
        */
        `,
      javascriptRules,
    );
    const commentTokens = tokens.filter((token) => token.kind === 'comment');
    expect(commentTokens.length).toBe(2);
    expect(
      commentTokens.find((token) => token.value.includes('this is comment')),
    ).not.toBeFalsy();
    expect(
      commentTokens.find((token) =>
        token.value.includes('this is multiline comment'),
      ),
    ).not.toBeFalsy();
  });
  it('can tokenize keyword', () => {
    const tokens = tokenize(
      `
      function foo() {
        const str = "hello world";
        let val = true;
        return 0;
      }
    `,
      javascriptRules,
    );
    const keywords = ['function', 'const', 'let', 'return'];
    keywords.forEach((keyword) => {
      expect(
        tokens.find(
          (token) => token.value === keyword && token.kind === 'keyword',
        ),
      ).not.toBeFalsy();
    });
  });
  it('can tokenize string', () => {
    const tokens = tokenize(
      `
      const str = "hello world";
      'yeah';
    `,
      javascriptRules,
    );
    const stringTokens = tokens.filter((token) => token.kind === 'string');
    expect(
      stringTokens.find((token) => token.value === '"hello world"'),
    ).not.toBeFalsy();
    expect(
      stringTokens.find((token) => token.value === "'yeah'"),
    ).not.toBeFalsy();
  });
  it('can tokenize number', () => {
    const tokens = tokenize(
      `
      const num = 123;
      const hex = 0xff;
      const oct = 0o77;
      const float = 1.23;
      const exp = 1e3;
      const nan = NaN;
    `,
      javascriptRules,
    );
    const numberTokens = tokens.filter((token) => token.kind === 'number');
    const numberValues = ['123', '0xff', '0o77', '1.23', '1e3', 'NaN'];
    numberValues.forEach((value) => {
      expect(
        numberTokens.find((token) => token.value === value),
      ).not.toBeFalsy();
    });
  });
  it('can tokenize bool', () => {
    const tokens = tokenize(
      `
      const bool = true;
      const bool2 = false;
    `,
      javascriptRules,
    );
    const boolTokens = tokens.filter((token) => token.kind === 'bool');
    expect(boolTokens.find((token) => token.value === 'true')).not.toBeFalsy();
    expect(boolTokens.find((token) => token.value === 'false')).not.toBeFalsy();
  });
  it('can tokenize operator', () => {
    const tokens = tokenize(
      `
        const num = 1 + 2 - 3 * 4 / 5 % 6;
        const str = "hello" + "world";
        const bool = true && false || true;
        const bool2 = !true;
        const bool3 = true ? 1 : 0;
        const bool4 = 1 === 2;
        const bool5 = 1 !== 2;
        const bool6 = 1 < 2;
        const bool7 = 1 > 2;
        const bool8 = 1 <= 2;
        const bool9 = 1 >= 2;
        const bool10 = 1 | 2;
        const bool11 = 1 & 2;
        const bool12 = 1 ^ 2;
        const bool13 = 1 << 2;
        const bool14 = 1 >> 2;
        const bool15 = 1 >>> 2;
        const bool16 = 1 || 2;
        const bool17 = 1 ?? 2;
        const bool18 = 1 ??= 2;
        `,
      javascriptRules,
    );
    const operators = [
      '=',
      '+',
      '-',
      '*',
      '/',
      '%',
      '&&',
      '||',
      '!',
      '?',
      ':',
      '===',
      '!==',
      '<',
      '>',
      '<=',
      '>=',
      '|',
      '&',
      '^',
      '<<',
      '>>',
      '>>>',
      '||',
      '??',
      '??=',
    ];
    const operatorTokens = tokens.filter((token) => token.kind === 'operator');
    operators.forEach((operator) => {
      expect(
        operatorTokens.find((token) => token.value === operator),
      ).not.toBeFalsy();
    });
  });
  it('can tokenize function', () => {
    const tokens = tokenize(
      `
      function fn1() {
        // fn1
      }
      function fn2(              )               {}
      function fn3(a, b, c) {}
      const fn4 = function() {}
      fn5 = () => {};
      `,
      javascriptRules,
    );
    const functionNames = ['fn1', 'fn2', 'fn3', 'fn4', 'fn5'];
    const functionTokens = tokens.filter((token) => token.kind === 'function');
    expect(functionTokens.length).toBe(functionNames.length);
    functionNames.forEach((name) => {
      expect(
        functionTokens.find((token) => token.value === name),
      ).not.toBeFalsy();
    });
  });
  it('can tokenize template literal string', () => {
    const tokens = tokenize(
      `const hello = \`hello \${name}\`;
        const world = \`\${foo.bar()}\`;
        const number = \`\${1234}\`
        `,
      javascriptRules,
    );
    expect(
      tokens.some((token) => token.value === 'name' && token.kind === 'symbol'),
    ).toBe(true);
    expect(
      tokens.some((token) => token.value === 'foo' && token.kind === 'symbol'),
    ).toBe(true);
    expect(
      tokens.some(
        (token) => token.value === 'bar' && token.kind === 'function',
      ),
    ).toBe(true);
    expect(
      tokens.some((token) => token.value === '1234' && token.kind === 'number'),
    ).toBe(true);
  });
  it('temp', () => {
    const code = `
const someObject = {
  someProperty: \`some value \`\${foo.bar() + 1234}\`\`,
  someMethod() {
    console.log('Hello, world!');
  },
  ['computed' + 'Property']: 'computed value'
};

class SomeClass {
  constructor() {
    this.someProperty = 'some value';
  }

  someMethod() {
    console.log('Hello, world!');
  }
}

function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);
};
    `;
    console.log(highlight(code));
  });
});
