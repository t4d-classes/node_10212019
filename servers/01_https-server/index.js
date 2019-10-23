const fs = require("fs");
const https = require('https');
const url = require('url');
const queryString = require('querystring');

const serverOptions = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem")
};

const port = process.env.PORT || 8443;

const server = https.createServer(serverOptions, (req, res) => {

  const parsedUrl = url.parse(req.url);
  const parsedQueryString = queryString.parse(parsedUrl.query);

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`Hello ${parsedQueryString.name}!`);
});

server.listen(port, (err) => {

  if (err) {
    console.log(err);
    return;
  }

  console.log(`web server started on port ${port}`);
});

