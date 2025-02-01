import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan,faLessThan } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import PropTypes from "prop-types"

function Banner(props){

    const[DealOfTheDayProd,setDealOfTheDayProd]=useState([])
    const [currentIndex,setcurrentIndex]=useState(0)
    const images = ["./banner1.jpg","./banner2.jpg","./banner3.jpg","./banner4.jpg"]

    const navigate =useNavigate()

    function handleSlide(direction){
        if(direction === "next")
        setcurrentIndex((previndex)=>{
            return (previndex + 1) % images.length
        })
        else 
        setcurrentIndex((previndex)=>{
             return (previndex - 1 + images.length) % images.length
        })
    }
 
    useEffect(()=>{
        fetch("https://amazon-clone-backend-mxip.onrender.com/DealOfTheDay").then((response)=>response.json()).then((data)=>{
          setDealOfTheDayProd(data)
          console.log(data[0].imageurl)
        }).catch((err)=>{
          console.log(err)
        })
      },[])

    return (
        <>
        <div className="w-full z-10 lg:h-[500px] h-auto relative bg-amber-100 overflow-hidden">
            <div className="absolute transition-all duration-300 hover:bg-black/50 p-2 px-4 z-10 top-[20px] lg:top-[130px] left-2 lg:left-8 cursor-pointer" onClick={()=>{
                handleSlide("prev")
            }}><FontAwesomeIcon icon={faLessThan} className='text-white text-5xl sm:text-4xl md:text-5xl lg:text-8xl' /></div>
            <div className="absolute transition-all duration-300 hover:bg-black/50 p-2 px-4 z-10 top-[20px] lg:top-[130px] right-2 lg:right-8 cursor-pointer" onClick={()=>{
                handleSlide("next")
            }}><FontAwesomeIcon icon={faGreaterThan}  className='text-white text-5xl sm:text-4xl md:text-5xl lg:text-8xl' /></div>
        <div className="w-full flex transition-all duration-700" style={{transform:`translateX(-${currentIndex * 100}%)`}}>
            {
                images.map((img,index)=>{
                    return  <img key={index} className="w-screen" src={img} alt="bannerImg"></img>
                })
            }
        </div>
        </div>
        <div className='lg:grid lg:grid-cols-4  flex h-[250px] lg:h-auto overflow-y-hidden overflow-x-auto scrollbar-hide scroll-smooth gap-5 w-full z-20 absolute md:top-[350px] top-[260px] lg:top-[420px] px-4'>
            <div className='bg-white min-w-[200px] shrink-0 p-3'>
                <p className='font-bold text-xl mb-2'>Get your game on</p>
                <img className='h-36 lg:h-56' src='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/Stores-Gaming/FinalGraphics/Fuji_Gaming_store_Dashboard_card_2x_EN._SY608_CB564799420_.jpg' alt='gaming-banner-img'></img>
                <p className='text-blue-800 font-semibold pt-4 lg:pt-2'><Link to="/gamingproducts">Shop Gaming</Link></p>
            </div>
            <div className='bg-white min-w-[200px]  p-3'>
                <p className='font-bold text-xl mb-2'>Wireless Tech</p>
                <div className='grid grid-cols-2 gap-2'>
                    <div>
                  <img src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/Smartphone_2x._SY232_CB566164844_.jpg" alt='wirelessTech1-banner'></img>
                  <p className='text-sm'>smartphones</p>
                  </div>
                  <div>
                  <img src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/Watches_2x._SY232_CB566164844_.jpg" alt='wirelessTech2-banner'></img>
                  <p className='text-sm'>watches</p>
                  </div>
                  <div>
                  <img src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/Headphone_2x._SY232_CB566164844_.jpg" alt='wirelessTech3-banner'></img>
                  <p className='text-sm'>headphones</p>
                  </div>
                  <div>
                  <img src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/Tablet_2x._SY232_CB566164844_.jpg" alt='wirelessTech4-banner'></img>
                  <p className='text-sm'>tablets</p>
                  </div>
                </div>
                <p className='text-blue-800 font-semibold pt-2 lg:pt-4'><Link to="electronics">Shop Now</Link></p>
            </div>
            <div className='bg-white min-w-[200px]  p-3'>
                <p className='font-bold text-xl mb-2'>Home & Kitchen</p>
                <img className='h-36 lg:h-56' src='https://images-eu.ssl-images-amazon.com/images/G/02/Exports_2023/UK_Exports_2024/DCC_Home_758x608_V2._SY608_CB558825168_.jpg' alt='homeProducts-banner'></img>
                <p className='text-blue-800 font-semibold pt-4 lg:pt-2'><Link to="homeproducts">Shop Now</Link></p>
            </div>
            <div className='bg-white min-w-[200px]  p-3'>
                <h1 className='animate-pulse text-red-700 font-bold text-xl text-center'>Deal Of The Day</h1>
                <div className='flex flex-col items-center mt-2'>
                    {
                        DealOfTheDayProd.map((product)=>{
                            return (
                                <>
                                  <img className='lg:h-48 h-32 cursor-pointer' src={product.imageurl} alt='DealOfTheDayProductImg' onClick={()=>{
                                    props.productdes(product)
                                    navigate("/productdescription")
                                  }}></img>
                                  <p>Rs <del>2,00,000</del> {product.price}</p>
                                  <p className='text-blue-800 font-semibold pt-1 lg:pt-3 cursor-pointer'  onClick={()=>{
                                    props.productdes(product)
                                    navigate("/productdescription")
                                  }}>Shop Now</p>
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

Banner.propTypes = {
    productdes : PropTypes.func.isRequired
}

export default Banner