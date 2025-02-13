import { useContext, useState } from "react"
import { userContext } from "./context/userContext";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';
import { loadStripe } from '@stripe/stripe-js';
import { Link, useNavigate} from "react-router-dom";

const stripePromise = loadStripe('pk_test_51QX5XXATNE3jIpp9bvgMfJdRKu6haKZfHIxendRV9LMxzspPNsLBsZE9S9zdfhrXCY7651fuwPrC3rbD6ER6snJ800Tx1rrmhP');


function Checkout({cartData}){

    const loggedInData = useContext(userContext)
    
    const navigate =useNavigate()

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
    userEmail : loggedInData.loggedUser.email,
    cartData: cartData.map((item)=>({
       productId : item._id,
       productName: item.name,
       price : item.price,
       quantity:item.quantity,
       selectedSize:item.selectedSize
    })),
    shippingAddress,
    paymentMethod,
    orderStatus: "processing",  

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
            navigate("/orders")
        }).catch((err)=>{
            toast.error("Failed to place order: " + err)
        }).finally(()=>{
          setIsLoading(false)
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
       <div className="min-h-svh w-full px-2 pt-12 lg:pt-0 lg:px-0 lg:py-6 bg-gray-50 flex justify-center lg:items-center">
  <form className="max-w-xl w-full h-full bg-white shadow-xl rounded-lg p-4 border border-gray-200" onSubmit={handleSubmit}>
   
    {step === 1 && (
      <>
        <h1 className="text-center font-extrabold text-3xl text-gray-800 mb-6">Shipping Address</h1>
        <div className="space-y-4">
          <input name="name" className="border border-gray-300 outline-none p-3 w-full rounded-md focus:ring-2 focus:ring-blue-500 transition" type="text" placeholder="Full Name" onChange={handleInputChange} value={shippingAddress.name} required />
          <input name="address" className="border border-gray-300 outline-none p-3 w-full rounded-md focus:ring-2 focus:ring-blue-500 transition" type="text" placeholder="Address" onChange={handleInputChange} value={shippingAddress.address} required />
          <div className="flex space-x-4">
            <input name="city" className="border border-gray-300 outline-none p-3 w-1/2 rounded-md focus:ring-2 focus:ring-blue-500 transition" type="text" placeholder="City" onChange={handleInputChange} value={shippingAddress.city} required />
            <input name="zipCode" className="border border-gray-300 outline-none p-3 w-1/2 rounded-md focus:ring-2 focus:ring-blue-500 transition" type="number" placeholder="Zip Code" onChange={handleInputChange} value={shippingAddress.zipCode} required />
          </div>
          <input name="country" className="border border-gray-300 outline-none p-3 w-full rounded-md focus:ring-2 focus:ring-blue-500 transition" type="text" placeholder="Country" onChange={handleInputChange} value={shippingAddress.country} required />
        </div>
        <button disabled={shippingAddress.name === "" ||shippingAddress.address === "" ||shippingAddress.country === "" || shippingAddress.zipCode === "" || shippingAddress.city === ""} className={`${shippingAddress.name === "" ||shippingAddress.address === "" ||shippingAddress.country === "" || shippingAddress.zipCode === "" || shippingAddress.city === "" ? "bg-gray-400 cursor-not-allowed" :"bg-blue-600 hover:bg-blue-700 cursor-pointer"} mt-6 w-full py-2.5 rounded-md font-medium text-white transition duration-300 shadow-md`} onClick={nextStep}>Next</button>
      </>
    )}


    {step === 2 && (
      <>
        <h2 className="text-center font-bold text-2xl text-gray-800 mb-6">Select Payment Method</h2>
        <div className="bg-gray-100 p-6 rounded-lg">
          <div className="flex flex-col space-y-4">
            <label className="flex items-center space-x-3 cursor-pointer bg-white shadow-sm p-4 rounded-md border border-gray-300 transition hover:shadow-md">
              <input value="COD" checked={paymentMethod === "COD"} type="radio" onChange={() => handlePaymentMethod("COD")} className="form-radio text-blue-600 h-5 w-5" />
              <span className="text-gray-700 text-lg font-medium">Cash On Delivery</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer bg-white shadow-sm p-4 rounded-md border border-gray-300 transition hover:shadow-md">
              <input value="ONLINE" checked={paymentMethod === "ONLINE"} type="radio" onChange={() => handlePaymentMethod("ONLINE")} className="form-radio text-blue-600 h-5 w-5" />
              <span className="text-gray-700 text-lg font-medium">Online Payment</span>
            </label>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <button className="bg-gray-500 hover:bg-gray-600 w-1/3 py-2 rounded-md text-white transition duration-300 cursor-pointer" onClick={prevStep}>Prev</button>
          <button className="bg-blue-600 hover:bg-blue-700 w-1/3 py-2 rounded-md text-white transition duration-300 cursor-pointer" onClick={nextStep}>Next</button>
        </div>
      </>
    )}


    {step === 3 && (
      <>
        <h2 className="font-bold text-2xl  text-gray-800 text-center mb-3">Order Summary</h2>
        <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
          <h3 className="font-semibold text-lg text-gray-800 mb-4 border-b pb-2">Your Order</h3>
          
          <div className="grid grid-cols-3 font-medium text-gray-700 bg-gray-200 p-3 rounded-md">
            <span>Item</span>
            <span className="text-center">Quantity</span>
            <span className="text-right">Price</span>
          </div>

          <ul>
            {cartData.map((item, index) => (
              <li key={index} className="grid grid-cols-3 py-2">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">{item.name}</span>
                  {item.category === "Clothing" && (
                    <span className="text-sm text-gray-500">Size: {item.selectedSize}</span>
                  )}
                </div>
                <span className="text-center font-medium text-gray-700">{item.quantity}</span>
                <span className="text-right pr-1 font-semibold text-gray-900">Rs {item.price * item.quantity}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-semibold text-lg text-gray-800 mt-6 border-t pt-2">Shipping Address</h3>
          <p className="text-gray-700 leading-relaxed">{shippingAddress.name}, {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.zipCode}, {shippingAddress.country}</p>
        </div>

        <div className="mt-3 flex justify-between">
          <button className="bg-gray-500 hover:bg-gray-600 w-1/3 py-2 rounded-md text-white transition duration-300 cursor-pointer" onClick={prevStep}>Prev</button>
          <button className="bg-green-600 hover:bg-green-700 w-1/3 py-2 rounded-md text-white transition duration-300 cursor-pointer">{isLoading ? "LOADING..." : "Place Order"}</button>
        </div>

        <Link to="/orders" className="mt-3 text-center bg-blue-500 hover:bg-blue-600 w-full py-2 rounded-md text-white transition duration-300 shadow-md block">Go to Orders</Link>
      </>
    )}
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