const http = require('http')
const path = require('path')
const fs = require('fs')

const filepath = path.join(__dirname, './db/todo.json')

const server = http.createServer((req, res) => {
    //  GET all todos
    if (req.url === '/todos' && req.method === 'GET') {
        const data = fs.readFileSync(filepath, { encoding: 'utf-8' })
        res.writeHead(201, {
            "content-type": "application/json"
        })

        // res.end('all todos display now')
        res.end(data)
    }
    // POST new todo
    else if (req.url === '/todos/create' && req.method === 'POST') {
        let newPost = ""

        req.on('data', (chunk) => {
            data = newPost + chunk
        })

        req.on('end', () => {
            // console.log( 'datadata', data)
            // const todo = JSON.parse(data)

            const { title, body } = JSON.parse(data)
            // console.log({ title, body })

            const createdAt = new Date().toLocaleString()

            const allToDos = fs.readFileSync(filepath, { encoding: 'utf-8' })
            const parsedAllTodos = JSON.parse(allToDos)
            // console.log(parsedAllTodos)

            parsedAllTodos.push({ title, body, createdAt })
            fs.writeFileSync(filepath, JSON.stringify(parsedAllTodos, null, 2), {encoding: 'utf-8'})

            res.end(JSON.stringify(parsedAllTodos, null, 2))

        })

    } else {
        res.end('Route not found')
    }
});

server.listen(5000, '127.0.0.1', () => {
    console.log('server run on port 5000')
})