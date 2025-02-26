const mongoose = require("mongoose")

const addressSchema=mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    description:{
        type:String
    },

    price:{
        type:Number,
        required:true
    },
})



const productModel=mongoose.model("product",addressSchema)

module.exports=productModel





