import { describe, it, assert } from 'vitest';
import { detectLanguage } from './detect.ts';

describe('language detection', () => {
  describe('javascript/typescript', () => {
    it('case 1', () => {
      const code = 'console.log("hello world")';
      const lang = detectLanguage(code);
      assert.include(['javascript', 'typescript'], lang);
    });

    it('case 2', () => {
      const code = 'const a = 1';
      const lang = detectLanguage(code);
      assert.include(['javascript', 'typescript'], lang);
    });

    it('case 3', () => {
      const code = `
      function foo() {
        const text = 'hello world';
        console.log(text);
      }
      `;
      const lang = detectLanguage(code);
      assert.include(['javascript', 'typescript'], lang);
    });

    it('case 4', () => {
      const code = `
      function foo() {
        const text: string = 'hello world';
        console.log(text);
      }
      `;
      const lang = detectLanguage(code);
      assert.equal('typescript', lang);
    });

    it('case 4', () => {
      const code = `
      type str = string;
      function foo() {
        const text: str = 'hello world';
        console.log(text);
      }
      `;
      const lang = detectLanguage(code);
      assert.equal('typescript', lang);
    });

    it('case 5', () => {
      const code = `
      import * as fs from 'fs';

      const text = fs.readFileSync('foo.txt', 'utf8');
      console.log(text);
      `;
      const lang = detectLanguage(code);
      assert.include(['typescript', 'javascript'], lang);
    });
  });
});
