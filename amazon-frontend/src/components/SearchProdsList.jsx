import Header from "./Header";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom"

function SearchProdList(props) {

  return (
    <>
      <Header cartLength={props.cartLength} searchName={props.searchName} productdes={props.productdes}></Header>
      <div className="w-full bg-gray-200 h-screen grid grid-cols-[280px_1fr]">
        <div className="bg-gray-200  p-4">
          <div className="bg-white p-4 rounded">
            <p className="font-bold text-xl">Filter By Price</p>
            <div className="flex flex-col mt-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>Less than 200rs</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" />
                <span>Less than 300rs</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" />
                <span>Less than 400rs</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" />
                <span>Less than 500rs</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" />
                <span>Less than 600rs</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-4 mt-5 rounded">
            <p className="font-bold text-xl">Filter By Reviews</p>
            <div className="flex flex-col mt-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>1 Star and Above</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" />
                <span>2 Stars and Above</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" />
                <span>3 Stars and Above</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" />
                <span>4 Stars and Above</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" />
                <span>5 Stars Only</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-4 mt-5 rounded">
            <p className="font-bold text-xl">Filter By NewArrivals</p>
            <div className="flex flex-col mt-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>NEW</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" />
                <span>OLD</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-4 mt-5 rounded">
            <p className="font-bold text-xl">Filter By Category</p>
            <div className="flex flex-col mt-2">
              <p>Electronics</p>
              <p>Gaming</p>
            </div>
          </div>
        </div>
        {props.product.length > 0 ? (<>
          <div className="bg-gray-200  grid grid-cols-3 gap-2 p-2">
          {props.product.map((product, index) => {
            return (
              <>
                <div key={index} className="bg-white h-fit min-h-[450px] p-4 rounded-lg shadow-lg  transition-shadow max-w-xs w-full">
                    <div className="flex justify-center">
                  <img
                    className="h-44  rounded-lg"
                    src={product.imageurl}
                    alt="productImg"
                  />
                  </div>
                  <div className="mt-4 ">
                    <p className="font-medium text-lg text-gray-800 " onClick={()=>{
                    props.productdes(product)
                    }}>
                      <Link to="/ProductDescription">{product.name}</Link>
                    </p>
                    <div className="flex items-center mt-2">
                      <p className="text-yellow-600 text-xl">{"⭐".repeat(product.ratingNum)}</p>
                      <p className="pl-2 text-sm text-gray-600">
                        ({product.ratingCount} reviews)
                      </p>
                    </div>
                    <p className="text-2xl font-semibold text-gray-900 mt-2">
                      Rs {product.price}
                    </p>
                    <div className=" mt-4 flex justify-center items-center">
                      <button className="bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors" onClick={()=>{props.AddToCart(product)}}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}

          
        </div>
        </>):(<div className="pt-10 pl-10">not found</div>)}
       
      </div>
    </>
  );
}

SearchProdList.propTypes = {
  AddToCart:PropTypes.func.isRequired,  
  searchName:PropTypes.func.isRequired,
  productdes: PropTypes.func.isRequired,
  product: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
  cartLength : PropTypes.number.isRequired
};

export default SearchProdList;
