import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
  faAngleDown
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { userContext } from "./context/userContext";
import auth from "../config";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

function Header(props) {
  const loggedInData = useContext(userContext);

  const navigate = useNavigate();

  const [inpSearchName, setInpSearchName] = useState("");
  const [inpSearchData, setInpSearchData] = useState([]);
  const [isOpen,setIsOpen] = useState(false)
  const [loggedUser,setLoggedUser] = useState(loggedInData.loggedUser)

  function logout() {
    signOut(auth).then(() => {
      localStorage.removeItem("amazon");
      loggedInData.setloggedUser(null)
      setLoggedUser(null)
      toast.success("Logged out successfully!",{
        position:"bottom-left"
      })
    });
  }

 useEffect(()=>{
  setLoggedUser(loggedInData.loggedUser)
 },[loggedInData.loggedUser])

  useEffect(() => {
    if (inpSearchName != "") {
      document.getElementById("searchDataDiv").style.display = "block";
      document.getElementById("searchDataDiv1").style.display = "block";
      fetch(`https://amazon-clone-backend-mxip.onrender.com/search/${inpSearchName}`)
        .then((res) => res.json())
        .then((data) => {
          setInpSearchData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      document.getElementById("searchDataDiv").style.display = "none";
      document.getElementById("searchDataDiv1").style.display = "none";
    }
  }, [inpSearchName]);

    function handleCategoryToggle(){
       setIsOpen(!isOpen)
    }

  function handleNavOpen(){
    document.getElementById("mobileNav").style.left = "0"
  }

  function handleNavClose(){
    document.getElementById("mobileNav").style.left = "-70%"
  }

  return (
    <>
      <div className="h-20 w-full bg-gray-900 flex justify-between lg:justify-evenly">
        <div className=" w-[55%] mx-2  flex lg:hidden">
      <div className="lg:hidden w-[25%] md:w-[15%] flex justify-center items-center  cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  stroke="currentColor" className="text-white h-10" onClick={handleNavOpen} > <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /> </svg> 
        </div>
        <div className=" w-[55%]  h-20 flex justify-start items-center">
          <Link to="/" className="lg:h-full h-[70px] md:w-[50%] w-[100%] ">
            <img
              src="./amazon-logo.png"
              className="h-full w-full "
              alt="amazon-logo"
            ></img>
          </Link>
        </div>
        </div>
        <div className="lg:w-[15%] w-[50%]  h-20 lg:flex hidden justify-start items-center">
          <Link to="/" className="lg:h-full h-[70px] md:w-[80%]  w-[90%]  lg:ml-3 lg:w-[78%]">
            <img
              src="./amazon-logo.png"
              className="h-full w-full lg:w-[98%]"
              alt="amazon-logo"
            ></img>
          </Link>
        </div>
       
        <div className="font-medium w-[35%]  text-white  flex justify-end px-12 items-center lg:hidden">
            <p>
              {" "}
              <Link to="/cart" className="relative">
                <FontAwesomeIcon icon={faCartShopping} className="text-xl"/>
                {props.cartLength > 0 && (
                  <span className="absolute -top-[12px] -right-[12px] bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {props.cartLength}
                  </span>
                )}
              </Link>
            </p>
         </div>

        <div id="mobileNav" className="fixed z-50 lg:hidden transition-all duration-500 top-0 -left-[70%] bg-gray-800  min-h-screen w-[70%]">
            <div className="flex justify-center mt-5 ">
                <button className="p-2 px-5 border border-orange-500 text-white text-2xl font-semibold cursor-pointer" onClick={handleNavClose}>X</button>
            </div>

            <div className="flex flex-col">
            <div className="text-center p-2 mt-5 text-white text-lg font-medium mx-4 ">
                {
                    loggedUser ? (
                    <>
                     <p>
                hello,{" "}{loggedUser.name}
                     </p>
                    </>):(
                        <>
                           <p>
                    <Link to="/login">
                hello,{" "} Sign in
                </Link>
                     </p>
                        </>
                    )
                }
            </div>
            </div>
         
         <div className="bg-gray-600 p-2 mt-4  text-center font-medium text-white cursor-pointer overflow-hidden" onClick={handleCategoryToggle}>
            <p className="text-lg">Categories</p><span><FontAwesomeIcon icon={faAngleDown} className={`transition-all duration-500  ${isOpen ? "transform rotate-180" : "transform rotate-0"}`} /></span>
            <div className={`bg-gray-500 transition-all duration-500 space-y-1 opacity-0 h-0 overflow-hidden ${isOpen ? "h-52 opacity-100" : "h-0 opacity-0" }`}>
            <div className={`transition-opacity duration-300 delay-200 flex flex-col space-y-4 pt-2 overflow-hidden ${isOpen ? "opacity-100" : "opacity-0"}`}>
             <p><Link to="/gamingproducts">Gaming</Link></p>
             <p><Link to="/electronics">Electronics</Link></p>
             <p><Link to="/clothingproducts">Clothing</Link></p>
             <p><Link to="/homeproducts">Home Products</Link></p>
             <p><Link to="/toyproducts">Toys</Link></p>
         </div>
         
            </div>
         </div>
         <div className="font-medium  text-white p-2 mt-3">
          <p className="text-center"><Link to="/orders">ORDERS</Link></p>
         </div>
         {loggedInData?.loggedUser?.id === "SVO2moOwqHeuq1tMrsGyYLRl1j52" && (
  <div className="mt-3 p-2 text-white font-medium text-center">
    <p className="text-center">
      <Link to="/admin">Admin-Panel</Link>
    </p>
  </div>
)}
         {/* {
          loggedInData.loggedUser.id === "SVO2moOwqHeuq1tMrsGyYLRl1j52" ? (<> <div className="mt-3 p-2 text-white font-medium cursor-pointer">
            <p className="text-center">
              <Link to="/admin">ADMIN</Link>
            </p>
          </div></>):null
        } */}
         <div className="flex justify-center text-white font-semibold mt-5">
            {loggedUser ? (<> <button className="w-1/2 bg-orange-600 p-2 rounded cursor-pointer" onClick={logout}>LOGOUT</button></>):(<> <button className="w-1/2 bg-orange-600 p-2 rounded"><Link to="/login">SIGN IN</Link></button></>)}
           
         </div>

        </div>

        <div className="lg:w-[55%] w-[75%]   h-20  lg:flex hidden justify-center items-center">
          <div className="bg-orange-500 w-[95%] h-10 flex items-center rounded">
            <div className="w-[90%] relative">
              <div
                id="searchDataDiv"
                className="absolute z-30 top-11 w-full py-2 space-y-1 bg-white hidden"
              >
                {inpSearchData.length > 0 ? (
                  inpSearchData.map((data, index) => {
                    return (
                      <>
                        <p
                          key={index}
                          onClick={() => {
                            props.productdes(data);
                          }}
                          className="hover:bg-gray-200 px-2 py-0.5"
                        >
                          <Link
                            to="/productdescription"
                            className="flex items-center"
                          >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <p className="pl-4 ">{data.name}</p>
                          </Link>
                        </p>
                      </>
                    );
                  })
                ) : (
                  <p className="px-2">no products found</p>
                )}
              </div>
              <input
                id="headerInp"
                type="search"
                placeholder="search products..."
                className="bg-white p-2 w-full rounded outline-none"
                autoComplete="off"
                onChange={(e) => {
                  setInpSearchName(e.target.value);
                }}
              ></input>
            </div>
            <div
              className="w-[10%]  bg-orange-500 h-full flex justify-center items-center rounded cursor-pointer hover:bg-orange-600"
              onClick={() => {
                props.searchName(document.getElementById("headerInp").value);
                navigate("/searchproductslist");
              }}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </div>
        </div>
        
        <div className="w-[30%] h-20 justify-evenly items-center text-white hidden lg:flex">
          <div className="flex flex-col relative group">
            <div className="absolute top-14  w-full transition-all duration-300 opacity-0 group-hover:opacity-100 ">
              {loggedUser ? (
                <>
                  <button
                    className="p-2 bg-yellow-500 text-black rounded w-full cursor-pointer"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button className="p-2 bg-orange-500 text-black rounded w-full cursor-pointer">
                    <Link to="/login">sign in</Link>
                  </button>
                </>
              )}
            </div>
            {
              loggedUser ? (<>
               <p >
                hello,{" "}{loggedUser.name}
            </p>
              </>):(<>
                <p>
              <Link to="/login">
                hello,{" "} Sign in
              </Link>
            </p>
              
              </>)
            }
            <p className="font-medium">Accounts & Lists</p>
          </div>
        
          <div>
            <p><Link to="/orders">ORDERS</Link></p>
          </div>
          <div>
            <p>
              {" "}
              <Link to="/cart" className="relative">
                <FontAwesomeIcon icon={faCartShopping} />
                {props.cartLength > 0 && (
                  <span className="absolute -top-[12px] -right-[16px] bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {props.cartLength}
                  </span>
                )}
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-700 lg:h-0 h-16 lg:justify-start flex justify-center items-center">
      <div className="w-[95%]   h-10  lg:hidden flex justify-center items-center">
          <div className="bg-orange-500 w-[95%] h-10 flex items-center rounded">
            <div className="w-[80%] relative">
              <div
                id="searchDataDiv1"
                className="absolute z-30 top-11 w-full py-2 space-y-1 border-b-6 border-l-6 border-gray-500 bg-white hidden"
              >
                {inpSearchData.length > 0 ? (
                  inpSearchData.map((data, index) => {
                    return (
                      <>
                        <p
                          key={index}
                          onClick={() => {
                            props.productdes(data);
                          }}
                          className="hover:bg-gray-200 px-2 py-0.5"
                        >
                          <Link
                            to="/productdescription"
                            className="flex items-center"
                          >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <p className="pl-4 ">{data.name}</p>
                          </Link>
                        </p>
                      </>
                    );
                  })
                ) : (
                  <p className="px-2">no products found</p>
                )}
              </div>
              <input
                id="headerInp1"
                type="search"
                placeholder="search products..."
                className="bg-white p-2 w-full rounded outline-none"
                onChange={(e) => {
                  setInpSearchName(e.target.value);
                }}
              ></input>
            </div>
            <div
              className="w-[20%]  bg-orange-500 h-full flex justify-center items-center rounded cursor-pointer hover:bg-orange-600"
              onClick={() => {
                props.searchName(document.getElementById("headerInp1").value);
                navigate("/searchproductslist");
              }}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </div>
        </div>
        {/* <p className='flex items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  stroke="currentColor" className="text-white h-10 w-3/6 transition-all duration-500 ease-in-out" onClick={handleCategoryToggle}> <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /> </svg> </p> */}

        {/* <div className='group'>
            <p className='group-hover:bg-red-700 p-2 w-1/2 group-hover:w-full transition-all duration-300'><Link to="/gamingproducts">Gaming</Link></p>
            </div>
            <div className='group'>
            <p className='group-hover:bg-red-700 p-2 w-1/2 group-hover:w-full transition-all duration-300'><Link to="/electronics">Electronics</Link></p>
            </div>
            <div className='group'>
            <p className='group-hover:bg-red-700 p-2 w-1/2 group-hover:w-full transition-all duration-300'><Link to="/clothingproducts">Clothing</Link></p>
            </div>
            <div className='group'>
            <p className='group-hover:bg-red-700 p-2 w-1/2 group-hover:w-full transition-all duration-300'><Link to="/homeproducts">HomeProducts</Link></p>
            </div>
            <div className='group'>
            <p className='group-hover:bg-red-700 p-2 w-1/2 group-hover:w-full transition-all duration-300'><Link to="/toyproducts">Toys</Link></p>
            </div> */}
      </div>
      {/* <div id="category" className={`{bg-white w-full transition-all duration-500 ease-in-out ${isOpen ? "h-20" : "h-0"} } `}>
            <p>hi</p>
        </div> */}

      <div className="bg-gray-700 h-10 lg:flex hidden items-center px-5 space-x-4 text-white">
        <div className="group cursor-pointer">
          <p className="group-hover:bg-red-700 p-2 w-1/2 group-hover:w-full transition-all duration-300">
            <Link to="/gamingproducts">Gaming</Link>
          </p>
        </div>
        <div className="group cursor-pointer">
          <p className="group-hover:bg-red-700 p-2 w-1/2 group-hover:w-full transition-all duration-300">
            <Link to="/electronics">Electronics</Link>
          </p>
        </div>
        <div className="group cursor-pointer">
          <p className="group-hover:bg-red-700 p-2 w-1/2 group-hover:w-full transition-all duration-300">
            <Link to="/clothingproducts">Clothing</Link>
          </p>
        </div>
        <div className="group cursor-pointer">
          <p className="group-hover:bg-red-700 p-2 w-1/2 group-hover:w-full transition-all duration-300">
            <Link to="/homeproducts">HomeProducts</Link>
          </p>
        </div>
        <div className="group cursor-pointer">
          <p className="group-hover:bg-red-700 p-2 w-1/2 group-hover:w-full transition-all duration-300">
            <Link to="/toyproducts">Toys</Link>
          </p>
        </div>
        {/* <div className="bg-amber-300"><p><Link to="/admin">admin</Link></p></div> */}
        {loggedInData?.loggedUser?.id === "SVO2moOwqHeuq1tMrsGyYLRl1j52" && (
  <div className="group cursor-pointer">
    <p className="group-hover:bg-red-700 p-2 w-1/2 group-hover:w-full transition-all duration-300">
      <Link to="/admin">AdminPanel</Link>
    </p>
  </div>
)}

       
      </div>
    </>
  );
}

Header.propTypes = {
  searchName: PropTypes.func.isRequired,
  cartLength: PropTypes.number.isRequired,
  productdes: PropTypes.func.isRequired,
};

export default Header;
