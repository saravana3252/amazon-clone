import { useEffect, useState } from "react";
import Header from "./Header";
import {Link} from "react-router-dom"
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";


function ElectronicProdsList(props) {
  const [originalProds, setOriginalProds] = useState([]); 
  const [Prods, setProds] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [filterData,setFilterData] =useState(null)
  const [filterRatingData,setFilterRatingData] =useState(null)

let products = [...originalProds]

  const NewArrival = products.filter((data)=>{
    return data.isNewArrival === true
  })

  const OldArrival = products.filter((data)=>{
    return data.isNewArrival === false
  })

  useEffect(() => {
    if(filterData){
      fetch(`https://amazon-clone-backend-mxip.onrender.com/filter/electronics/${filterData}`).then((response)=>response.json()).then((data)=>{
        setProds(data)
      }).catch((err)=>{
        console.log(err)
      })
    }
    else if(filterRatingData){
      fetch(`https://amazon-clone-backend-mxip.onrender.com/filterRating/electronics/${filterRatingData}`).then((response)=>response.json()).then((data)=>{
        setProds(data)
      }).catch((err)=>{
        console.log(err)
      })
    }
    else{    
    fetch("https://amazon-clone-backend-mxip.onrender.com/electronics")
      .then((response) => 
        response.json()
      )
      .then((data) => {
        setProds(data);
        setOriginalProds(data)
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [filterData,filterRatingData]);


    function handleSort(option) {
    let sortedProducts = [...originalProds];
    if (option === "priceLowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "priceHighToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (option === "nameAsc") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    else if (option === "nameDsc") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    setProds(sortedProducts);
  };

  return (
    <>
      <Header cartLength={props.cartLength} searchName={props.searchName} productdes={props.productdes}></Header>
      <div className="w-full bg-gray-200 h-screen grid grid-cols-1 lg:grid-cols-[280px_1fr]">
      <div className="lg:hidden text-center bg-gray-500 p-4 cursor-pointer font-mono"><button className="p-2 px-4 bg-yellow-500 rounded" onClick={()=>{
        let mobileFilters=document.getElementById("mobileFilters") 
       mobileFilters.style.left=0
        }}><FontAwesomeIcon icon={faFilter} /> Filters</button></div>

      <div id="mobileFilters" className="bg-white  transition-all  duration-500 fixed h-full top-0 -left-[100%] w-full lg:hidden">
        <div className="flex justify-between p-4 border-b border-gray-200"><p className="font-bold text-2xl">Filters</p><button className="font-bold p-1 border border-black px-3 cursor-pointer" onClick={()=>{
        let mobileFilters=document.getElementById("mobileFilters") 
       mobileFilters.style.left="-100%"
        }}>X</button></div>
        <div className="grid grid-cols-[200px_1fr]  cursor-pointer shadow">
          <div className="bg-gray-200 h-svh text-black space-y-5 p-2 pl-3">
            <p onClick={()=>{
               document.getElementById("FilByPrice").style.display="block"
               document.getElementById("FilByReviews").style.display="none"
               document.getElementById("FilByNewArr").style.display="none"
               document.getElementById("FilByCat").style.display="none"
            }}>Filter By Price</p>
            <p onClick={()=>{
               document.getElementById("FilByPrice").style.display="none"
               document.getElementById("FilByReviews").style.display="block"
               document.getElementById("FilByNewArr").style.display="none"
               document.getElementById("FilByCat").style.display="none"
            }}>Filter By Reviews</p>
            <p onClick={()=>{
               document.getElementById("FilByPrice").style.display="none"
               document.getElementById("FilByReviews").style.display="none"
               document.getElementById("FilByNewArr").style.display="block"
               document.getElementById("FilByCat").style.display="none"
            }}>Filter By NewArrivals</p>
            <p onClick={()=>{
               document.getElementById("FilByPrice").style.display="none"
               document.getElementById("FilByReviews").style.display="none"
               document.getElementById("FilByNewArr").style.display="none"
               document.getElementById("FilByCat").style.display="block"
            }}>Filter By Category</p>
          </div>
          <div className="bg-white h-svh">
          <div id="FilByPrice" className="bg-gray-100 p-4 mt-4 rounded ">
            <p className="font-bold text-xl">Filter By Price</p>
            <div className="flex flex-col mt-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" value="1000" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterData(e.target.value)
                    }
                    else{
                      setFilterData(null)
                    }
                }} />
                <span>Less than Rs 1000</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="10000" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterData(e.target.value)
                    }
                    else{
                      setFilterData(null)
                    }
                }} />
                <span>Less than Rs 10000</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="25000" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterData(e.target.value)
                    }
                    else{
                      setFilterData(null)
                    }
                }} />
                <span>Less than Rs 25000</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="50000" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterData(e.target.value)
                    }
                    else{
                      setFilterData(null)
                    }
                }} />
                <span>Less than Rs 50000</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="90000" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterData(e.target.value)
                    }
                    else{
                      setFilterData(null)
                    }
                }} />
                <span>Less than Rs 90000</span>
              </label>
            </div>
          </div>

          <div id="FilByReviews" className="bg-gray-100 p-4 mt-5 rounded hidden">
            <p className="font-bold text-xl">Filter By Reviews</p>
            <div className="flex flex-col mt-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" value="1" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterRatingData(e.target.value)
                    }
                    else{
                      setFilterRatingData(null)
                    }
                }}/>
                <span>1 Star and Above</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="2" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterRatingData(e.target.value)
                    }
                    else{
                      setFilterRatingData(null)
                    }
                }}/>
                <span>2 Stars and Above</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="3" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterRatingData(e.target.value)
                    }
                    else{
                      setFilterRatingData(null)
                    }
                }}/>
                <span>3 Stars and Above</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="4" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterRatingData(e.target.value)
                    }
                    else{
                      setFilterRatingData(null)
                    }
                }}/>
                <span>4 Stars and Above</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="5" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterRatingData(e.target.value)
                    }
                    else{
                      setFilterRatingData(null)
                    }
                }}/>
                <span>5 Stars Only</span>
              </label>
            </div>
          </div>

          <div id="FilByNewArr" className="bg-gray-100 p-4 mt-5 rounded hidden">
            <p className="font-bold text-xl">Filter By NewArrivals</p>
            <div className="flex flex-col mt-2">
              <label className="flex items-center space-x-2">
                <input type="radio"  value="new"  name="arrivalFilter"  onChange={(e) => {
          if (e.target.checked) {
            setProds(NewArrival);
          }
        }}/>
                <span>NEW</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="radio"  value="old" name="arrivalFilter"  onChange={(e) => {
          if (e.target.checked) {
            setProds(OldArrival);
          }
        }}/>
                <span>OLD</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="radio"  value="all" name="arrivalFilter"  onChange={(e) => {
          if (e.target.checked) {
            setProds(products);
          }
        }}/>
                <span>ALL</span>
              </label>
            </div>
          </div>

          <div  id="FilByCat" className="bg-gray-100 p-4 mt-5 rounded hidden">
            <p className="font-bold text-xl">Filter By Category</p>
            <div className="flex flex-col mt-2 gap-1 font-medium text-red-600">
            <p className="flex justify-between"><Link to="/GamingProducts">Gaming</Link> <span className="text-gray-400">(10 products)</span></p>
              <p className="flex justify-between"><Link to="/Electronics">Electronics</Link> <span className="text-gray-400">(10 products)</span></p>
              <p className="flex justify-between"><Link to="/ClothingProducts">Clothing</Link> <span className="text-gray-400">(10 products)</span></p>
              <p className="flex justify-between"><Link to="/HomeProducts">HomeProducts</Link> <span className="text-gray-400">(10 products)</span></p>
              <p className="flex justify-between"><Link to="/ToyProducts">Toys</Link> <span className="text-gray-400">(10 products)</span></p>
            </div>
          </div>  
          </div>        


          
        </div>
        
        </div>



        <div id="desktopFilters" className="bg-gray-200 p-4 hidden lg:block">
          <div className="bg-white p-4 rounded">
            <p className="font-bold text-xl">Filter By Price</p>
            <div className="flex flex-col mt-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" value="1000" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterData(e.target.value)
                    }
                    else{
                      setFilterData(null)
                    }
                }} />
                <span>Less than Rs 1000</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="10000" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterData(e.target.value)
                    }
                    else{
                      setFilterData(null)
                    }
                }} />
                <span>Less than Rs 10000</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="25000" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterData(e.target.value)
                    }
                    else{
                      setFilterData(null)
                    }
                }} />
                <span>Less than Rs 25000</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="50000" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterData(e.target.value)
                    }
                    else{
                      setFilterData(null)
                    }
                }} />
                <span>Less than Rs 50000</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="90000" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterData(e.target.value)
                    }
                    else{
                      setFilterData(null)
                    }
                }} />
                <span>Less than Rs 90000</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-4 mt-5 rounded">
            <p className="font-bold text-xl">Filter By Reviews</p>
            <div className="flex flex-col mt-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" value="1" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterRatingData(e.target.value)
                    }
                    else{
                      setFilterRatingData(null)
                    }
                }}/>
                <span>1 Star and Above</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="2" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterRatingData(e.target.value)
                    }
                    else{
                      setFilterRatingData(null)
                    }
                }}/>
                <span>2 Stars and Above</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="3" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterRatingData(e.target.value)
                    }
                    else{
                      setFilterRatingData(null)
                    }
                }}/>
                <span>3 Stars and Above</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="4" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterRatingData(e.target.value)
                    }
                    else{
                      setFilterRatingData(null)
                    }
                }}/>
                <span>4 Stars and Above</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="5" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterRatingData(e.target.value)
                    }
                    else{
                      setFilterRatingData(null)
                    }
                }}/>
                <span>5 Stars Only</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-4 mt-5 rounded">
            <p className="font-bold text-xl">Filter By NewArrivals</p>
            <div className="flex flex-col mt-2">
              <label className="flex items-center space-x-2">
                <input type="radio"  value="new"  name="arrivalFilter"  onChange={(e) => {
          if (e.target.checked) {
            setProds(NewArrival);
          }
        }}/>
                <span>NEW</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="radio"  value="old" name="arrivalFilter"  onChange={(e) => {
          if (e.target.checked) {
            setProds(OldArrival);
          }
        }}/>
                <span>OLD</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="radio"  value="all" name="arrivalFilter"  onChange={(e) => {
          if (e.target.checked) {
            setProds(products);
          }
        }}/>
                <span>ALL</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-4 mt-5 rounded">
            <p className="font-bold text-xl">Filter By Category</p>
            <div className="flex flex-col mt-2 gap-1 font-medium text-red-600">
            <p className="flex justify-between"><Link to="/GamingProducts">Gaming</Link> <span className="text-gray-400">(10 products)</span></p>
              <p className="flex justify-between"><Link to="/Electronics">Electronics</Link> <span className="text-gray-400">(10 products)</span></p>
              <p className="flex justify-between"><Link to="/ClothingProducts">Clothing</Link> <span className="text-gray-400">(10 products)</span></p>
              <p className="flex justify-between"><Link to="/HomeProducts">HomeProducts</Link> <span className="text-gray-400">(10 products)</span></p>
              <p className="flex justify-between"><Link to="/ToyProducts">Toys</Link> <span className="text-gray-400">(10 products)</span></p>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 p-4">
          <div className="bg-white p-4 rounded mb-4 flex justify-end">
            <select
              id="sort"
              className="border border-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:ring-blue-300"
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                handleSort(e.target.value);
              }}
            >
              <option value="default">Sort By: Featured</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="nameAsc">Name: A to Z</option>
              <option value="nameDsc">Name: Z to A</option>
            </select>
          </div>

          {Prods.length > 0 ? (
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-2 justify-items-center">
              {Prods.map((product, index) => (
                <div key={index} className="bg-white flex lg:block p-4 rounded-lg shadow-lg transition-shadow lg:max-w-xs w-full">
                  <div className="flex justify-center">
                    <img
                      className="h-40 rounded-lg"
                      src={product.imageurl}
                      alt="productImg"
                    />
                  </div>
                  <div className="mt-4  text-center  lg:text-start w-[60%] lg:w-auto">
                    <p className="font-medium  text-lg text-gray-800" onClick={()=>{
                      props.productdes(product)
                    }}>
                      <Link to="/productdescription">{product.name}</Link>
                    </p>
                    <div className="flex flex-col lg:flex-row items-center text-center lg:text-start mt-2">
                      <p className="text-yellow-600 text-xl">{"⭐".repeat(product.ratingNum)}</p>
                      <p className="pl-2 text-sm text-gray-600">
                        ({product.ratingCount} reviews)
                      </p>
                    </div>
                    <p className="text-2xl font-semibold text-center lg:text-start text-gray-900 mt-2">
                      Rs {product.price}
                    </p>
                    <div className="flex justify-center mt-4">
                      <button
                        className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600 transition-colors"
                        onClick={() => {
                          props.AddToCart(product);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="pt-10 pl-10">loading...</div>
          )}
        </div>
      </div>
    </>
  );
}

ElectronicProdsList.propTypes = {
  searchName:PropTypes.func.isRequired,
  productdes : PropTypes.func.isRequired,
  AddToCart: PropTypes.func.isRequired,
  cartLength:PropTypes.number.isRequired
}


export default ElectronicProdsList