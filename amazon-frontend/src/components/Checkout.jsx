import { useContext, useState } from "react"
import { userContext } from "./context/userContext";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QX5XXATNE3jIpp9bvgMfJdRKu6haKZfHIxendRV9LMxzspPNsLBsZE9S9zdfhrXCY7651fuwPrC3rbD6ER6snJ800Tx1rrmhP');


function Checkout({cartData}){

    const loggedInData = useContext(userContext)

    const [step,setStep] = useState(1)

    const [isLoading,setIsLoading] = useState(false)

    const [shippingAddress,setShippingAddress] = useState({
        name:"",
        address:"",
        city:"",
        zipCode:"",
        country:""
    })

    const [paymentMethod,setPaymentMethod] =useState("COD")


    function nextStep(){
      setStep((prevstep)=>{
        return prevstep + 1
      })
    }

    function prevStep(){
      setStep((prevstep)=>{
        return prevstep - 1
      })
    }

   function handleInputChange(e){
       setShippingAddress((prevObj)=>{
        return {...prevObj,[e.target.name]:e.target.value}
       })
   }

   function handlePaymentMethod(value){
    setPaymentMethod(value)
   }

   let checkoutData = {
    userId : loggedInData.loggedUser.id,
    userName : loggedInData.loggedUser.name,
    cartData: cartData.map((item)=>({
       productId : item._id,
       productName: item.name,
       price : item.price
    })),
    shippingAddress,
    paymentMethod
   }

   function handleSubmit(e){
    e.preventDefault()
    console.log(checkoutData)
    if(!loggedInData.loggedUser){
        toast.error("User not found. Please log in to proceed.")
        return;
    }
        setIsLoading(true)

        if(step === 3){
        if(paymentMethod === "COD"){
           fetch("https://amazon-clone-backend-mxip.onrender.com/checkout",{
            method:"POST",
            body:JSON.stringify(checkoutData),
            headers:{
                "Content-Type":"application/json"
            }
           }).then((response)=>response.json()).then(()=>{
            toast.success("Order placed successfully with Cash on Delivery!")
            setShippingAddress({
                name:"",address:"",city:"",zipCode:"",country:""
            })
        }).catch((err)=>{
            toast.error("Failed to place order: " + err)
        })
        }
        else if(paymentMethod === "ONLINE"){
          fetch("https://amazon-clone-backend-mxip.onrender.com/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(checkoutData),
        })
          .then((response) => {
            return response.json().then((data) => {
              if (response.ok) {
                return data; 
              } else {
                throw new Error(data.message || "Failed to create Stripe checkout session");
              }
            });
          })
          .then((data) => {
            const sessionId = data.sessionId;
            return stripePromise
              .then((stripe) => stripe.redirectToCheckout({ sessionId }))
              .then((result) => {
                if (result.error) {
                  throw new Error(result.error.message);
                }
              });
          })
          .catch((error) => {
            toast.error("Payment failed: " + error.message);
          }).finally(()=>{
            setIsLoading(false)
          })
        }
      }
      else{
        nextStep()
      }
    
   }

    return (
        <>
         <div className="h-svh w-full py-10 bg-gray-200">
            <form className="max-w-4xl w-full bg-white mx-auto p-6" onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                 <h1 className="text-center font-semibold text-3xl mb-6">Shipping Address</h1>
                <div className="flex flex-col gap-4">
                    <input name="name" className="border border-gray-300 p-2 w-full outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Full Name" onChange={handleInputChange} value={shippingAddress.name} required></input>
                    <input name="address" className="border border-gray-300 p-2 w-full" type="text" placeholder="Address" onChange={handleInputChange} value={shippingAddress.address} required></input>
                    <input name="city" className="border border-gray-300 p-2 w-full" type="text" placeholder="City" onChange={handleInputChange} value={shippingAddress.city}  required></input>
                    <input name="zipCode" className="border border-gray-300 p-2 w-full" type="number" placeholder="Zip Code" onChange={handleInputChange} value={shippingAddress.zipCode} required></input>
                    <input name="country" className="border border-gray-300 p-2 w-full" type="text" placeholder="Country" onChange={handleInputChange} value={shippingAddress.country} required></input>
                </div>
                <div className="mt-6">
                    <button className="bg-orange-500 w-full p-3 rounded-lg font-medium text-white cursor-pointer" onClick={nextStep}>Next</button>
                </div>
                </>
              )}
               {
                step === 2 && (
                  <>
                   <div className="mt-6">
                    <h2 className="font-semibold text-lg">Select Payment Method</h2>
                    <div className="space-x-5 mt-2">
                        <label><input value="COD" checked={paymentMethod === "COD"} type="radio" onChange={()=>handlePaymentMethod("COD")}></input> Cash On Delivery</label>
                        <label><input value="ONLINE" checked={paymentMethod === "ONLINE"} type="radio" onChange={()=>handlePaymentMethod("ONLINE")}></input> Online Payment</label>
                    </div>
                </div>
                <div className="mt-6">
                    <button className="bg-orange-500 w-full p-3 rounded-lg font-medium text-white cursor-pointer" onClick={prevStep}>prev</button>
                </div>
                <div className="mt-6">
                    <button className="bg-orange-500 w-full p-3 rounded-lg font-medium text-white cursor-pointer" onClick={nextStep}>Next</button>
                </div>
                  </>
                )
               }
               {
                step === 3 && (
                  <>
                   <div className="mt-6">
                    <h2 className="font-semibold text-lg">Order Summery</h2>
                    <h3 className="font-semibold">Your Order</h3>
                    {
                      cartData.map((item)=>{
                        return (
                          <>
                          <p>{item.name},{item.price}</p>
                          </>
                        )
                      })
                    }
                    <h3 className="font-semibold">Shipping address</h3>
                    <p>{shippingAddress.name},{shippingAddress.address},{shippingAddress.city},{shippingAddress.zipCode},{shippingAddress.country}</p>
                <div className="mt-6">
                    <button className="bg-orange-500 w-full p-3 rounded-lg font-medium text-white cursor-pointer" onClick={prevStep}>prev</button>
                </div>
                <div className="mt-6">
                    <button className="bg-orange-500 w-full p-3 rounded-lg font-medium text-white cursor-pointer" >{isLoading ? "LOADING..." : "Confirm & Pay" }</button>
                </div>
                </div>
                  </>
                )
               }
               
            </form>
         </div>
        </>
    )
}


Checkout.propTypes = {
    cartData: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })).isRequired
};

export default Checkout