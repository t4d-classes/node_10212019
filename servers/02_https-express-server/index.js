const fs = require("fs");
const https = require("https");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.header("Content-type", "text/html");
  return res.end("<h1>Hello, World!</h1>");
});
  
https.createServer({
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem")
}, app).listen(4343);

