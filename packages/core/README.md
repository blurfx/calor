# 🔥 @calor/core 

@calor/core is a syntax tokenizer.

## Installation

```bash
<package manager> install @calor/core
```
## Usage

Infer what language the code is written in
```typescript
import { detectLanguage } from '@calor/core';

const language = detectLanguage('console.log("Hello, World!");');
// language = 'javascript'
```
