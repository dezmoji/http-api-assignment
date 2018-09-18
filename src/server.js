const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponse.js');
const jsonHandler = require('./jsonResponse.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  index: htmlHandler.getIndex,
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/forbidden': jsonHandler.forbidden,
  '/internal': jsonHandler.internal,
  '/notImplemented': jsonHandler.notImplemented,
  notFound: jsonHandler.notFound,
};

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);
  const acceptedTypes = request.headers.accept.split(',');
  if (urlStruct[parsedURL.pathname]) {
    if (parsedURL.pathname === '/badRequest' || parsedURL.pathname === '/unauthorize') {
      urlStruct[parsedURL.pathname](request, response, acceptedTypes, parsedURL.query);
    } else {
      urlStruct[parsedURL.pathname](request, response, acceptedTypes);
    }
  } else {
    urlStruct.notFound(request, response, acceptedTypes);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1:${port}`);
