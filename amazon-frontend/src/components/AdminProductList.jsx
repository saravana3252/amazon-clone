import { useEffect, useState } from "react"

function ProductList(){

  const [products,setProducts] =useState([])
  const [originalProds,setOriginalProds] =useState([])
  const [isLoading,setIsLoading] = useState(false)
  const [toggle,setToggle] = useState(false)

    useEffect(()=>{
        setIsLoading(true)
        fetch("https://amazon-clone-backend-mxip.onrender.com/admin/products-list").then((res)=>res.json()).then((data)=>{
           setProducts(data)
           setOriginalProds(data)
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setIsLoading(false)
        })
    },[])

    function handleGamingProds(){
        let copyprods = [...originalProds]
        let GamingProds = copyprods.filter((product)=>{
            return product.category === "Gaming"
        })

        setProducts(GamingProds)
    }

    function handleElectronics(){
        let copyprods = [...originalProds]
        let Electronics =copyprods.filter((product)=>{
            return product.category === "Electronics"
        })
        setProducts(Electronics)
    }
    
    function handleClothing(){
        let copyprods = [...originalProds]
        let Clothing = copyprods.filter((product)=>{
            return product.category === "Clothing"
        })
        setProducts(Clothing)
    }
    function handleHomeProducts(){
        let copyprods = [...originalProds]
        let HomeProducts = copyprods.filter((product)=>{
            return product.category === "HomeProduct"
        })
        setProducts(HomeProducts)
    }
    function handleToyProducts(){
        let copyprods = [...originalProds]
        let ToyProds = copyprods.filter((product)=>{
            return product.category === "Toys"
        })
        setProducts(ToyProds)
    }

    function handleToggle(){
        setToggle(!toggle)
    }

    return(
        <>
         <div className="bg-gray-300 min-h-screen">
            <div className="h-20 bg-gray-600 text-white  lg:flex space-x-5 items-center px-5 hidden">
                <p className="cursor-pointer transition-all duration-300 hover:bg-gray-500 p-2 px-4 rounded" onClick={()=>{setProducts(originalProds)}}>All</p>
                <p className="cursor-pointer transition-all duration-300 hover:bg-gray-500 p-2 px-4 rounded" onClick={handleGamingProds}>Gaming</p>
                <p className="cursor-pointer transition-all duration-300 hover:bg-gray-500 p-2 px-4 rounded" onClick={handleElectronics}>Electronics</p>
                <p className="cursor-pointer transition-all duration-300 hover:bg-gray-500 p-2 px-4 rounded" onClick={handleClothing}>Clothing</p>
                <p className="cursor-pointer transition-all duration-300 hover:bg-gray-500 p-2 px-4 rounded" onClick={handleHomeProducts}>Home-products</p>
                <p className="cursor-pointer transition-all duration-300 hover:bg-gray-500 p-2 px-4 rounded" onClick={handleToyProducts}>Toys</p>
            </div>
            <div className="h-16 bg-gray-600 flex justify-center items-center lg:hidden">
              <button className="bg-orange-600 p-2 px-4 text-white font-medium rounded cursor-pointer" onClick={handleToggle}>Categories</button>
            </div>
            
              <div className={`bg-gray-700 text-white  items-center transition-all duration-300 ease-in-out lg:hidden flex flex-col overflow-hidden gap-1.5   ${toggle ? "h-64 p-2" :"h-0 "}`} >
                {toggle ? (<><p className={`cursor-pointer transition-all duration-300 hover:bg-gray-500 p-2 px-4 rounded ${toggle ? "opacity-100" : "opacity-0"}`} onClick={()=>{setProducts(originalProds)}}>All</p>
                    <p className={`cursor-pointer transition-all duration-300 hover:bg-gray-500 p-1 px-4 rounded ${toggle ? "opacity-100 " : "opacity-0"}`} onClick={handleGamingProds}>Gaming</p>
                    <p className={`cursor-pointer transition-all duration-300 hover:bg-gray-500 p-1 px-4 rounded ${toggle ? "opacity-100" : "opacity-0"}`} onClick={handleElectronics}>Electronics</p>
                    <p className={`cursor-pointer transition-all duration-300 hover:bg-gray-500 p-1 px-4 rounded ${toggle ? "opacity-100" : "opacity-0"}`} onClick={handleClothing}>Clothing</p>
                    <p className={`cursor-pointer transition-all duration-300 hover:bg-gray-500 p-1 px-4 rounded ${toggle ? "opacity-100" : "opacity-0"}`} onClick={handleHomeProducts}>Home-products</p>
                    <p className={`cursor-pointer transition-all duration-300 hover:bg-gray-500 p-1 px-4 rounded ${toggle ? "opacity-100" : "opacity-0"}`}onClick={handleToyProducts}>Toys</p></>):null}
                    
                </div>
            
            {
                isLoading ? (<><p className="text-center p-10">loading...</p> </>):(<>    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-5 gap-2 mb-10 p-5 min-h-screen">

                    {
                        products.map((product)=>{
                            return (
                                <>
                                <div className="bg-white rounded py-4">
                               <div className="flex justify-center py-2">
                               <img className="h-42" src={product.imageurl}></img>
                               </div>
                               <div className="px-4">
                               <p className="py-1 font-medium">{product.name}</p>
                               <p className="py-1 text-red-700 font-medium">Rs {product.price}</p>
                               <p className="italic text-sm text-gray-500">{product.category}</p>
                              </div>
                               </div>
                                </>
                            )
                        })
                    }
                 
                 
                </div></>)
            }
        
         </div>
        </>
    )
}

export default ProductList