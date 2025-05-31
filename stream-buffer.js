const fs = require('fs')

// fs.readFile('./helow.txt', { encoding: 'utf-8' },
//     (err, data) => {
//         if (err) {
//             console.log('something wrong from readfile', err);
//             return;
//         };

//         fs.writeFile('./second.txt', data, { encoding: 'utf-8' },
//             (err) => {
//                 if (err) {
//                     console.log('error from writeFile', err);
//                     return;
//                 }
//                 console.log('written successfully');
//             }
//         );
//     }
// );


const readStream = fs.createReadStream('./helow.txt', { encoding: 'utf-8' })
const writeStream = fs.createWriteStream('./second.txt', { encoding: 'utf-8' })

readStream.on('data', (data) => {
    console.log(data)

    writeStream.write(data, (err) => {
        if (err) {
            throw Error('error from writestream', err)
        }
    });
});

readStream.on('error', (err) => {
    if (err) {
        throw Error('error from readstream', err)
    }
});

// writeStream another error handle method
writeStream.on('error', (err) => {
    if (err) {
        throw Error('error', err)
    };
});

readStream.on('end', () => {
    console.log('reading ended');
    writeStream.end()
})

writeStream.on('finish', () => {
    console.log('writting finished')
})