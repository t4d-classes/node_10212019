const fs = require('fs');


const readFiles = (fileNames) => {
  return Promise.all(fileNames.map(fileName => {
    return new Promise(resolve => {
      fs.readFile(fileName, 'utf-8', (err, data) => {
        if (err) {
          console.log(err);
        }
        resolve(data);
      });
    });
  }));
};


const writeFileC = (content) => {
  return new Promise(resolve => {
    fs.writeFile('./c.txt', content, 'utf-8', (err) => {
      if (err) {
        console.log(err);
      }
      resolve();
    });
  });
};

readFiles(['a.txt','b.txt']).then(results => {
  return writeFileC(results.join(''));
});




// const readFileA = () => {

//   return new Promise(resolve => {
//     fs.readFile('./a.txt', 'utf-8', (err, data) => {
//       if (err) {
//         console.log(err);
//       }
//       resolve(data);
//     });
//   });
// };

// const readFileB = () => {

//   return new Promise(resolve => {
//     fs.readFile('./b.txt', 'utf-8', (err, data) => {
//       if (err) {
//         console.log(err);
//       }
//       resolve(data);
//     });
//   });
// };