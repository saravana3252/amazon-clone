import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faYoutube, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { useContext } from "react";
import { userContext } from "./context/userContext";
import auth from "../config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Footer() {

  const loggedInData = useContext(userContext)

  const navigate = useNavigate();

  function logout() {
    signOut(auth).then(() => {
      localStorage.removeItem("amazon");
      navigate("/login");
    });
  }

  return (
    <>
     <div className="h-10 bg-gray-700 flex justify-center items-center w-full text-white">
            <button className="font-medium cursor-pointer" onClick={()=>{
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>Back To Top</button>
        </div>

    <footer className="w-full bg-gray-800 text-white py-10">
     
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
       
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <img src="/amazon-logo.png" alt="Bolt Cycles Logo" className="w-40  mb-3" />
          <p className="text-sm text-gray-400">
            Copyright &copy; Amazon 2025
          </p>
        </div>

       
        <div className="flex flex-col md:justify-center lg:justify-start text-center lg:text-left">
          <h2 className="font-bold text-lg mb-3">Useful Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-gray-400">
                Home
              </a>
            </li>
            <li>{ 
            loggedInData.loggedUser ? (<button className="hover:text-gray-400 cursor-pointer" onClick={logout}>Sign Out</button>):( <a href="/login" className="hover:text-gray-400">
              Sign In
            </a>)
              }
             
            </li>
          </ul>
        </div>

        
        <div className="flex flex-col text-center lg:text-left">
          <h2 className="font-bold text-lg mb-3">Our Collections</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-400">
                Gaming
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
              Electronics
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
              Clothing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
              HomeProducts
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
              Toys
              </a>
            </li>
          </ul>
        </div>

      
        <div className="flex flex-col items-center lg:items-start">
          <h2 className="font-bold text-lg mb-3">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faYoutube} size="lg" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faXTwitter} size="lg"/>
            </a>
          </div>
        </div>
      </div>

    
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p className="text-sm text-gray-400">
        Built by Saravana | © 2025
        </p>
      </div>
    </footer>
    </>
  );
}

export default Footer;

