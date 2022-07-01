/// <reference types="node" />

'use strict';

const { readFile, writeFile } = require('node:fs').promises;

const { changeExtension } = require('./lib/utils');

/**
 * @typedef LinemodOptions
 * @property {string} outputExtension including the leading dot
 */

/**
 * @param {string} content
 * @returns {string}
 */
const linemodApply = (content) => {
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
};

/**
 * @param {string} filePath
 * @param {LinemodOptions} options
 * @returns {Promise<void>}
 */
const linemodFile = async (filePath, { outputExtension }) => {
  const content = await readFile(filePath, 'utf8');

  const result = linemodApply(content);

  const outputFilePath = changeExtension(filePath, outputExtension);

  await writeFile(outputFilePath, result, 'utf8');
};

/**
 * @param {string[]} fileMap
 * @param {LinemodOptions} options
 * @returns {Promise<void>}
 */
const linemod = async (fileMap, options) => {
  await Promise.all(
    fileMap.map(filePath => linemodFile(filePath, options))
  );
};

module.exports = {
  linemodApply,
  linemodFile,
  linemod
};
