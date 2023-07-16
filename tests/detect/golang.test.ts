import { describe, it, assert } from 'vitest';
import { detectLanguage } from '../../src';

describe('golang language detection', () => {
  it('case 1', () => {
    const code = `
      package main

      import "fmt"

      func main() {
          fmt.Println("hello world")
      }
      `;
    const lang = detectLanguage(code);
    assert.equal('golang', lang);
  });
  it('case 2', () => {
    const code = `
      package main

      import "github.com/spf13/cobra"

      func GetBoolFlag(cmd *cobra.Command, names ...string) bool {
        for _, name := range names {
          val, err := cmd.Flags().GetBool(name)
          if err != nil || !val {
            continue
          }
          return val
        }
        return false
      }
      `;
    const lang = detectLanguage(code);
    assert.equal('golang', lang);
  });
});
