import {useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function UpdateProduct() {

const [inpDeleteValue,setInpDeleteValue]=useState("")

const [data,setData]=useState(
  {
    id:0,
    name:"",
    price:0,
    category:"",
    description:"",
    imageurl:"",
    stock:0,
    ratingNum:0,
    ratingCount:0,
    isNewArrival:"",
    isBestSeller:"",
    reviews:[]
  }
) 

const [isLoading,setIsLoading] = useState(false)

const [isLoadingDel,setIsLoadingDel] = useState(false)

useEffect(()=>{
  console.log(data)
},[data])

function handleUpdate(e){
  if(e.target.name === "reviews"){
    setData((prevObj)=>{
      return {...prevObj,reviews:e.target.value.split("\n")}
    })
  }
  else{
  setData((prevObj)=>{
    return {...prevObj,[e.target.name]:e.target.value}
  })
}
}

function handleSubmit(e){
  e.preventDefault();
  setIsLoading(true)
  fetch("https://amazon-clone-backend-mxip.onrender.com/admin/update-products",{
    method:"POST",
    body:JSON.stringify(data),
    headers:{
      "Content-Type":"application/json"
    }
  }).then((response)=>response.json()).then((data)=>{
    console.log(data)
    console.log("Product Updated")
    toast.success("Product Updated",{
      position:"bottom-left",
      autoClose:3000
    })
    setData( {
      id:0,
      name:"",
      price:0,
      category:"",
      description:"",
      imageurl:"",
      stock:0,
      ratingNum:0,
      ratingCount:0,
      isNewArrival:"",
      isBestSeller:"",
      reviews:[]
    })
  }).catch((err)=>{
    console.log(err)
  }).finally(()=>{
    setIsLoading(false)
  })
}

function handleDelete(){
setIsLoadingDel(true)
fetch(`https://amazon-clone-backend-mxip.onrender.com/admin/delete-products/${inpDeleteValue}`,{
  method:"DELETE",
}).then((response)=>response.json()).then((data)=>{
  console.log(data)
  console.log("Product Deleted")
  toast.info("product deleted",{
    position:"bottom-left",
    autoClose:3000
  })
  setInpDeleteValue("")
}).catch((err)=>{
  console.log(err)
}).finally(()=>{
    setIsLoadingDel(false)
})
}

function handleinpDelete(e){
  setInpDeleteValue(e.target.value)
}

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
    
    <div className="p-6 bg-gray-100 min-h-screen">
      <form className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Add product</h1>
        <div className="grid grid-cols-1 gap-6 ">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Product ID</label>
            <input
              type="number"
              placeholder="Enter ID"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="id"
              value={data.id}
              onChange={handleUpdate}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="name"
              value={data.name}
              onChange={handleUpdate}
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Price</label>
            <input
              type="number"
              placeholder="Enter price"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="price"
              value={data.price}
              onChange={handleUpdate}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <input
              type="text"
              placeholder="Enter category"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="category"
              value={data.category}
              onChange={handleUpdate}
              autoComplete="off"
           />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              placeholder="Enter description"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
              name="description"
              value={data.description}
              onChange={handleUpdate}
              autoComplete="off"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Image URL</label>
            <input
              type="text"
              placeholder="Upload image"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="imageurl"
              value={data.imageurl}
              onChange={handleUpdate}
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Stock</label>
            <input
              type="number"
              placeholder="Enter stock"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="stock"
              value={data.stock}
              onChange={handleUpdate}
           />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Rating</label>
            <input
              type="number"
              placeholder="Enter rating"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="ratingNum"
              value={data.ratingNum}
              onChange={handleUpdate}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Rating Count</label>
            <input
              type="number"
              placeholder="Enter rating Count"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="ratingCount"
              value={data.ratingCount}
              onChange={handleUpdate}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Arrival</label>
            <input
              type="text"
              placeholder="Enter arrival"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="isNewArrival"
              value={data.isNewArrival}
              onChange={handleUpdate}
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Bestseller</label>
            <input
              type="text"
              placeholder="Enter Bestseller"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="isBestSeller"
              value={data.isBestSeller}
              onChange={handleUpdate}
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Reviews</label>
            <textarea
              placeholder="Enter reviews"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
              name="reviews"
              value={data.reviews.join('\n')}
              onChange={handleUpdate}
            ></textarea>
          </div>
          <button className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer">
          {isLoading ? "LOADING.." :"UPDATE"}
          </button>
        </div>
      </form>

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-8 mb-10">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Delete Product</h1>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Product Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
              name="inpDelete"
              value={inpDeleteValue}
              onChange={handleinpDelete}
              autoComplete="off"
            />
          </div>
          <button className="w-full bg-red-500 text-white py-3 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer" onClick={handleDelete}>
            {isLoadingDel ? "LOADING.." :"DELETE"}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}


export default UpdateProduct;