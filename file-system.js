// synchronous file system
const fs = require('fs')

// console.log('task 1')
// const text = 'Learning node js file system'
// fs.writeFileSync('./helow.txt', text)

// console.log('task 3')

// const data = fs.readFileSync('./helow.txt', {encoding : "utf-8"})
// console.log('task 4')
// console.log('task 2', data) 

// asynchronous

let text1 = 'reWrite the text'
fs.writeFile('./helow.txt', text1, {encoding: 'utf-8'},
    (err)=>{
        if(err){
            console.log('inside writefile', err)
            return
        }
        console.log('written successfully')
    }
 )

const data2 = fs.readFile('./helow.txt', {encoding: 'utf-8'},
     (err, result)=>{
    if(err){
        console.log('error happen', err)
        return
    }
    text1 = result
    console.log('inside callback', result)
})
console.log('fs.readfile always return', data2) //In Node’s built-in callback API, fs.readFile() doesn’t return the file contents — it returns undefined immediately (because it kicks off an asynchronous I/O operation), and then later calls your callback with the data. 
