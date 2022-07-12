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
    .replace(/^(\s*)[^\n/]+(?:\/[^\n/]+)*\/\/ linemod-replace-with:\s*([^\n]+)$/gm, '$1$2')
    .replace(/^(\s*)([^\n/]+)\/\/ linemod-prefix-with:\s*([^\n]+)$/gm, '$1$3 $2')
    .replace(/^(\s*)[^\n/]+\/\/ linemod-remove\n/gm, '');

  if (result === content) {
    return result;
  } else {
    result = result.replace(/ +$/gm, '');

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
  const content = await readFile(filePath, 'utf8');

  const result = linemodApply(content);

  const outputFilePath = changeExtension(filePath, outputExtension);

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
