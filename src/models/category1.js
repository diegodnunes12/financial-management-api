var mongoose = require("mongoose")

// Get the Schema constructor
var Schema = mongoose.Schema

// Using Schema constructor, create a ProductSchema
var CategorySchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    }
})

// Create model from the schema
var category = mongoose.model("category", CategorySchema);

// Export model
module.exports = category;