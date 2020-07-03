const express = require('express')
require('./db/mongoose')
const orderRouter = require('./routes/order')
const categoryRouter = require('routes/category')

const app = express()

app.use(express.json())
app.use(orderRouter)
app.use(categoryRouter)

app.get('', (req, res) => {
    
    res.send('a')

})

//const host = '127.0.0.1'
const port = process.env.port || 3000

app.listen(port, () => {
    console.log(`Server up at port:${port}`)
})