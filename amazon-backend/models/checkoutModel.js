const mongoose = require("mongoose")

const checkoutSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    cartData:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"products",
                required:true
            },
            productName:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            quantity:{
                type:Number,
            },
            selectedSize:{
                type:String
            }
            
        }
    ],
    shippingAddress:{
        name:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        zipCode:{
            type:Number,
            required:true
        },
        country:{
            type:String,
            required:true
        },
    },
    paymentMethod:{
        type:String,
        enum:["COD","ONLINE"],
        required:true
    },
    paymentStatus:{
        type:String,
        enum:["Pending","Paid"],
        default:"Pending"
    },
    orderStatus:{
        type:String,
        enum:["processing", "shipped", "dispatched", "delivered"],
        default:"processing"
    },
    totalAmount:{
        type:Number,
        required:true
    }
},{timestamps:true})

let checkoutModel = mongoose.model("checkouts",checkoutSchema)

module.exports = checkoutModel