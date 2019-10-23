const http = require('http');
const url = require('url');
const queryString = require('querystring');

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {

  const parsedUrl = url.parse(req.url);
  const parsedQueryString = queryString.parse(parsedUrl.query);

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`Hello ${parsedQueryString.name}!`);
});

server.listen(port, () => {
  console.log(`web server started on port ${port}`);
});

