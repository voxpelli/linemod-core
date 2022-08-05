# Linemod Core

Comment driven line modifications

[![npm version](https://img.shields.io/npm/v/linemod-core.svg?style=flat)](https://www.npmjs.com/package/linemod-core)
[![npm downloads](https://img.shields.io/npm/dm/linemod-core.svg?style=flat)](https://www.npmjs.com/package/linemod-core)
[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![Types in JS](https://img.shields.io/badge/types_in_js-yes-brightgreen)](https://github.com/voxpelli/types-in-js)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/voxpelli/eslint-config)
[![Follow @voxpelli](https://img.shields.io/twitter/follow/voxpelli?style=social)](https://twitter.com/voxpelli)

## Usage

```javascript
import { linemod } from 'linemod-core';
import pathModule from 'node:path';

await linemod(
  [pathModule.resolve(__dirname, 'index.js')],
  { outputExtension: '.mjs' }
);
```

### In CommonJS using available [`import()`](https://nodejs.org/api/esm.html#import-expressions) expression

```javascript
const { linemod } = await import('linemod-core');
```

## API

### `linemod(paths, { outputExtension }) => Promise<void>`

Takes an array of string file paths (`paths`), applies modifications to them and outputs them to the same destination with the specified extension (`outputExtension`)

### `linemodFile(path, { outputExtension }) => Promise<void>`

Same as `linemod()`, but takes a single string file path (`path`) rather than an array.

### `linemodApply(content) => string`

Applies any modifications on the string input (`content`) and returns back the resulting string.

## Available modifications

Linemods are added at the end of the line they are supposed to apply to.

### `linemod-prefix-with:`

Prefixes the line with whatever is specified after the keyword:

```javascript
const exportedMethod = () => {}; // esm-prefix-with: export
```

Becomes:

```javascript
export const exportedMethod = () => {};
```

### `linemod-replace-with:`

Replaces the line with whatever is specified after the keyword:

```javascript
const escape = require('stringify-entities'); // esm-replace-with: import escape from 'stringify-entities';
```

Becomes:

```javascript
import escape from 'stringify-entities';
```

### `linemod-remove`

Simply removes the entire line.

Quite useful when combined with `linemod-prefix-with`:

```javascript
const exportedMethod = () => {}; // esm-prefix-with: export
module.exports = { exportedMethod }; // esm-remove
```

Becomes:

```javascript
export const exportedMethod = () => {};
```
