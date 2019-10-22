const fs = require('fs');

// example of reading a file
fs.readFile('./a.txt', 'utf-8', (err, data) => {

  if (err) {
    console.log(err);
  }

  console.log(data);

});

// example of writing a file
fs.writeFile('./c.txt', 'test data', 'utf-8', (err) => {

  if (err) {
    console.log(err);
  }

});