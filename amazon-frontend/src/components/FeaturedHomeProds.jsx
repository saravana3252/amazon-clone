import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan,faLessThan } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import PropTypes from "prop-types"
import { useNavigate } from 'react-router-dom';


function FeaturedHomeProds(props){

const [products,setProducts] =useState([])    
const navigate = useNavigate()

function scrollLeft(){
    let scrollContainer = document.getElementById("scrollContainer")
    scrollContainer.scrollBy({left:-300,behavior:'smooth'})
}

function scrollRight(){
    let scrollContainer = document.getElementById("scrollContainer")
    scrollContainer.scrollBy({left:300,behavior:'smooth'})
}

useEffect(()=>{
  fetch("https://amazon-clone-backend-mxip.onrender.com/featuredHomeProducts").then((response)=>response.json()).then((data)=>{
    setProducts(data)
    console.log(data)
  }).catch((err)=>{
    console.log(err)
  })
},[])

    return (
        <>
        <div className="bg-gray-200  w-full lg:pt-[150px] pt-[230px] px-4">
            <div className="bg-white relative w-full px-3 py-2 group">
                <h1 className="font-bold lg:text-2xl text-xl">Popular products in Home</h1>
                <div className="absolute top-1/2 left-5 bg-white/90 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer" onClick={scrollLeft}><FontAwesomeIcon icon={faLessThan} size='3x' className='text-black p-2' /></div>
                <div className="absolute top-1/2 right-5 bg-white/90 transition-all duration-300  opacity-0 group-hover:opacity-100  cursor-pointer" onClick={scrollRight}><FontAwesomeIcon icon={faGreaterThan} size='3x' className='text-black p-2' /></div>
                <div id="scrollContainer" className="w-full mt-2.5 flex overflow-x-auto scrollbar-hide space-x-5 cursor-pointer">
                    {
                        products.map((product,index)=>{
                            return (
                                <>
                                <img key={index} className="lg:h-48 h-40" src={product.imageurl} alt="featuredHomeProductImg" onClick={()=>{
                                    props.productdes(product)
                                    navigate("/productdescription")
                                  }}></img>
                                </>
                            )
                        })
                    }
                   
                  
                </div>
            </div>
        </div>
        </>
    )
}

FeaturedHomeProds.propTypes = {
    productdes : PropTypes.func.isRequired
}

export default FeaturedHomeProds