const EventEmiter = require('node:events')

class SchoolBell extends EventEmiter{}

const schoolRing = new SchoolBell();

schoolRing.on('ring', ()=>{
    console.log('ring bajtese')
})

schoolRing.on('broken', ()=>{
    console.log('ay hai, bhainga gese')
})

schoolRing.on('ring',()=>{
    console.log('second ring tin tin')
})

schoolRing.emit('ring', 'ring')
schoolRing.emit('broken')