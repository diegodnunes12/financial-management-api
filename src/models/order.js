const mongoose = require('mongoose')
const validator = require('validator')
const { Decimal128, ObjectId } = require('mongodb')

const order = mongoose.model('order', {
    date:{
        type: Date,
        required: true,
        validator(value){
            if(!validator.Date(value)){
                throw new Error('Informe uma data válida')
            }
        }
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    value:{
        type:Decimal128,
        required:true,
        validator(value){
            if(!value.isCurrency(value)){
                throw new Error('Informe um valor válido')
            }
        }
    },
    revenue:{
        type:Boolean,
        required:true
    },
    settled:{
        type:Boolean,
        required:true
    },
    category_id:{
        type: ObjectId,
        ref: "category",
        required:true
        /* type: ObjectId,
        required:true */
    }
})

module.exports = order