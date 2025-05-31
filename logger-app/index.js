// console.log(process.argv)

const path = require('path')
const fs = require('fs')

const inputArg = process.argv.slice(2)
const text = inputArg.join(' ')
const timeStamp = new Date().toISOString()
const message = `${text} ${timeStamp} \n` 

if (!text) {
    console.log("❌ please provide a message")
    console.log('example : node index.js hello world')
    process.exit(1)
}

const filePath = path.join(__dirname, 'log.txt')
fs.appendFile(filePath, message, { encoding: 'utf-8' },
    () => {
        console.log('logger file added')
    })

console.log(filePath)

