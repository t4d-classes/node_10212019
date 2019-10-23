const fs = require('fs');

module.exports.getContent = () => {

  return new Promise((resolve, reject) => {
    fs.readFile('./test.txt', 'utf8', (err, content) => {
      if (err) {
        reject(err);
      }

      resolve(content);
    });
  });
  

};