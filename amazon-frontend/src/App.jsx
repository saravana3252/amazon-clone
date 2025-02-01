import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import GamingProdsList from "./components/GamingProdsList"
import ProductDescription from "./components/ProductDescription"
import Cart from "./components/Cart"
import { useEffect, useState } from "react"
import ElectronicsProdList from "./components/ElectronicProdsList"
import ClothingProdsList from "./components/ClothProdsList"
import HomeProdsList from "./components/HomeProdsList"
import ToyProdsList from "./components/ToyProdsList"
import Login from "./components/Login"
import Register from "./components/Register"
import { userContext } from "./components/context/userContext"
import Private from "./components/Private"
import Checkout from "./components/Checkout"
import SearchProdList from "./components/SearchProdsList"
import { ToastContainer, toast } from "react-toastify";

function App() {
 const [product,setProduct] = useState({})
 const [cart,setCart] = useState([])
 const [searchData,setSearchData] = useState([])
 const [searchName,SetSearchName] = useState("")
 
 const [loggedUser,setloggedUser] = useState(JSON.parse(localStorage.getItem("amazon")))
 
 function productdescription(product){
  setProduct(product)
 }

 function AddToCart(item){
   setCart((previtems)=>{
    return [...previtems,item]
   })
   toast.success(`${item.name} has been added to your cart!`, {
    position: "bottom-left",
    autoClose: 3000,
  });
 }

 function RemoveFromCart(index){
   setCart((previtems)=>{
    let newitems = [...previtems]
    newitems.splice(index,1)
    return newitems
   })
   toast.info("Product has been removed from your cart!", {
    position: "bottom-left",
    autoClose: 3000,
  });
 }

function searchNameFunc(name){
  SetSearchName(name)
}

 useEffect(()=>{
   console.log(cart)
   console.log("logged data"+loggedUser)
   console.log(searchName)
   console.log(searchData)
   
   fetch(`https://amazon-clone-backend-mxip.onrender.com/search/${searchName}`).then((res)=>res.json()).then((data)=>{
    setSearchData(data)
   }).catch((err)=>{
    console.log(err)
   })
    
 },[cart,loggedUser,searchName])

  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <BrowserRouter>
    <userContext.Provider value = {{loggedUser,setloggedUser}}>
    <Routes>
      <Route path="/" element={<Home productdes={productdescription} cartLength={cart.length} searchName={searchNameFunc}></Home>}></Route>
      <Route path="/gamingproducts" element={<GamingProdsList productdes={productdescription} AddToCart={AddToCart} cartLength={cart.length} searchName={searchNameFunc}></GamingProdsList>}></Route>
      <Route path="/electronics" element={<ElectronicsProdList productdes={productdescription} AddToCart={AddToCart} cartLength={cart.length} searchName={searchNameFunc}></ElectronicsProdList>}></Route>
      <Route path="/clothingproducts" element={<ClothingProdsList productdes={productdescription} AddToCart={AddToCart} cartLength={cart.length} searchName={searchNameFunc}></ClothingProdsList>}></Route>
      <Route path="/homeproducts" element={<HomeProdsList productdes={productdescription} AddToCart={AddToCart} cartLength={cart.length} searchName={searchNameFunc}></HomeProdsList>}></Route>
      <Route path="/toyproducts" element={<ToyProdsList productdes={productdescription} AddToCart={AddToCart} cartLength={cart.length} searchName={searchNameFunc}></ToyProdsList>}></Route>
      <Route path="/productdescription" element={<ProductDescription product={product} AddToCart={AddToCart} cartLength={cart.length} searchName={searchNameFunc} productdes={productdescription}></ProductDescription>}></Route>
      <Route path="/searchproductslist" element={<SearchProdList product={searchData} AddToCart={AddToCart} searchName={searchNameFunc} cartLength={cart.length} productdes={productdescription}></SearchProdList>}></Route>
      <Route path="/cart" element={<Cart cartData={cart} cartLength={cart.length} RemoveFromCart={RemoveFromCart} productdes={productdescription} searchName={searchNameFunc}></Cart>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="checkout" element={<Private Component={Checkout} cartData={cart}></Private>}></Route>
   </Routes>
   </userContext.Provider>
   </BrowserRouter>
    </>
  )
}

export default App
