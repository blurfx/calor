import { describe, it, expect } from 'vitest';
import { tokenize } from '../../src/tokenizer';
import cppRules from '../../src/rules/cpp';

describe('c/cpp tokenizer', () => {
  it('can tokenize comment', () => {
    const tokens = tokenize(
      `
        // this is comment
        const str = "// not comment";
        /*
          this is multiline comment
        */
        `,
      cppRules,
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
      int main() {
        int num = 10;
        return 0;
      }
    `,
      cppRules,
    );
    const keywords = ['int', 'return'];
    keywords.forEach((keyword) => {
      expect(
        tokens.find(
          (token) => token.value === keyword && token.kind === 'keyword',
        ),
      ).not.toBeFalsy();
    });
  });

  it('can tokenize number', () => {
    const tokens = tokenize(
      `
      int num = 123;
    `,
      cppRules,
    );
    const numberTokens = tokens.filter((token) => token.kind === 'number');
    expect(numberTokens.find((token) => token.value === '123')).not.toBeFalsy();
  });

  it('can tokenize operator', () => {
    const tokens = tokenize(
      `
        int num = 1 + 2 - 3 * 4 / 5 % 6;
        `,
      cppRules,
    );
    const operators = ['=', '+', '-', '*', '/', '%'];
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
      int main() {
        // main
      }
      `,
      cppRules,
    );
    const functionNames = ['main'];
    const functionTokens = tokens.filter((token) => token.kind === 'function');
    expect(functionTokens.length).toBe(functionNames.length);
    functionNames.forEach((name) => {
      expect(
        functionTokens.find((token) => token.value === name),
      ).not.toBeFalsy();
    });
  });

  it('can tokenize class', () => {
    const tokens = tokenize(
      `
      class MyClass {
        public:
          void greet() {
            std::cout << "Hello, World!";
          }
      };
    `,
      cppRules,
    );
    const classTokens = tokens.filter((token) => token.kind === 'class');
    expect(classTokens.length).toBe(1);
    expect(classTokens[0].value).toBe('MyClass');
  });

  it('can tokenize string', () => {
    const tokens = tokenize(
      `
      int main() {
        std::cout << "Hello, World!";
      }
    `,
      cppRules,
    );
    const stringTokens = tokens.filter((token) => token.kind === 'string');
    expect(stringTokens.length).toBe(1);
    expect(stringTokens[0].value).toBe('"Hello, World!"');
  });

  it('include directive', () => {
    const tokens = tokenize('#include <iostream>', cppRules);
    const includeTokens = tokens.filter((token) => token.kind === 'keyword');
    expect(includeTokens.length).toBe(1);
    expect(includeTokens[0].value).toBe('#include');
  });
});
