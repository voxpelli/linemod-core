# Linemod Core

Comment driven instructions to modify lines

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat)](https://github.com/standard/semistandard)

## Usage

### Simple

```bash
yarn add --dev linemod-core
```

```javascript

```

## Methods

### `linemod(paths)`

**`paths`**: An `Array` of `string` _file paths_ that should be modified

**Returns:** `AsyncGenerator` that emits `string`:s of the name of each found directory

Similar functionality to `readdir()` from [`readdir-scoped-modules`](https://www.npmjs.com/package/readdir-scoped-modules).

Returns all directories in `path`, with the scoped directories (like `@foo`) expanded and joined with the directories directly beneath them (like eg. `@foo/abc` and `@foo/bar` if `abc` and `bar` are the two directories in `@foo`, though it will never expand to `@`- or `.`-prefixed subdirectories and will hence never return `@foo/@xyz` or `@foo/.bin`).

Will not return any directory with a name that begins with `.`.
