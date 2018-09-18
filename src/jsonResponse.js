const respond = (request, response, status, type, object) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(object);
  response.end();
};

const success = (request, response, type) => {
  // create a response object with a id and message
  const responseObj = {
    message: 'This is a succesful response',
  };

  // if the type is XML, create a XML response
  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseObj.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, type, responseXML);
  }

  // otherwise, create a JSON response
  const responseJSON = JSON.stringify(responseObj);
  return respond(request, response, 200, type, responseJSON);
};

const badRequest = (request, response, type, params) => {
  // if parameters are met
  if (params === 'valid=true') {
    const responseObj = {
      message: 'You have met the requirements.',
    };

    if (type[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseObj.message}</message>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 200, type, responseXML);
    }

    const responseJSON = JSON.stringify(responseObj);
    return respond(request, response, 200, type, responseJSON);
  }

  // if not
  const responseObj = {
    id: 'badRequest',
    message: 'Missing valid query parameter set to true.',
  };
  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${responseObj.id}</id>`;
    responseXML = `${responseXML} <message>${responseObj.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 400, type, responseXML);
  }

  const responseJSON = JSON.stringify(responseObj);
  return respond(request, response, 400, type, responseJSON);
};

const unauthorized = (request, response, type, params) => {
  // if parameters are met
  if (params === 'loggedIn=yes') {
    const responseObj = {
      message: 'You have access to view this page.',
    };

    if (type[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseObj.message}</message>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 200, type, responseXML);
    }

    const responseJSON = JSON.stringify(responseObj);
    return respond(request, response, 200, type, responseJSON);
  }

  // if not
  const responseObj = {
    id: 'unauthorized',
    message: 'Missing loggedIn query parameter set to yes.',
  };
  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${responseObj.id}</id>`;
    responseXML = `${responseXML} <message>${responseObj.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 401, type, responseXML);
  }

  const responseJSON = JSON.stringify(responseObj);
  return respond(request, response, 401, type, responseJSON);
};

const forbidden = (request, response, type) => {
  const responseObj = {
    id: 'forbidden',
    message: 'You do not have access to this content.',
  };

  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${responseObj.id}</id>`;
    responseXML = `${responseXML} <message>${responseObj.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 403, type, responseXML);
  }

  const responseJSON = JSON.stringify(responseObj);
  return respond(request, response, 403, type, responseJSON);
};

const internal = (request, response, type) => {
  const responseObj = {
    id: 'internalError',
    message: 'Internal Server Error. Something went wrong.',
  };

  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${responseObj.id}</id>`;
    responseXML = `${responseXML} <message>${responseObj.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 500, type, responseXML);
  }

  const responseJSON = JSON.stringify(responseObj);
  return respond(request, response, 500, type, responseJSON);
};

const notImplemented = (request, response, type) => {
  const responseObj = {
    id: 'notImplemented',
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
  };

  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${responseObj.id}</id>`;
    responseXML = `${responseXML} <message>${responseObj.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 501, type, responseXML);
  }

  const responseJSON = JSON.stringify(responseObj);
  return respond(request, response, 501, type, responseJSON);
};

const notFound = (request, response, type) => {
  const responseObj = {
    id: 'notFound',
    message: 'The page you are looking for was not found.',
  };

  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${responseObj.id}</id>`;
    responseXML = `${responseXML} <message>${responseObj.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 404, type, responseXML);
  }

  const responseJSON = JSON.stringify(responseObj);
  return respond(request, response, 404, type, responseJSON);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
