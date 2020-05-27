'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');
const ApiRouting = require('./api');

const STATIC_PATH = path.join(process.cwd(), '/client/build');

const MIME_TYPES = {
  html: 'text/html; charset=UTF-8',
  js: 'application/javascript; charset=UTF-8',
  json: 'application/json',
  css: 'text/css',
  png: 'image/png',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
  plain: 'text/plain',
};

const serveFile = name => {
  const filePath = path.join(STATIC_PATH, name);

  if (!filePath.startsWith(STATIC_PATH)) {
    console.log(`Can't be served: ${name}`);
    return null;
  }

  const stream = fs.createReadStream(filePath);
  console.log(`Served: ${name}`);

  return stream;
};



http.createServer((req, res) => {
  const query = req.url;
  const fileExt = path.extname(query).substring(1);


  //If there an API call like '/api/*', goto api
  //If there non-file get call, send index, that cause client side routing
  //In other cases send file

  if (fileExt === '' && /^\/api\/\D*$/.test(query)) {

    const some = ApiRouting(req);

    res.writeHead(200, { 'Content-Type': MIME_TYPES.json });
    console.log(some + ' index');
    res.end(JSON.stringify(some));



  } else if (fileExt === '') {
    res.writeHead(200, { 'Content-Type': MIME_TYPES.html });
    const stream = serveFile('index.html');

    if (stream) stream.pipe(res);

  } else {
    const mimeType = MIME_TYPES[fileExt] || MIME_TYPES.plain;
    res.writeHead(200, { 'Content-Type': mimeType });
    const stream = serveFile(query);
    if (stream) stream.pipe(res);
  }

}).listen(process.env.PORT || 8000);
