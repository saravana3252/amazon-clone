import { useEffect, useState } from "react";
import Header from "./Header";
import {Link} from "react-router-dom"
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";


function SearchProdList(props) {
  const [originalProds, setOriginalProds] = useState([]); 
  const [Prods, setProds] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  // const [filterData,setFilterData] =useState(null)
  // const [filterRatingData,setFilterRatingData] =useState(null)

let products = [...originalProds]

  const NewArrival = products.filter((data)=>{
    return data.isNewArrival === true
  })

  const OldArrival = products.filter((data)=>{
    return data.isNewArrival === false
  })


  useEffect(() => {
    if (props.product && props.product.length > 0) {
      setOriginalProds(props.ogProd);
      setProds(props.product);
    }
  }, [props.product,props.ogProd]);

useEffect(()=>{
  console.log(originalProds)
  console.log(Prods)
},[originalProds,Prods])

  // useEffect(() => {
  //   if(filterData){
  //     fetch(`https://amazon-clone-backend-mxip.onrender.com/filter/toys/${filterData}`).then((response)=>response.json()).then((data)=>{
  //       setProds(data)
  //     }).catch((err)=>{
  //       console.log(err)
  //     })
  //   }
  //   else if(filterRatingData){
  //     fetch(`https://amazon-clone-backend-mxip.onrender.com/filterRating/toys/${filterRatingData}`).then((response)=>response.json()).then((data)=>{
  //       setProds(data)
  //     }).catch((err)=>{
  //       console.log(err)
  //     })
  //   }
  //   else{    
  //   props.searchDataFunc(props.product)
  //   }
    
  //   console.log(JSON.stringify(Prods + originalProds))
    
  // },[])


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
    
    props.searchDataFunc(sortedProducts);
  };

  return (
    <>
      <Header cartLength={props.cartLength} searchName={props.searchName} productdes={props.productdes}></Header>
      <div className="w-full bg-gray-200  grid grid-cols-1 lg:grid-cols-[280px_1fr]">
      <div className="lg:hidden text-center bg-gray-500 h-16 flex items-center justify-center  font-mono"><button className="p-2 px-4 cursor-pointer bg-yellow-500 rounded" onClick={()=>{
        let mobileFilters=document.getElementById("mobileFilters") 
       mobileFilters.style.left=0
        }}><FontAwesomeIcon icon={faFilter} /> Filters</button></div>

      <div id="mobileFilters" className="bg-white  transition-all  duration-500 fixed min-h-screen top-0 -left-[100%] w-full lg:hidden">
        <div className="flex justify-between p-4 border-b border-gray-200"><p className="font-bold text-2xl">Filters</p><button className="font-bold p-1 border border-black px-3 cursor-pointer" onClick={()=>{
        let mobileFilters=document.getElementById("mobileFilters") 
       mobileFilters.style.left="-100%"
        }}>X</button></div>
        <div className="grid grid-cols-[130px_1fr] md:grid-cols-[200px_1fr] cursor-pointer shadow">
          <div className="bg-gray-200 h-svh md:h-screen text-black space-y-5 p-2 pl-3">
            {/* <p onClick={()=>{
               document.getElementById("FilByPrice").style.display="block"
               document.getElementById("FilByReviews").style.display="none"
               document.getElementById("FilByNewArr").style.display="none"
               document.getElementById("FilByCat").style.display="none"
            }}>Filter By Price</p> */}
            {/* <p onClick={()=>{
               document.getElementById("FilByPrice").style.display="none"
               document.getElementById("FilByReviews").style.display="block"
               document.getElementById("FilByNewArr").style.display="none"
               document.getElementById("FilByCat").style.display="none"
            }}>Filter By Reviews</p> */}
            <p onClick={()=>{
              //  document.getElementById("FilByPrice").style.display="none"
              //  document.getElementById("FilByReviews").style.display="none"
               document.getElementById("FilByNewArr").style.display="block"
               document.getElementById("FilByCat").style.display="none"
            }}>Filter By NewArrivals</p>
            <p onClick={()=>{
              //  document.getElementById("FilByPrice").style.display="none"
              //  document.getElementById("FilByReviews").style.display="none"
               document.getElementById("FilByNewArr").style.display="none"
               document.getElementById("FilByCat").style.display="block"
            }}>Filter By Category</p>
          </div>
          <div className="bg-white h-svh">
          {/* <div id="FilByPrice" className="bg-gray-100 p-4 mt-4 rounded ">
            <p className="font-bold text-xl">Filter By Price</p>
            <div className="flex flex-col mt-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" value="200" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterData(e.target.value)
                    }
                    else{
                      setFilterData(null)
                    }
                }} />
                <span>Less than Rs 200</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="300" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterData(e.target.value)
                    }
                    else{
                      setFilterData(null)
                    }
                }} />
                <span>Less than Rs 300</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="500" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterData(e.target.value)
                    }
                    else{
                      setFilterData(null)
                    }
                }} />
                <span>Less than Rs 500</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="600" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterData(e.target.value)
                    }
                    else{
                      setFilterData(null)
                    }
                }} />
                <span>Less than Rs 600</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="700" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterData(e.target.value)
                    }
                    else{
                      setFilterData(null)
                    }
                }} />
                <span>Less than Rs 700</span>
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
          </div> */}

          <div id="FilByNewArr" className="bg-gray-100 p-4 mt-5 rounded">
            <p className="font-bold text-xl">Filter By NewArrivals</p>
            <div className="flex flex-col mt-2">
              <label className="flex items-center space-x-2">
                <input type="radio"  value="new"  name="arrivalFilter"  onChange={(e) => {
          if (e.target.checked) {
            props.searchDataFunc(NewArrival);
          }
        }}/>
                <span>NEW</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="radio"  value="old" name="arrivalFilter"  onChange={(e) => {
          if (e.target.checked) {
            props.searchDataFunc(OldArrival);
          }
        }}/>
                <span>OLD</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="radio"  value="all" name="arrivalFilter"  onChange={(e) => {
          if (e.target.checked) {
            props.searchDataFunc(originalProds);
          }
        }}/>
                <span>ALL</span>
              </label>
            </div>
          </div>

          <div  id="FilByCat" className="bg-gray-100 p-2 mt-5 rounded hidden">
            <p className="font-bold text-xl">Filter By Category</p>
            <div className="flex flex-col mt-2 gap-1 font-medium text-red-600">
            <p className="flex justify-between"><Link to="/GamingProducts">Gaming</Link> <span className="text-gray-400">(10 products)</span></p>
              <p className="flex justify-between"><Link to="/Electronics">Electronics</Link> <span className="text-gray-400">(12 products)</span></p>
              <p className="flex justify-between"><Link to="/ClothingProducts">Clothing</Link> <span className="text-gray-400">(10 products)</span></p>
              <p className="flex justify-between"><Link to="/HomeProducts">HomeProducts</Link> <span className="text-gray-400">(7 products)</span></p>
              <p className="flex justify-between"><Link to="/ToyProducts">Toys</Link> <span className="text-gray-400">(10 products)</span></p>
            </div>
          </div>  
          <div className=" w-full h-10 mt-5 pr-5 flex justify-end">
          <button className="bg-blue-600 w-[75%] md:w-[40%] h-10 p-2 font-semibold rounded-md text-white cursor-pointer" onClick={()=>{
        let mobileFilters=document.getElementById("mobileFilters") 
       mobileFilters.style.left="-100%"
        }}>{`Show ${Prods.length} results`}</button>
       </div>
          </div>  


          
        </div>
        
        </div>
        



        <div id="desktopFilters" className="bg-gray-200 p-4 hidden lg:block">
          {/* <div className="bg-white p-4 rounded">
            <p className="font-bold text-xl">Filter By Price</p>
            <div className="flex flex-col mt-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" value="200" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterData(e.target.value)
                    }
                    else{
                      setFilterData(null)
                    }
                }} />
                <span>Less than Rs 200</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="300" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterData(e.target.value)
                    }
                    else{
                      setFilterData(null)
                    }
                }} />
                <span>Less than Rs 300</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="500" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterData(e.target.value)
                    }
                    else{
                      setFilterData(null)
                    }
                }} />
                <span>Less than Rs 500</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="600" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterData(e.target.value)
                    }
                    else{
                      setFilterData(null)
                    }
                }} />
                <span>Less than Rs 600</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="checkbox" value="700" onChange={(e)=>{
                    if(e.target.checked){
                      setFilterData(e.target.value)
                    }
                    else{
                      setFilterData(null)
                    }
                }} />
                <span>Less than Rs 700</span>
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
          </div> */}

          <div className="bg-white p-4 mt-5 rounded">
            <p className="font-bold text-xl">Filter By NewArrivals</p>
            <div className="flex flex-col mt-2">
              <label className="flex items-center space-x-2">
                <input type="radio"  value="new"  name="arrivalFilter"  onChange={(e) => {
          if (e.target.checked) {
            props.searchDataFunc(NewArrival);
          }
        }}/>
                <span>NEW</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="radio"  value="old" name="arrivalFilter"  onChange={(e) => {
          if (e.target.checked) {
            props.searchDataFunc(OldArrival);
          }
        }}/>
                <span>OLD</span>
              </label>
              <label className="flex items-center space-x-2 pt-1">
                <input type="radio"  value="all" name="arrivalFilter"  onChange={(e) => {
          if (e.target.checked) {
            props.searchDataFunc(originalProds);
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
              <p className="flex justify-between"><Link to="/Electronics">Electronics</Link> <span className="text-gray-400">(12 products)</span></p>
              <p className="flex justify-between"><Link to="/ClothingProducts">Clothing</Link> <span className="text-gray-400">(10 products)</span></p>
              <p className="flex justify-between"><Link to="/HomeProducts">HomeProducts</Link> <span className="text-gray-400">(7 products)</span></p>
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

          {props.product.length > 0 ? (
            <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-2 justify-items-center">
              {props.product.map((product, index) => (
                <div key={index} className="bg-white flex lg:block p-3 lg:p-4 rounded-lg shadow-lg transition-shadow lg:max-w-xs w-full">
                  <div className="flex justify-start items-center lg:items-start lg:justify-center pr-2  w-[40%] lg:w-full">
                    <img
                      className="lg:h-40 h-36 rounded-lg"
                      src={product.imageurl}
                      alt="productImg"
                    />
                  </div>
                  <div className="lg:mt-4  text-center  lg:text-start w-[60%] lg:w-auto">
                    <p className="font-medium  text-lg " onClick={()=>{
                      props.productdes(product)
                    }}>
                     <a href="/productdescription" className=" text-gray-800 hover:text-orange-600 transition-all duration-200">{product.name}</a>
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
                    <button disabled={product.stock <= 0 }
                        className={` text-white py-2 px-6 rounded-lg focus:outline-none focus:ring-2  transition-colors ${product.stock <=0 ? "cursor-not-allowed bg-gray-500 " : "cursor-pointer bg-orange-500 hover:bg-orange-600 focus:ring-orange-600"}`}
                        onClick={() => {
                          props.AddToCart(product);
                        }}
                      >
                        {
                        product.stock <=0 ? "Out Of Stock" : "Add to Cart"
                      }
          
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="pt-10 pl-10">Search Not Found</div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

SearchProdList.propTypes = {
  AddToCart:PropTypes.func.isRequired,  
  searchName:PropTypes.func.isRequired,
  productdes: PropTypes.func.isRequired,
  product: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
  cartLength : PropTypes.number.isRequired,
  searchDataFunc: PropTypes.func.isRequired,
  ogProd: PropTypes.array.isRequired
};


export default SearchProdList
