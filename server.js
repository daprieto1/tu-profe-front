var http = require("http");
var express = require("express");
var path = require('path');
var app = express();
var port = process.env.PORT || 8081;

app.use(express.static(path.join(__dirname, 'dist')));

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)