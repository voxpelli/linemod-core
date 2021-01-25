/// <reference types="node" />
/// <reference types="mocha" />
/// <reference types="chai" />

'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const should = chai.should();

const {
  linemodApply,
} = require('..');

describe('linemodApply()', function () {
  it('should throw on missing argument', () => {
    // @ts-ignore
    should.Throw(() => linemodApply(), TypeError, 'Requires content to be a string to apply linemod');
    // @ts-ignore
    should.Throw(() => linemodApply(false), TypeError, 'Requires content to be a string to apply linemod');
    // @ts-ignore
    // eslint-disable-next-line unicorn/no-null
    should.Throw(() => linemodApply(null), TypeError, 'Requires content to be a string to apply linemod');
    // @ts-ignore
    should.Throw(() => linemodApply(123), TypeError, 'Requires content to be a string to apply linemod');
    // @ts-ignore
    should.Throw(() => linemodApply(() => {}), TypeError, 'Requires content to be a string to apply linemod');
    // @ts-ignore
    should.Throw(() => linemodApply({}), TypeError, 'Requires content to be a string to apply linemod');
  });

  it('should return  string on correct argument', () => {
    linemodApply('foo').should.be.a('string');
  });

  it('should return the content as unmodified, when there are no modifications', () => {
    linemodApply('foo').should.equal('foo');
  });

  it('should keep all whitespaces when there are no modifications', () => {
    linemodApply('  fo   o\n\n').should.equal('  fo   o\n\n');
  });

  it('should support replace-with mod', () => {
    linemodApply(`
      first
      second // linemod-replace-with: replaced
      third
    `).should.equal(`
      first
      replaced
      third
`);
  });

  it('should support prefix-with mod', () => {
    linemodApply(`
      first
      second // linemod-prefix-with: prefixed
      third
    `).should.equal(`
      first
      prefixed second
      third
`);
  });

  it('should support remove mod', () => {
    linemodApply(`
      first
      second // linemod-remove
      third
    `).should.equal(`
      first
      third
`);
  });

  it('should handle whitespace when modded', () => {
    linemodApply(`

      foo  oof     // linemod-prefix-with: prefixed
      bar   car   yar
      abc-xyz    // linemod-remove


      second // linemod-replace-with: replaced
      third

`).should.equal(`

      prefixed foo  oof
      bar   car   yar


      replaced
      third

`);
  });

  it('should handle mod at last line', () => {
    linemodApply(`
      first
      second
      third // linemod-remove
`).should.equal(`
      first
      second
`);
  });
});
