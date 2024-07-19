import { readFile, writeFile } from 'node:fs/promises';

import { changeExtension } from './lib/utils.js';

/**
 * @typedef LinemodOptions
 * @property {string} outputExtension including the leading dot
 */

/**
 * @param {string} content
 * @returns {string}
 */
export function linemodApply (content) {
  if (typeof content !== 'string') throw new TypeError('Requires content to be a string to apply linemod');

  let result = content
    .replaceAll(/^(\s*)\/\/ linemod-add:\s*([^\n]+)$/gm, '$1$2')
    .replaceAll(/^(\s*)[^\n/]+(?:\/[^\n/]+)*\/\/ linemod-replace-with:\s*([^\n]+)$/gm, '$1$2')
    .replaceAll(/^(\s*)([^\n/]+(?:\/[^\n/]+)*)\/\/ linemod-prefix-with:\s*([^\n]+)$/gm, '$1$3 $2')
    .replaceAll(/^(\s*)[^\n/]+(?:\/[^\n/]+)*\/\/ linemod-remove\n/gm, '');

  if (result === content) {
    return result;
  } else {
    // TODO: Trim whitespace at start of file?
    result = result.replaceAll(/ +$/gm, '');

    if (/\n$/.test(result) === false && /\n$/.test(content) === true) {
      result += '\n';
    }

    return result;
  }
}

/**
 * @param {string} filePath
 * @param {LinemodOptions} options
 * @returns {Promise<void>}
 */
export async function linemodFile (filePath, { outputExtension }) {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const content = await readFile(filePath, 'utf8');

  const result = linemodApply(content);

  const outputFilePath = changeExtension(filePath, outputExtension);

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await writeFile(outputFilePath, result, 'utf8');
}

/**
 * @param {string[]} fileMap
 * @param {LinemodOptions} options
 * @returns {Promise<void>}
 */
export async function linemod (fileMap, options) {
  await Promise.all(
    fileMap.map(filePath => linemodFile(filePath, options))
  );
}
