const fs = require('fs');

let content;

// example of reading a file
fs.readFile('./a.txt', 'utf-8', (err, data1) => {
  if (err) {
    console.log(err);
  }

  fs.readFile('./b.txt', 'utf-8', (err, data2) => {
    if (err) {
      console.log(err);
    }

    fs.writeFile('./c.txt', data1 + data2, 'utf-8', (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
  

});



// example of writing a file
