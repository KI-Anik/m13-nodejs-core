const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)
    if (req.url === '/todos' && req.method === 'GET') {
        res.end('all todos display now')
    } else if (req.url === '/todos/create' && req.method === 'POST') {
        res.end('New todo added')
    } else {
        res.end('Route not found')
    }
});

server.listen(5000, '127.0.0.1', () => {
    console.log('server run on port 5000')
})