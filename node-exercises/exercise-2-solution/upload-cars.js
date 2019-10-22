const fs = require('fs');
const commander = require('commander');
const superagent = require('superagent');

commander.option('-s, --source <type>', 'source file');

commander.parse(process.argv);

fs.readFile(commander.source, 'utf8', (err, data) => {

  if (err) {
    console.log(err);
    return;
  }

  Promise.all(JSON.parse(data).cars.map(car => {
    return superagent.post('http://localhost:3010/cars').send(car);
  })).then((results) => {
    console.log(`${results.length} cars posted`);
  });

});
