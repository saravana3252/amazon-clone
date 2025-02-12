const mongoose = require("mongoose")
const cors = require("cors")
const express = require("express")
const nodemailer = require("nodemailer")
const productModel = require("./models/productsModel")
const checkoutModel = require("./models/checkoutModel")
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const app = express()

app.use(cors());


app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});


app.get("/dealOfTheDay",(req,res)=>{
    productModel.find({isDealOfTheDay:true}).then((data)=>{
      res.send(data)
    }).catch((err)=>{
      res.send({message:"some problem"})
    })
  })


app.get("/featuredHomeProducts",(req,res)=>{
  productModel.find({$and:[{category:"HomeProduct"},{isBestSeller:true}]}).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send({message:"some problem"})
  })
})

app.get("/featuredElectronics",(req,res)=>{
    productModel.find({$and:[{category:"Electronics"},{isBestSeller:true}]}).then((data)=>{
      res.send(data)
    }).catch((err)=>{
      res.send({message:"some problem"})
    })
  })

  app.get("/featuredGamingProducts",(req,res)=>{
    productModel.find({$and:[{category:"Gaming"},{isBestSeller:true}]}).then((data)=>{
      res.send(data)
    }).catch((err)=>{
      res.send({message:"some problem"})
    })
  })

  app.get("/featuredToyProducts",(req,res)=>{
    productModel.find({$and:[{category:"Toys"},{isBestSeller:true}]}).then((data)=>{
      res.send(data)
    }).catch((err)=>{
      res.send({message:"some problem"})
    })
  })

  app.get("/featuredClothingProducts",(req,res)=>{
    productModel.find({$and:[{category:"Clothing"},{isBestSeller:true}]}).then((data)=>{
      res.send(data)
    }).catch((err)=>{
      res.send({message:"some problem"})
    })
  })
  app.get("/homeProducts",(req,res)=>{
    productModel.find({category:"HomeProduct"}).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send({message:"some problem"})
    })
})

app.get("/electronics",(req,res)=>{
    productModel.find({category:"Electronics"}).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send({message:"some problem"})
    })
})

app.get("/gamingProducts",(req,res)=>{
    productModel.find({category:"Gaming"}).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send({message:"some problem"})
    })
})

app.get("/clothingProducts",(req,res)=>{
    productModel.find({category:"Clothing"}).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send({message:"some problem"})
    })
})

app.get("/toyProducts",(req,res)=>{
    productModel.find({category:"Toys"}).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send({message:"some problem"})
    })
})

app.get("/filter/gamingProducts/:value",(req,res)=>{
  let value = req.params.value
  productModel.find({$and:[{category:"Gaming"},{price:{$lte:value}}]}).then((data)=>{
      console.log(data)
      res.send(data)
  }).catch((err)=>{
      res.send(err)
      console.log(err)
  })
})

app.get("/filter/homeProducts/:value",(req,res)=>{
  let value = req.params.value
  productModel.find({$and:[{category:"HomeProduct"},{price:{$lte:value}}]}).then((data)=>{
      console.log(data)
      res.send(data)
  }).catch((err)=>{
      res.send(err)
      console.log(err)
  })
})

app.get("/filter/electronics/:value",(req,res)=>{
  let value = req.params.value
  productModel.find({$and:[{category:"Electronics"},{price:{$lte:value}}]}).then((data)=>{
      console.log(data)
      res.send(data)
  }).catch((err)=>{
      res.send(err)
      console.log(err)
  })
})

app.get("/filter/clothing/:value",(req,res)=>{
  let value = req.params.value
  productModel.find({$and:[{category:"Clothing"},{price:{$lte:value}}]}).then((data)=>{
      console.log(data)
      res.send(data)
  }).catch((err)=>{
      res.send(err)
      console.log(err)
  })
})

app.get("/filter/toys/:value",(req,res)=>{
  let value = req.params.value
  productModel.find({$and:[{category:"Toys"},{price:{$lte:value}}]}).then((data)=>{
      console.log(data)
      res.send(data)
  }).catch((err)=>{
      res.send(err)
      console.log(err)
  })
})

app.get("/filterRating/gamingProducts/:value",(req,res)=>{
  let value = req.params.value
  productModel.find({$and:[{category:"Gaming"},{ratingNum:{$gte:value}}]}).then((data)=>{
      res.send(data)
  }).catch((err)=>{
      res.send(err)
      console.log(err)
  })
})

app.get("/filterRating/homeProducts/:value",(req,res)=>{
  let value = req.params.value
  productModel.find({$and:[{category:"HomeProduct"},{ratingNum:{$gte:value}}]}).then((data)=>{
      res.send(data)
  }).catch((err)=>{
      res.send(err)
      console.log(err)
  })
})

app.get("/filterRating/toys/:value",(req,res)=>{
  let value = req.params.value
  productModel.find({$and:[{category:"Toys"},{ratingNum:{$gte:value}}]}).then((data)=>{
      res.send(data)
  }).catch((err)=>{
      res.send(err)
      console.log(err)
  })
})

app.get("/filterRating/electronics/:value",(req,res)=>{
  let value = req.params.value
  productModel.find({$and:[{category:"Electronics"},{ratingNum:{$gte:value}}]}).then((data)=>{
      res.send(data)
  }).catch((err)=>{
      res.send(err)
      console.log(err)
  })
})

app.get("/filterRating/clothing/:value",(req,res)=>{
  let value = req.params.value
  productModel.find({$and:[{category:"Clothing"},{ratingNum:{$gte:value}}]}).then((data)=>{
      res.send(data)
  }).catch((err)=>{
      res.send(err)
      console.log(err)
  })
})

app.get("/search/:name",(req,res)=>{
  let name = req.params.name;
  productModel.find({name:{$regex:name,$options:"i"}}).limit(8).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    console.log(err)
  })
})

app.post("/checkout",(req,res)=>{
  let {userId,userName,userEmail,cartData,shippingAddress,paymentMethod,orderStatus="processing"} = req.body


 let totalAmount = 0;

       
 const productPromises = cartData.map((item) => {
     return productModel.findById(item.productId).then((product) => {
         if (product) {
             totalAmount += product.price * item.quantity;
         }
     }).catch((err) => {
         console.error("Error fetching product:", err);
     });
 });


 Promise.all(productPromises).then(() => {
     checkoutModel.create({
         userId: userId,
         userName:userName,
         cartData: cartData.map((item) => ({
             productId: item.productId,
             productName: item.productName,
             price: item.price,
             quantity:item.quantity,
             selectedSize:item.selectedSize
         })),
         shippingAddress,
         paymentMethod,
         totalAmount,
         orderStatus,
         paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
     })
     .then((checkout) => {
         const stockUpdatePromise = cartData.map(async (item)=>{
           await productModel.findByIdAndUpdate(item.productId,{
            $inc:{stock:-item.quantity}
           })
         })

         Promise.all(stockUpdatePromise)

         res.status(201).send({ message: "Checkout successful", checkout });
         const transporter = nodemailer.createTransport({
          service:"gmail",
          auth:{
            user:"sara18ec118@gmail.com",
            pass:process.env.GMAIL_PASS
          }
         })
         const mailOptions = {
          from:`"Amazon" <sara18ec118@gmail.com>`,
          to:userEmail,
          subject:"Your Order Has Been Successfully Placed!",
          html: `
          <p>Hi <strong>${userName}</strong>,</p>
          <p>Thank you for your order! We have received your order and it is now being processed.</p>
          <p><strong>Order Details:</strong></p>
          <ul>
            ${cartData.map(item => `
              <li>
                <strong>${item.productName}</strong> - ${item.quantity} x ₹${item.price} 
                ${item.selectedSize ? `(Size: ${item.selectedSize})` : ""}
              </li>
            `).join("")}
          </ul>
          <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
          <p><strong>Payment Method:</strong> ${paymentMethod}</p>
          <p>Thank you for shopping with us!</p>
          <p><em>Best regards,</em><br/>AMAZON</p>
        `
         }

         transporter.sendMail(mailOptions,(err,info)=>{
          if(!err){
            res.send({message:"email sent"})
          }
          else{
            res.send({message:err})
          }
         })
     })
     .catch((error) => {
         console.error("Error during checkout creation:", error);  
         res.status(500).send({ message: "Error during checkout" });
     });
 })
 .catch((error) => {
     console.error("Error calculating total amount:", error);  
     res.status(500).send({ message: "Error calculating total amount" });
 });
})

app.post("/create-checkout-session", (req, res) => {
  const { cartData, shippingAddress, userId,userName,userEmail } = req.body;

  let totalAmount = 0;
  
 
  cartData.forEach((item) => {
    totalAmount += item.price * item.quantity;
  });

  stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: cartData.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.productName,
          description: item.description,
        },
        unit_amount: item.price * item.quantity * 100, 
      },
      quantity: 1, 
    })),
    mode: "payment",
    success_url:`${process.env.STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: process.env.STRIPE_CANCEL_URL,
    metadata: {
      userId: userId,
      userName:userName,
      userEmail:userEmail,
      cartData: JSON.stringify(cartData),
      shippingAddress: JSON.stringify(shippingAddress),
    },
  })
    .then((session) => {
      console.log("Stripe session created:", session); 
      res.status(200).send({ sessionId: session.id });
    })
    .catch((error) => {
      console.error("Error creating Stripe checkout session:", error); 
      res.status(500).send({ message: "Failed to create checkout session", error: error.message });
    });
});


app.get("/success", (req, res) => {
  const sessionId = req.query.session_id;

  if (!sessionId) {
    return res.status(400).send("Session ID missing.");
  }

  
  stripe.checkout.sessions.retrieve(sessionId)
    .then((session) => {
      console.log("Stripe session details:", session);  

      
      if (session.payment_status === "paid") {
        const userId = session.metadata.userId;
        const userName = session.metadata.userName
        const userEmail = session.metadata.userEmail
        const cartData = JSON.parse(session.metadata.cartData);
        const shippingAddress = JSON.parse(session.metadata.shippingAddress);

        console.log("UserId:", userId);
        console.log("UserName:", userName);
        console.log("Cart Data:", cartData);
        console.log("Shipping Address:", shippingAddress);

        
        const totalAmount = session.amount_total / 100;  

        checkoutModel.create({
          userId: userId,
          userName:userName,
          cartData: cartData.map(item => ({
              productId: item.productId,
              productName: item.productName,
              price: item.price,
              quantity:item.quantity,
              selectedSize:item.selectedSize
          })),
          shippingAddress: shippingAddress,
          paymentMethod: "ONLINE",
          paymentStatus: "Paid",  
          orderStatus:"processing",
          totalAmount: totalAmount,
        })
        .then(() => {
          const stockUpdatePromise = cartData.map(async (item)=>{
            await productModel.findByIdAndUpdate(item.productId,{
             $inc:{stock:-item.quantity}
            })
          })
 
          Promise.all(stockUpdatePromise)
          res.send("Payment was successful. Thank you for your purchase!");
          const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
              user:"sara18ec118@gmail.com",
              pass:process.env.GMAIL_PASS
            }
           })
           const mailOptions = {
            from:`"Amazon" <sara18ec118@gmail.com>`,
            to:userEmail,
            subject:"Your Order Has Been Successfully Placed!",
            html: `
            <p>Hi <strong>${userName}</strong>,</p>
            <p>Thank you for your order! We have received your order and it is now being processed.</p>
            <p><strong>Order Details:</strong></p>
            <ul>
              ${cartData.map(item => `
                <li>
                  <strong>${item.productName}</strong> - ${item.quantity} x ₹${item.price} 
                  ${item.selectedSize ? `(Size: ${item.selectedSize})` : ""}
                </li>
              `).join("")}
            </ul>
            <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
            <p>Thank you for shopping with us!</p>
            <p><em>Best regards,</em><br/>AMAZON</p>
          `
           }
  
           transporter.sendMail(mailOptions,(err,info)=>{
            if(!err){
              res.send({message:"email sent"})
            }
            else{
              res.send({message:err})
            }
           })    
        })
        .catch((error) => {
          console.error("Error saving checkout data:", error);
          res.status(500).send("An error occurred while processing the checkout.");
        });
      } else {
        console.log("Payment status is not paid. Status:", session.payment_status);
        res.send("Payment was not completed. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error retrieving Stripe session:", error);
      res.status(500).send("An error occurred during payment processing.");
    });
});


app.get("/cancel", (req, res) => {
  console.log("Payment was cancelled by the user.");

  
  res.send("Payment was cancelled. Please try again.")
 
});



app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET; 
  const sig = req.headers["stripe-signature"];

  let event;

  try {
   
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    console.log("Webhook verified:", event);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

 
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("Payment successful, session details:", session);

    
    const userId = session.metadata.userId;
    const userName = session.metadata.userName;
    const userEmail = session.metadata.userEmail;
    const cartData = JSON.parse(session.metadata.cartData);
    const shippingAddress = JSON.parse(session.metadata.shippingAddress);

    
    const totalAmount = session.amount_total / 100; 

   
    checkoutModel.create({
      userId:userId,
      userName:userName,
      cartData: cartData.map(item => ({
          productId: item.productId,
          productName: item.productName,
          price: item.price,
          quantity:item.quantity,
          selectedSize:item.selectedSize
      })),
      shippingAddress: shippingAddress,
      paymentMethod: "ONLINE",
      paymentStatus: "Paid",
      orderStatus:"processing",
      totalAmount: totalAmount,
    })
    .then(() => {
      const stockUpdatePromise = cartData.map(async (item)=>{
        await productModel.findByIdAndUpdate(item.productId,{
         $inc:{stock:-item.quantity}
        })
      })

      Promise.all(stockUpdatePromise)
      console.log("Checkout data saved successfully.");
      const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
          user:"sara18ec118@gmail.com",
          pass:process.env.GMAIL_PASS
        }
       })
       const mailOptions = {
        from:`"Amazon" <sara18ec118@gmail.com>`,
        to:userEmail,
        subject:"Your Order Has Been Successfully Placed!",
        html: `
        <p>Hi <strong>${userName}</strong>,</p>
        <p>Thank you for your order! We have received your order and it is now being processed.</p>
        <p><strong>Order Details:</strong></p>
        <ul>
          ${cartData.map(item => `
            <li>
              <strong>${item.productName}</strong> - ${item.quantity} x ₹${item.price} 
              ${item.selectedSize ? `(Size: ${item.selectedSize})` : ""}
            </li>
          `).join("")}
        </ul>
        <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
        <p>Thank you for shopping with us!</p>
        <p><em>Best regards,</em><br/>AMAZON</p>
      `
       }

       transporter.sendMail(mailOptions,(err,info)=>{
        if(!err){
          res.send({message:"email sent"})
        }
        else{
          res.send({message:err})
        }
       })
   })
    .catch((error) => {
      console.error("Error saving checkout data:", error);
      res.status(500).send("An error occurred while processing the checkout.");
      return;
    });
  }
  res.status(200).send("Webhook received.");
}); 

app.get("/orders/:id",(req,res)=>{
  let userId = req.params.id
  checkoutModel.find({userId:userId}).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
})

app.get("/admin/products-list",(req,res)=>{
  productModel.find().then((data)=>{
    res.send(data)
  }).catch((err)=>{
    console.log(err)
  })
})

app.post("/admin/update-products",(req,res)=>{
  let newProducts = req.body
  productModel.create(newProducts).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    console.log(err)
  })
})

app.delete("/admin/delete-products/:name",(req,res)=>{
  productModel.deleteOne({name:req.params.name}).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    console.log(err)
  })
})

app.get("/admin/orders-list",(req,res)=>{
  checkoutModel.find().then((data)=>{
    res.send(data)
  }).catch((err)=>{
    console.log(err)
  })
})

app.get("/checkout",(req,res)=>{
  checkoutModel.find().then((data)=>{
    res.send(data)
  }).catch((err)=>{
    console.log(err)
  })
})

app.put("/updatepaymentstatus/:orderid/:paymentstatus",(req,res)=>{
  let paymentstatus=req.params.paymentstatus;
  checkoutModel.updateOne({_id:req.params.orderid},{$set:{paymentStatus:paymentstatus}}).then((data)=>{
    res.send({message:"Payment Status Updated"})
  }).catch((err)=>{
    res.send({meesage:err})
  })
})

app.put("/updateorderstatus/:orderid/:orderstatus",(req,res)=>{
  let orderstatus=req.params.orderstatus;
  checkoutModel.updateOne({_id:req.params.orderid},{$set:{orderStatus:orderstatus}}).then((data)=>{
    res.send({message:"Order Status Updated"})
  }).catch((err)=>{
    res.send({meesage:err})
  })
})

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("db connected")
}).catch((err)=>{
    console.log(err)
})


const PORT = process.env.PORT || 8000 
app.listen("8000",()=>{
    console.log(`connected to server ${PORT}`)
})