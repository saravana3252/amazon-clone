import Header from "./Header";
import PropTypes from 'prop-types';


function ProductDescription(props) {
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
      <p className="text-gray-500 italic">{props.product.category}</p>

      <button
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300" onClick={()=>{
          props.AddToCart(props.product)
        }}
        
      >
        Add to Cart
      </button>
    </div>
  </div>

 
  <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-1 pb-4">Reviews</h2>
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
        </>
      ):(<><div>try again...</div></>) }
 

      </>
    );
  }
 
  ProductDescription.propTypes = {
   searchName:PropTypes.func.isRequired,
    productdes : PropTypes.func.isRequired,
    productDes: PropTypes.string.isRequired,
    product: PropTypes.shape({
      imageurl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      reviews: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    cartLength: PropTypes.number.isRequired,
    AddToCart: PropTypes.func.isRequired,
  };
  

  export default ProductDescription;