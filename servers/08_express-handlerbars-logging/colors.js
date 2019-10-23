'use strict';

class Colors {

  constructor() {
    this._colors = ['red','green','blue'];
  }

  allColors() {
    return this._colors.concat();
  }

  appendColor(color) {
    this._colors = this._colors.concat(color);
    return this;
  }

  removeColor(color) {
    this._colors = this._colors.filter(c => c !== color);
    return this;
  }

};

module.exports = Colors;