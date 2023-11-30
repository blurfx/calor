# 🔥 @calor/highlighter

@calor/highlighter is a syntax highlighter.

## Installation

```bash
<package manager> install @calor/core @calor/highlighter
```
## Usage

Highlight code when you don't know what language is
```typescript
import { highlight } from '@calor/highlighter';

const html = highlight('console.log("Hello, World!");');
// html = <pre class="calor-wrapper">...</pre>
```

Highlight code when you know what language it is.
```typescript
import { Language } from '@calor/core';
import { highlight } from '@calor/highlighter';
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
