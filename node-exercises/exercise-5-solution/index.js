const { createAppServer } = require('./server');

const config = require('./config');


createAppServer(config).listen(config.port, (err) => {

  if (err) {
    console.log(err);
    return;
  }

  console.log(`web server started on port ${config.port}`);

});