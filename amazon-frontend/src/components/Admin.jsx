import {Link, Route, Routes} from "react-router-dom"
import ProductList from "./AdminProductList"
import OrderList from "./AdminOrderList"
import UpdateProduct from "./AdminUpdateProducts"
import { useState } from "react"

function Admin(){

  const [toggle,setToggle] = useState(false)

  function handleToggle(){
    setToggle(!toggle)
  }

    return (
        <>
        <div className="bg-gray-800 text-white h-20 font-bold flex items-center px-4 text-3xl justify-between">
            <h1>Admin Panel</h1>
            <div className="lg:hidden w-[25%] md:w-[15%] flex justify-center items-center  cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  stroke="currentColor" className="text-white h-10" onClick={handleToggle}> <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /> </svg> 
        </div>
        </div>
        <div id="mobileNav" className={`bg-gray-700 min-h-full fixed top-0 w-[50%] transition-all duration-300 ${toggle ? "left-0" : "-left-[50%]"} lg:hidden`}>
                <div className="flex flex-col gap-8 text-white mt-5 ">
                <Link to="/admin" className="hover:bg-gray-600 p-2 pl-6 md:pl-12 mx-2   rounded transition-all duration-300 cursor-pointer">Products List</Link>
                <Link to="/admin/admin-orders" className="hover:bg-gray-600 p-2 pl-6 md:pl-12   mx-2 rounded transition-all duration-300 cursor-pointer">Orders List</Link>
                <Link to="/admin/update-products" className="hover:bg-gray-600 p-2 pl-6 md:pl-12   mx-2 rounded transition-all duration-300 cursor-pointer">Update Products</Link>
                <Link to="/" className="hover:bg-gray-600 p-2 pl-6 md:pl-12 mx-2 rounded transition-all duration-300 cursor-pointer">Home</Link>
                </div>
            </div>
        <div className="grid lg:grid-cols-[200px_1fr]">
            <div className="bg-gray-700 min-h-full hidden lg:block">
                <div className="flex flex-col gap-8 text-white mt-5 ">
                <Link to="/admin" className="hover:bg-gray-600 p-2 pl-6 mx-2 rounded transition-all duration-300 cursor-pointer">Product List</Link>
                <Link to="/admin/admin-orders" className="hover:bg-gray-600 p-2 pl-6  mx-2 rounded  transition-all duration-300 cursor-pointer">Order List</Link>
                <Link to="/admin/update-products" className="hover:bg-gray-600 p-2 pl-6  mx-2 rounded  transition-all duration-300 cursor-pointer">Update Products</Link>
                <Link to="/" className="hover:bg-gray-600 p-2 pl-6  mx-2 rounded  transition-all duration-300 cursor-pointer">Home</Link>
                </div>
            </div>
            <div>

                <Routes>
                    <Route path="/" element={<ProductList></ProductList>}></Route>
                    <Route path="admin-orders" element={<OrderList></OrderList>}></Route>
                    <Route path="update-products" element={<UpdateProduct></UpdateProduct>}></Route>
                </Routes>
            </div>
        </div>
        </>
    )
}

export default Admin