function express() {
  const middlewareFns = [];

  const _app = function(req, res) { middlewareFns.forEach(middlewareFn => middlewareFn(req, res)); };
  
  _app.use = function(middlewareFn) { middlewareFns.push(middlewareFn); };

  _app.listen = function(port, cb) {
    const http = require('http');
    const httpServer = http.createServer(this);
    httpServer.listen(port, cb);
  };

  return _app;
}

const app = express();

app.use((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });
  res.end('<!DOCTYPE html>\n<h1>Hello World</h1>');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
