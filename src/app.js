const express = require('express')
const routers = require('./routes/routers')
require('./db/mongoose')

const app = express()

app.use(express.json())
app.use(routers.order)
app.use(routers.category)

app.get('', (req, res) => {
    
    res.send('Bem vindo!')

})

//const host = '127.0.0.1'
const port = process.env.port || 3000

app.listen(port, () => {
    console.log(`Server up at port: ${port}`)
})