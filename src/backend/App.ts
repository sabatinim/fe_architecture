import {IncomingMessage, ServerResponse} from "http";
const http = require('http');


http.createServer(function (req:IncomingMessage, res:ServerResponse) {
    res.write('Hello World!');
    res.end();
}).listen(8080);
