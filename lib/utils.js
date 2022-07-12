import pathModule from 'node:path';

/**
 * @param {string} filePath
 * @param {string} ext
 * @returns {string}
 */
export function changeExtension (filePath, ext) {
  const { dir, name } = pathModule.parse(filePath);
  return pathModule.format({ dir, name, ext });
}
