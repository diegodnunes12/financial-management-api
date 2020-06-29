const mongoose = require('mongoose')

const category = mongoose.model('category', {
    name:{
        type:String,
        required:true,
        trim:true
    }
})

module.exports = category