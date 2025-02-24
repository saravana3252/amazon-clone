import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan,faLessThan } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import {Link } from 'react-router-dom';
import PropTypes from "prop-types"

function Banner(props){

    const[DealOfTheDayProd,setDealOfTheDayProd]=useState([])
    const [currentIndex,setcurrentIndex]=useState(0)
    const images = ["./banner1.jpg","./banner10.jpg","./banner9.jpg","./banner6.jpg","./banner3.jpg","./banner5.jpg"]
    const mobileImgs = ["./mobile-banner1.jpg","./mobile-banner7.jpg","./mobile-banner3.jpg","./mobile-banner4.jpg","./mobile-banner6.jpg","./mobile-banner8.jpg","./mobile-banner2.jpg"]
    const isMobile = window.innerWidth < 1024
    const [isLoading,setIsLoading] = useState(false)

    // const navigate =useNavigate()

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
        if(isMobile){
            const interval = setInterval(()=>{
                setcurrentIndex((previndex)=>{
                    return (previndex + 1) % mobileImgs.length
                })
            },4000)
            return ()=>clearInterval(interval)
        }
    },[isMobile])
 
    useEffect(()=>{
        setIsLoading(true)
        fetch("https://amazon-clone-backend-mxip.onrender.com/DealOfTheDay").then((response)=>response.json()).then((data)=>{
          setDealOfTheDayProd(data)
          console.log(data[0].imageurl)
        }).catch((err)=>{
          console.log(err)
        }).finally(()=>{
            setIsLoading(false)
        })
      },[])

    return (
        <>
        <div className="w-full z-10 lg:h-[500px] h-auto relative bg-gray-200 overflow-hidden">
            <div className="absolute hidden lg:block transition-all duration-300 hover:bg-black/50 p-2 px-4 z-10 top-[140px] lg:top-[130px] left-2 lg:left-8 cursor-pointer" onClick={()=>{
                handleSlide("prev")
            }}><FontAwesomeIcon icon={faLessThan} className='text-white text-5xl sm:text-4xl md:text-5xl lg:text-8xl' /></div>
            <div className="absolute hidden lg:block transition-all duration-300 hover:bg-black/50 p-2 px-4 z-10 top-[140px] lg:top-[130px] right-2 lg:right-8 cursor-pointer" onClick={()=>{
                handleSlide("next")
            }}><FontAwesomeIcon icon={faGreaterThan}  className='text-white text-5xl sm:text-4xl md:text-5xl lg:text-8xl' /></div>
            <div className='absolute z-10 bottom-[60px] md:bottom-32 lg:hidden flex justify-center  w-full  gap-5'>
                  {
                    mobileImgs.map((_,index)=>{
                        return (
                            <>
                            <div className={`w-2.5 h-2.5 rounded-full ${currentIndex === index ? "bg-gray-700" : "bg-white"}`} ></div>
                            </>
                        )
                    })
                  }
            </div>
        <div className="w-full lg:flex transition-all duration-700 hidden" style={{transform:`translateX(-${currentIndex * 100}%)`}}>
            {
                images.map((img,index)=>{
                    return  <img key={index} className="w-screen" src={img} alt="bannerImg"></img>
                })
            }
        </div>
        <div className="w-full lg:hidden transition-all duration-700 flex" style={{transform:`translateX(-${currentIndex * 100}%)`}}>
            {
                mobileImgs.map((img,index)=>{
                    return  <img key={index} className="w-screen" src={img} alt="bannerImg"></img>
                })
            }
        </div>
        </div>
        <div id="bannerProdInfo" className='lg:grid lg:grid-cols-4  flex h-[250px] lg:h-auto overflow-y-hidden overflow-x-auto scrollbar-hide scroll-smooth gap-5 w-full z-20 absolute md:top-[750px] top-[520px] lg:top-[420px] px-4'>
            <div className='bg-white min-w-[200px] shrink-0 p-3'>
                <p className='font-bold text-xl mb-2'>Get your game on</p>
                <img className='h-36 lg:h-56' src='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/Stores-Gaming/FinalGraphics/Fuji_Gaming_store_Dashboard_card_2x_EN._SY608_CB564799420_.jpg' alt='gaming-banner-img'></img>
                <p className='text-blue-800 font-semibold pt-4 lg:pt-2'><a href="/gamingproducts">Shop Gaming</a></p>
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
                <p className='text-blue-800 font-semibold pt-2 lg:pt-4'><a href="/electronics">Shop Now</a></p>
            </div>
            <div className='bg-white min-w-[200px]  p-3'>
                <p className='font-bold text-xl mb-2'>Home & Kitchen</p>
                <img className='h-36 lg:h-56' src='https://images-eu.ssl-images-amazon.com/images/G/02/Exports_2023/UK_Exports_2024/DCC_Home_758x608_V2._SY608_CB558825168_.jpg' alt='homeProducts-banner'></img>
                <p className='text-blue-800 font-semibold pt-4 lg:pt-2'><a href="/homeproducts">Shop Now</a></p>
            </div>
            <div className='bg-white min-w-[200px]  p-3'>
                <h1 className='animate-pulse text-red-700 font-bold text-xl text-center'>Deal Of The Day</h1>
                <div className='flex flex-col items-center mt-2'>
                    {!isLoading ? ( DealOfTheDayProd.map((product)=>{
                            return (
                                <>
                                <a href='/productdescription'>
                                  <img className='lg:h-48 h-32 cursor-pointer' src={product.imageurl} alt='DealOfTheDayProductImg' onClick={()=>{
                                    props.productdes(product)
                                    // navigate("/productdescription")
                                  }}></img>
                                  </a>
                                  <p className='pt-1 lg:pt-1'>Rs <del>2,00,000</del> {product.price}</p>
                                  <a href='/productdescription' className='text-blue-800 font-semibold pt-1 lg:pt-2 cursor-pointer'  onClick={()=>{
                                    props.productdes(product)
                                    // navigate("/productdescription")
                                  }}>Shop Now</a>
                                  </>
                            )
                        })):(<div role="status" className='flex justify-center items-center w-full lg:h-60 h-36'>
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

Banner.propTypes = {
    productdes : PropTypes.func.isRequired
}

export default Banner