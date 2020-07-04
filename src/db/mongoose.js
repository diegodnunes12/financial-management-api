const mongoose = require('mongoose')

//mongoose.connect('mongodb://127.0.0.1:27017/financial',{
mongoose.connect('mongodb+srv://diegonunes:gfW0MMOWXLT25sPk@cluster0.c2f85.gcp.mongodb.net/financial?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
})

//mongodb+srv://diegonunes:<password>@cluster0.c2f85.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority