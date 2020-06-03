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

const parseRequest = (req, callback) => {
  const query = req.url.slice(4);
  const path = query.split('&', 1).toString();
  const queryParams = new URLSearchParams(query.replace(path, ''));

  const params = {
    path,
    data: null,
    method: req.method,
  };

  let data = '';

  queryParams.forEach((value, key) => {
    params[key] = value;
  });

  req.on('data', chunk => {
    data += chunk;
  });

  req.on('end', () => {

    if (data) params.data = JSON.parse(data);
    console.log(params);

    callback(null, params);

  });
};

http.createServer((request, response) => {
  const query = request.url;
  const fileExt = path.extname(query).substring(1);

  //If there an API call like '/api/*', goto api
  //If there non-file get call, send index, that cause client side routing
  //In other cases send file

  if (fileExt === '' && /^\/api\/.*$/.test(query)) {

    parseRequest(request, (error, result) => {
      if (error) {
        console.log('error');
      } else {
        ApiRouting(result, (err, res) => {
          if (err) {
            console.error(err.stack);
          } else {
            response.writeHead(200);
            response.end(JSON.stringify(res.rows));
          }
        });
      }
    });

  } else if (fileExt === '') {
    response.writeHead(200, { 'Content-Type': MIME_TYPES.html });
    const stream = serveFile('index.html');

    if (stream) stream.pipe(response);

  } else {

    const mimeType = MIME_TYPES[fileExt] || MIME_TYPES.plain;
    response.writeHead(200, { 'Content-Type': mimeType });

    const stream = serveFile(query);
    if (stream) stream.pipe(response);
  }

}).listen(process.env.PORT || 8000);
