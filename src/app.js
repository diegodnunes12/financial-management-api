const express = require('express')
require('./db/mongoose')
const orderRouter = require('./routes/order')

const app = express()

app.use(express.json())
app.use(orderRouter)

const host = '127.0.0.1'
const port = process.env.port || 3000

app.listen(port, host, () => {
    console.log(`Server up at http:${host}:${port}`)
})