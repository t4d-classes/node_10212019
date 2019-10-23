const { expect } = require('chai');
const mockFs = require('mock-fs');
const { getContent } = require('../content');

describe('sample tests', () => {

  beforeEach(() => {
    mockFs({
      'test.txt': 'Mock Data!',
    });
  });

  it('should be true', () => {

    expect(true).to.equal(true);

  });


  it('should read content', done => {

    getContent().then(content => {

      expect(content).to.be.string('Mock Data!');

      done();
    });

  });


  afterEach(() => {
    mockFs.restore();
  });




});