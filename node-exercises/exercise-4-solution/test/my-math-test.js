const { expect } = require('chai');

const { add, subtract } = require('../my-math');

describe('my math tests', () => {

  it('add numbers', () => {

    const result = add(1,2);

    expect(result).to.equal(3);

  });

  it('subtract numbers', () => {

    const result = subtract(1,2);

    expect(result).to.equal(-1);

  });

});