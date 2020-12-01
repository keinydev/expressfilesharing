/**
* This is a reusable method for fetching data. 
* @param  {string}    url       By default, url is equal to serviceURL by default, but you can send additional parameters
* @param  {string}    params    Params are for GET, but others methods can add new params
* @param  {string}    method    GET, POST, PUT, DELETE
* @param  {string}    type      It can be file, form or by default json. This represent the Content-Type
* @return {json}   Response from request
*/
async function request(url, params, method = 'GET', type = '') {
  
  const serviceURL = 'https://file.io';
  let contentType = '';

  switch (type)
  {
    case 'form':
      contentType = 'application/x-www-form-urlencoded';
      break;
    case 'file':
      contentType = 'multipart/form-data';
      break; 
    default:
     contentType = 'application/json';
      break;
  }
  
  const options = {
    method,
    headers: {
      'Content-Type': contentType
    }
  };

  if (params) {
    if (method === 'GET') {
      url += '?' + params;
    } else {
      url = ('' != url ? '?' + url : '');
      options.body = params; 
    }
  }

  try 
  {
    const response = await fetch(serviceURL + url, options);
  
    if (!response.ok) {
        const newResponse = `${response.status}`;
        return generateErrorResponse(newResponse);
    } 

    const result = await response.json();
    return result;
  }
  catch (err) {
     const newResponse = `An error has occured: ${err}`;
     return generateErrorResponse(newResponse); 
  }

}

/**
* In case we got an error, this function is going to store the error info
* @param  {string}    message     Error from fetch errors 
* @return {json}   Response with error info
*/
function generateErrorResponse(message) {
  return {
    status : 'error',
    message
  };
}

/**
* This function executes a fetch request with GET method
* @param  {string}    url       Additional parameters
* @param  {string}    params    Params for the request
* @return {json}   Response from request
*/
function getRequest(url, params) {
  return request(url, params);
}

/**
* This function executes a fetch request with POST method
* @param  {string}    url       Additional parameters
* @param  {string}    params    Params for the request
* @param  {string}    type      It can be file, form or by default empty (json content-type). 
* @return {json}   Response from request
*/
function postRequest(url, params, type = '') {
  return request(url, params, 'POST', type);
}

/**
* This function executes a fetch request with PUT method
* @param  {string}    url       Additional parameters
* @param  {string}    params    Params for the request
* @param  {string}    type      It can be file, form or by default empty (json content-type). 
* @return {json}   Response from request
*/
function putRequest(url, params, type = '') {
  return request(url, params, 'PUT');
}

/**
* This function executes a fetch request with DELETE method
* @param  {string}    url       Additional parameters
* @param  {string}    params    Params for the request
* @return {json}   Response from request
*/
function deleteRequest(url, params) {
  return request(url, params, 'DELETE');
}

export {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
};
