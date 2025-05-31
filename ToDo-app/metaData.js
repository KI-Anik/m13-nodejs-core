const http = require('http')

const data = [
    {
        "title": "Science Fiction Classic",
        "id": 101,
        "name": "Dune"
    },
    {
        "title": "Fantasy Epic",
        "id": 205,
        "name": "The Lord of the Rings"
    },
    {
        "title": "Mystery Thriller",
        "id": 312,
        "name": "Gone Girl"
    }
]

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)

    if (req.url === '/todos' && req.method === 'GET') {
        res.writeHead(201, {
            // "content-type" : "text/plain",
            // "content-type": "application/json",
            "content-type": "text/html",
            "email": "ph@gmail.com"
        })

        // res.setHeader("content-type" , "text/plain")
        // res.setHeader('email' , 'meta@gmail.com')
        // res.statusCode = 202

        // res.end('todos  now')
        // res.end(JSON.stringify(data))
        res.end(
            `<h1>hellow</h1>
            <h2>hellow</h2>
            <h3>hellow</h3>`
        )


    } else if (req.url === '/todos/create' && req.method === 'POST') {
        res.end('New todo added')
    } else {
        res.end('Route not found')
    }
});

server.listen(4000, '127.0.0.1', () => {
    console.log('server run on port 5000')
})