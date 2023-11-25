import { describe, it, assert } from 'vitest';
import { detectLanguage } from '../../src';

// c language detection
describe('c/cpp language detection', () => {
  it('case 1', () => {
    const code = `
      #include <stdio.h>
      int main() {
        printf("hello world");
        return 0;
      }
      `;
    const lang = detectLanguage(code);
    assert.include(['c', 'cpp'], lang);
  });

  it('case 2', () => {
    const code = `
      int main() {
        printf("hello world");
      }
    `;
    const lang = detectLanguage(code);
    assert.include(['c', 'cpp'], lang);
  });

  it('case 3', () => {
    const code = `
      int foo() {
        int n;
        scanf("%d", &n);
      }
    `;
    const lang = detectLanguage(code);
    assert.include(['c', 'cpp'], lang);
  });

  it('case 4', () => {
    const code = `
      #include <iostream>

      template <typename T>
      T add(T a, T b) {
        return a + b;
      }

      int main() {
        std::cout << add<int>(10, 20);
        return 0;
      }
    `;
    const lang = detectLanguage(code);
    assert.equal('cpp', lang);
  });

  it('case 5', () => {
    const code = `
      #include <iostream>

      class Base { virtual void dummy() {} };
      class Derived: public Base { int a; };

      int main () {
        Base * b = new Base;
        Derived * d = dynamic_cast<Derived*>(b);
        if (d==nullptr) std::cout << "null";
        else std::cout << "not null";
        return 0;
      }
    `;
    const lang = detectLanguage(code);
    assert.equal('cpp', lang);
  });
});
