import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan,faLessThan } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import PropTypes from "prop-types"
// import { useNavigate } from 'react-router-dom';


function FeaturedGamingProds(props){

const [products,setProducts] =useState([])    
// const navigate = useNavigate()
const [isLoading,setIsLoading] = useState(false)

function scrollLeft(){
    let scrollContainer = document.getElementById("scrollContainer2")
    scrollContainer.scrollBy({left:-300,behavior:'smooth'})
}

function scrollRight(){
    let scrollContainer = document.getElementById("scrollContainer2")
    scrollContainer.scrollBy({left:300,behavior:'smooth'})
}

useEffect(()=>{
  setIsLoading(true)  
  fetch("https://amazon-clone-backend-mxip.onrender.com/featuredGamingProducts").then((response)=>response.json()).then((data)=>{
    setProducts(data)
    console.log(data)
  }).catch((err)=>{
    console.log(err)
  }).finally(()=>{
    setIsLoading(false)
  })
},[])

    return (
        <>
        <div className="bg-gray-200 w-full lg:pt-12 pt-10 px-4">
            <div className="bg-white relative w-full px-3 py-2 group">
                <h1 className="font-bold lg:text-2xl text-xl">Popular products in Gaming</h1>
                <div className="absolute top-1/2 left-5 bg-white/90 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer hidden lg:block" onClick={scrollLeft}><FontAwesomeIcon icon={faLessThan} size='3x' className='text-black p-2' /></div>
                <div className="absolute top-1/2 right-5 bg-white/90 transition-all duration-300  opacity-0 group-hover:opacity-100  cursor-pointer hidden lg:block" onClick={scrollRight}><FontAwesomeIcon icon={faGreaterThan} size='3x' className='text-black p-2' /></div>
                <div id="scrollContainer2" className="w-full mt-2.5 flex overflow-x-auto scrollbar-hide lg:space-x-4 space-x-3 cursor-pointer">
                    

                    {
                        !isLoading ? ( products.map((product,index)=>{
                            return (
                                <>
                                 <div className='flex-none'>
                                 <a href='/productdescription'>
                                <img key={index} className="lg:h-48 h-40" src={product.imageurl} alt="featuredElectronicsImg" onClick={()=>{
                                    props.productdes(product)
                                    // navigate("/productdescription")
                                  }}></img>
                                  </a>
                                  </div>
                                </>
                            )
                        })):(<div role="status" className='flex justify-center items-center w-full lg:h-52 h-36'>
                            <svg aria-hidden="true" className="inline w-1/2 h-1/2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                        </div>)
                    }
                       
                    
                   
                  
                </div>
            </div>
        </div>
        </>
    )
}

FeaturedGamingProds.propTypes = {
    productdes : PropTypes.func.isRequired
}

export default FeaturedGamingProds