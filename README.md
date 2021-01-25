# Linemod Core

Comment driven instructions to modify lines

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat)](https://github.com/standard/semistandard)

## Usage

### Simple

```bash
yarn add --dev linemod-core
```

```javascript
const { linemod } = require('linemod-core');
const path = require('path');

await linemod(
  [pathModule.resolve(__dirname, 'index.js')],
  { outputExtension: '.mjs' }
);
```

## API

### `linemod(paths, { outputExtension }) => Promise<void>`

Takes an array of string file paths (`paths`), applies modifications to them and outputs them to the same destination with the specified extension (`outputExtension`)

### `linemodFile(path, { outputExtension }) => Promise<void>`

Same as `linemod()`, but takes a single string file path (`path`) rather than an array.

### `linemodApply(content) => string`

Applies any modifications on the string input (`content`) and returns back the resulting string.

## Available modifications

All linemods are added at the end of the file they are supposed to apply to

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
