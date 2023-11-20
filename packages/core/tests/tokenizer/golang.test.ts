import { describe, expect, it } from 'vitest';
import { tokenize } from '../../src';
import golangRules from '../../src/rules/golang';

describe('golang tokenizer', () => {
  it('can tokenize comment', () => {
    const tokens = tokenize(
      `
  // this is comment
  
  /*
    this is multiline comment
  */
  
  /* this is another comment */
  `,
      golangRules,
    );
    const comments = [
      '// this is comment\n',
      '/*\n    this is multiline comment\n  */',
      '/* this is another comment */',
    ];
    const commentTokens = tokens.filter((token) => token.kind === 'comment');
    expect(commentTokens.length).toBe(comments.length);
    comments.forEach((comment) => {
      expect(
        commentTokens.find((token) => token.value === comment),
      ).not.toBeFalsy();
    });
  });
  it('can tokenize keyword', () => {
    const tokens = tokenize(
      `
      package main
      
      import "fmt"
      import (
          "testing"
          "log"
      )
      
      const Name = "hello"
      
      func main() {
          defer foo()
          if true {
          }
          r := 'c'
          fmt.Println("hello world")
      }
    `,
      golangRules,
    );
    const keywords = ['package', 'import', 'const', 'func', 'defer', 'if'];
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
      package main
      
      import "fmt"
      import (
          "testing"
          "log"
      )
      
      func main() {
          r := 'c'
          fmt.Println("hello world")
      }
    `,
      golangRules,
    );
    const strings = ['"fmt"', '"testing"', '"log"', "'c'", '"hello world"'];
    const stringTokens = tokens.filter((token) => token.kind === 'string');
    expect(stringTokens.length).toBe(strings.length);
    strings.forEach((str) => {
      expect(stringTokens.find((token) => token.value === str)).not.toBeFalsy();
    });
  });
  it('can tokenizer number (integer literals)', () => {
    const tokens = tokenize(
      `
      42
      4_2
      0600
      0_600
      0o600
      0O600
      0xBadFace
      0xBad_Face
      0x_67_7a_2f_cc_40_c6
      170141183460469231731687303715884105727
      170_141183_460469_231731_687303_715884_105727

      _42
      42_
      4__2
      0_xBadFace
    `,
      golangRules,
    );
    const valid = [
      '42',
      '4_2',
      '0600',
      '0_600',
      '0o600',
      '0O600',
      '0xBadFace',
      '0xBad_Face',
      '0x_67_7a_2f_cc_40_c6',
      '170141183460469231731687303715884105727',
      '170_141183_460469_231731_687303_715884_105727',
    ];
    const invalid = ['_42', '42_', '4__2', '0_xBadFace'];
    valid.forEach((num) => {
      expect(
        tokens.find((token) => token.value === num && token.kind === 'number'),
      ).not.toBeFalsy();
    });
    invalid.forEach((num) => {
      expect(
        tokens.find((token) => token.value === num && token.kind === 'number'),
      ).toBeFalsy();
    });
  });
  it('can tokenizer number (float literals)', () => {
    const tokens = tokenize(
      `
    0.
    72.40
    072.40
    2.71828
    1.e+0
    6.67428e-11
    1E6
    .25
    .12345E+5
    1_5.
    0.15e+0_2
    0x1p-2
    0x2.p10
    0x1.Fp+0
    0X.8p-0
    0X_1FFFP-16
    0x15e-2
    `,
      golangRules,
    );
    const valid = [
      '0.',
      '72.40',
      '072.40',
      '2.71828',
      '1.e+0',
      '6.67428e-11',
      '1E6',
      '.25',
      '.12345E+5',
      '1_5.',
      '0.15e+0_2',
      '0x1p-2',
      '0x2.p10',
      '0x1.Fp+0',
      '0X.8p-0',
      '0X_1FFFP-16',
      '0x15e-2',
    ];
    valid.forEach((num) => {
      expect(
        tokens.find((token) => token.value === num && token.kind === 'number'),
      ).not.toBeFalsy();
    });
  });
});
