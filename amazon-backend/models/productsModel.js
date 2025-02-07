const mongoose = require("mongoose")


let productSchema = mongoose.Schema({
    id:{
       type:Number,
       required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    imageurl: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    sizes:{
        type:[String]
    },
    quantity:{
        type: Number,
        default:1
        
    },
    rating: {
        type: Number,
        default: 0 
    },
    ratingNum: {
        type: Number,
        default: 0 
    },
    ratingCount: {
        type: Number,
        default: 0 
    },
    reviews: {
        type: [String], 
        default: [] 
    },
    
    isNewArrival: { 
        type: Boolean,
         default: false 
    },
    isBestSeller: { 
        type: Boolean, 
        default: false 
    },
    isDealOfTheDay: { 
        type: Boolean,
         default: false 
   }

},{timestamps:true})

let productModel = mongoose.model("products",productSchema)

module.exports = productModel