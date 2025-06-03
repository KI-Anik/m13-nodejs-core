const http = require('http')
const path = require('path')
const fs = require('fs')
const { error } = require('console')
const port = 3000
const filepath = path.join(__dirname, './db/todo.json')

const server = http.createServer((req, res) => {
    // console.log(req.url, 'method is', req.method)

    const url = new URL(req.url, `http://${req.headers.host}`)
    // console.log(url)

    const pathname = url.pathname
    // console.log(pathname, 'pathname')

    //  GET all todos
    if (pathname === '/todos' && req.method === 'GET') {
        const data = fs.readFileSync(filepath, { encoding: 'utf-8' })
        res.writeHead(201, {
            "content-type": "application/json"
        })

        // res.end('all todos display now')
        res.end(data)
    }
    // POST new todo
    else if (pathname === '/todos/create' && req.method === 'POST') {
        let newPost = ""

        req.on('data', (chunk) => {
           newPost += chunk

        })

        req.on('end', () => {
            // console.log( 'datadata', data)
            // const todo = JSON.parse(data)
            // console.log("new", newPost)
            
            const { title, body } = JSON.parse(newPost)
            // console.log({ title, body })

            const createdAt = new Date().toLocaleString()

            const allToDos = fs.readFileSync(filepath, { encoding: 'utf-8' })
            const parsedAllTodos = JSON.parse(allToDos)
            // console.log(parsedAllTodos)

            parsedAllTodos.push({ title, body, createdAt })
            fs.writeFileSync(filepath, JSON.stringify(parsedAllTodos, null, 2), { encoding: 'utf-8' })

            res.end(JSON.stringify(parsedAllTodos, null, 2))

        })

    }
    //  search data 
    else if (pathname === '/todo' && req.method === 'GET') {
        //  console.log(req.url , 'from single todo')
        const title = url.searchParams.get('title')

        const data = fs.readFileSync(filepath, { encoding: 'utf-8' })
        const parsedData = JSON.parse(data)
        const todo = parsedData.find((single_todo) => single_todo.title === title)
        const strTodo = JSON.stringify(todo)

        res.writeHead(200, {
            "content-type": "application/json"
        })

        res.end(strTodo)
    }
    // update data = pathch : http://localhost:3000/todo/update?title=faridpur
    else if(pathname === '/todo/update' && req.method === 'PATCH'){
        const title = url.searchParams.get('title')
        console.log(title)

        let updateData = ''
        req.on('data', (chunk)=>{
            updateData += chunk;

            console.log('data 2 ', updateData)
        })

        req.on('end',()=>{
            if(!updateData){
              return res.end(JSON.stringify({
                    error : 'emty request body'
                }))
            }
            const {body} = JSON.parse(updateData)

            const allToDos = fs.readFileSync(filePath, {encoding: 'utf-8'})
            const parsedAllTodos = JSON.parse(allToDos)

            const todoIndex = parsedAllTodos.findIndex((single_todo)=> single_todo.title === title)
            
            parsedAllTodos[todoIndex].body = body

            fs.writeFileSync(filePath, JSON.stringify(parsedAllTodos, null, 2), {
                encoding: 'utf-8'
            })

            res.end(JSON.stringify({title, body, createdAt : parsedAllTodos[todoIndex].createdAt}))
        })
    }

    else {
        res.end('Route not found')
    }
});

server.listen(port, '127.0.0.1', () => {
    console.log(`server running on port ${port}`)
})