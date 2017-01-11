export function slsResponse (status, body, callback): void{
  console.log('serverless response: ' + JSON.stringify(body));
  if (status !== 200) {
    //TODO: use es6 string formatting
    body = (typeof body === 'object') ? JSON.stringify(body) : body;
    callback(new Error('[' + status + '] ' + body));
  } else {
    callback(null, body);
  }
}
