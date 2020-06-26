const http = require('http')

const host = '127.0.0.1'
const port = process.env.port || 3000

const server = http.createServer((req, res) => {
    res.end('Hello')
})

server.listen(port, host, () => {
    console.log(`Server up at http:${host}:${port}`)
})