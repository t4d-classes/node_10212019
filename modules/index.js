
// const utils = require('./utils');
const { add, multiply } = require('./utils');

console.log(add(1,2));

console.log(__dirname);
console.log(__filename);

console.log(require('./config.json').port);