'use strict';

const http = require('http');
const url = require('url');
const zlib = require('zlib');
const path = require('path');
const fs = require('fs');

const defaultFile = 'index.html';
const logFile = 'web.log';
const port = 3000;

try {

	fs.statSync(logFile);

	const { name: fileName, ext: fileExt } = path.parse(logFile);
	let i = 0;
	let nextLogFile;

	try {

		do {
			nextLogFile = `${fileName}_${++i}${fileExt}`;
		} while(fs.statSync(nextLogFile));

	} catch(err) {

		fs.renameSync(logFile, nextLogFile);
		console.log('log file was rotated');

	}

} catch(err) {

	console.log('no log file to rotate');

}

const log = entry => fs.appendFile(logFile, `${entry}\n`, 'utf8', err => err && console.log(err));
const error = entry => log(`error: ${entry}`);
const info = entry => log(`info: ${entry}`);

const server = http.createServer((req, res) => {

	req.originalUrl = req.url;
	req.url = url.parse(req.url, true);
	req.path = req.url.pathname === '/' ? defaultFile : req.url.pathname;

	let dirName = path.dirname(req.path);
	if (dirName.endsWith('/')) {
		dirName = dirName.slice(0, dirName.length - 1);
	}

	const reqFileName = path.format({
		dir: path.join(__dirname, 'www', dirName),
		base: path.basename(req.path)
	});

	const processBody = new Promise(resolve => {

		if (req.method === 'POST') {

			const reqBodyBuffers = []; 

			req.on('data', chunk => reqBodyBuffers.push(Buffer.from(chunk)));

			req.on('end', () => {

				console.log(Buffer.concat(reqBodyBuffers).toString('utf8'));

				resolve();

			});

		} else {
			resolve();
		}

	});

	const processFile = new Promise(resolve => {

		res.on('finish', () => {
			info(`${req.method} ${req.originalUrl}`);
			resolve();
		});

		const raw = fs.createReadStream(reqFileName);
		res.writeHead(200, { 'Content-Encoding': 'gzip' });
		raw.pipe(zlib.createGzip()).pipe(res);		

	});

	processBody.then(() => processFile);

});

server.listen(port, err => console.log(err || `web server started on port ${port}`));