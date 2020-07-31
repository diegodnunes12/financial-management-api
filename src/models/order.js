var mongoose = require("mongoose")
const validator = require('validator')
const { Decimal128, ObjectId } = require('mongodb')

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
var orderSchema = new Schema({
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
    category:{
        type: Schema.Types.ObjectId,
        ref: "category",
        required:true
    }
})

// Create model from the schema
var order = mongoose.model("order", orderSchema);

// Export model
module.exports = order;