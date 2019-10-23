const fs = require('fs');

module.exports.fileCopy = (source, target) => {

  return new Promise(resolve => {

    const writeStream = fs.createWriteStream(target);

    writeStream.on('close', () => {
      resolve();
    });

    fs.createReadStream(source)
      .pipe(writeStream);

  });

};
