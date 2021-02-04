/// <reference types="node" />
/// <reference types="mocha" />
/// <reference types="chai" />

'use strict';

const chai = require('chai');

chai.should();

const pathModule = require('path');

const {
  changeExtension,
} = require('../lib/utils');

describe('utils', function () {
  describe('changeExtension()', () => {
    it('should change the file extension', () => {
      changeExtension('index.js', '.foo').should.equal('index.foo');
    });
    it('should handle absolute paths', () => {
      const base = pathModule.sep === '\\'
        ? 'C:\\yet\\another\\long-path\\to\\a\\file\\'
        : '/yet/another/long-path/to/a/file/';

      changeExtension(base + 'index.js', '.foo').should.equal(base + 'index.foo');
    });
  });
});
