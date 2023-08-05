# calor

calor is a fast syntax highlighter and tokenizer.

## Installation

```bash
<package manager> install @calor/core
```
## Usage

Highlight code when you don't know what language is
```typescript
import { highlight } from '@calor/core';

const html = highlight('console.log("Hello, World!");');
// html = <pre class="calor-wrapper">...</pre>
```

Highlight code when you know what language it is.
```typescript
import { highlight, Language } from '@calor/core';

const html = highlight('console.log("Hello, World!");', Language.JavaScript);
```

Infer what language the code is written in
```typescript
import { detectLanguage } from '@calor/core';

const language = detectLanguage('console.log("Hello, World!");');
// language = 'javascript'
```

## Theming

The `highlight` function returns only the HTML for highlighting without CSS or inline style.
If you want to apply a theme, you can define your own or use a predefined theme.

You can import predefined themes that are located under `@calor/core/themes`.

For example, in React, you can use it like this

```typescript jsx
import { highlight } from '@calor/core';
import '@calor/core/themes/github-light.css';

function App() {
  const html = highlight(`
const hello = "world!";
const simpleMath = 1 + 2;
  `)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  )
}
```

## Language support

calor is still in development, it doesn't support all languages.
You can check the [issues](https://github.com/blurfx/calor/issues?q=is%3Aissue+label%3A%22language+support%22) for languages that are in development or planned.

- [x] JavaScript
- [x] TypeScript
- [x] Go
- [ ] Python
- [ ] C
- [ ] C++
- [ ] Java
