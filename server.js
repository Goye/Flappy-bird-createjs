#!/usr/bin/env node

var http = require('http'),
    path = require('path'),
    fs   = require('fs'),
    url  = require('url'),
    open = require("open"),
    port = 8080;

var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};
 
/**
 * File verification
 * @param  {String} filePath route of the file
 * @param  {Object} response of server
 */

function getFile(filePath,res){
  fs.exists(filePath, function(exists) {
    if(exists){
      var mimeType = mimeTypes[path.extname(filePath).split(".")[1]];
      res.writeHead(200, mimeType);

      var fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      /** 404 message error */
      res.write('404 Not Found\n');
      res.end();
      return;
    }
  });
}
 
/** handle HTTP requests */
function requestHandler(request, response) {

  /** Get the current route */
  var route = url.parse(request.url).pathname;
  /** Set the default route */
      route = route === "/" ? "index.html": route;
  /** make the path */
  var filename = path.join(process.cwd(), route);

  getFile(filename, response);

}

/** Start the server */
var server = http.createServer(requestHandler);
 
/** port of the server */
server.listen(port);
console.log("Server is listening on "+port);
