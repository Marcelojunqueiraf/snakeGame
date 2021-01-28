const http = require('http');
let app = http.createServer((req, res) => {
    res.write(index)
    res.end('Hello World!\n');
});

app.listen(3000);
