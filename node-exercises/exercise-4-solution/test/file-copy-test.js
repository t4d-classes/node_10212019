const { expect } = require('chai');
const fs = require('fs');
const mockFs = require('mock-fs');

const { fileCopy } = require('../file-copy');

describe('file copy tests', () => {

  const mockFileData = 'Mock Data!';

  beforeEach(() => {
    mockFs({
      'input.txt': mockFileData,
    });
  });


  it('should read content', done => {

    fileCopy('input.txt', 'output.txt').then(() => {

      fs.readFile('output.txt', 'utf8', (err, data) => {
        expect(data).to.be.string(mockFileData);
        done();
      });

    });

  });


  afterEach(() => {
    mockFs.restore();
  });




});