const { read } = require('fs');
const http = require('http');

let app = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!\n');
});

app.listen(3000, '127.0.0.1');
