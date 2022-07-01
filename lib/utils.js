'use strict';

const pathModule = require('node:path');

/**
 * @param {string} filePath
 * @param {string} ext
 * @returns {string}
 */
const changeExtension = (filePath, ext) => {
  const { dir, name } = pathModule.parse(filePath);
  return pathModule.format({ dir, name, ext });
};

module.exports = {
  changeExtension
};
