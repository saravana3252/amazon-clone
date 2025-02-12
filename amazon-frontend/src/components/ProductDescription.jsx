// import { useState } from "react";
import Header from "./Header";
import PropTypes from 'prop-types';
import Footer from "./Footer";
import { Link } from "react-router-dom";


function ProductDescription(props) {
  
// const [size,setSize] = useState([])

// useEffect(()=>{
//   console.log(size)
// },[size])

    return (
      <>    
      <Header cartLength={props.cartLength} searchName={props.searchName} productdes={props.productdes}></Header>
      {Object.keys(props.product).length > 0 ? (
        <>
             <div className="container mx-auto p-6 lg:p-12 bg-gray-100 rounded-lg shadow-lg">
 
  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 bg-white p-6 rounded-lg shadow-lg">
   
    <div className="lg:w-1/3 w-full flex justify-center">
      <img
        src={props.product.imageurl}
        alt={props.product.name}
        className="w-2/3 lg:w-full max-h-80 object-contain rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
      />
    </div>


    <div className="lg:w-2/3 w-full flex flex-col gap-4">
      <h1 className="text-4xl font-bold text-gray-800">{props.product.name}</h1>
      <p className="text-2xl font-semibold text-green-600">Rs {props.product.price} & Free Shipping</p>
      <p className="mt-2 text-gray-600">{props.product.description}</p>
      <p className="text-red-600 font-semibold mt-2 animate-pulse">{props.product.stock <= 0 ? "OUT OF STOCK" : "IN STOCK"}</p>
      {/* {
        props.product.category === "Clothing" ? (<div className="flex gap-2">sizes : {props.product.sizes.map((size)=>{
          return (
            <>
            <button className="bg-gray-200 px-2 cursor-pointer active:bg-blue-500" onClick={()=>{
              setSize(size)
            }}>{size}</button>
            </>
          )
        })}</div>) : null
      } */}
      <p className="text-gray-500 italic">{props.product.category}</p>

      <button disabled = {props.product.stock <= 0}
        className={`mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${props.product.stock <= 0 ? "cursor-not-allowed bg-gray-500 hover:bg-gray-500" : "cursor-pointer"}`} onClick={()=>{
          props.AddToCart(props.product)
          // props.updateCartSize(props.product.id,size)
        }}
        
      >
        Add to Cart
      </button>
    </div>
  </div>

 
  <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-1 border-gray-300 pb-4">Reviews</h2>
    {props.product.reviews.length > 0 ? (
      <ul className="space-y-6">
        {props.product.reviews.map((review, index) => (
          <li
            key={index}
            className="p-4 rounded-lg bg-gray-50 shadow-md hover:bg-gray-100 transition-colors duration-300"
          >
            <p className="text-gray-700">{review}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500 italic">No reviews available.</p>
    )}
  </div>
</div>
<Footer></Footer>
        </>
      ):(<><div className="w-full h-svh flex flex-col items-center"><p className="mt-10 ">some problem...</p><Link to="/" className="p-2 mt-5 px-4 rounded h-10 bg-amber-700  text-white">GO TO HOME</Link></div></>) }
 

      </>
    );
  }
 
  ProductDescription.propTypes = {
     updateCartSize:PropTypes.func.isRequired,  
   searchName:PropTypes.func.isRequired,
    productdes : PropTypes.func.isRequired,
    productDes: PropTypes.string.isRequired,
    product: PropTypes.shape({
      id:PropTypes.number.isRequired,
      imageurl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      stock:PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      reviews: PropTypes.arrayOf(PropTypes.string).isRequired,
      sizes:PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    cartLength: PropTypes.number.isRequired,
    AddToCart: PropTypes.func.isRequired,
  };
  

  export default ProductDescription;