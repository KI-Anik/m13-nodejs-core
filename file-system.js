// synchronous file system
const fs = require('fs')

console.log('task 1')
const text = 'Learning node js file system'
fs.writeFileSync('./helow.txt', text)

console.log('task 3')

const data = fs.readFileSync('./helow.txt', {encoding : "utf-8"})
console.log('task 4')
console.log('task 2', data) 